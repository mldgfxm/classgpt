"use client";

import { type FeedbackFormData } from "@/modules/feedback/schema";
import { PanelHeader } from "@/components/layout/panel-header";
import { SmartSuggestions } from "@/components/feedback/smart-suggestions";
import { FeedbackOutput } from "@/components/feedback/feedback-output";
import { ActionBar } from "@/components/feedback/action-bar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResultPanelProps {
  completion: string;
  isLoading: boolean;
  onRegenerate: () => void;
  onStop: () => void;
  setCompletion: (text: string) => void;
  onOpenHistory: () => void;
  formData: FeedbackFormData;
}

export function ResultPanel({
  completion,
  isLoading,
  onRegenerate,
  onStop,
  setCompletion,
  onOpenHistory,
  formData,
}: ResultPanelProps) {
  return (
    <div className="desk-shadow flex flex-col h-full overflow-hidden rounded-lg border bg-background/80">
      <PanelHeader
        title="生成结果"
        subtitle={completion ? "可编辑、复制或重新生成" : "填写信息后点击生成"}
      />

      <ScrollArea className="flex-1">
        <div className="p-5 space-y-4">
          {completion && <SmartSuggestions formData={formData} />}

          <FeedbackOutput
            completion={completion}
            isLoading={isLoading}
            onContentChange={setCompletion}
          />
        </div>
      </ScrollArea>

      <ActionBar
        completion={completion}
        isLoading={isLoading}
        onCopy={() => {}}
        onRegenerate={onRegenerate}
        onStop={onStop}
        onOpenHistory={onOpenHistory}
        formData={formData}
      />
    </div>
  );
}
