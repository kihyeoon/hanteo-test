import { dehydrate } from "@tanstack/react-query";

import BannerCarousel from "@/components/banner/banner-carousel";
import CategoryCarousel from "@/components/category/category-carousel";
import Navigation from "@/components/layout/navigation";

import { InitialMusicData } from "@/features/music/domain/initial-music-data";
import { getChartList } from "@/features/music/lib/api";
import type { MusicChartResponse } from "@/features/music/types/music";

import { categories } from "@/constants/categories";
import ReactQueryHydration from "@/contexts/react-query-hydration";
import { getQueryClient } from "@/lib/get-query-client";

export default async function Home() {
  const queryClient = getQueryClient();

  const initialCategoryName =
    InitialMusicData.getInitialCategoryName(categories);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["chartList", initialCategoryName],
    queryFn: ({ pageParam = 0 }) =>
      getChartList(initialCategoryName, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: MusicChartResponse) => lastPage.nextCursor,
  });

  // 서버 상태를 dehydrate하여 직렬화된 데이터를 클라이언트에 전달
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydration state={dehydratedState}>
      <Navigation categories={categories} />
      <main className="mx-auto size-full min-h-0 flex-1 bg-gray-100">
        <BannerCarousel />
        <CategoryCarousel categories={categories} />
      </main>
    </ReactQueryHydration>
  );
}
