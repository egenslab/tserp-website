// Sections for the solution detail pages, driven by src/content/solutions.json.
import Link from "next/link";
import { SUCCESS, featureBySlug, type Solution } from "@/lib/content";
import { Glyph, Icon } from "./ui";

export function SolPairs({ pairs }: { pairs: Solution["pairs"] }) {
  return (
    <section className="section alt sl-pairs">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Before and after</span>
          <h2>What changes with TravelSuite ERP</h2>
          <p>The everyday problems we hear most often, and how TravelSuite ERP solves each one.</p>
        </div>
        <div className="sl-pair-head" aria-hidden="true"><span>Today</span><span>With TravelSuite ERP</span></div>
        <ol className="sl-pair-list">
          {pairs.map(([before, after], i) => (
            <li key={before}>
              <div className="sl-before"><span className="sl-n">{String(i + 1).padStart(2, "0")}</span><Icon name="i-x" /><span>{before}</span></div>
              <span className="sl-arrow" aria-hidden="true"><Icon name="i-arrow" /></span>
              <div className="sl-after"><Icon name="i-check" /><span>{after}</span></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function SolJourney({ steps }: { steps: Solution["journey"] }) {
  return (
    <section className="section sl-journey">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>One job, start to finish</h2>
          <p>Each step happens in the module that does it best, and they all share the same customer and the same accounts.</p>
        </div>
        <ol className="sl-steps">
          {steps.map((s, i) => {
            const f = featureBySlug(s.module);
            return (
              <li key={s.title}>
                <span className="sl-node">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {f && <Link className="sl-mod" href={`/features/${f.slug}`}><Icon name={f.icon} />{f.title}</Link>}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function SolRoles({ roles }: { roles: Solution["roles"] }) {
  return (
    <section className="section alt sl-roles">
      <div className="container sl-roles-grid">
        <div>
          <span className="eyebrow">Your team</span>
          <h2>Every desk in your office, on one system</h2>
          <p className="muted">Each person works in the same data with what they need in front of them. Nobody waits for a spreadsheet from another desk.</p>
        </div>
        <ul>
          {roles.map((r) => (
            <li key={r.role}>
              <span className="m-ico"><Glyph name={r.icon} /></span>
              <div><h3>{r.role}</h3><p>{r.text}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SolStory({ story }: { story: NonNullable<Solution["story"]> }) {
  const s = SUCCESS.find((x) => x.slug === story.slug);
  if (!s) return null;
  const name = story.name ?? s.url;
  return (
    <section className="section sl-story">
      <div className="container">
        <div className="sl-story-card">
          <a className="sl-shot" href={s.website ?? `https://${s.url}`} target="_blank" rel="noopener">
            <span className="sl-bar"><i /><i /><i /><span>{s.url}</span></span>
            <img src={`/assets/img/success/${s.shot}.jpg`} alt={`${s.url} website built on TravelSuite ERP`} width={960} height={600} loading="lazy" />
          </a>
          <div className="sl-story-body">
            <span className="eyebrow">Customer story</span>
            {story.quote ? <blockquote>{story.quote}</blockquote> : <p className="sl-metric">{s.metric}</p>}
            <div className="sl-who">
              {story.name && (story.photo
                ? <img className="avatar photo" src={`/assets/img/testimonials/${story.photo}`} alt={story.name} width={46} height={46} loading="lazy" />
                : <span className="avatar">{story.name[0]}</span>)}
              <span>
                <span className="b">{name}</span>
                <small>{story.role ? `${story.role} · ` : ""}{s.type}</small>
                <small className="sl-loc">{s.flag && <img src={`/assets/img/flags/${s.flag}.svg`} alt={`${s.location} flag`} width={16} height={12} />}{s.location}</small>
              </span>
            </div>
            <ul className="sl-chips">{s.chips.map((c) => <li key={c}>{c}</li>)}</ul>
            <Link href="/success-stories" className="link-arrow">More success stories <Icon name="i-arrow" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
