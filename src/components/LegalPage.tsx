import { Breadcrumb, Icon } from "./ui";
import { LEGAL, WA } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const doc = (slug: string) => LEGAL.find((d) => d.slug === slug)!;

export const legalMeta = (slug: string) => {
  const d = doc(slug);
  return pageMeta({ title: `${d.title} — TravelSuite ERP`, description: d.intro, path: `/${slug}` });
};

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
          <p className="updated">Last updated: 9 October 2026</p>
        </div>
      </section>
      <section className="section">
        <div className="container legal-grid">
          <aside className="legal-toc" aria-label="On this page">
            <p className="fnav-group">On this page</p>
            {d.sections.map(([heading], i) => <a key={heading} href={`#s${i + 1}`}>{heading}</a>)}
          </aside>
          <div className="legal-body">
            {d.sections.map(([heading, paras], i) => (
              <section key={heading} id={`s${i + 1}`}>
                <h2>{heading}</h2>
                {paras.length === 1 ? <p>{paras[0]}</p> : <ul>{paras.map((x) => <li key={x}>{x}</li>)}</ul>}
              </section>
            ))}
            <div className="legal-contact">
              <h3>Questions about this policy?</h3>
              <p>Message us on WhatsApp at +880 13 2527 7120 and our team will help.</p>
              <a href={WA} target="_blank" rel="noopener" className="btn btn-forest"><Icon name="i-wa" className="ic fill" />Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
