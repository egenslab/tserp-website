import einvoice from "@/content/einvoice.json";
import { FEATURE_GROUPS, FEATURES, POSTS, SITE, SOLUTIONS } from "@/lib/content";

// /llms.txt: a plain-text guide to the site for AI assistants (llmstxt.org format). Written at build time from the
// same content as the pages, so new features, solutions and blog posts appear automatically.
export const dynamic = "force-static";

const link = (title: string, path: string, note: string) => `- [${title}](${SITE}${path}): ${note}`;

export function GET() {
  const lines = [
    "# TravelSuite ERP",
    "",
    "> Travel agency software and ERP for travel agencies, online travel agencies (OTAs), Hajj and Umrah operators, " +
      "B2B consolidators, tour operators and corporate travel desks. One system for GDS flight ticketing (Amadeus, Sabre, " +
      "Travelport, Galileo), hotels, Hajj and Umrah, visa, tours and transport, a B2B agent portal and B2C booking website, " +
      "CRM, finance and accounting, HR, AI automation and a WhatsApp, Messenger and Instagram inbox.",
    "",
    "TravelSuite ERP is a division of Egens Lab Limited, with offices in the USA, Malaysia and Bangladesh, and serves agencies " +
      "in Bangladesh, Malaysia, Indonesia, the Gulf (Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain), Egypt, Jordan, Türkiye, the UK and the USA. " +
      "Plans are one-time lifetime licences with free installation and lifetime updates: Starter $599, " +
      "Growth $799, Business $1,499, Enterprise custom. Most agencies go live in 7 to 14 days. GDS API integration is part of the Enterprise plan. " +
      "E-invoicing for 8 countries is being added on the Business plan. The website is available in English, Arabic, Bangla, Chinese, " +
      "Indonesian, Malay, Thai, Turkish and Urdu.",
    "",
    "## Solutions",
    ...SOLUTIONS.map((s) => link(s.title, `/solutions/${s.slug}`, s.metaDescription ?? s.title)),
    ...FEATURE_GROUPS.flatMap((g) => [
      "",
      `## ${g.title}`,
      ...FEATURES.filter((f) => f.group === g.id).map((f) => link(f.title, `/features/${f.slug}`, f.desc)),
    ]),
    "",
    "## E-invoicing",
    link("E-invoicing", "/e-invoicing", einvoice.hub.metaDescription),
    ...einvoice.countries.map((c) => link(c.title, `/e-invoicing/${c.slug}`, c.metaDescription)),
    "",
    "## Guides",
    ...POSTS.map((p) => link(p.title, `/blog/${p.slug}`, p.metaDescription ?? p.excerpt)),
    "",
    "## Company",
    link("Pricing", "/pricing", "Plans, yearly discount, lifetime licence and what is included."),
    link("Success stories", "/success-stories", "Agency websites built on TravelSuite ERP."),
    link("Contact", "/contact", "Request a demo; the team replies within one business day."),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
