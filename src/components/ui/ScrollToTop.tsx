import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

/**
 * ScrollToTop
 *
 * Two modes:
 * 1. With `scrollRef` — scrolls a custom overflow container (e.g. dashboard <main>).
 * 2. Without `scrollRef` — scrolls the browser window (e.g. public pages with CommonLayout).
 */
interface ScrollToTopProps {
  scrollRef?: React.RefObject<HTMLElement | null>;
}

export function ScrollToTop({ scrollRef }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, scrollRef]);

  return null;
}
