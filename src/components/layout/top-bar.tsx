import { Sparkles } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-5 border-b bg-card/80 backdrop-blur-sm">
      {/* 左侧: Logo + 品牌名 */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-emerald-500 shadow-sm">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent tracking-tight">
          ClassGPT
        </span>
        <span className="text-[10px] text-muted-foreground font-medium px-1.5 py-0.5 rounded-full bg-muted border border-border/50">
          AI 助手
        </span>
      </div>

      {/* 右侧: 标语 */}
      <p className="hidden sm:block text-xs text-muted-foreground">
        30 秒生成专业课后反馈
      </p>
    </header>
  );
}
