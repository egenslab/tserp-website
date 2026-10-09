import Link from "next/link";
import { notFound } from "next/navigation";
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
    title: `${s.title} — TravelSuite ERP`, description: s.seo.overview[0].slice(0, 300),
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
            <div className="plan-pill"><small>Recommended plan</small><b>{s.plan}</b></div>
            <Link href="/pricing" className="link-arrow light">See plan details <Icon name="i-arrow" /></Link>
          </aside>
        </div>
      </section>
      <OverviewSection title={s.title} paragraphs={s.seo.overview} />
      <section className="section alt">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Common challenges</span><h2>What slows these businesses down</h2></div>
          <div className="challenges">{s.challenges.map((c) => <div key={c} className="challenge"><Icon name="i-x" /><span>{c}</span></div>)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">How TravelSuite helps</span><h2>Built around your daily work</h2></div>
          <div className="helps">{s.helps.map((h) => <div key={h} className="help"><Icon name="i-check" /><span>{h}</span></div>)}</div>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <div className="related-head"><h2>Recommended modules</h2><Link href="/features" className="link-arrow">All features <Icon name="i-arrow" /></Link></div>
          <div className="link-cards">{s.modules.map((m) => <FeatureCard key={m} f={featureBySlug(m)!} />)}</div>
        </div>
      </section>
      <FaqSection faqs={s.seo.faqs} />
      <section className="section alt">
        <div className="container">
          <div className="other-solutions">
            <h3>Other solutions</h3>
            <div className="chips-row">
              {SOLUTIONS.filter((o) => o.slug !== s.slug).map((o) => (
                <Link key={o.slug} href={`/solutions/${o.slug}`}><Icon name={o.icon} />{o.title}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
