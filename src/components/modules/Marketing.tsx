// Marketing page: campaign email preview with engagement, audience from customer data, and sender rotation.
// Marketing is a premium add-on described as "targeted email campaigns and engagement tracking".
// Sender rotation follows the Communication settings ("campaigns can rotate healthy accounts within their limits").
import { Icon } from "../ui";

const STATS = [
  { k: "Sent", v: "2,000", pct: 100 },
  { k: "Opened", v: "860", pct: 43 },
  { k: "Clicked", v: "180", pct: 9 },
];
// opens per 6-hour slot after sending (relative heights)
const OPEN_CURVE = [90, 70, 38, 26, 18, 14, 10, 8];

export function MarketingTop1() {
  return (
    <section className="section alt mk-mail">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Email campaigns</span>
          <h2>Write the offer, send it, see who engaged</h2>
          <p>A campaign is one email to one audience. Promote a package, a season or a visa opening, then follow how many people opened it and clicked through.</p>
        </div>
        <div className="mk-mail-grid">
          <div className="mk-client">
            <div className="mk-env">
              <div><span>From</span><span className="b">Sky Travels</span><em>offers@skytravels.example</em></div>
              <div><span>To</span><span className="mk-aud"><Icon name="i-users" /> Past Umrah travellers</span></div>
              <div><span>Subject</span><span className="b">Umrah season seats are open</span></div>
            </div>
            <div className="mk-body">
              <div className="mk-hero">
                <span className="mk-hero-k">Umrah season</span>
                <h3>Book early, travel with the group you trust</h3>
                <p>Limited seats on our next departures.</p>
              </div>
              <div className="mk-items">
                <div><Icon name="i-kaaba" /><span><span className="b">14-day Umrah</span><small>From $1,450</small></span></div>
                <div><Icon name="i-plane" /><span><span className="b">Flights and visa</span><small>Handled by our team</small></span></div>
              </div>
              <span className="mk-cta">See packages <Icon name="i-arrow" /></span>
            </div>
          </div>
          <aside className="mk-stats">
            <h3><Icon name="i-chart" /> Campaign engagement</h3>
            <ul className="mk-gauges">
              {STATS.map((s) => (
                <li key={s.k}>
                  <div className="mk-g-top"><span>{s.k}</span><span className="b">{s.v}</span></div>
                  <span className="mk-g-bar"><i style={{ width: `${s.pct}%` }} /></span>
                  <small>{s.pct}% of sent</small>
                </li>
              ))}
            </ul>
            <div className="mk-curve">
              <span className="mk-curve-k">Opens after sending</span>
              <div className="mk-curve-bars" aria-hidden="true">
                {OPEN_CURVE.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
              </div>
              <div className="mk-curve-axis"><span>Send</span><span>+48 h</span></div>
            </div>
          </aside>
        </div>
        <p className="mk-note">Example campaign and numbers.</p>
      </div>
    </section>
  );
}

const RULES = [
  { f: "Customer type", op: "is", v: "Individual" },
  { f: "Status", op: "is", v: "Active" },
  { f: "Tag", op: "includes", v: "Repeat" },
];

export function MarketingTop2() {
  return (
    <section className="section mk-aud-sec">
      <div className="container mk-aud-wrap">
        <div className="mk-aud-copy">
          <span className="eyebrow">Audiences</span>
          <h2>Start from the customers you already have</h2>
          <p>Campaign audiences come from your TravelSuite customer and lead records, so there is no list to export or keep in sync. Narrow it down until the offer fits the people who will receive it.</p>
          <ul className="mk-ideas">
            <li><Icon name="i-users" /> Past travellers ready for another trip</li>
            <li><Icon name="i-target" /> Leads that enquired but did not book</li>
            <li><Icon name="i-building" /> Corporate customers</li>
          </ul>
        </div>
        <div className="mk-builder">
          <div className="mk-rules">
            <div className="mk-rules-head"><Icon name="i-search" /> Audience</div>
            {RULES.map((r, i) => (
              <div key={r.f} className="mk-rule">
                <span className="mk-join">{i === 0 ? "Where" : "And"}</span>
                <span className="mk-f">{r.f}</span>
                <span className="mk-op">{r.op}</span>
                <span className="mk-v">{r.v}</span>
              </div>
            ))}
          </div>
          <div className="mk-rings" role="img" aria-label="Example: 5,000 contacts narrowed to 1,200 matching and 950 with an email address">
            <div className="mk-r1"><span>All customers and leads<span className="b">5,000</span></span></div>
            <div className="mk-r2"><span>Match the conditions<span className="b">1,200</span></span></div>
            <div className="mk-r3"><span>Audience<span className="b">950</span></span></div>
          </div>
        </div>
      </div>
      <div className="container"><p className="mk-note">Example audience. Available filters may differ in your setup.</p></div>
    </section>
  );
}

const SENDERS = [
  { n: "Sender 1", a: "offers@", used: 320, cap: 500, state: "Healthy", cls: "ok" },
  { n: "Sender 2", a: "news@", used: 500, cap: 500, state: "Limit reached", cls: "full" },
  { n: "Sender 3", a: "hello@", used: 180, cap: 500, state: "Healthy", cls: "ok" },
];

export function MarketingBottom() {
  return (
    <section className="section alt mod-after mk-send">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Sending</span>
          <h2>Your own email accounts, shared fairly</h2>
          <p>Campaigns go out through the SMTP sender accounts you add in communication settings. They rotate between healthy accounts within each account&apos;s limits, while transactional mail keeps using the default account.</p>
        </div>
        <div className="mk-relay">
          <div className="mk-src">
            <span className="mk-src-ico"><Icon name="i-mail" /></span>
            <h3>Campaign</h3>
            <p>Umrah season seats are open</p>
            <span className="mk-src-n">950 recipients</span>
          </div>
          <div className="mk-hub" aria-hidden="true">
            <span><Icon name="i-spark" /></span>
            <small>Rotate</small>
          </div>
          <ul className="mk-senders">
            {SENDERS.map((s) => {
              const pct = Math.round((s.used / s.cap) * 100);
              return (
                <li key={s.n} className={`mk-sd ${s.cls}`}>
                  <div className="mk-sd-top">
                    <span className="b">{s.n}</span>
                    <span className="mk-sd-state">{s.state}</span>
                  </div>
                  <small>{s.a}skytravels.example</small>
                  <span className="mk-sd-bar"><i style={{ width: `${pct}%` }} /></span>
                  <small>{s.used} of {s.cap} today</small>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mk-side-notes">
          <div><Icon name="i-shield" /><span><span className="b">Default account</span> is used for transactional mail.</span></div>
          <div><Icon name="i-check" /><span><span className="b">Send test email</span> to check an account before a campaign uses it.</span></div>
        </div>
        <p className="mk-note">Example accounts and limits.</p>
      </div>
    </section>
  );
}
