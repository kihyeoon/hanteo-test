import type { Category } from "@/types/category";

export const categories = [
  {
    id: 1,
    name: "kpop",
  },
  {
    id: 2,
    name: "dance",
  },
  {
    id: 3,
    name: "rock",
  },
  {
    id: 4,
    name: "electronic",
  },
  {
    id: 5,
    name: "pop",
  },
  {
    id: 6,
    name: "classic",
  },
] as const satisfies Category[];
