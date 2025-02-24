"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useCategory } from "@/contexts/category-context";
import type { Category } from "@/types/category";

interface NavigationProps {
  categories: readonly Category[];
}

export default function Navigation({ categories }: NavigationProps) {
  const { currentCategory, setCurrentCategory } = useCategory();

  return (
    <nav className="sticky top-0 z-10 w-full bg-background">
      <ScrollArea>
        <div className="flex">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setCurrentCategory(index)}
              className={`whitespace-nowrap px-4 py-2 ${
                currentCategory === index
                  ? "font-bold text-primary"
                  : "text-gray-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
}
