import { useCallback, useEffect, useRef } from "react";

import { BlurFade } from "@/components/common/blur-fade";
import Footer from "@/components/layout/footer";

import { useInView } from "@/hooks/useInView";

import ListSkeleton from "@/features/music/components/list-skeleton";
import { useMusicChart } from "@/features/music/hooks/use-music-chart";

import { MusicListItem } from "./music-list-item";

interface MusicListProps {
  categoryName: string;
}

export function MusicList({ categoryName }: MusicListProps) {
  const {
    tracks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useMusicChart({
    categoryName,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef);

  const getAnimationDelay = useCallback((index: number) => {
    const itemsPerPage = 20;
    const pageIndex = index % itemsPerPage;
    return 0.25 + pageIndex * 0.05;
  }, []);

  // 뷰포트에 들어왔을 때 다음 페이지 로드
  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center gap-4">
        <ListSkeleton />
        <div ref={loadMoreRef} className="h-1 w-full" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <ul className="w-full space-y-4 p-4 pb-0">
        {tracks.map((track, index) => (
          <BlurFade
            key={track.id + index}
            delay={getAnimationDelay(index)}
            direction="right"
          >
            <MusicListItem key={track.id + index} track={track} />
          </BlurFade>
        ))}
        {isFetchingNextPage && (
          <ListSkeleton
            startIndex={tracks.length}
            className="p-0 duration-300 animate-in fade-in"
          />
        )}
      </ul>
      {hasNextPage && <div ref={loadMoreRef} className="h-1 w-full"></div>}
      <Footer />
    </div>
  );
}
