"use client";

import { type HistoryEntry } from "@/stores/history-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

interface HistoryItemCardProps {
  entry: HistoryEntry;
  onLoad: () => void;
  onDelete: () => void;
}

export function HistoryItemCard({
  entry,
  onLoad,
  onDelete,
}: HistoryItemCardProps) {
  const handleDelete = () => {
    onDelete();
    toast.success("已删除");
  };

  const preview =
    entry.result.length > 80
      ? entry.result.slice(0, 80) + "..."
      : entry.result;

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm truncate">
                {entry.studentName}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">
                {entry.gradeLevel}{entry.grade} · {entry.subject}
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {preview}
            </p>
            <p className="text-[10px] text-muted-foreground/60">
              {entry.createdAt}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onLoad}
              title="加载此条记录"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={handleDelete}
              title="删除"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
