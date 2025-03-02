"use client";

import { HydrationBoundary } from "@tanstack/react-query";

interface ReactQueryHydrationProps {
  children: React.ReactNode;
  state: unknown;
}

/**
 * React Query의 서버 상태를 클라이언트에 하이드레이션하는 컴포넌트.
 * 서버에서 prefetch한 데이터를 클라이언트에서 사용할 수 있다.
 */
export default function ReactQueryHydration({
  children,
  state,
}: ReactQueryHydrationProps) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
