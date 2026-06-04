"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  RefreshCw,
  Square,
  Download,
  History,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import type { FeedbackFormData } from "@/modules/feedback/schema";

interface ActionBarProps {
  completion: string;
  isLoading: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  onStop: () => void;
  onOpenHistory: () => void;
  formData: FeedbackFormData;
}

export function ActionBar({
  completion,
  isLoading,
  onRegenerate,
  onStop,
  onOpenHistory,
  formData,
}: ActionBarProps) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(completion);
      setCopied(true);
      toast.success("已复制到剪贴板");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = completion;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        toast.success("已复制到剪贴板");
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error("复制失败，请手动复制");
      }
      document.body.removeChild(textarea);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body: Record<string, unknown> = {
        studentName: formData.studentName,
        gradeLevel: formData.gradeLevel,
        grade: formData.grade,
        subject: formData.subject,
        teachingContent: formData.teachingContent,
        errorAnalysis: formData.errorAnalysis,
        keywords: formData.keywords,
        assessments: formData.assessments,
        result: completion,
      };
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("保存失败");
      toast.success("已保存到历史记录");
    } catch {
      toast.error("保存失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  const handleExportWord = () => {
    // Build a simple HTML document and trigger download as .doc
    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"><title>课后反馈</title></head>
      <body>${completion.replace(/\n/g, "<br>")}</body>
      </html>
    `;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.studentName || "学生"}_课后反馈.doc`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("已导出 Word 文档");
  };

  if (!completion && !isLoading) return null;

  return (
    <div className="p-4 border-t bg-card/80 backdrop-blur-sm flex items-center gap-2 flex-wrap animate-fade-in-up">
      {isLoading ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onStop}
          className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          <Square className="h-3.5 w-3.5" />
          停止生成
        </Button>
      ) : (
        <>
          <Button
            size="sm"
            onClick={handleCopy}
            disabled={!completion}
            className="gap-1.5 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-sm"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "已复制" : "复制"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            className="gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            重新生成
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={saving}
            className="gap-1.5"
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            保存
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportWord}
            className="gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            导出Word
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenHistory}
            className="gap-1.5 ml-auto hover:bg-muted"
          >
            <History className="h-3.5 w-3.5" />
            历史记录
          </Button>
        </>
      )}
    </div>
  );
}
