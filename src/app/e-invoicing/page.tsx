import { EI_HUB, EiCountryCards, EiSteps } from "@/components/EInvoice";
import { FaqSection, JsonLd, PageHero } from "@/components/ui";
import { breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: EI_HUB.seoTitle, description: EI_HUB.metaDescription, path: "/e-invoicing" });

export default function EInvoicingPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([["Home", "/"], ["E-invoicing", null]], "/e-invoicing"), faqLd(EI_HUB.faqs)]} />
      <PageHero crumbs={[["Home", "/"], ["E-invoicing", null]]} title={EI_HUB.title} lead={EI_HUB.lead} />
      <EiCountryCards />
      <EiSteps steps={EI_HUB.steps} eyebrow="How it works" title="From invoice to e-invoice in four steps" alt />
      <FaqSection faqs={EI_HUB.faqs} />
    </>
  );
}
