import BannerCarousel from "@/components/banner/banner-carousel";
import CategoryCarousel from "@/components/category/category-carousel";
import Navigation from "@/components/layout/navigation";

import { categories } from "@/constants/categories";

export default function Home() {
  return (
    <>
      <Navigation categories={categories} />
      <main className="mx-auto size-full min-h-0 flex-1 bg-gray-100">
        <BannerCarousel />
        <CategoryCarousel categories={categories} />
      </main>
    </>
  );
}
