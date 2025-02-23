import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

interface ListSkeletonProps {
  className?: string;
  itemCount?: number;
  startIndex?: number;
}

export default function ListSkeleton({
  className,
  itemCount = 20,
  startIndex = 0,
}: ListSkeletonProps) {
  return (
    <div
      className={cn("flex w-full flex-col items-center gap-4 p-4", className)}
    >
      <ul className="w-full space-y-4">
        {Array.from({ length: itemCount }).map((_, index) => (
          <li
            key={index}
            className="flex w-full items-center gap-4 rounded-lg border p-4"
          >
            <span className="w-[22px] text-center text-lg font-semibold text-gray-300">
              {startIndex + index + 1}
            </span>
            <div className="size-[60px] shrink-0">
              <Skeleton className="size-full rounded-md" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Skeleton className="h-[18px] w-4/5" />
              <Skeleton className="h-[18px] w-3/5" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
