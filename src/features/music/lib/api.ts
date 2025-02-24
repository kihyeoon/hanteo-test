"use server";

import type {
  ItunesSearchResponse,
  MusicChartResponse,
} from "@/features/music/types/music";

const ITUNES_SEARCH_API = "https://itunes.apple.com/search";
const PAGE_SIZE = 20;
const MAX_PAGES = 5;

export async function getChartList(
  categoryName: string,
  cursor?: string,
): Promise<MusicChartResponse> {
  const offset = cursor ? parseInt(cursor) : 0;
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;

  if (currentPage > MAX_PAGES) {
    return {
      tracks: [],
      nextCursor: undefined,
    };
  }

  const params = new URLSearchParams({
    term: categoryName,
    limit: String(PAGE_SIZE),
    offset: String(offset),
  });

  const response = await fetch(`${ITUNES_SEARCH_API}?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch music chart");
  }

  const data: ItunesSearchResponse = await response.json();

  const tracks = data.results.map((item, index) => ({
    id: String(item.trackId),
    title: item.trackName,
    artist: item.artistName,
    albumCover: item.artworkUrl100,
    rank: offset + index + 1,
  }));

  const hasNextPage = currentPage < MAX_PAGES;

  return {
    tracks,
    nextCursor: hasNextPage ? String(offset + PAGE_SIZE) : undefined,
  };
}
