import Image from "next/image";

import type { Track } from "@/features/music/types/music";

interface MusicListItemProps {
  track: Track;
}

export function MusicListItem({ track }: MusicListItemProps) {
  return (
    <li className="flex items-center space-x-4 rounded-lg border p-4">
      <span className="text-lg font-semibold">{track.rank}</span>
      <Image
        src={track.albumCover}
        alt={`${track.title} album cover`}
        width={60}
        height={60}
        className="rounded-md"
      />
      <div>
        <h3 className="font-medium">{track.title}</h3>
        <p className="text-sm text-gray-600">{track.artist}</p>
      </div>
    </li>
  );
}
