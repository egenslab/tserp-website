// Extra landing-page sections for feature pages that define `page` in src/content/features.json.
import type { FeaturePage } from "@/lib/content";
import { Glyph, Icon } from "./ui";

type P = Required<FeaturePage>;

function Head({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="section-head"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>;
}

export function FactStrip({ facts }: { facts: P["facts"] }) {
  return (
    <section className="fact-strip" aria-label="At a glance">
      <div className="container">
        <dl className="facts">
          {facts.map((f) => (
            <div key={f.value}>
              <dt>{f.value}</dt>
              {f.logos ? (
                <dd className="fact-logos" aria-label={f.label}>
                  {/* Logo files live in public/assets/img/partners/<name>.svg; replace them with the official artwork */}
                  {f.logos.map((l) => <img key={l} src={`/assets/img/partners/${l}.svg`} alt={l} height={22} />)}
                </dd>
              ) : <dd>{f.label}</dd>}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Sources({ data, alt = false }: { data: P["sources"]; alt?: boolean }) {
  return (
    <section className={alt ? "section alt" : "section"}>
      <div className="container">
        <Head eyebrow={data.eyebrow} title={data.title} />
        <div className="source-grid">
          {data.items.map((s, i) => (
            <article key={s.title} className="source-card" style={{ "--i": i } as React.CSSProperties}>
              <span className="src-ico" aria-hidden="true"><Glyph name={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {s.tags.length > 0 && <div className="source-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Workflow({ data, alt = false }: { data: P["workflow"]; alt?: boolean }) {
  return (
    <section className={alt ? "section alt" : "section"}>
      <div className="container">
        <Head eyebrow={data.eyebrow} title={data.title} />
        <ol className="flow">
          {data.steps.map((s, i) => (
            <li key={s.title}>
              <span className="flow-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Audiences({ data, alt = false }: { data: P["audiences"]; alt?: boolean }) {
  return (
    <section className={alt ? "section alt" : "section"}>
      <div className="container">
        <Head eyebrow={data.eyebrow} title={data.title} />
        <div className="audience-grid">
          {data.items.map((a) => (
            <article key={a.title} className="audience-card">
              <div className="audience-head"><span className="f-ico"><Glyph name={a.icon} /></span><h3>{a.title}</h3></div>
              <ul>{a.items.map((x) => <li key={x}><Icon name="i-check" /><span>{x}</span></li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter({ data, alt = false }: { data: P["compare"]; alt?: boolean }) {
  return (
    <section className={alt ? "section alt" : "section"}>
      <div className="container narrow">
        <Head eyebrow={data.eyebrow} title={data.title} />
        <div className="table-scroll">
          <table className="ba-table">
            <thead><tr><th scope="col"><span className="sr-only">Task</span></th><th scope="col">{data.before}</th><th scope="col" className="ba-after">{data.after}</th></tr></thead>
            <tbody>
              {data.rows.map(([task, before, after]) => (
                <tr key={task}>
                  <th scope="row">{task}</th>
                  <td><Icon name="i-x" className="ic ba-no" /><span>{before}</span></td>
                  <td className="ba-after"><Icon name="i-check" className="ic ba-yes" /><span>{after}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function MarketNotes({ data, alt = false }: { data: P["markets"]; alt?: boolean }) {
  return (
    <section className={alt ? "section alt" : "section"}>
      <div className="container">
        <Head eyebrow={data.eyebrow} title={data.title} />
        <div className="market-notes">
          {data.items.map((m) => (
            <article key={m.title} className="market-note">
              <img src={`/assets/img/flags/${m.flag}.svg`} alt={`${m.title} flag`} width={36} height={27} />
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
