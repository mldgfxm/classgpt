"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompletion } from "@ai-sdk/react";
import { ThreeColumnShell } from "@/components/layout/three-column-shell";
import { ClassInfoPanel } from "./class-info-panel";
import { PerformancePanel } from "./performance-panel";
import { ResultPanel } from "./result-panel";
import { HistoryDrawer } from "@/components/history/history-drawer";
import { feedbackFormSchema, type FeedbackFormData } from "@/modules/feedback/schema";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";

export function FeedbackEditor() {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const form = useForm<FeedbackFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(feedbackFormSchema) as any,
    defaultValues: {
      studentName: "",
      gradeLevel: "" as FeedbackFormData["gradeLevel"],
      grade: "",
      subject: "" as FeedbackFormData["subject"],
      teachingContent: "",
      errorAnalysis: "",
      keywords: [],
      wordCount: "300-500",
      assessments: {
        mastery: "",
        engagement: "",
        homework: "",
        participation: "",
        habits: "",
        output: "",
        tone: "",
      },
    },
    mode: "onSubmit",
  });

  const { completion, complete, isLoading, stop, setCompletion } = useCompletion({
    api: "/api/generate",
    streamProtocol: "text",
    onError: (err) => {
      toast.error(err.message || "生成失败，请检查 API Key 是否正确配置");
    },
  });

  const formData = useWatch({ control: form.control }) as FeedbackFormData;

  const handleGenerate = useCallback(() => {
    void form.handleSubmit(
      (data) => {
        complete(JSON.stringify(data));
        setActiveTab("result");
      },
      () => {
        toast.warning("请先完善必填信息");
      }
    )();
  }, [form, complete]);

  const handleRegenerate = useCallback(() => {
    setCompletion("");
    handleGenerate();
  }, [handleGenerate, setCompletion]);

  // Keyboard shortcut: Ctrl+Enter to generate
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleGenerate();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleGenerate]);

  // Warn before leaving with unsaved content
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (completion) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [completion]);

  const leftPanel = (
    <ClassInfoPanel />
  );

  const middlePanel = (
    <PerformancePanel
      onGenerate={handleGenerate}
      isGenerating={isLoading}
    />
  );

  const rightPanel = (
    <ResultPanel
      completion={completion}
      isLoading={isLoading}
      onRegenerate={handleRegenerate}
      onStop={stop}
      setCompletion={setCompletion}
      onOpenHistory={() => setHistoryOpen(true)}
      formData={formData}
    />
  );

  return (
    <FormProvider {...form}>
      {isDesktop ? (
        /* Desktop: 3-column layout */
        <div className="flex-1 overflow-hidden">
          <ThreeColumnShell
            leftPanel={leftPanel}
            middlePanel={middlePanel}
            rightPanel={rightPanel}
          />
        </div>
      ) : (
        /* Mobile: Tab layout */
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid grid-cols-3 mx-2 mt-2 shrink-0">
              <TabsTrigger value="info" className="text-xs">课堂信息</TabsTrigger>
              <TabsTrigger value="performance" className="text-xs">课堂表现</TabsTrigger>
              <TabsTrigger value="result" className="text-xs">生成结果</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="flex-1 overflow-auto p-0 mt-0 data-[state=inactive]:hidden">
              {leftPanel}
            </TabsContent>
            <TabsContent value="performance" className="flex-1 overflow-auto p-0 mt-0 data-[state=inactive]:hidden">
              {middlePanel}
            </TabsContent>
            <TabsContent value="result" className="flex-1 overflow-auto p-0 mt-0 data-[state=inactive]:hidden">
              {rightPanel}
            </TabsContent>
          </Tabs>
        </div>
      )}

      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onLoad={(entry) => {
          form.reset({
            studentName: entry.studentName,
            gradeLevel: entry.gradeLevel as FeedbackFormData["gradeLevel"],
            grade: entry.grade,
            subject: entry.subject as FeedbackFormData["subject"],
            teachingContent: entry.teachingContent,
            errorAnalysis: entry.errorAnalysis,
            keywords: entry.keywords,
            assessments: entry.assessments,
          });
          setCompletion(entry.result);
          setHistoryOpen(false);
          setActiveTab("result");
        }}
      />
    </FormProvider>
  );
}
