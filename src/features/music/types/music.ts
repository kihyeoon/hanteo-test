export interface Track {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  rank: number;
}

export interface ItunesSearchResponse {
  resultCount: number;
  results: {
    trackId: number;
    trackName: string;
    artistName: string;
    artworkUrl100: string;
  }[];
}

export interface MusicChartResponse {
  tracks: Track[];
  nextCursor?: number;
}
