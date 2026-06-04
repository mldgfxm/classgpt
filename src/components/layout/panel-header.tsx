import { cn } from "@/lib/utils";

interface PanelHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PanelHeader({ title, subtitle, className }: PanelHeaderProps) {
  return (
    <div className={cn("px-6 py-4 border-b", className)}>
      <h2 className="text-base font-semibold tracking-wide">{title}</h2>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
