import { useInfiniteQuery } from "@tanstack/react-query";

import { InitialMusicData } from "@/features/music/domain/initial-music-data";
import { getChartList } from "@/features/music/lib/api";
import type { MusicChartResponse, Track } from "@/features/music/types/music";

import { createInitialQueryState } from "@/lib/query-utils";

interface UseMusicChartProps {
  categoryId: number;
  categoryName: string;
  initialData?: MusicChartResponse;
}

export function useMusicChart({
  categoryId,
  categoryName,
  initialData,
}: UseMusicChartProps) {
  const initialMusicData = new InitialMusicData(initialData);

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
    initialPageParam: 0,
    initialData: createInitialQueryState(initialMusicData.data),
    enabled: !initialMusicData.exists,
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
