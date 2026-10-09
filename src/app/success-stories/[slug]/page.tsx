import Link from "next/link";
import { notFound } from "next/navigation";
import SuccessGrid from "@/components/SuccessGrid";
import { Breadcrumb, FeatureCard, Icon, JsonLd } from "@/components/ui";
import { SUCCESS, featureBySlug } from "@/lib/content";
import { breadcrumbLd, pageMeta, type Crumb } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const storyBySlug = (slug: string) => SUCCESS.find((s) => s.slug === slug);

export const dynamicParams = false;
export const generateStaticParams = () => SUCCESS.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props) {
  const st = storyBySlug((await params).slug)!;
  return pageMeta({
    title: `${st.headline} — TravelSuite ERP`, description: st.intro,
    path: `/success-stories/${st.slug}`, image: `/assets/img/success/${st.shot}.jpg`,
  });
}

export default async function StoryPage({ params }: Props) {
  const st = storyBySlug((await params).slug);
  if (!st) notFound();
  const crumbs: Crumb[] = [["Home", "/"], ["Success stories", "/success-stories"], [st.type, null]];
  const initials = st.person.split(/\s+/).slice(0, 2).map((w) => w[0]).join("");
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs, `/success-stories/${st.slug}`)} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={crumbs} />
          <span className="pill">Success story</span>
          <h1 className="story-title">{st.headline}</h1>
          <p className="lead">{st.intro}</p>
          <dl className="story-facts">
            <div><dt>Business type</dt><dd>{st.type}</dd></div>
            <div><dt>Location</dt><dd>{st.location}</dd></div>
            <div><dt>Time to go live</dt><dd>{st.golive}</dd></div>
            <div><dt>Website</dt><dd>{st.url}</dd></div>
          </dl>
        </div>
      </section>
      <section className="section story-shot-wrap">
        <div className="container">
          <figure className="story-shot">
            <div className="sm-bar"><i /><i /><i /><span>{st.url}</span></div>
            <img src={`/assets/img/success/${st.shot}.jpg`} alt="" width={960} height={600} />
          </figure>
          <div className="story-results">
            {st.results.map(([v, label]) => <div key={label} className="result-card"><strong>{v}</strong><span>{label}</span></div>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container story-grid">
          <div className="story-block">
            <span className="eyebrow">The challenge</span>
            <p className="prose-lg">{st.challenge}</p>
          </div>
          <div className="story-block">
            <span className="eyebrow">The solution</span>
            <ul className="story-list">{st.solution.map((x) => <li key={x}><Icon name="i-check" /><span>{x}</span></li>)}</ul>
          </div>
        </div>
        <div className="container narrow">
          <figure className="t-card t-featured story-quote">
            <div className="stars" aria-label="5 out of 5">{[1, 2, 3, 4, 5].map((i) => <svg key={i}><use href="#i-star" /></svg>)}</div>
            <blockquote>{st.quote}</blockquote>
            <figcaption>
              <span className="avatar">{initials}</span>
              <span><b>{st.person}</b><small><span>{st.type}</span>, <span>{st.location}</span></small></span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <div className="related-head"><h2>Modules used</h2><Link href="/features" className="link-arrow">All features <Icon name="i-arrow" /></Link></div>
          <div className="link-cards">{st.modules.map((m) => <FeatureCard key={m} f={featureBySlug(m)!} />)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="related-head"><h2>More success stories</h2><Link href="/success-stories" className="link-arrow">All success stories <Icon name="i-arrow" /></Link></div>
          <div className="success-grid"><SuccessGrid exclude={st.slug} /></div>
        </div>
      </section>
    </>
  );
}
