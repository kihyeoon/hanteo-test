"use client";

import { useEffect, useState } from "react";

import { InView } from "@/components/common/in-view";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

import { MusicList } from "@/features/music/components/music-list";
import { InitialMusicData } from "@/features/music/domain/initial-music-data";
import type { MusicChartResponse } from "@/features/music/types/music";

import { useCategory } from "@/contexts/category-context";
import type { Category } from "@/types/category";

interface CategoryCarouselProps {
  categories: readonly Category[];
  initialChartData: MusicChartResponse;
}

export default function CategoryCarousel({
  categories,
  initialChartData,
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
        {categories.map((category, index) => (
          <CarouselItem key={category.id}>
            <InView
              className={`flex h-[calc(100dvh-309px)] w-full flex-col items-center justify-start overflow-y-scroll md:h-[calc(100dvh-338px)]`}
            >
              <MusicList
                categoryId={category.id}
                categoryName={category.name}
                initialData={InitialMusicData.getInitialDataForCategory(
                  index,
                  initialChartData,
                )}
              />
            </InView>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
