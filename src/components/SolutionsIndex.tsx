// Sections for the /solutions overview page, built from src/content/solutions.json.
import Link from "next/link";
import { SOLUTIONS, SUCCESS, featureBySlug } from "@/lib/content";
import { Glyph, Icon } from "./ui";

/** One rich card per business type: headline, starting modules, a key fact, the usual plan and a customer. */
export function SolutionShowcase() {
  return (
    <section className="section si-show">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Six business types</span>
          <h2>Find the setup that matches your business</h2>
          <p>Each solution starts with the modules that business needs most. The platform underneath is the same, so you can switch on more modules at any time.</p>
        </div>
        <div className="si-grid">
          {SOLUTIONS.map((s, i) => {
            const story = s.story?.quote ? SUCCESS.find((x) => x.slug === s.story!.slug) : undefined;
            const fact = s.facts?.[0];
            return (
              <article key={s.slug} className="si-card">
                <div className="si-top">
                  <span className="si-ico"><Glyph name={s.icon} /></span>
                  <span className="si-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3><Link href={`/solutions/${s.slug}`} className="card-link">{s.title}</Link></h3>
                <p className="si-head">{s.headline}</p>
                <div className="si-mods">
                  <small>Starts with</small>
                  <ul>
                    {s.modules.map((m) => {
                      const f = featureBySlug(m);
                      return f ? <li key={m}><Icon name={f.icon} />{f.title}</li> : null;
                    })}
                  </ul>
                </div>
                <div className="si-foot">
                  {fact && <span className="si-fact"><span className="b">{fact.value}</span><small>{fact.label}</small></span>}
                  <span className="si-plan"><small>Typical plan</small><span className="b">{s.plan}</span></span>
                </div>
                {story && (
                  <span className="si-cust">
                    {story.flag && <img src={`/assets/img/flags/${story.flag}.svg`} alt={`${story.location} flag`} width={18} height={13} />}
                    <span data-no-i18n="">{story.url}</span>
                    <small>Customer</small>
                  </span>
                )}
                <span className="link-arrow" aria-hidden="true">Explore solution <Icon name="i-arrow" /></span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Which modules each business type starts with, as a matrix. */
export function SolutionMatrix() {
  const order = ["flights", "hotels", "hajj", "visa", "tours", "transport", "b2b", "website", "crm", "sales", "invoices", "finance", "expenses", "reports", "tasks", "omnichannel", "ai"];
  const used = order.filter((m) => SOLUTIONS.some((s) => s.modules.includes(m)) && featureBySlug(m));
  return (
    <section className="section alt si-matrix">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Side by side</span>
          <h2>The modules each business starts with</h2>
          <p>Every module is available to every business type. This is where most agencies of each kind begin.</p>
        </div>
        <div className="si-table-wrap" tabIndex={0} aria-label="Modules by business type">
          <table className="si-table">
            <thead>
              <tr>
                <th scope="col">Module</th>
                {SOLUTIONS.map((s) => <th key={s.slug} scope="col"><span className="si-th-ico"><Glyph name={s.icon} /></span>{s.title}</th>)}
              </tr>
            </thead>
            <tbody>
              {used.map((m) => {
                const f = featureBySlug(m)!;
                return (
                  <tr key={m}>
                    <th scope="row"><Icon name={f.icon} />{f.title}</th>
                    {SOLUTIONS.map((s) => (
                      <td key={s.slug}>
                        {s.modules.includes(m)
                          ? <span className="si-yes"><Icon name="i-check" /><span className="sr-only">Included</span></span>
                          : <span className="si-no" aria-hidden="true">·</span>}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const PATH = [
  { icon: "i-chat", title: "Tell us how you sell", text: "Share the services you sell, how many staff you have and where your customers come from." },
  { icon: "i-eye", title: "See it with your own setup", text: "A 30-minute online walkthrough of the solution for your business type, with your services and workflow." },
  { icon: "i-rocket", title: "Go live in 7 to 14 days", text: "We set up your modules, import your data from Excel and train your team." },
];

/** Three steps from choosing a solution to running on it. */
export function SolutionPath() {
  return (
    <section className="section si-path">
      <div className="container">
        <div className="si-path-card">
          <div className="si-path-copy">
            <span className="eyebrow">Getting started</span>
            <h2>Not sure which one fits?</h2>
            <p>Many agencies mix several business types. Tell us how you work and we will show you the setup that fits.</p>
            <Link href="/contact" className="btn btn-lime btn-lg">Request a demo <Icon name="i-arrow" /></Link>
          </div>
          <ol className="si-steps">
            {PATH.map((p, i) => (
              <li key={p.title}>
                <span className="si-step-ico"><Icon name={p.icon} /></span>
                <div>
                  <span className="si-step-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
