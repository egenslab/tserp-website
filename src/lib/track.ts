/**
 * Conversion events, sent to every tool that is loaded: Meta Pixel (fbq), Google Analytics (gtag)
 * and Google Tag Manager (dataLayer). Each tool applies the visitor's cookie choice itself.
 */
type Fn = (...args: unknown[]) => void;
type W = { fbq?: Fn; gtag?: Fn; dataLayer?: unknown[] };

const EVENTS = {
  lead: { meta: "Lead", ga: "generate_lead" },
  affiliate: { meta: "SubmitApplication", ga: "affiliate_application" },
  whatsapp: { meta: "Contact", ga: "whatsapp_click" },
  checkout: { meta: "InitiateCheckout", ga: "begin_checkout" },
} as const;

export type TrackEvent = keyof typeof EVENTS;

export function track(event: TrackEvent, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as W;
  const e = EVENTS[event];
  w.fbq?.("track", e.meta, params);
  w.gtag?.("event", e.ga, params);
  w.dataLayer?.push({ event: e.ga, ...params });
}
