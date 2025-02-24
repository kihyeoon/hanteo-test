import BannerCarousel from "@/components/banner/banner-carousel";
import CategoryCarousel from "@/components/category/category-carousel";
import Navigation from "@/components/layout/navigation";

import { InitialMusicData } from "@/features/music/domain/initial-music-data";
import { getChartList } from "@/features/music/lib/api";

import { categories } from "@/constants/categories";

export default async function Home() {
  const initialChartData = await getChartList(
    InitialMusicData.getInitialCategoryName(categories),
  );

  return (
    <>
      <Navigation categories={categories} />
      <main className="mx-auto size-full min-h-0 flex-1 bg-gray-100">
        <BannerCarousel />
        <CategoryCarousel
          categories={categories}
          initialChartData={initialChartData}
        />
      </main>
    </>
  );
}
