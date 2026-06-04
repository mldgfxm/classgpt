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

  // Empty state
  if (!completion && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        {/* 创意图标组合 */}
        <div className="relative">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/10">
            <FileText className="h-7 w-7 text-primary/60" />
          </div>
          <div className="absolute -top-1.5 -right-1.5 animate-float">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary to-emerald-500 shadow-md shadow-primary/30">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground/80">
            等待生成反馈
          </p>
          <p className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
            填写课堂信息并选择表现标签，AI 将为你生成专业反馈
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
          <Wand2 className="h-3 w-3" />
          <span>支持一键导出 Word 文档</span>
        </div>
      </div>
    );
  }

  // Loading skeleton
  if (isLoading && !completion) {
    return (
      <div className="space-y-3 animate-fade-in-up">
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
    <div className="relative animate-fade-in-up">
      <Textarea
        ref={textareaRef}
        value={completion}
        onChange={(e) => onContentChange(e.target.value)}
        className="min-h-[320px] resize-none text-[15px] leading-relaxed border-2 focus-visible:ring-1"
        placeholder="AI 生成的反馈内容将在这里显示..."
      />
      {isLoading && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-muted-foreground bg-background/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full border shadow-sm">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          生成中...
        </div>
      )}
    </div>
  );
}
