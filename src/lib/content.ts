// Typed access to the site content in src/content/*.json.
// All text is English; translations live in src/i18n (see README).
import featuresData from "@/content/features.json";
import solutionsData from "@/content/solutions.json";
import postsData from "@/content/posts.json";
import legalData from "@/content/legal.json";
import successData from "@/content/success.json";
import siteData from "@/content/site.json";

export const SITE = "https://travelsuiteerp.com";
export const WA = "https://wa.me/8801325277120";
export const EMAIL = "hello@travelsuiteerp.com";

export type Faq = [question: string, answer: string];
export type Seo = { keywords: string; overview: string[]; faqs: Faq[] };

type Section<T> = { eyebrow: string; title: string; items: T[] };

/** Optional extra content that turns a feature into a full landing page (see "flights"). */
export type FeaturePage = {
  seoTitle?: string; metaDescription?: string; h1?: string; overviewTitle?: string;
  facts?: { value: string; label: string; logos?: string[] }[];
  sources?: Section<{ icon: string; title: string; text: string; tags: string[] }>;
  workflow?: { eyebrow: string; title: string; steps: { title: string; text: string }[] };
  capabilities?: string[];
  audiences?: Section<{ icon: string; title: string; items: string[] }>;
  markets?: Section<{ flag: string; title: string; text: string }>;
  compare?: { eyebrow: string; title: string; before: string; after: string; rows: [string, string, string][] };
};

export type Feature = {
  slug: string; group: string; icon: string; title: string; desc: string; intro: string;
  bullets: string[]; steps: string[]; benefits: string[]; seo: Seo; page?: FeaturePage;
};
export type Solution = {
  slug: string; icon: string; title: string; tagline: string; headline: string; intro: string; plan: string;
  challenges: string[]; helps: string[]; modules: string[]; seo: Seo;
};
export type Block = ["h2" | "p", string] | ["ul", string[]];
export type Post = {
  slug: string; cat: string; icon: string; color: string; date: string; read: number;
  title: string; excerpt: string; body: Block[];
  extra: { takeaways?: string[]; blocks?: Block[]; faqs?: Faq[] };
};
export type LegalDoc = { slug: string; title: string; intro: string; sections: [string, string[]][] };
export type Story = {
  slug: string; shot: string; url: string; type: string; location: string; chips: string[]; metric: string;
  golive: string; headline: string; intro: string; challenge: string; solution: string[];
  results: [string, string][]; quote: string; person: string; modules: string[];
};
export type Country = { code: string; name: string; region: string; office: boolean };
type NamedLink = { name: string; logo: string; url: string };
type AiLink = NamedLink & { maker: string };

export const FEATURE_GROUPS = featuresData.groups as { id: string; title: string }[];
export const FEATURES = featuresData.items as Feature[];
export const SOLUTIONS = solutionsData as Solution[];
export const BLOG_CATEGORIES = postsData.categories as string[];
export const POSTS = postsData.items as Post[];
export const LEGAL = legalData as LegalDoc[];
export const SUCCESS = successData as Story[];
export const COUNTRIES = siteData.countries as Country[];
export const AI_PROMPT = siteData.aiPrompt;
export const AI_LINKS = siteData.aiLinks as AiLink[];
export const SOCIAL = siteData.social as NamedLink[];
export const PAYMENTS = siteData.payments as { name: string; logo: string }[];

export const featureBySlug = (slug: string) => FEATURES.find((f) => f.slug === slug);
export const groupTitle = (id: string) => FEATURE_GROUPS.find((g) => g.id === id)?.title ?? "";

// Blog publication dates for structured data
export const ISO_DATES: Record<string, string> = {
  "digitize-hajj-umrah-agency": "2026-10-02", "b2b-agent-credit-limits": "2026-09-24",
  "double-entry-accounting-travel": "2026-09-15", "whatsapp-for-travel-agencies": "2026-09-05",
  "ai-trip-planners": "2026-08-27", "choosing-a-travel-erp": "2026-08-18",
};

export const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
