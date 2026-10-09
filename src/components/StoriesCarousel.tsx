"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./ui";

/** "What agency owners say" carousel: scroll-snap track with arrows, dots, keyboard and autoplay. */
export default function StoriesCarousel({ children }: { children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const auto = useRef<ReturnType<typeof setInterval>>(undefined);
  const [pages, setPages] = useState(1);
  const [current, setCurrent] = useState(0);

  const slides = () => Array.from(track.current?.children ?? []) as HTMLElement[];
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const pageCount = useCallback(() => {
    const s = slides();
    if (!s.length || !track.current) return 1;
    const perView = Math.max(1, Math.round(track.current.clientWidth / s[0].getBoundingClientRect().width));
    return Math.max(1, s.length - perView + 1);
  }, []);

  const currentIndex = useCallback(() => {
    const s = slides();
    const left = track.current?.scrollLeft ?? 0;
    let best = 0;
    s.forEach((el, i) => {
      if (Math.abs(el.offsetLeft - s[0].offsetLeft - left) < Math.abs(s[best].offsetLeft - s[0].offsetLeft - left)) best = i;
    });
    return best;
  }, []);

  const goTo = useCallback((i: number) => {
    const s = slides();
    const max = pageCount() - 1;
    if (i > max) i = 0;
    if (i < 0) i = max;
    // In right-to-left layouts the track scrolls towards negative offsets, which offsetLeft already reflects
    track.current?.scrollTo({ left: s[i].offsetLeft - s[0].offsetLeft, behavior: reduceMotion() ? "auto" : "smooth" });
  }, [pageCount]);

  const stopAuto = useCallback(() => { clearInterval(auto.current); auto.current = undefined; }, []);
  const startAuto = useCallback(() => {
    if (reduceMotion() || auto.current) return;
    auto.current = setInterval(() => goTo(currentIndex() + 1), 6000);
  }, [goTo, currentIndex]);
  const restartAuto = () => { stopAuto(); startAuto(); };

  useEffect(() => {
    const el = track.current!;
    let scrollTimer: ReturnType<typeof setTimeout>;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const update = () => { setPages(pageCount()); setCurrent(Math.min(currentIndex(), pageCount() - 1)); };
    const onScroll = () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(update, 80); };
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(update, 150); };
    update();
    startAuto();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      stopAuto();
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pageCount, currentIndex, startAuto, stopAuto]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(currentIndex() + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(currentIndex() - 1); }
  };

  return (
    <section className="section" id="stories">
      <div className="container">
        <div className="section-head with-controls">
          <div>
            <span className="eyebrow">Customer stories</span>
            <h2>What agency owners say</h2>
          </div>
          <div className="carousel-controls">
            <button className="car-btn" aria-label="Previous stories" onClick={() => { goTo(currentIndex() - 1); restartAuto(); }}><Icon name="i-left" /></button>
            {" "}
            <button className="car-btn" aria-label="Next stories" onClick={() => { goTo(currentIndex() + 1); restartAuto(); }}><Icon name="i-right" /></button>
          </div>
        </div>
        <div className="carousel" aria-roledescription="carousel" onMouseEnter={stopAuto} onMouseLeave={startAuto} onFocus={stopAuto} onBlur={startAuto}>
          <div className="car-track" tabIndex={0} ref={track} onKeyDown={onKeyDown} onTouchStart={stopAuto}>
            {children}
          </div>
          <div className="car-dots" role="tablist" aria-label="Choose slide">
            {Array.from({ length: pages }, (_, i) => (
              <button key={i} type="button" role="tab" aria-label={String(i + 1)} aria-selected={i === current} onClick={() => goTo(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
