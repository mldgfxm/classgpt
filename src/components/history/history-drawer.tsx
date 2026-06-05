"use client";

import { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryList } from "./history-list";
import { useHistoryStore, type HistoryEntry } from "@/stores/history-store";

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  onLoad: (entry: HistoryEntry) => void;
}

export function HistoryDrawer({ open, onClose, onLoad }: HistoryDrawerProps) {
  const { entries, setEntries, removeEntry } = useHistoryStore();

  const loadHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      setEntries(
        data.entries.map((e: Record<string, unknown>) => ({
          ...e,
          keywords: parseJsonSafe(e.keywords as string, []),
          assessments: parseJsonSafe(e.assessments as string, {}),
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }, [setEntries]);

  useEffect(() => {
    if (open) {
      void loadHistory();
    }
  }, [loadHistory, open]);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/history/${id}`, { method: "DELETE" });
      removeEntry(id);
    } catch {
      // silent fail
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg">历史记录</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <HistoryList
            entries={entries}
            onLoad={onLoad}
            onDelete={handleDelete}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function parseJsonSafe<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
