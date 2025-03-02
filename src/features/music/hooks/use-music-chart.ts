import { useInfiniteQuery } from "@tanstack/react-query";

import { getChartList } from "@/features/music/lib/api";
import type { Track } from "@/features/music/types/music";

interface UseMusicChartProps {
  categoryName: string;
}

export function useMusicChart({ categoryName }: UseMusicChartProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["chartList", categoryName],
    queryFn: async ({ pageParam }) => getChartList(categoryName, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  const tracks: Track[] = data?.pages.flatMap((page) => page.tracks) ?? [];

  return {
    tracks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}
