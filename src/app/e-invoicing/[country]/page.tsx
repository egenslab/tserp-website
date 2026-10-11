import { notFound } from "next/navigation";
import { EI_COUNTRIES, EiFeatures, EiOther, EiShowcase, EiStatus, EiSteps, eiCountry } from "@/components/EInvoice";
import { FaqSection, JsonLd, OverviewSection, PageHero } from "@/components/ui";
import { breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ country: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => EI_COUNTRIES.map((c) => ({ country: c.slug }));

export async function generateMetadata({ params }: Props) {
  const c = eiCountry((await params).country)!;
  return pageMeta({ title: c.seoTitle, description: c.metaDescription, path: `/e-invoicing/${c.slug}` });
}

export default async function EInvoiceCountryPage({ params }: Props) {
  const c = eiCountry((await params).country);
  if (!c) notFound();
  const path = `/e-invoicing/${c.slug}`;
  return (
    <>
      <JsonLd data={[breadcrumbLd([["Home", "/"], ["E-invoicing", "/e-invoicing"], [c.name, null]], path), faqLd(c.faqs)]} />
      <PageHero crumbs={[["Home", "/"], ["E-invoicing", "/e-invoicing"], [c.name, null]]} title={c.title} lead={c.lead} />
      <EiStatus text={c.status} />
      <EiShowcase c={c} />
      <OverviewSection title={c.overviewTitle} paragraphs={c.overview} />
      <EiFeatures c={c} />
      <EiSteps steps={c.steps} eyebrow="How it works" title="What happens to every invoice" />
      <FaqSection faqs={c.faqs} alt />
      <EiOther c={c} />
    </>
  );
}
