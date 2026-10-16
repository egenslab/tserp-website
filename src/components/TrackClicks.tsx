"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Records WhatsApp clicks site-wide, and plan purchases from the "Buy now" buttons (data-plan). */
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='wa.me']") as HTMLAnchorElement | null;
      if (!a) return;
      const plan = a.dataset.plan;
      if (plan) track("checkout", { content_name: plan, currency: "USD", value: Number(a.dataset.value) || 0 });
      else track("whatsapp", { content_name: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
