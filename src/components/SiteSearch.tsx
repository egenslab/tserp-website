"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GROUP_ORDER, QUICK_LINKS, searchItems, type SearchItem } from "@/lib/search";
import { Icon } from "./ui";

let indexPromise: Promise<SearchItem[]> | null = null;
const loadIndex = () =>
  (indexPromise ??= fetch("/search-index.json").then((r) => (r.ok ? r.json() : [])).catch(() => { indexPromise = null; return []; }));

/** Bold the parts of the title that match the query words. */
function Highlight({ text, query }: { text: string; query: string }) {
  const words = query.trim().split(/\s+/).filter(Boolean).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!words.length) return <>{text}</>;
  const parts = text.split(new RegExp(`(${words.join("|")})`, "gi"));
  return <>{parts.map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : <Fragment key={i}>{p}</Fragment>))}</>;
}

/** Header search button and the search dialog (also opened with Ctrl/⌘ + K or "/"). */
export default function SiteSearch() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    loadIndex().then(setItems);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
    setQuery("");
    opener.current?.focus?.();
  }, []);

  // Keyboard shortcuts: Ctrl/⌘ + K anywhere, "/" when not typing in a field
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement).closest?.("input, textarea, select, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        show();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [show]);

  useEffect(() => { setOpen(false); setQuery(""); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => input.current?.focus());
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const results = useMemo(() => (query.trim() ? searchItems(items, query) : QUICK_LINKS), [items, query]);
  const grouped = useMemo(() => {
    if (!query.trim()) return [{ group: "Quick links", items: results }];
    return GROUP_ORDER.map((g) => ({ group: g as string, items: results.filter((r) => r.g === g) })).filter((x) => x.items.length);
  }, [results, query]);
  const flat = grouped.flatMap((g) => g.items);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); hide(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, flat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && flat.length) {
      e.preventDefault();
      // Clicking the link keeps normal link behaviour (client navigation, new tab for WhatsApp)
      list.current?.querySelector<HTMLAnchorElement>(`[data-index="${active}"] a`)?.click();
    }
  };

  let n = -1;
  return (
    <>
      <button type="button" className="search-btn" aria-label="Search" aria-haspopup="dialog" onClick={show}>
        <Icon name="i-search" />
      </button>
      {open && createPortal(
        <div className="search-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) hide(); }}>
          <div className="search-dialog" role="dialog" aria-modal="true" aria-label="Search" onKeyDown={onKeyDown}>
            <div className="search-field">
              <Icon name="i-search" />
              <input
                ref={input}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, modules, integrations..."
                aria-label="Search the site"
                role="combobox"
                aria-expanded="true"
                aria-controls="search-results"
                aria-activedescendant={flat.length ? `search-opt-${active}` : undefined}
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" className="search-esc" onClick={hide}>Esc</button>
            </div>
            <ul className="search-results" id="search-results" role="listbox" ref={list} aria-label="Search results">
              {grouped.map((g) => (
                <li key={g.group} role="presentation">
                  <p className="search-group">{g.group}</p>
                  <ul role="presentation">
                    {g.items.map((item) => {
                      n += 1;
                      const i = n;
                      const external = item.h.startsWith("http");
                      const inner = (
                        <>
                          <span className="search-ico"><Icon name={item.i} /></span>
                          <span className="search-text"><b><Highlight text={item.t} query={query} /></b><small>{item.d}</small></span>
                          <Icon name={external ? "i-external" : "i-arrow"} className="ic search-go" />
                        </>
                      );
                      return (
                        <li key={item.g + item.h + item.t} id={`search-opt-${i}`} role="option" aria-selected={i === active} data-index={i} onMouseMove={() => setActive(i)}>
                          {external
                            ? <a href={item.h} target="_blank" rel="noopener" tabIndex={-1} onClick={hide}>{inner}</a>
                            : <Link href={item.h} tabIndex={-1} onClick={hide}>{inner}</Link>}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
              {query.trim() && !flat.length && (
                <li className="search-empty" role="presentation">
                  <b>No results for “{query}”</b>
                  <span>Try another word, or <Link href="/contact" onClick={hide}>ask our team</Link>.</span>
                </li>
              )}
            </ul>
            <div className="search-foot" aria-hidden="true">
              <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
              <span><kbd>↵</kbd> to open</span>
              <span><kbd>Esc</kbd> to close</span>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
