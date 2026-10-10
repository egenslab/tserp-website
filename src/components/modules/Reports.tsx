// Reports & Analytics page: report library, booking and customer reports, and profit bridge with forecast.
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

// Booking and customer reports: weekly volume, lead time, module mix, segments, lifetime value and sources
const WEEKS: [string, number, number, number][] = [["W1", 62, 18, 4], ["W2", 74, 15, 3], ["W3", 81, 20, 5], ["W4", 70, 12, 2]];
const MODULES: [string, string, number, string, string][] = [
  ["i-kaaba", "Hajj & Umrah", 86, "$1,700", "2.4%"],
  ["i-passport", "Visa", 72, "$130", "3.8%"],
  ["i-map", "Tour", 80, "$220", "5.1%"],
  ["i-bed", "Hotel", 49, "$150", "6.2%"],
];
const LEAD: [string, number][] = [["Same day", 9], ["1–3 days", 25], ["4–7 days", 37], ["8–14 days", 19], ["15+ days", 10]];
const SEGMENTS: [string, number, string][] = [["New", 34, "sa"], ["Returning", 43, "sb"], ["VIP", 7, "sc"], ["Corporate", 5, "sd"], ["Agent-referred", 11, "se"]];
const SOURCES: [string, number][] = [["Direct / walk-in", 45], ["Word of mouth", 23], ["Social media", 15], ["Agent referral", 10], ["Google / SEO", 7]];

export function ReportsTop2() {
  const maxWeek = Math.max(...WEEKS.map(([, c, p, x]) => c + p + x));
  const maxLead = Math.max(...LEAD.map(([, v]) => v));
  return (
    <section className="section rp-bc">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Booking and customer reports</span>
          <h2>Know how bookings move and who your customers are</h2>
          <p>The booking report shows weekly volume, status, module mix and how far ahead people book. The customer report shows segments, lifetime value and where new customers come from.</p>
        </div>
        <div className="rp-bc-grid">
          <article className="rp-bc-card">
            <div className="rp-bc-head"><span className="b"><Icon name="i-calendar" />Booking report</span><small>This month</small></div>
            <div className="rp-bc-kpis">
              <div><small>Total bookings</small><span className="b">366</span></div>
              <div><small>Confirmed</small><span className="b">287</span></div>
              <div><small>Cancellation rate</small><span className="b">4.2%</span></div>
              <div><small>Avg processing</small><span className="b">3.4 days</span></div>
            </div>
            <div className="rp-bc-split">
              <div>
                <span className="rp-bc-label">Weekly volume</span>
                <div className="rp-weeks" aria-label="Weekly bookings by status">
                  {WEEKS.map(([w, c, p, x]) => (
                    <div key={w} className="rp-week">
                      <div className="rp-stack" style={{ height: `${((c + p + x) / maxWeek) * 100}%` }}>
                        <i className="x" style={{ flex: x }} /><i className="p" style={{ flex: p }} /><i className="c" style={{ flex: c }} />
                      </div>
                      <small>{w}</small>
                    </div>
                  ))}
                </div>
                <p className="rp-bc-legend"><i className="c" />Confirmed <i className="p" />Pending <i className="x" />Cancelled</p>
              </div>
              <div>
                <span className="rp-bc-label">Booking lead time</span>
                <ul className="rp-lead">
                  {LEAD.map(([k, v]) => (
                    <li key={k}><span>{k}</span><span className="rp-lead-bar"><i style={{ width: `${(v / maxLead) * 100}%` }} /></span><span className="b">{v}%</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rp-mods">
              <div className="rp-mods-h"><span>Module</span><span>Bookings</span><span>Avg value</span><span>Cancel rate</span></div>
              {MODULES.map(([i, m, n, v, c]) => (
                <div key={m} className="rp-mods-r"><span><Icon name={i} />{m}</span><span>{n}</span><span>{v}</span><span>{c}</span></div>
              ))}
            </div>
          </article>

          <article className="rp-bc-card dark">
            <div className="rp-bc-head"><span className="b"><Icon name="i-users" />Customer report</span><small>This month</small></div>
            <span className="rp-bc-label">Customer segments</span>
            <div className="rp-seg" aria-label="Customers by segment">
              {SEGMENTS.map(([k, v, c]) => <i key={k} className={c} style={{ flex: v }} />)}
            </div>
            <ul className="rp-seg-key">
              {SEGMENTS.map(([k, v, c]) => <li key={k}><i className={c} />{k}<span className="b">{v}%</span></li>)}
            </ul>
            <span className="rp-bc-label">Lifetime value by segment</span>
            <div className="rp-ltv">
              <div><small>VIP</small><span className="b">$3,600</span><em>4.8 trips a year · 92% stay</em></div>
              <div><small>Returning</small><span className="b">$1,280</span><em>2.4 trips a year · 68% stay</em></div>
              <div><small>New</small><span className="b">$440</span><em>1 trip a year</em></div>
            </div>
            <span className="rp-bc-label">How new customers find you</span>
            <ul className="rp-src">
              {SOURCES.map(([k, v]) => <li key={k}><span>{k}</span><span className="rp-src-bar"><i style={{ width: `${(v / SOURCES[0][1]) * 100}%` }} /></span><span className="b">{v}%</span></li>)}
            </ul>
          </article>
        </div>
        <p className="hj-note">Example data. Both reports can be exported.</p>
      </div>
    </section>
  );
}

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
