import Image from "next/image";

import type { Track } from "@/features/music/types/music";

interface MusicListItemProps {
  track: Track;
}

export function MusicListItem({ track }: MusicListItemProps) {
  return (
    <li className="flex w-full items-center gap-4 rounded-lg border p-4">
      <span className="w-[22px] text-center text-lg font-semibold">
        {track.rank}
      </span>
      <div className="size-[60px] shrink-0">
        <Image
          src={track.albumCover}
          alt={`${track.title} album cover`}
          width={60}
          height={60}
          className="size-full rounded-md object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="w-full truncate text-sm font-medium" title={track.title}>
          {track.title}
        </h3>
        <p
          className="w-full truncate text-sm text-gray-600"
          title={track.artist}
        >
          {track.artist}
        </p>
      </div>
    </li>
  );
}
