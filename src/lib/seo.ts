import type { Metadata } from "next";
import { MAPS, SITE, SOCIAL, TRUSTPILOT, type Faq } from "./content";

type PageMeta = { title: string; description: string; path: string; keywords?: string; image?: string; imageSize?: [number, number]; imageAlt?: string; article?: boolean };

/** Page metadata with canonical URL and Open Graph / Twitter cards. */
export function pageMeta({ title, description, path, keywords, image = "/assets/img/og-image.png", imageSize = [1200, 630], imageAlt = "TravelSuite ERP", article }: PageMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    keywords: keywords || undefined,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [{ url: image, width: imageSize[0], height: imageSize[1], alt: imageAlt }], type: article ? "article" : "website", siteName: "TravelSuite ERP" },
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
  sameAs: [...SOCIAL.filter((s) => !s.url.includes("wa.me")).map((s) => s.url), TRUSTPILOT],
  hasMap: MAPS,
  contactPoint: {
    "@type": "ContactPoint", telephone: "+8801325277120", contactType: "sales", email: "info@travelsuiteerp.com",
    areaServed: ["BD", "MY", "SA", "AE", "QA", "KW", "OM", "BH", "US"], availableLanguage: ["English", "Bengali"],
  },
  address: ["US", "MY", "BD"].map((c) => ({ "@type": "PostalAddress", addressCountry: c })),
};

/** The product itself, for search engines and AI assistants. Prices: keep in step with components/Plans.tsx. No rating: add one only from real reviews. */
const plan = (name: string, price: number) => ({
  "@type": "Offer", name: `${name} plan, lifetime license`, price, priceCurrency: "USD", url: SITE + "/pricing",
});
export const SOFTWARE_LD = {
  "@context": "https://schema.org", "@type": "SoftwareApplication", name: "TravelSuite ERP", url: SITE + "/",
  applicationCategory: "BusinessApplication", applicationSubCategory: "Travel agency software", operatingSystem: "Web",
  description: "Travel agency software and ERP: GDS flight ticketing, hotels, Hajj & Umrah, visa, tours and transport, a B2B agent portal and B2C booking website, CRM, finance and accounting, HR, AI automation and an omnichannel inbox in one system.",
  featureList: [
    "GDS flight booking and ticketing (Amadeus, Sabre, Travelport, Galileo)", "Hotel booking", "Hajj and Umrah management",
    "Visa processing", "Tour packages", "Transport", "B2B agent portal with commission and payouts", "B2C booking website",
    "CRM and quotations", "Finance and accounting", "HR and help desk", "AI agents and AI trip planner", "WhatsApp, Messenger and Instagram inbox",
  ],
  offers: [plan("Starter", 599), plan("Growth", 799), plan("Business", 1499)],
  publisher: { "@type": "Organization", name: "TravelSuite ERP", url: SITE + "/" },
};
