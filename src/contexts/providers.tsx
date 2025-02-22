import { CategoryProvider } from "@/contexts/category-context";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return <CategoryProvider>{children}</CategoryProvider>;
};

export default Providers;
