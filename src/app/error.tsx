"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <AlertTriangle className="h-12 w-12 text-destructive/60" />
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">页面加载出错</h2>
        <p className="text-sm text-muted-foreground">
          请刷新页面重试
        </p>
      </div>
      <Button onClick={reset} variant="outline">
        重试
      </Button>
    </div>
  );
}
