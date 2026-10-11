// E-invoicing pages (/e-invoicing and /e-invoicing/[country]), driven by src/content/einvoice.json.
import Link from "next/link";
import data from "@/content/einvoice.json";
import { Glyph, Icon } from "./ui";

type Step = { icon?: string; title: string; text: string };
type Item = { icon: string; title: string; text: string };
export type EiCountry = {
  slug: string; flag: string; name: string; short: string; seoTitle: string; metaDescription: string;
  title: string; lead: string; cardText: string; overviewTitle: string; status: string; facts: { value: string; label: string }[]; overview: string[];
  providers: { icon: string; name: string; text: string }[]; features: Item[]; steps: Step[];
  mock: { currency: string; rows: string[][]; idLabel: string; id: string; authority: string };
  faqs: [string, string][];
};
export const EI_HUB = data.hub as { seoTitle: string; metaDescription: string; title: string; lead: string; status: string; steps: Step[]; faqs: [string, string][] };
export const EI_COUNTRIES = data.countries as EiCountry[];
export const eiCountry = (slug: string) => EI_COUNTRIES.find((c) => c.slug === slug);

/** Roll-out note: these connections are being added country by country. */
export function EiStatus({ text }: { text: string }) {
  return (
    <div className="container">
      <p className="ei-status"><span className="ei-status-dot" aria-hidden="true" /><span className="b">Rolling out</span>{text}</p>
    </div>
  );
}

/** Country picker on the hub page. */
export function EiCountryCards() {
  return (
    <section className="section ei-countries">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Choose your country</span>
          <h2>Built for each country's rules</h2>
          <p>Every country has its own e-invoice format, tax system and deadlines. Each guide explains how TravelSuite ERP handles yours.</p>
        </div>
        <div className="ei-cc-grid">
          {EI_COUNTRIES.map((c) => (
            <article key={c.slug} className="ei-cc">
              <img className="ei-cc-flag" src={`/assets/img/flags/${c.flag}.svg`} alt={`${c.name} flag`} width={56} height={42} />
              <span className="ei-cc-tag">{c.short}</span>
              <h3><Link href={`/e-invoicing/${c.slug}`} className="card-link">{c.name}</Link></h3>
              <p>{c.cardText}</p>
              <ul>{c.features.slice(0, 4).map((f) => <li key={f.title}><Icon name="i-check" />{f.title}</li>)}</ul>
              <span className="link-arrow" aria-hidden="true">Read the guide <Icon name="i-arrow" /></span>
            </article>
          ))}
        </div>
        <p className="ei-plan-note"><Icon name="i-award" />E-invoicing is included in the Business plan. <Link href="/pricing">See pricing</Link></p>
        <p className="ei-plan-note ei-plan-sub">Qatar, Kuwait and Bahrain have not introduced national e-invoicing yet. We will add them when they do.</p>
      </div>
    </section>
  );
}

/** Numbered flow, used on the hub (with icons) and on each country page. */
export function EiSteps({ steps, title, eyebrow, alt = false }: { steps: Step[]; title: string; eyebrow: string; alt?: boolean }) {
  return (
    <section className={alt ? "section alt ei-steps-sec" : "section ei-steps-sec"}>
      <div className="container">
        <div className="section-head"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
        <ol className="ei-steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="ei-step-n">{s.icon ? <Icon name={s.icon} /> : String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Key facts strip and the example e-invoice screen for a country. */
export function EiShowcase({ c }: { c: EiCountry }) {
  const tone = { ok: "ei-ok", wait: "ei-wait", err: "ei-err" } as Record<string, string>;
  return (
    <section className="section ei-show">
      <div className="container">
        <ul className="ei-facts">
          {c.facts.map((f) => <li key={f.label}><span className="b">{f.value}</span><small>{f.label}</small></li>)}
        </ul>
        <div className="ei-mock" aria-label="Example e-invoice screen">
          <div className="ei-mock-bar">
            <span className="ei-mock-title"><Icon name="i-receipt" />E-invoices</span>
            <span className="ei-mock-auth" data-no-i18n="">{c.mock.authority}</span>
          </div>
          <div className="ei-mock-body">
            <div className="ei-table-wrap">
              <table className="ei-table">
                <thead><tr><th>Document</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  {c.mock.rows.map(([doc, cust, amt, st, label]) => (
                    <tr key={doc}>
                      <td data-no-i18n="">{doc}</td>
                      <td>{cust}</td>
                      <td className="ei-amt"><span data-no-i18n="">{c.mock.currency} {amt}</span></td>
                      <td><span className={`ei-st ${tone[st]}`}><i />{label}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ei-doc">
              <span className="ei-doc-h">Invoice <span data-no-i18n="">{c.mock.rows[0][0]}</span></span>
              <span className="ei-st ei-ok"><i />{c.mock.rows[0][4]}</span>
              <dl>
                <div><dt>{c.mock.idLabel}</dt><dd data-no-i18n="">{c.mock.id}</dd></div>
                <div><dt>Total</dt><dd data-no-i18n="">{c.mock.currency} {c.mock.rows[0][2]}</dd></div>
              </dl>
              <span className="ei-qr" aria-hidden="true">{Array.from({ length: 49 }, (_, i) => <i key={i} className={(i * 7 + (i % 5) * 3) % 3 ? "on" : undefined} />)}</span>
            </div>
          </div>
          <p className="ei-mock-note">Example data.</p>
        </div>
      </div>
    </section>
  );
}

/** Feature grid and connection options for a country. */
export function EiFeatures({ c }: { c: EiCountry }) {
  return (
    <section className="section alt ei-feat">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">What's included</span>
          <h2>Everything your e-invoices need</h2>
        </div>
        <div className="ei-feat-grid">
          {c.features.map((f) => (
            <div key={f.title} className="ei-feat-card">
              <span className="m-ico"><Glyph name={f.icon} /></span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
        <div className="ei-prov">
          <div className="ei-prov-head">
            <span className="eyebrow">Connection options</span>
            <h3>Connect the way your business prefers</h3>
          </div>
          <ul>
            {c.providers.map((p) => (
              <li key={p.name}>
                <span className="ei-prov-ico"><Icon name={p.icon} /></span>
                <span><span className="b">{p.name}</span><small>{p.text}</small></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Links to the other countries' guides at the bottom of a country page. */
export function EiOther({ c }: { c: EiCountry }) {
  return (
    <section className="section ei-other">
      <div className="container">
        <p className="ei-other-h">E-invoicing in other countries</p>
        <div className="ei-other-grid">
          {EI_COUNTRIES.filter((x) => x.slug !== c.slug).map((o) => (
            <Link key={o.slug} href={`/e-invoicing/${o.slug}`} className="ei-other-card">
              <img src={`/assets/img/flags/${o.flag}.svg`} alt={`${o.name} flag`} width={40} height={30} />
              <span><small>{o.short}</small><span className="b">{o.name}</span></span>
              <Icon name="i-arrow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Callout on the Finance and Invoice feature pages. */
export function EiCallout() {
  return (
    <section className="section ei-callout-sec">
      <div className="container">
        <div className="ei-callout">
          <span className="ei-callout-ico"><Icon name="i-shield" /></span>
          <div>
            <h2>E-invoicing in eight countries</h2>
            <p>On the Business plan, invoices and credit notes become e-invoices for the tax system of your country, from ZATCA in Saudi Arabia to MyInvois in Malaysia.</p>
          </div>
          <div className="ei-callout-links">
            {EI_COUNTRIES.map((c) => (
              <Link key={c.slug} href={`/e-invoicing/${c.slug}`} className="ei-chip">
                <img src={`/assets/img/flags/${c.flag}.svg`} alt={`${c.name} flag`} width={20} height={15} />{c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
