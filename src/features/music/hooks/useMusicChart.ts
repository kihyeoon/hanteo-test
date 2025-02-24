import { useInfiniteQuery } from "@tanstack/react-query";

import { getChartList } from "@/features/music/lib/api";
import type { Track } from "@/features/music/types/music";

export function useMusicChart(categoryId: number, categoryName: string) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["musicChart", categoryId],
    queryFn: async ({ pageParam }) => getChartList(categoryName, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined as string | undefined,
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
