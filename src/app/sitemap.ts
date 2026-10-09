import type { MetadataRoute } from "next";
import { FEATURES, POSTS, SITE, SOLUTIONS } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const main = ["/", "/features", "/solutions", "/pricing", "/success-stories", "/blog", "/about", "/affiliate", "/contact"];
  const paths = [
    ...main,
    ...FEATURES.map((f) => `/features/${f.slug}`),
    ...SOLUTIONS.map((s) => `/solutions/${s.slug}`),
    ...POSTS.map((p) => `/blog/${p.slug}`),
    "/terms", "/privacy", "/refund",
  ];
  return paths.map((p) => ({
    url: SITE + p,
    changeFrequency: p === "/" || p.startsWith("/blog") ? "weekly" : "monthly",
  }));
}
