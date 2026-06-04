"use client";

import { useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
        <FileText className="h-12 w-12 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground max-w-[240px] leading-relaxed">
          填写左侧课堂信息并选择课堂表现标签，点击生成按钮获取反馈
        </p>
      </div>
    );
  }

  // Loading skeleton
  if (isLoading && !completion) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-4 w-[75%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
    );
  }

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={completion}
        onChange={(e) => onContentChange(e.target.value)}
        className="min-h-[320px] resize-none text-[15px] leading-relaxed border-2 focus-visible:ring-1"
        placeholder="AI 生成的反馈内容将在这里显示..."
      />
      {isLoading && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          生成中...
        </div>
      )}
    </div>
  );
}
