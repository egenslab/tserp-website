import Link from "next/link";
import { notFound } from "next/navigation";
import { Audiences, BeforeAfter, FactStrip, MarketNotes, Sources, Workflow } from "@/components/FeatureSections";
import HotelShowcase from "@/components/HotelShowcase";
import { Breadcrumb, FaqSection, FeatureCard, Glyph, HeroCtas, Icon, JsonLd, OverviewSection } from "@/components/ui";
import { FEATURES, SITE, featureBySlug, groupTitle } from "@/lib/content";
import { breadcrumbLd, faqLd, pageMeta, type Crumb } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => FEATURES.map((f) => ({ slug: f.slug }));

export async function generateMetadata({ params }: Props) {
  const f = featureBySlug((await params).slug)!;
  return pageMeta({
    title: f.page?.seoTitle ?? `${f.title} — TravelSuite ERP`,
    description: f.page?.metaDescription ?? f.seo.overview[0].slice(0, 160),
    path: `/features/${f.slug}`, keywords: f.seo.keywords,
  });
}

export default async function FeaturePage({ params }: Props) {
  const f = featureBySlug((await params).slug);
  if (!f) notFound();
  const path = `/features/${f.slug}`;
  const crumbs: Crumb[] = [["Home", "/"], ["Features", "/features"], [f.title, null]];
  const related = FEATURES.filter((g) => g.group === f.group && g.slug !== f.slug).slice(0, 3);
  const page = f.page ?? {};
  const capabilities = page.capabilities ?? f.bullets;
  return (
    <>
      <JsonLd data={[
        breadcrumbLd(crumbs, path),
        faqLd(f.seo.faqs),
        {
          "@context": "https://schema.org", "@type": "SoftwareApplication", name: `TravelSuite ERP — ${f.title}`,
          applicationCategory: "BusinessApplication", operatingSystem: "Web", description: f.intro,
          featureList: capabilities,
          offers: { "@type": "Offer", url: `${SITE}/pricing` },
        },
      ]} />
      <section className="page-hero">
        <div className="container detail-hero">
          <div>
            <Breadcrumb items={crumbs} />
            <span className="pill">{groupTitle(f.group)}</span>
            <h1>{page.h1 ?? f.title}</h1>
            <p className="lead">{f.intro}</p>
            <HeroCtas />
          </div>
          <aside className="benefit-card">
            <h2>Why agencies use it</h2>
            <ul>{f.benefits.map((b) => <li key={b}><Icon name="i-check" /><span>{b}</span></li>)}</ul>
          </aside>
        </div>
      </section>
      {page.facts && <FactStrip facts={page.facts} />}
      <OverviewSection title={page.overviewTitle ?? f.title} paragraphs={f.seo.overview} />
      {f.slug === "hotels" && <HotelShowcase />}
      {page.sources && <Sources data={page.sources} alt />}
      <section className={page.sources ? "section" : "section alt"}>
        <div className="container">
          <div className="section-head"><span className="eyebrow">Key capabilities</span><h2>{f.desc}</h2></div>
          <div className="caps">{capabilities.map((b) => <div key={b} className="cap"><Icon name="i-check" /><span>{b}</span></div>)}</div>
        </div>
      </section>
      {page.workflow ? <Workflow data={page.workflow} alt={!!page.sources} /> : (
        <section className="section">
          <div className="container">
            <div className="section-head"><span className="eyebrow">How it works</span><h2>{f.title}</h2></div>
            <ol className="steps three">{f.steps.map((s, i) => <li key={s}><span>{i + 1}</span><h4>{s}</h4></li>)}</ol>
          </div>
        </section>
      )}
      {page.audiences && <Audiences data={page.audiences} />}
      {page.compare && <BeforeAfter data={page.compare} alt />}
      {page.markets && <MarketNotes data={page.markets} />}
      <FaqSection faqs={f.seo.faqs} alt />
      <section className="section">
        <div className="container">
          <div className="connect-strip">
            <span className="m-ico"><Glyph name="i-layers" /></span>
            <div><h3>Works with every TravelSuite module</h3><p>Bookings, customers, payments and accounts stay in one database, so this module shares data with everything else automatically.</p></div>
          </div>
          <div className="related">
            <div className="related-head"><h2>Related features</h2><Link href="/features" className="link-arrow">All features <Icon name="i-arrow" /></Link></div>
            <div className="link-cards">{related.map((g) => <FeatureCard key={g.slug} f={g} />)}</div>
          </div>
        </div>
      </section>
    </>
  );
}
