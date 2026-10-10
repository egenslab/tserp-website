import type { ReactNode } from "react";
import { Breadcrumb, Icon } from "./ui";
import { EMAIL, LEGAL, WA } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const doc = (slug: string) => LEGAL.find((d) => d.slug === slug)!;

export const legalMeta = (slug: string) => {
  const d = doc(slug);
  return pageMeta({ title: `${d.title} — TravelSuite ERP`, description: d.intro, path: `/${slug}` });
};

/** Renders a section's blocks: "- " lines become a list, "### " lines a sub-heading, anything else a paragraph. */
function Blocks({ items }: { items: string[] }) {
  const out: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { out.push(<ul key={`l${out.length}`}>{list.map((x) => <li key={x}>{x}</li>)}</ul>); list = []; } };
  for (const x of items) {
    if (x.startsWith("- ")) { list.push(x.slice(2)); continue; }
    flush();
    out.push(x.startsWith("### ") ? <h3 key={x}>{x.slice(4)}</h3> : <p key={x}>{x}</p>);
  }
  flush();
  return <>{out}</>;
}

/** Terms, privacy and refund policy pages. */
export default function LegalPage({ slug }: { slug: string }) {
  const d = doc(slug);
  return (
    <>
      <section className="page-hero legal-hero">
        <div className="container">
          <Breadcrumb items={[["Home", "/"], ["Legal", null], [d.title, null]]} />
          <h1>{d.title}</h1>
          <p className="lead">{d.intro}</p>
          <p className="updated">Last updated: {d.updated}</p>
        </div>
      </section>
      <section className="section">
        <div className="container legal-grid">
          <aside className="legal-toc" aria-label="On this page">
            <p className="fnav-group">On this page</p>
            {d.sections.map(([heading], i) => <a key={heading} href={`#s${i + 1}`}>{heading}</a>)}
          </aside>
          <div className="legal-body">
            <div className="legal-key">
              <h2>Key points</h2>
              <ul>{d.keyPoints.map((k) => <li key={k}><Icon name="i-check" /><span>{k}</span></li>)}</ul>
              <p>This summary is for convenience. The full text below is what applies.</p>
            </div>
            {d.sections.map(([heading, blocks], i) => (
              <section key={heading} id={`s${i + 1}`}>
                <h2>{heading}</h2>
                <Blocks items={blocks} />
              </section>
            ))}
            <div className="legal-contact">
              <h3>Questions about this policy?</h3>
              <p>Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or message us on WhatsApp at +880 13 2527 7120 and our team will help.</p>
              <a href={WA} target="_blank" rel="noopener" className="btn btn-forest"><Icon name="i-wa" className="ic fill" />Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
