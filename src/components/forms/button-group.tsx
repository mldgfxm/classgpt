"use client";

import { cn } from "@/lib/utils";

interface ButtonGroupProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ButtonGroup({
  options,
  value,
  onChange,
  className,
}: ButtonGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option, i) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option === value ? "" : option)}
          className={cn(
            "px-3 py-2 text-sm rounded-lg border transition-all duration-200",
            "hover:border-primary/60 hover:bg-primary/7",
            "active:scale-[0.97]",
            "animate-fade-in-up",
            `stagger-${Math.min(i + 1, 5)}`,
            value === option
              ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
              : "bg-card/85 text-foreground border-border hover:shadow-sm"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
