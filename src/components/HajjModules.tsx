// Hajj & Umrah page: packages, departure readiness and reports, based on the module's admin screens.
import { Icon } from "./ui";

const PACKAGES = [
  { tag: "Hajj", name: "Hajj Standard", days: 40, items: ["Flights & visa", "Makkah, Madinah, Mina", "Guided rituals"], seats: [182, 200] },
  { tag: "Ramadan", name: "Ramadan Umrah VIP", days: 21, items: ["Last 10 nights", "5★ next to Haram", "Ziyarah tours"], seats: [38, 40], featured: true },
  { tag: "Umrah", name: "Premium Umrah", days: 14, items: ["Flights & visa", "4★ near Haram", "Airport transfers"], seats: [26, 45] },
  { tag: "Umrah", name: "Economy Umrah", days: 10, items: ["Flights & visa", "Shared rooms", "Group transport"], seats: [51, 60] },
];

const DOCS = ["Passport", "Visa", "Photo", "Vaccine"];
// [pilgrim, statuses per doc: 1 ready, 0 pending, -1 missing]
const PILGRIMS: [string, number[]][] = [
  ["Pilgrim 01", [1, 1, 1, 1]],
  ["Pilgrim 02", [1, 1, 1, 0]],
  ["Pilgrim 03", [1, 0, 1, 1]],
  ["Pilgrim 04", [1, -1, 0, 0]],
];
const VISA = [["Submitted", 46], ["In process", 31], ["Approved", 112], ["Issued", 98]] as const;

const REPORTS = [
  { icon: "i-trend", title: "Sales trend", text: "Bookings and revenue by month" },
  { icon: "i-chart", title: "Booking status mix", text: "Confirmed, pending and cancelled" },
  { icon: "i-award", title: "Top packages", text: "Which packages sell best" },
  { icon: "i-users", title: "Agent commission", text: "Sales and commission per sub-agent" },
];

const mark = (s: number) => (s === 1 ? { c: "ok", t: "Ready" } : s === 0 ? { c: "wait", t: "Pending" } : { c: "miss", t: "Missing" });

export function HajjPackages() {
  return (
    <section className="section alt hj-pk">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Pilgrimage packages</span>
          <h2>Build every package once, sell every seat</h2>
          <p>Hajj, Umrah and Ramadan Umrah packages with dates, inclusions, categories and live seat counts.</p>
        </div>
        <div className="hj-pk-grid">
          {PACKAGES.map((p) => {
            const pct = Math.round((p.seats[0] / p.seats[1]) * 100);
            return (
              <article key={p.name} className={p.featured ? "hj-card featured" : "hj-card"}>
                <div className="hj-top"><span className="hj-tag">{p.tag}</span><span className="hj-days"><span className="b">{p.days}</span> days</span></div>
                <h3>{p.name}</h3>
                <ul>{p.items.map((i) => <li key={i}><Icon name="i-check" />{i}</li>)}</ul>
                <div className="hj-seats">
                  <span><span className="b">{p.seats[0]}</span> / {p.seats[1]} seats sold</span>
                  <span className="hj-bar"><i style={{ width: `${pct}%` }} /></span>
                </div>
              </article>
            );
          })}
        </div>
        <p className="hj-note">Package names from a real TravelSuite setup. Seat counts are examples.</p>
      </div>
    </section>
  );
}

export function HajjReadiness() {
  return (
    <section className="section hj-rd">
      <div className="container hj-rd-grid">
        <div>
          <span className="eyebrow">Departure readiness</span>
          <h2>Know which pilgrims are ready to fly</h2>
          <p className="muted">Every pilgrim&apos;s passport, visa, photo and vaccination status, grouped by travel group and departure. Missing documents surface long before the flight.</p>
          <div className="hj-visa">
            <span className="hj-visa-title">Visa pipeline</span>
            <div className="hj-visa-steps">
              {VISA.map(([s, n], i) => (
                <div key={s} className={i === VISA.length - 1 ? "done" : undefined}><span className="b">{n}</span><small>{s}</small></div>
              ))}
            </div>
          </div>
        </div>
        <div className="hj-board" aria-label="Example document readiness board">
          <div className="hj-board-head">
            <span><span className="b">Group A</span> · Departs 29 Oct · Dhaka → Jeddah</span>
            <span className="hj-pill">{PILGRIMS.filter(([, st]) => st.every((s) => s === 1)).length} of {PILGRIMS.length} ready</span>
          </div>
          <div className="hj-row hj-row-h"><span>Pilgrim</span>{DOCS.map((d) => <span key={d}>{d}</span>)}</div>
          {PILGRIMS.map(([name, st]) => (
            <div key={name} className="hj-row">
              <span className="hj-name">{name}</span>
              {st.map((s, i) => { const m = mark(s); return <span key={i} className={`hj-st ${m.c}`} title={`${DOCS[i]}: ${m.t}`}><span>{m.t}</span></span>; })}
            </div>
          ))}
          <p className="hj-key" aria-hidden="true"><span className="ok">✓ Ready</span><span className="wait">… Pending</span><span className="miss">✕ Missing</span></p>
        </div>
      </div>
    </section>
  );
}

export function HajjReports() {
  return (
    <section className="section alt hj-rp">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Reports &amp; agents</span>
          <h2>See the whole season at a glance</h2>
          <p>Filter by date, journey (Hajj, Umrah or Ramadan Umrah) and sub-agent.</p>
        </div>
        <div className="hj-rp-grid">
          {REPORTS.map((r) => (
            <div key={r.title} className="hj-rp-card">
              <span className="hm-ico"><Icon name={r.icon} /></span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
