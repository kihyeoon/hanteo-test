import { type ReactNode, useRef } from "react";

import { useInView } from "@/hooks/useInView";

interface InViewProps {
  children: ReactNode;
  className?: string;
  /**
   * 요소가 한번 보여진 후에도 계속 유지할지 여부
   * @default true
   */
  keepAlive?: boolean;
  /**
   * Intersection Observer의 threshold 값
   * @default 0.1
   */
  threshold?: number;
  /**
   * 로딩 중일 때 보여줄 컴포넌트
   */
  fallback?: ReactNode;
}

export function InView({
  children,
  className,
  keepAlive = true,
  threshold = 0.1,
  fallback,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    keepAlive,
    threshold,
  });

  return (
    <div ref={ref} className={className}>
      {isInView ? children : fallback}
    </div>
  );
}
