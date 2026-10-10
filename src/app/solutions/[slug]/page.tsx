import Link from "next/link";
import { notFound } from "next/navigation";
import { FactStrip } from "@/components/FeatureSections";
import { SolJourney, SolPairs, SolRoles, SolStory } from "@/components/SolutionSections";
import { Breadcrumb, FaqSection, FeatureCard, Glyph, HeroCtas, Icon, JsonLd, OverviewSection } from "@/components/ui";
import { SOLUTIONS, featureBySlug } from "@/lib/content";
import { breadcrumbLd, faqLd, pageMeta, type Crumb } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const solutionBySlug = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);

export const dynamicParams = false;
export const generateStaticParams = () => SOLUTIONS.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props) {
  const s = solutionBySlug((await params).slug)!;
  return pageMeta({
    title: s.seoTitle ?? `${s.title} — TravelSuite ERP`, description: s.metaDescription ?? s.seo.overview[0].slice(0, 160),
    path: `/solutions/${s.slug}`, keywords: s.seo.keywords,
  });
}

export default async function SolutionPage({ params }: Props) {
  const s = solutionBySlug((await params).slug);
  if (!s) notFound();
  const crumbs: Crumb[] = [["Home", "/"], ["Solutions", "/solutions"], [s.title, null]];
  return (
    <>
      <JsonLd data={[breadcrumbLd(crumbs, `/solutions/${s.slug}`), faqLd(s.seo.faqs)]} />
      <section className="page-hero">
        <div className="container detail-hero">
          <div>
            <Breadcrumb items={crumbs} />
            <span className="pill">{s.title}</span>
            <h1>{s.headline}</h1>
            <p className="lead">{s.intro}</p>
            <HeroCtas />
          </div>
          <aside className="benefit-card plan-hint">
            <span className="m-ico"><Glyph name={s.icon} /></span>
            <h2>{s.title}</h2>
            <p>{s.tagline}</p>
            <div className="plan-pill"><small>Recommended plan</small><span className="b">{s.plan}</span></div>
            <Link href="/pricing" className="link-arrow light">See plan details <Icon name="i-arrow" /></Link>
          </aside>
        </div>
      </section>
      <FactStrip facts={s.facts} />
      <OverviewSection title={s.overviewTitle} paragraphs={s.seo.overview} />
      <SolPairs pairs={s.pairs} title={s.title} />
      <SolJourney steps={s.journey} />
      <SolRoles roles={s.roles} />
      {s.story && <SolStory story={s.story} />}
      <section className={s.story ? "section alt" : "section"}>
        <div className="container">
          <div className="related-head"><h2>Recommended modules</h2><Link href="/features" className="link-arrow">All features <Icon name="i-arrow" /></Link></div>
          <div className="link-cards">{s.modules.map((m) => <FeatureCard key={m} f={featureBySlug(m)!} />)}</div>
        </div>
      </section>
      <FaqSection faqs={s.seo.faqs} alt={!s.story} />
      <section className={s.story ? "section alt" : "section"}>
        <div className="container">
          <div className="os-head">
            <div><span className="eyebrow">Other solutions</span><h2>Built for every kind of travel business</h2></div>
            <Link href="/solutions" className="link-arrow">All solutions <Icon name="i-arrow" /></Link>
          </div>
          <div className="os-grid">
            {SOLUTIONS.filter((o) => o.slug !== s.slug).map((o) => (
              <Link key={o.slug} href={`/solutions/${o.slug}`} className="os-card">
                <span className="os-ico"><Glyph name={o.icon} /></span>
                <span className="b">{o.title}</span>
                <small>{o.tagline}</small>
                <span className="os-go">Explore <Icon name="i-arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
