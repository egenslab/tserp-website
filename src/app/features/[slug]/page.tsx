import Link from "next/link";
import { notFound } from "next/navigation";
import { Audiences, BeforeAfter, FactStrip, MarketNotes, Sources, Workflow } from "@/components/FeatureSections";
import CrmCompare from "@/components/CrmCompare";
import CrmPipeline from "@/components/CrmPipeline";
import GdsPriority from "@/components/GdsPriority";
import HotelShowcase from "@/components/HotelShowcase";
import { HotelCatalogue, HotelOps, HotelRates } from "@/components/HotelModules";
import { MODULE_SECTIONS } from "@/components/modules";
import { EiCallout } from "@/components/EInvoice";
import { HajjPackages, HajjReadiness, HajjReports } from "@/components/HajjModules";
import { TourBuilder, TourCatalogue, TourPricing } from "@/components/TourModules";
import { TransportScorecard, TransportTrip, TransportVendors } from "@/components/TransportModules";
import VisaFlow from "@/components/VisaFlow";
import { VisaPipeline, VisaReports } from "@/components/VisaModules";
import { Breadcrumb, FaqSection, FeatureCard, Glyph, HeroCtas, Icon, JsonLd, OverviewSection } from "@/components/ui";
import { FEATURES, SITE, featureBySlug, groupTitle } from "@/lib/content";
import { breadcrumbLd, faqLd, pageMeta, type Crumb } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Icons for the generic three-step "How it works" block: set up, work, result
const STEP_ICONS = ["i-layers", "i-spark", "i-rocket"];

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
  const mod = MODULE_SECTIONS[f.slug];
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
      {f.slug === "hotels" && <HotelCatalogue />}
      {f.slug === "hotels" && <HotelRates />}
      {f.slug === "hajj" && <HajjPackages />}
      {f.slug === "hajj" && <HajjReadiness />}
      {mod && <mod.Top1 />}
      {mod && <mod.Top2 />}
      {f.slug === "visa" && <VisaFlow />}
      {f.slug === "visa" && <VisaPipeline />}
      {f.slug === "tours" && <TourBuilder />}
      {f.slug === "tours" && <TourPricing />}
      {f.slug === "transport" && <TransportTrip />}
      {f.slug === "transport" && <TransportVendors />}
      {f.slug === "crm" && <CrmPipeline />}
      {f.slug === "crm" && <CrmCompare />}
      {page.sources && <Sources data={page.sources} alt />}
      {f.slug === "flights" && <GdsPriority />}
      <section className={page.sources ? "section" : "section alt"}>
        <div className="container">
          <div className="caps-wrap">
            <div className="caps-intro">
              <span className="eyebrow">Key capabilities</span>
              <h2>{f.desc}</h2>
              <p className="caps-count"><strong>{capabilities.length}</strong> features included in {f.title}</p>
              <Link href="/contact" className="btn btn-forest">See it in a demo <Icon name="i-arrow" /></Link>
            </div>
            <ul className="caps-list">
              {capabilities.map((b, i) => (
                <li key={b}><span className="caps-n">{String(i + 1).padStart(2, "0")}</span><span>{b}</span><Icon name="i-check" /></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {page.workflow ? <Workflow data={page.workflow} alt={!!page.sources} /> : (
        <section className="section">
          <div className="container">
            <div className="section-head"><span className="eyebrow">How it works</span><h2>{`${f.title} in three simple steps`}</h2></div>
            <ol className="how3">
              {f.steps.map((s, i) => (
                <li key={s} className={i === f.steps.length - 1 ? "how3-step last" : "how3-step"}>
                  <div className="how3-top">
                    <span className="how3-ico"><Glyph name={STEP_ICONS[i] ?? f.icon} /></span>
                    <span className="how3-num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="how3-label">{`Step ${i + 1}`}</span>
                  <h3>{s}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
      {f.slug === "hotels" && <HotelOps />}
      {f.slug === "hajj" && <HajjReports />}
      {mod && <mod.Bottom />}
      {f.slug === "visa" && <VisaReports />}
      {f.slug === "tours" && <TourCatalogue />}
      {f.slug === "transport" && <TransportScorecard />}
      {page.audiences && <Audiences data={page.audiences} />}
      {page.compare && <BeforeAfter data={page.compare} alt />}
      {page.markets && <MarketNotes data={page.markets} />}
      {(f.slug === "finance" || f.slug === "invoices") && <EiCallout />}
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
