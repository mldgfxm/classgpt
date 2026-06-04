"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20">
        <AlertTriangle className="h-8 w-8 text-destructive/70" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">页面加载出错</h2>
        <p className="text-sm text-muted-foreground">
          请刷新页面或稍后重试
        </p>
      </div>
      <Button onClick={reset} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        重试
      </Button>
    </div>
  );
}
