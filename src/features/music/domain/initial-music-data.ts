import type { MusicChartResponse } from "@/features/music/types/music";

import { Category } from "@/types/category";

/**
 * 초기 데이터를 관리하는 클래스
 */
export class InitialMusicData {
  constructor(private initialData?: MusicChartResponse) {}

  static getInitialCategoryName(categories: readonly Category[]) {
    return categories[0].name;
  }

  static getInitialDataForCategory(
    index: number,
    initialData?: MusicChartResponse,
  ) {
    return index === 0 ? initialData : undefined;
  }

  get data() {
    return this.initialData;
  }

  get exists() {
    return !!this.initialData;
  }
}
