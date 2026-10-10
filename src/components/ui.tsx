// Small shared building blocks used across pages.
import Link from "next/link";
import { Fragment } from "react";
import type { Crumb } from "@/lib/seo";
import type { Faq, Feature, Post, Solution, Story } from "@/lib/content";
import WaPill from "./WaPill";

export function Icon({ name, className = "ic" }: { name: string; className?: string }) {
  return <svg className={className}><use href={`#${name}`} /></svg>;
}

/** Bare sprite icon, sized by its container (.m-ico, .mi, .hero-ico …) */
export function Glyph({ name }: { name: string }) {
  return <svg><use href={`#${name}`} /></svg>;
}

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map(([label, href], i) => (
        <Fragment key={i}>
          {i > 0 && <span className="sep">/</span>}
          {href ? <Link href={href}>{label}</Link> : <span aria-current={i === items.length - 1 ? "page" : undefined}>{label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}

export function HeroCtas() {
  return (
    <div className="hero-ctas">
      <Link href="/contact" className="btn btn-lime btn-lg">Request a demo <Icon name="i-arrow" /></Link>
      <WaPill />
    </div>
  );
}

export function FaqList({ faqs, openFirst = false }: { faqs: Faq[]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {faqs.map(([q, a], i) => (
        <details key={q} open={openFirst && i === 0}><summary>{q}</summary><p>{a}</p></details>
      ))}
    </div>
  );
}

export function FaqSection({ faqs, title = "Frequently asked questions", alt = false }: { faqs: Faq[]; title?: string; alt?: boolean }) {
  return (
    <section className={alt ? "section alt" : "section"} id="faq">
      <div className="container narrow">
        <div className="section-head"><span className="eyebrow">FAQ</span><h2>{title}</h2></div>
        <FaqList faqs={faqs} openFirst />
      </div>
    </section>
  );
}

export function OverviewSection({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="section overview">
      <div className="container narrow">
        <span className="eyebrow">Overview</span>
        <h2>{title}</h2>
        <div className="prose">{paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
      </div>
    </section>
  );
}

export function FeatureCard({ f }: { f: Feature }) {
  return (
    <Link className="link-card" href={`/features/${f.slug}`}>
      <span className="m-ico dark sm"><Glyph name={f.icon} /></span>
      <span><b>{f.title}</b><small>{f.desc}</small></span>
      <Icon name="i-arrow" className="ic go" />
    </Link>
  );
}

export function SolutionCard({ s }: { s: Solution }) {
  return (
    <Link className="solution-card" href={`/solutions/${s.slug}`}>
      <span className="m-ico dark"><Glyph name={s.icon} /></span>
      <h3>{s.title}</h3>
      <p>{s.tagline}</p>
      <span className="link-arrow">Explore solution <Icon name="i-arrow" /></span>
    </Link>
  );
}

export function SuccessCard({ st }: { st: Story }) {
  const shot = (
    <>
      <span className="sm-bar"><i /><i /><i /><span>{st.url}</span></span>
      <img src={`/assets/img/success/${st.shot}.jpg`} alt={`${st.url} website`} loading="lazy" width={960} height={600} />
    </>
  );
  return (
    <article className="success-card">
      {st.website
        ? <a className="site-shot" href={st.website} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">{shot}</a>
        : <div className="site-shot">{shot}</div>}
      <div className="success-body">
        <h3>
          {st.website
            ? <a href={st.website} target="_blank" rel="noopener">{st.type} <Icon name="i-external" className="ic ext" /></a>
            : st.type}
        </h3>
        <p className="loc">
          {st.flag ? <img className="loc-flag" src={`/assets/img/flags/${st.flag}.svg`} alt="" width={20} height={15} /> : <Icon name="i-pin" />}
          {st.location}
        </p>
        <div className="mini-chips">{st.chips.map((c) => <span key={c}>{c}</span>)}</div>
        <p className="metric"><Icon name="i-trend" />{st.metric}</p>
      </div>
    </article>
  );
}

export function PostMeta({ p, light = false, author = false }: { p: Post; light?: boolean; author?: boolean }) {
  return (
    <p className={light ? "post-meta light" : "post-meta"}>
      {author && <><span>TravelSuite Team</span><span className="dotsep" /></>}
      <span>{p.date}</span><span className="dotsep" /><span>{p.read}</span> <span>min read</span>
    </p>
  );
}

export function PostCard({ p, featured = false, hidden = false }: { p: Post; featured?: boolean; hidden?: boolean }) {
  const href = `/blog/${p.slug}`;
  return (
    <article className={featured ? "post-card featured-post" : "post-card"} hidden={hidden}>
      <Link href={href} className="post-cover" style={{ "--c": p.color }} tabIndex={-1} aria-hidden="true">
        <Glyph name={p.icon} /><span className="cover-chip">{p.cat}</span>
      </Link>
      <div className="post-body">
        {featured && <span className="feat-chip">Featured article</span>}
        <PostMeta p={p} />
        <h3><Link href={href}>{p.title}</Link></h3>
        <p>{p.excerpt}</p>
        <Link href={href} className="link-arrow">Read article <Icon name="i-arrow" /></Link>
      </div>
    </article>
  );
}

export function PageHero({ crumbs, title, lead, children, className = "page-hero" }:
  { crumbs: Crumb[]; title: React.ReactNode; lead?: string; children?: React.ReactNode; className?: string }) {
  return (
    <section className={className}>
      <div className="container">
        <Breadcrumb items={crumbs} />
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
