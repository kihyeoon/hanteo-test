import { type ReactNode, useRef } from "react";

import { useInView } from "@/hooks/useInView";

interface LazyListProps {
  children: ReactNode;
  className?: string;
}

export function LazyList({ children, className }: LazyListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { keepAlive: true });

  return (
    <div ref={ref} className={className}>
      {isInView && children}
    </div>
  );
}
