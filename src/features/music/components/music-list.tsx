import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

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

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <ul className="space-y-4 p-4">
        {tracks.map((track, index) => (
          <MusicListItem key={track.id + index} track={track} />
        ))}
      </ul>
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "로딩중..." : "더보기"}
        </Button>
      )}
      <Footer />
    </div>
  );
}
