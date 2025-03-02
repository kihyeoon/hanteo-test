import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

import { GC_TIME, STALE_TIME } from "@/constants/react-query";

/**
 * 서버 컴포넌트에서 QueryClient를 생성하는 함수.
 * React의 cache 함수를 사용하여 동일한 요청에서는 동일한 QueryClient 인스턴스를 반환.
 */
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: STALE_TIME,
          gcTime: GC_TIME,
        },
      },
    }),
);
