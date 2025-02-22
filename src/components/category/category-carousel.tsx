"use client";

import { useEffect, useState } from "react";

import { LazyList } from "@/components/category/lazy-list";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

import { MusicList } from "@/features/music/components/music-list";

import type { Category } from "@/constants/categories";
import { useCategory } from "@/contexts/category-context";

interface CategoryCarouselProps {
  categories: readonly Category[];
}

export default function CategoryCarousel({
  categories,
}: CategoryCarouselProps) {
  const { currentCategory, setCurrentCategory } = useCategory();
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    api.scrollTo(currentCategory);
  }, [api, currentCategory]);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentCategory(api.selectedScrollSnap());
    });
  }, [api, setCurrentCategory]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem key={category.id}>
            <LazyList className="flex h-[calc(100vh-40px)] w-full flex-col items-center justify-start overflow-y-scroll p-4">
              <MusicList categoryId={category.id} />
            </LazyList>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
