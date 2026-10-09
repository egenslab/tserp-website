"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const smooth = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

/**
 * Smooth scroll to the top when a link opens another page, and for "#top" links (the footer's back-to-top button).
 * Back/forward keeps the browser's restored position, and links to a #section scroll to that section instead.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => { fromHistory.current = true; };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest?.('a[href="#top"]');
      if (!link) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: smooth() });
    };
    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (fromHistory.current) { fromHistory.current = false; return; }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: smooth() });
  }, [pathname]);

  return null;
}
