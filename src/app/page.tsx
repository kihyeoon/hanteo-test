import { categories } from "@/constants/categories";

import CategoryCarousel from "@/components/category/category-carousel";
import Navigation from "@/components/layout/navigation";

export default function Home() {
  return (
    <>
      <Navigation categories={categories} />
      <main className="mx-auto size-full min-h-0 flex-1 bg-gray-100">
        <CategoryCarousel categories={categories} />
      </main>
    </>
  );
}
