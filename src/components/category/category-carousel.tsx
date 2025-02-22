"use client";

import type { Category } from "@/constants/categories";
import { useCategory } from "@/contexts/category-context";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

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
            <div className="flex min-h-96 w-full items-center justify-center">
              <div className="text-2xl font-bold">{category.name}</div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
