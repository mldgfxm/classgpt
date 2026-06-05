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
    <div className={cn("px-5 py-4 border-b relative overflow-hidden bg-card/55", className)}>
      <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-primary/45 via-accent/70 to-transparent" />
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-background border shadow-sm">
            <Icon className="h-3.5 w-3.5 text-primary" />
          </div>
        )}
        <div>
          <h2 className="text-sm font-bold tracking-normal">{title}</h2>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
