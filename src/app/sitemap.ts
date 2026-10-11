import type { MetadataRoute } from "next";
import { EI_COUNTRIES } from "@/components/EInvoice";
import { FEATURES, POSTS, SITE, SOLUTIONS } from "@/lib/content";

export const dynamic = "force-static";

/** Blog posts carry their publish date ("2 October 2026"); every other page uses the build date. */
const built = new Date();
const postDate = (d: string) => { const t = new Date(`${d} 12:00 UTC`); return isNaN(t.getTime()) ? built : t; };

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly", lastModified = built) =>
    ({ url: SITE + path, lastModified, changeFrequency, priority });
  return [
    page("/", 1, "weekly"),
    ...["/features", "/solutions", "/pricing"].map((p) => page(p, 0.9, "monthly")),
    ...FEATURES.map((f) => page(`/features/${f.slug}`, 0.8, "monthly")),
    ...SOLUTIONS.map((s) => page(`/solutions/${s.slug}`, 0.8, "monthly")),
    page("/e-invoicing", 0.8, "monthly"),
    ...EI_COUNTRIES.map((c) => page(`/e-invoicing/${c.slug}`, 0.8, "monthly")),
    ...["/success-stories", "/about", "/contact", "/affiliate"].map((p) => page(p, 0.7, "monthly")),
    page("/blog", 0.7, "weekly"),
    ...POSTS.map((p) => page(`/blog/${p.slug}`, 0.6, "monthly", postDate(p.date))),
    ...["/terms", "/privacy", "/refund"].map((p) => page(p, 0.3, "yearly")),
  ];
}
