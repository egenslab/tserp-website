// Extra sections for the pricing page: plan finder, cloud vs lifetime, go-live timeline and customer proof.
import Link from "next/link";
import { SOLUTIONS } from "@/lib/content";
import { Glyph, Icon } from "./ui";

export function PlanFinder() {
  return (
    <section className="section alt pf">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Which plan fits you</span>
          <h2>Start from the kind of business you run</h2>
          <p>Most agencies of each type start on the plan below. You can upgrade at any time and only pay the difference.</p>
        </div>
        <div className="pf-grid">
          {SOLUTIONS.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className={s.plan === "Business" ? "pf-card biz" : "pf-card"}>
              <span className="pf-ico"><Glyph name={s.icon} /></span>
              <span className="b">{s.title}</span>
              <small>{s.tagline}</small>
              <span className="pf-plan"><small>Start with</small><span className="b" data-no-i18n="">{s.plan}</span></span>
              <span className="pf-go">See how it works <Icon name="i-arrow" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const HOSTING: [string, string, string][] = [
  ["Payment", "Monthly or yearly", "One-time"],
  ["Where it runs", "Our cloud, managed by us", "Your own server"],
  ["Installation", "Included", "Free installation"],
  ["Updates", "Always included", "Lifetime updates"],
  ["Backups & SSL", "Daily backups and SSL included", "Set up and maintained by our team"],
  ["Support", "Included while subscribed", "Included with updates"],
  ["Best for", "Starting fast with a low monthly cost", "A one-time payment, with maintenance and updates done by our team"],
];

export function CloudVsLifetime() {
  return (
    <section className="section alt cl">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Cloud or lifetime license</span>
          <h2>Rent it, or own it</h2>
          <p>Every plan comes in both forms. The features are the same; what changes is how you pay and where the system runs.</p>
        </div>
        <div className="cl-table" role="table" aria-label="Cloud plan compared with lifetime license">
          <div className="cl-row cl-head" role="row">
            <span role="columnheader" />
            <span role="columnheader" className="cl-cloud"><Icon name="i-globe" />Cloud plan</span>
            <span role="columnheader" className="cl-life"><Icon name="i-lock" />Lifetime license</span>
          </div>
          {HOSTING.map(([k, c, l]) => (
            <div key={k} className="cl-row" role="row">
              <span role="rowheader" className="b">{k}</span>
              <span role="cell">{c}</span>
              <span role="cell">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { day: "Day 1", icon: "i-wa", title: "Choose your plan", text: "Pick a plan with our team on WhatsApp and receive your invoice." },
  { day: "Days 1–3", icon: "i-rocket", title: "Setup", text: "Domain, branding, the modules you use and your payment methods are configured." },
  { day: "Days 3–7", icon: "i-file", title: "Import your data", text: "Customers, agents, suppliers and opening balances come in from Excel." },
  { day: "Days 7–10", icon: "i-users", title: "Train your team", text: "Live online sessions for each team, recorded for new joiners." },
  { day: "Days 10–14", icon: "i-check", title: "Go live", text: "Your team works in TravelSuite ERP, with support on WhatsApp." },
];

export function GoLive() {
  return (
    <section className="section gl">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">After you buy</span>
          <h2>Live in 7 to 14 days</h2>
          <p>What happens between choosing a plan and running your agency on it. Larger setups and custom work can take longer.</p>
        </div>
        <ol className="gl-track">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="gl-day">{s.day}</span>
              <span className="gl-dot"><Icon name={s.icon} /></span>
              <span className="gl-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const QUOTES = [
  { quote: "Very satisfied with the admin panel and the front end. You've done phenomenal work for Imigo.", name: "Syed", role: "Founder, Imigo", flag: "gb", place: "United Kingdom", photo: "syed-imigo.jpg" },
  { quote: "Our visa files, flight bookings and accounts now run in one system. Our Dubai team has one clear view of the business.", name: "Golam Kibria", role: "Managing Director, Global Sky Visa", flag: "ae", place: "Dubai, UAE", photo: "globalskyvisa.jpg" },
  { quote: "Guests book our cabins and resorts online, and every room, rate and booking is managed from one dashboard.", name: "Chad Elish", role: "CEO, BrokenBow", flag: "us", place: "Florida, USA" },
];

export function PricingProof() {
  return (
    <section className="section alt pp">
      <div className="container">
        <div className="pp-head">
          <div><span className="eyebrow">From our customers</span><h2>Agencies that made the switch</h2></div>
          <Link href="/success-stories" className="link-arrow">All success stories <Icon name="i-arrow" /></Link>
        </div>
        <div className="pp-grid">
          {QUOTES.map((q) => (
            <figure key={q.name} className="pp-card">
              <span className="pp-stars" aria-label="5 out of 5">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="i-star" />)}</span>
              <blockquote>{q.quote}</blockquote>
              <figcaption>
                {q.photo
                  ? <img className="avatar photo" src={`/assets/img/testimonials/${q.photo}`} alt={q.name} width={46} height={46} loading="lazy" />
                  : <span className="avatar">{q.name[0]}</span>}
                <span>
                  <span className="b">{q.name}</span>
                  <small>{q.role}</small>
                  <small className="pp-loc"><img src={`/assets/img/flags/${q.flag}.svg`} alt={`${q.place} flag`} width={16} height={12} />{q.place}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
