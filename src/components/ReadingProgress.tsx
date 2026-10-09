"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; title: string };

const headerOffset = () => (document.querySelector(".header")?.clientHeight ?? 0) + 12;

/** Blog article: reading progress bar and table of contents that follows the section in view. */
export function useReading(toc: TocItem[]) {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById("article");
      if (!article) return;
      const r = article.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setProgress(Math.min(100, Math.max(0, ((-r.top + headerOffset()) / Math.max(total, 1)) * 100)));
      let idx = 0;
      toc.forEach((t, i) => {
        const h = document.getElementById(t.id);
        if (h && h.getBoundingClientRect().top < headerOffset() + 80) idx = i;
      });
      setCurrent(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);
  return { progress, current };
}

export function ProgressBar({ toc }: { toc: TocItem[] }) {
  const { progress } = useReading(toc);
  return <div className="read-progress" aria-hidden="true"><span id="readBar" style={{ width: `${progress}%` }} /></div>;
}

export function TocNav({ toc }: { toc: TocItem[] }) {
  const { current } = useReading(toc);
  return (
    <nav id="tocNav">
      {toc.map((t, i) => <a key={t.id} href={`#${t.id}`} className={i === current ? "active" : undefined}>{t.title}</a>)}
    </nav>
  );
}
