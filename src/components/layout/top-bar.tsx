import { BookMarked, Clock3, Sparkles } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-4 sm:px-6 border-b bg-card/88 backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[linear-gradient(135deg,oklch(0.42_0.1_172),oklch(0.55_0.12_245))] shadow-sm">
          <BookMarked className="h-4.5 w-4.5 text-white" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground shadow-sm">
            AI
          </span>
        </div>
        <div className="leading-none">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-foreground tracking-normal">
              ClassGPT
            </span>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            课后反馈工作台
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 rounded-lg border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
        <Clock3 className="h-3.5 w-3.5 text-primary" />
        <span>30 秒生成专业课后反馈</span>
      </div>
    </header>
  );
}
