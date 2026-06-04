"use client";

import { useState, useEffect, type ReactNode } from "react";

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
  const [isXl, setIsXl] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1280px)");
    setIsXl(mql.matches);
    setMounted(true);
    const handler = (e: MediaQueryListEvent) => setIsXl(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  if (!mounted) {
    return <div className="flex-1" />;
  }

  if (isXl) {
    // 3 列并排: 30% | 30% | 40%
    return (
      <div className="grid grid-cols-[30%_30%_40%] h-full overflow-hidden">
        {leftPanel}
        {middlePanel}
        {rightPanel}
      </div>
    );
  }

  // 2 列: 左侧上下堆叠 | 右侧
  return (
    <div className="grid grid-cols-[1fr_1fr] h-full overflow-hidden">
      <div className="flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">{leftPanel}</div>
        <div className="flex-1 overflow-auto border-t">{middlePanel}</div>
      </div>
      {rightPanel}
    </div>
  );
}
