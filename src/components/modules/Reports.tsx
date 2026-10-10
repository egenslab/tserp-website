// Reports & Analytics page: report library, sales funnel with channel mix, and profit bridge with forecast.
// Based on the analytics screens (Dashboard Analytics, Sales, Booking, Customer, Revenue, Staff Performance)
// and the per-module report pages. All figures shown are fictional examples.
import { Icon } from "../ui";

const LIBRARY = [
  {
    g: "Business analytics", icon: "i-chart", open: true,
    items: ["Dashboard analytics", "Sales report", "Booking report", "Customer report", "Revenue report", "Staff performance"],
  },
  { g: "Finance", icon: "i-wallet", items: ["Profit & loss report"] },
  {
    g: "Module reports", icon: "i-layers",
    items: ["CRM", "Visa", "Hajj & Umrah", "Conversations", "Support tickets", "Tasks", "HRM", "Agent performance", "Vendor performance"],
  },
];
const SALES_PARTS = [
  { icon: "i-target", t: "Sales funnel", s: "Enquiry to paid booking, stage by stage" },
  { icon: "i-users", t: "Sales channel mix", s: "Direct, agent network and online" },
  { icon: "i-trend", t: "Month-on-month comparison", s: "Gross sales, net revenue, conversion" },
  { icon: "i-award", t: "Top performing packages", s: "Units sold, revenue, margin and trend" },
];

export function ReportsTop1() {
  return (
    <section className="section alt rp-lib">
      <div className="container rp-lib-wrap">
        <div className="rp-lib-copy">
          <span className="eyebrow">Report library</span>
          <h2>Business reports and module reports in one place</h2>
          <p>Six analytics reports look across the whole agency. Each module adds its own report page, so visa, pilgrimage, CRM, support and HR teams get numbers that match their work.</p>
          <ul className="rp-facts">
            <li><span className="b">Period selector</span> and <span className="b">Export</span> on analytics reports</li>
            <li><span className="b">From / to filters</span> and CSV export on module reports</li>
            <li><span className="b">Staff performance</span> across bookings, leads, tasks and tickets</li>
          </ul>
        </div>
        <div className="rp-explorer">
          <nav className="rp-tree" aria-label="Report library example">
            {LIBRARY.map((f) => (
              <div key={f.g} className={f.open ? "rp-folder open" : "rp-folder"}>
                <div className="rp-folder-name"><Icon name={f.icon} /><span>{f.g}</span><em>{f.items.length}</em></div>
                <ul>
                  {f.items.map((r, i) => <li key={r} className={f.open && i === 1 ? "on" : ""}>{r}</li>)}
                </ul>
              </div>
            ))}
          </nav>
          <div className="rp-pane">
            <div className="rp-pane-head">
              <div>
                <span className="rp-kicker">Sales analytics</span>
                <h3>Sales report</h3>
              </div>
              <div className="rp-pane-act">
                <span className="rp-month"><Icon name="i-calendar" /> This month</span>
                <span className="rp-export"><Icon name="i-external" /> Export</span>
              </div>
            </div>
            <div className="rp-kpis">
              <div><small>Gross sales</small><span className="b">$84,000</span><em className="up">+12%</em></div>
              <div><small>Paid bookings</small><span className="b">120</span><em className="up">+8%</em></div>
              <div><small>Conversion</small><span className="b">14%</span><em className="up">+1 pt</em></div>
              <div><small>Avg deal size</small><span className="b">$700</span><em className="dn">-2%</em></div>
            </div>
            <ul className="rp-parts">
              {SALES_PARTS.map((p) => (
                <li key={p.t}><span className="rp-pi"><Icon name={p.icon} /></span><div><span className="b">{p.t}</span><small>{p.s}</small></div></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container"><p className="rp-note">Example data.</p></div>
    </section>
  );
}

const FUNNEL = [
  { t: "Enquiries", v: 1000 },
  { t: "Quotations sent", v: 600 },
  { t: "Follow-up done", v: 420 },
  { t: "Proposal accepted", v: 250 },
  { t: "Booking confirmed", v: 160 },
  { t: "Paid & closed", v: 140 },
];
const CHANNELS = [
  { t: "Direct / walk-in", v: 50, cls: "c0" },
  { t: "Agent network", v: 30, cls: "c1" },
  { t: "Online / portal", v: 20, cls: "c2" },
];

export function ReportsTop2() {
  const top = FUNNEL[0].v;
  return (
    <section className="section rp-funnel">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Sales report</span>
          <h2>See where enquiries turn into paid bookings</h2>
          <p>The sales funnel follows every enquiry through quotation, follow-up, proposal and confirmation to payment, and shows the share that moves to each next stage.</p>
        </div>
        <div className="rp-fn-grid">
          <div className="rp-fn">
            {FUNNEL.map((s, i) => {
              const pct = Math.round((s.v / top) * 100);
              const next = FUNNEL[i + 1];
              return (
                <div key={s.t} className="rp-fn-row">
                  <div className="rp-fn-bar" style={{ width: `${Math.max(pct, 22)}%` }}>
                    <span className="b">{s.v.toLocaleString("en-US")}</span>
                    <span className="rp-fn-pct">{pct}%</span>
                  </div>
                  <div className="rp-fn-label">
                    <span>{s.t}</span>
                    {next && <small>{Math.round((next.v / s.v) * 100)}% move on</small>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="rp-side">
            <div className="rp-mix">
              <h3>Sales channel mix</h3>
              <div className="rp-mix-bar" aria-hidden="true">
                {CHANNELS.map((c) => <i key={c.t} className={`rp-${c.cls}`} style={{ width: `${c.v}%` }}>{c.v}%</i>)}
              </div>
              <ul>
                {CHANNELS.map((c) => <li key={c.t}><span className={`rp-sw rp-${c.cls}`} />{c.t}<span className="b">{c.v}%</span></li>)}
              </ul>
            </div>
            <div className="rp-mom">
              <h3>Month on month</h3>
              <table>
                <thead><tr><th scope="col">Metric</th><th scope="col">Last</th><th scope="col">This</th></tr></thead>
                <tbody>
                  <tr><th scope="row">Gross sales</th><td>$75,000</td><td>$84,000</td></tr>
                  <tr><th scope="row">Avg order size</th><td>$720</td><td>$700</td></tr>
                  <tr><th scope="row">Cancellations</th><td>9</td><td>7</td></tr>
                  <tr><th scope="row">Conversion</th><td>13%</td><td>14%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="rp-note">Example data.</p>
      </div>
    </section>
  );
}

// Profit bridge steps in USD thousands: [label, value, kind]
const BRIDGE: [string, number, "total" | "minus"][] = [
  ["Gross revenue", 100, "total"],
  ["Cost of services", 72, "minus"],
  ["Gross profit", 28, "total"],
  ["Operating expenses", 10, "minus"],
  ["Net profit", 18, "total"],
];
const FORECAST = [
  { m: "Next month", v: "$92k", dir: "up", note: "Growth expected", conf: 85 },
  { m: "Month 2", v: "$81k", dir: "dn", note: "Seasonal dip", conf: 75 },
  { m: "Month 3", v: "$104k", dir: "up", note: "Growth expected", conf: 70 },
];
const TARGET = [96, 104, 108, 95, 110, 107];

export function ReportsBottom() {
  // compute floating bar positions for the waterfall
  let level = 0;
  const bars = BRIDGE.map(([t, v, kind]) => {
    if (kind === "total") { level = v; return { t, v, kind, bottom: 0, h: v }; }
    level -= v;
    return { t, v, kind, bottom: level, h: v };
  });
  return (
    <section className="section alt mod-after rp-rev">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Revenue report</span>
          <h2>From revenue to net profit, and what comes next</h2>
          <p>The revenue report breaks the month into a profit bridge, tracks actual revenue against target and projects the next three months from the trend.</p>
        </div>
        <div className="rp-rev-grid">
          <div className="rp-bridge">
            <div className="rp-card-head"><h3>Profit bridge</h3><span>USD thousands</span></div>
            <div className="rp-wf" role="img" aria-label="Example profit bridge: revenue 100, cost of services minus 72, gross profit 28, operating expenses minus 10, net profit 18">
              {bars.map((b) => (
                <div key={b.t} className="rp-wf-col">
                  <div className="rp-wf-track">
                    <i className={b.kind === "total" ? "rp-tot" : "rp-neg"} style={{ bottom: `${b.bottom}%`, height: `${b.h}%` }}>
                      <span>{b.kind === "minus" ? `-${b.v}` : b.v}</span>
                    </i>
                  </div>
                  <small>{b.t}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="rp-rev-side">
            <div className="rp-target">
              <div className="rp-card-head"><h3>Target vs actual</h3><span>Achievement by month</span></div>
              <div className="rp-tg">
                {TARGET.map((p, i) => (
                  <div key={i} className={p >= 100 ? "rp-tg-col hit" : "rp-tg-col"}>
                    <span className="rp-tg-v">{p}%</span>
                    <div className="rp-tg-track"><i style={{ height: `${Math.min(p, 115) / 1.15}%` }} /><span className="rp-tg-line" aria-hidden="true" /></div>
                    <small>M{i + 1}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="rp-fc">
              <div className="rp-card-head"><h3>Revenue forecast</h3><span>3-month projection</span></div>
              <ul>
                {FORECAST.map((f) => (
                  <li key={f.m}>
                    <div><small>{f.m}</small><span className="b">{f.v}</span></div>
                    <span className={`rp-dir ${f.dir}`}>{f.note}</span>
                    <span className="rp-conf"><i style={{ width: `${f.conf}%` }} /></span>
                    <em>{f.conf}% confidence</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="rp-note">Example data.</p>
      </div>
    </section>
  );
}
