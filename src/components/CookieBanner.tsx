"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_KEY } from "@/lib/consent";

type Gtag = (...args: unknown[]) => void;
type Clarity = (cmd: string, value?: boolean) => void;

/** Cookie notice for Google Analytics. Reopened from any [data-cookie-settings] link (footer). */
export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(CONSENT_KEY); } catch {}
    if (!saved) setOpen(true);
    const reopen = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.("[data-cookie-settings]")) { e.preventDefault(); setOpen(true); }
    };
    document.addEventListener("click", reopen);
    return () => document.removeEventListener("click", reopen);
  }, []);

  const choose = (value: "granted" | "denied") => {
    try { localStorage.setItem(CONSENT_KEY, value); } catch {}
    (window as unknown as { gtag?: Gtag }).gtag?.("consent", "update", { analytics_storage: value });
    (window as unknown as { clarity?: Clarity }).clarity?.("consent", value === "granted");
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-labelledby="cookie-title">
      <span className="cb-ico" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3.6-3.4A3 3 0 0 1 13.4 4 3 3 0 0 1 12 3Z" /><circle cx="8.5" cy="10" r="1" /><circle cx="10" cy="15.5" r="1" /><circle cx="15.5" cy="14.5" r="1" /></svg>
      </span>
      <div className="cb-body">
        <span className="b" id="cookie-title">Cookies on this site</span>
        <p>We use Google Analytics cookies to understand how visitors use this site. You can accept or decline them, and change your choice at any time.</p>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
      <div className="cb-actions">
        <button type="button" className="btn btn-outline" onClick={() => choose("denied")}>Decline</button>
        <button type="button" className="btn btn-lime" onClick={() => choose("granted")}>Accept</button>
      </div>
    </div>
  );
}
