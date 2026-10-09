// Site search index, generated at build time as /search-index.json (see src/app/search-index.json/route.ts).
import { FEATURES, POSTS, SOLUTIONS, SUCCESS, WA, groupTitle } from "./content";

export type SearchGroup = "Pages" | "Features" | "Solutions" | "Integrations" | "Blog" | "Success stories" | "FAQ";

/** t: title, d: description, h: link, g: group, i: icon, k: extra keywords */
export type SearchItem = { t: string; d: string; h: string; g: SearchGroup; i: string; k?: string };

export const GROUP_ORDER: SearchGroup[] = ["Pages", "Features", "Solutions", "Integrations", "Success stories", "Blog", "FAQ"];

/** Shown before the visitor types anything */
export const QUICK_LINKS: SearchItem[] = [
  { t: "Request a demo", d: "Book a free 30-minute walkthrough", h: "/contact", g: "Pages", i: "i-calendar" },
  { t: "Pricing", d: "Plans in BDT and USD, monthly, yearly or lifetime", h: "/pricing", g: "Pages", i: "i-coins" },
  { t: "All features", d: "Travel services, business modules and platform", h: "/features", g: "Pages", i: "i-layers" },
  { t: "Integrations", d: "GDS, bedbanks, payments and messaging", h: "/#integrations", g: "Pages", i: "i-code" },
  { t: "Success stories", d: "Agencies growing with TravelSuite ERP", h: "/success-stories", g: "Pages", i: "i-award" },
  { t: "Chat on WhatsApp", d: "+880 13 2527 7120", h: WA, g: "Pages", i: "i-wa" },
];

const PAGES: SearchItem[] = [
  { t: "Home", d: "All-in-one travel ERP for travel agencies", h: "/", g: "Pages", i: "i-globe" },
  { t: "Features", d: "Every module of TravelSuite ERP", h: "/features", g: "Pages", i: "i-layers" },
  { t: "Solutions", d: "Setups for each kind of travel business", h: "/solutions", g: "Pages", i: "i-target" },
  { t: "Pricing", d: "Starter, Growth, Business and Enterprise plans", h: "/pricing", g: "Pages", i: "i-coins", k: "price cost plan license lifetime monthly yearly" },
  { t: "About us", d: "Who we are and why we build TravelSuite ERP", h: "/about", g: "Pages", i: "i-heart", k: "company egens lab team offices" },
  { t: "Contact us", d: "Request a demo, WhatsApp or email", h: "/contact", g: "Pages", i: "i-mail", k: "demo email whatsapp phone offices" },
  { t: "Success stories", d: "Results from agencies using TravelSuite ERP", h: "/success-stories", g: "Pages", i: "i-award", k: "case study customers" },
  { t: "Blog", d: "Guides for travel agencies", h: "/blog", g: "Pages", i: "i-file", k: "articles news" },
  { t: "Customer reviews", d: "What agency owners say", h: "/#stories", g: "Pages", i: "i-star", k: "testimonials" },
  { t: "Terms & Conditions", d: "Legal", h: "/terms", g: "Pages", i: "i-file" },
  { t: "Privacy Policy", d: "Legal", h: "/privacy", g: "Pages", i: "i-lock" },
  { t: "Refund Policy", d: "Legal", h: "/refund", g: "Pages", i: "i-receipt" },
];

const INTEGRATIONS: [string, string][] = [
  ["Amadeus", "GDS"], ["Sabre", "GDS"], ["Travelport", "GDS"], ["Duffel", "Flight API"], ["Kiwi.com", "Flight API"],
  ["Airline NDC", "Flight content"], ["Hotelbeds", "Bedbank"], ["Expedia", "Hotel supplier"], ["Hotels.com", "Hotel supplier"],
  ["WebBeds", "Bedbank"], ["TBO", "Flights and hotels"], ["Tripadvisor", "Activities"], ["GetYourGuide", "Activities"],
  ["Visa", "Card payments"], ["Mastercard", "Card payments"], ["American Express", "Card payments"], ["PayPal", "Payments"],
  ["Stripe", "Payments"], ["Apple Pay", "Payments"], ["Google Pay", "Payments"], ["Razorpay", "Payments"], ["bKash", "Mobile payments"],
  ["Nagad", "Mobile payments"], ["SSLCommerz", "Payment gateway"], ["WhatsApp", "Messaging"], ["Messenger", "Messaging"],
  ["Instagram", "Messaging"], ["Twilio SMS", "SMS"], ["Mailgun", "Email"], ["OpenAI", "AI"], ["QuickBooks", "Accounting"],
  ["Xero", "Accounting"], ["Google Analytics", "Analytics"], ["Google Maps", "Maps"],
];

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [...PAGES];
  for (const f of FEATURES) {
    items.push({
      t: f.title, d: f.desc, h: `/features/${f.slug}`, g: "Features", i: f.icon,
      k: [groupTitle(f.group), f.page?.h1, f.seo.keywords, ...(f.page?.capabilities ?? f.bullets), ...f.seo.overview].filter(Boolean).join(" "),
    });
  }
  for (const s of SOLUTIONS) {
    items.push({ t: s.title, d: s.tagline, h: `/solutions/${s.slug}`, g: "Solutions", i: s.icon, k: `${s.headline} ${s.seo.keywords}` });
  }
  for (const [name, kind] of INTEGRATIONS) {
    items.push({ t: name, d: `${kind} integration`, h: "/#integrations", g: "Integrations", i: "i-code" });
  }
  for (const st of SUCCESS) {
    items.push({ t: st.headline, d: `${st.type}, ${st.location}`, h: `/success-stories/${st.slug}`, g: "Success stories", i: "i-award", k: st.chips.join(" ") });
  }
  for (const p of POSTS) {
    items.push({ t: p.title, d: p.excerpt, h: `/blog/${p.slug}`, g: "Blog", i: "i-file", k: p.cat });
  }
  for (const f of FEATURES) {
    for (const [q, a] of f.seo.faqs) items.push({ t: q, d: f.title, h: `/features/${f.slug}#faq`, g: "FAQ", i: "i-chat", k: a });
  }
  for (const s of SOLUTIONS) {
    for (const [q, a] of s.seo.faqs) items.push({ t: q, d: s.title, h: `/solutions/${s.slug}#faq`, g: "FAQ", i: "i-chat", k: a });
  }
  return items;
}

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

/** Every word of the query must appear somewhere; title matches rank first. */
export function searchItems(items: SearchItem[], query: string, limit = 24): SearchItem[] {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const q = words.join(" ");
  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of items) {
    const title = norm(item.t);
    const desc = norm(item.d);
    const all = `${title} ${desc} ${norm(item.k ?? "")}`;
    if (!words.every((w) => all.includes(w))) continue;
    let score = 0;
    if (title === q) score += 200;
    else if (title.startsWith(q)) score += 120;
    else if (title.includes(q)) score += 80;
    for (const w of words) {
      if (new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(title)) score += 20;
      else if (title.includes(w)) score += 10;
      else if (desc.includes(w)) score += 4;
      else score += 1;
    }
    score -= GROUP_ORDER.indexOf(item.g);
    scored.push({ item, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.item);
}
