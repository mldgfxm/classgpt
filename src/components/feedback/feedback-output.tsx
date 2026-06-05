"use client";

import { useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, FileText, Wand2 } from "lucide-react";

interface FeedbackOutputProps {
  completion: string;
  isLoading: boolean;
  onContentChange: (text: string) => void;
}

export function FeedbackOutput({
  completion,
  isLoading,
  onContentChange,
}: FeedbackOutputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [completion]);

  if (!completion && !isLoading) {
    return (
      <div className="paper-surface flex min-h-[420px] flex-col items-center justify-center rounded-lg border p-8 text-center shadow-sm">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-card shadow-sm">
            <FileText className="h-7 w-7 text-primary/60" />
          </div>
          <div className="absolute -top-1.5 -right-1.5 animate-float">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent shadow-md">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <p className="text-sm font-medium text-foreground/80">
            等待生成反馈
          </p>
          <p className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
            填写课堂信息并选择表现标签，AI 将为你生成专业反馈
          </p>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
          <Wand2 className="h-3 w-3" />
          <span>支持一键导出 Word 文档</span>
        </div>
      </div>
    );
  }

  // Loading skeleton
  if (isLoading && !completion) {
    return (
      <div className="paper-surface space-y-3 rounded-lg border p-5 animate-fade-in-up shadow-sm">
        <Skeleton className="h-4 w-full bg-primary/5" />
        <Skeleton className="h-4 w-[90%] bg-primary/5" />
        <Skeleton className="h-4 w-[85%] bg-primary/5" />
        <Skeleton className="h-4 w-[70%] bg-primary/5" />
        <Skeleton className="h-4 w-[80%] bg-primary/5" />
        <Skeleton className="h-4 w-[60%] bg-primary/5" />
        <Skeleton className="h-4 w-[75%] bg-primary/5" />
        <Skeleton className="h-4 w-[50%] bg-primary/5" />
      </div>
    );
  }

  return (
    <div className="paper-surface relative rounded-lg border p-3 animate-fade-in-up shadow-sm">
      <Textarea
        ref={textareaRef}
        value={completion}
        onChange={(e) => onContentChange(e.target.value)}
        className="min-h-[420px] resize-none border-0 bg-transparent text-[15px] leading-relaxed shadow-none focus-visible:ring-0"
        placeholder="AI 生成的反馈内容将在这里显示..."
      />
      {isLoading && (
        <div className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full border bg-background/90 px-2.5 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur-sm">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          生成中...
        </div>
      )}
    </div>
  );
}
