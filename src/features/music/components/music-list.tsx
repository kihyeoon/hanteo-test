import { useCallback } from "react";

import Footer from "@/components/layout/footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";

import ListSkeleton from "@/features/music/components/list-skeleton";
import { useMusicChart } from "@/features/music/hooks/useMusicChart";

import { MusicListItem } from "./music-list-item";

interface MusicListProps {
  categoryId: number;
}

export function MusicList({ categoryId }: MusicListProps) {
  const {
    tracks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useMusicChart(categoryId);

  const getAnimationDelay = useCallback((index: number) => {
    const itemsPerPage = 20;
    const pageIndex = index % itemsPerPage;
    return 0.25 + pageIndex * 0.05;
  }, []);

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <ListSkeleton />;
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
      {hasNextPage && !isFetchingNextPage && (
        <Button onClick={() => fetchNextPage()}>더보기</Button>
      )}
      <Footer />
    </div>
  );
}
