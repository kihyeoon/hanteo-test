"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface CategoryContextType {
  currentCategory: number;
  setCurrentCategory: (index: number) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [currentCategory, setCurrentCategory] = useState(0);

  return (
    <CategoryContext value={{ currentCategory, setCurrentCategory }}>
      {children}
    </CategoryContext>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}
