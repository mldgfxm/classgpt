import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* TopBar skeleton */}
      <div className="h-12 shrink-0 flex items-center px-5 border-b bg-card/80">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 to-emerald-500/20" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      {/* 三栏骨架屏 */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left column */}
        <div className="w-[30%] border-r p-6 space-y-5">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-10 w-full bg-primary/5" />
          <Skeleton className="h-10 w-full bg-primary/5" />
          <Skeleton className="h-10 w-full bg-primary/5" />
          <Skeleton className="h-20 w-full bg-primary/5" />
        </div>

        {/* Middle column */}
        <div className="w-[30%] border-r p-6 space-y-5">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-16" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20 bg-primary/5" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full bg-primary/5" />
                <Skeleton className="h-8 w-20 rounded-full bg-primary/5" />
                <Skeleton className="h-8 w-16 rounded-full bg-primary/5" />
              </div>
            </div>
          ))}
          <Skeleton className="h-11 w-full rounded-lg bg-primary/10" />
        </div>

        {/* Right column */}
        <div className="w-[40%] p-6 space-y-5">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <div className="relative">
              <Skeleton className="h-16 w-16 rounded-2xl bg-primary/5" />
              <div className="absolute -top-1.5 -right-1.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-primary/40" />
                </div>
              </div>
            </div>
            <Skeleton className="h-4 w-24 bg-primary/5" />
            <Skeleton className="h-3 w-40 bg-primary/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
