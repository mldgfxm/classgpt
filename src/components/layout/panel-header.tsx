import { cn } from "@/lib/utils";
import { BookOpen, BarChart3, FileCheck } from "lucide-react";

const ICONS: Record<string, typeof BookOpen> = {
  "课堂信息": BookOpen,
  "课堂表现": BarChart3,
  "生成结果": FileCheck,
};

interface PanelHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PanelHeader({ title, subtitle, className }: PanelHeaderProps) {
  const Icon = ICONS[title];

  return (
    <div className={cn("px-6 py-4 border-b relative overflow-hidden", className)}>
      {/* 渐变装饰线 */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />

      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10">
            <Icon className="h-3.5 w-3.5 text-primary" />
          </div>
        )}
        <div>
          <h2 className="text-sm font-bold tracking-wide">{title}</h2>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
