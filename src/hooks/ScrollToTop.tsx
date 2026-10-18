import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to top on page change, or to #section when the URL has a hash. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Lazy pages may not be in the DOM yet — retry briefly.
    let tries = 0;
    const id = window.setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el || ++tries > 30) {
        window.clearInterval(id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [pathname, hash]);

  return null;
}
