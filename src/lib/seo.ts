import type { Metadata } from "next";
import { SITE, SOCIAL, type Faq } from "./content";

type PageMeta = { title: string; description: string; path: string; keywords?: string; image?: string; article?: boolean };

/** Page metadata with canonical URL and Open Graph / Twitter cards. */
export function pageMeta({ title, description, path, keywords, image = "/assets/img/logo.png", article }: PageMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    keywords: keywords || undefined,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [image], type: article ? "article" : "website", siteName: "TravelSuite ERP" },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export type Crumb = [label: string, href: string | null];

export function breadcrumbLd(items: Crumb[], current: string) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map(([name, href], i) => ({
      "@type": "ListItem", position: i + 1, name, item: SITE + (href ?? current),
    })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export const ORG_LD = {
  "@context": "https://schema.org", "@type": "Organization", name: "TravelSuite ERP", url: SITE + "/",
  logo: SITE + "/assets/img/logo.png",
  parentOrganization: { "@type": "Organization", name: "Egens Lab Limited" },
  sameAs: SOCIAL.filter((s) => !s.url.includes("wa.me")).map((s) => s.url),
  contactPoint: {
    "@type": "ContactPoint", telephone: "+8801325277120", contactType: "sales", email: "info@travelsuiteerp.com",
    areaServed: ["BD", "MY", "SA", "AE", "QA", "KW", "OM", "BH", "US"], availableLanguage: ["English", "Bengali"],
  },
  address: ["US", "MY", "BD"].map((c) => ({ "@type": "PostalAddress", addressCountry: c })),
};
