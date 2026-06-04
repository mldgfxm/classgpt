"use client";

import { type HistoryEntry } from "@/stores/history-store";
import { HistoryItemCard } from "./history-item-card";
import { Archive } from "lucide-react";

interface HistoryListProps {
  entries: HistoryEntry[];
  onLoad: (entry: HistoryEntry) => void;
  onDelete: (id: number) => void;
}

export function HistoryList({ entries, onLoad, onDelete }: HistoryListProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
        <Archive className="h-12 w-12 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">暂无历史记录</p>
        <p className="text-xs text-muted-foreground/60">
          生成反馈后点击保存即可在此查看
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-4">
      {entries.map((entry) => (
        <HistoryItemCard
          key={entry.id}
          entry={entry}
          onLoad={() => onLoad(entry)}
          onDelete={() => onDelete(entry.id)}
        />
      ))}
    </div>
  );
}
