import { useEffect, useState } from "react";

interface UseInViewOptions {
  keepAlive?: boolean;
  threshold?: number;
}

export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  options: UseInViewOptions = {},
) {
  const { keepAlive = true, threshold = 0.1 } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);
        if (visible) setHasBeenVisible(true);
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return keepAlive ? isInView || hasBeenVisible : isInView;
}
