"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { CategoryProvider } from "@/contexts/category-context";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CategoryProvider>{children}</CategoryProvider>
    </QueryClientProvider>
  );
};

export default Providers;
