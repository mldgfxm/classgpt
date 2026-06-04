import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen">
      {/* Left column skeleton */}
      <div className="w-[30%] border-r p-6 space-y-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>

      {/* Middle column skeleton */}
      <div className="w-[30%] border-r p-6 space-y-6">
        <Skeleton className="h-6 w-24" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Right column skeleton */}
      <div className="w-[40%] p-6 space-y-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-4 w-[40%]" />
      </div>
    </div>
  );
}
