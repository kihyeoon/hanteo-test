import { useEffect, useState } from "react";

interface UseInViewOptions {
  keepAlive?: boolean;
}

export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  options: UseInViewOptions = {},
) {
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
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return options.keepAlive ? isInView || hasBeenVisible : isInView;
}
