"use client";

import { useFormContext } from "react-hook-form";
import { PanelHeader } from "@/components/layout/panel-header";
import { AssessmentGroup } from "@/components/forms/assessment-group";
import { ASSESSMENT_GROUPS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Loader2 } from "lucide-react";

interface PerformancePanelProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

export function PerformancePanel({
  onGenerate,
  isGenerating,
}: PerformancePanelProps) {
  const form = useFormContext();

  return (
    <div className="flex flex-col h-full bg-card border-r">
      <PanelHeader
        title="课堂表现"
        subtitle="点击选择每项评估（可反选取消）"
      />

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {ASSESSMENT_GROUPS.map((group) => (
            <AssessmentGroup
              key={group.name}
              label={group.label}
              name={group.name}
              options={group.options}
              value={form.watch(`assessments.${group.name}`) || ""}
              onChange={(v) =>
                form.setValue(`assessments.${group.name}`, v)
              }
            />
          ))}
        </div>
      </ScrollArea>

      {/* 生成按钮 */}
      <div className="p-4 border-t bg-card">
        <Button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full h-11 text-base gap-2"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              正在生成中...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              生成课后反馈
            </>
          )}
        </Button>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Ctrl + Enter 快速生成
        </p>
      </div>
    </div>
  );
}
