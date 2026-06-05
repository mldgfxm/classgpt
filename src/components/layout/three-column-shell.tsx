"use client";

import { type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ThreeColumnShellProps {
  leftPanel: ReactNode;
  middlePanel: ReactNode;
  rightPanel: ReactNode;
}

export function ThreeColumnShell({
  leftPanel,
  middlePanel,
  rightPanel,
}: ThreeColumnShellProps) {
  const isXl = useMediaQuery("(min-width: 1280px)");

  if (isXl) {
    // 3 列并排: 30% | 30% | 40%
    return (
      <div className="grid grid-cols-[29%_29%_42%] h-full overflow-hidden gap-3 p-3">
        {leftPanel}
        {middlePanel}
        {rightPanel}
      </div>
    );
  }

  // 2 列: 左侧上下堆叠 | 右侧
  return (
    <div className="grid grid-cols-[1fr_1fr] h-full overflow-hidden gap-3 p-3">
      <div className="flex flex-col overflow-hidden gap-3">
        <div className="flex-1 overflow-hidden">{leftPanel}</div>
        <div className="flex-1 overflow-hidden">{middlePanel}</div>
      </div>
      {rightPanel}
    </div>
  );
}
