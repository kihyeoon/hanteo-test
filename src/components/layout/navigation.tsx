"use client";

import type { Category } from "@/constants/categories";
import { useCategory } from "@/contexts/category-context";

interface NavigationProps {
  categories: readonly Category[];
}

export default function Navigation({ categories }: NavigationProps) {
  const { currentCategory, setCurrentCategory } = useCategory();

  return (
    <nav className="sticky top-0 z-10 w-full bg-background">
      <div className="flex overflow-x-auto">
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
    </nav>
  );
}
