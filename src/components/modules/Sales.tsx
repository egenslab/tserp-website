// Sales Management page: guided booking entry, booking calendar and sales report.
// Based on the Create Booking, Booking Calendar and Sales Report admin screens. All data is fictional.
import { Icon } from "../ui";

const SERVICES = [
  { icon: "i-bed", name: "Hotel booking", when: "Check-in & check-out", needs: "Hotel, room type, guests", on: true },
  { icon: "i-map", name: "Tour booking", when: "Departure date", needs: "Package, travellers, pickup", on: false },
  { icon: "i-passport", name: "Visa process", when: "Travel & appointment date", needs: "Visa, applicants, documents", on: false },
  { icon: "i-kaaba", name: "Hajj & Umrah", when: "Group departure", needs: "Package, pilgrims, services", on: false },
];

const STEPS = ["Customer", "Schedule", "Pricing", "Final check"];

const DRAFTS = [
  { id: "HTL-D01", who: "Customer 01", kind: "Hotel", ago: "12 min ago", pct: 65 },
  { id: "VIS-D02", who: "Customer 02", kind: "Visa", ago: "40 min ago", pct: 40 },
  { id: "UMR-D03", who: "Customer 03", kind: "Hajj & Umrah", ago: "Yesterday", pct: 80 },
];

export function SalesTop1() {
  return (
    <section className="section alt sa-desk">
      <div className="container">
        <div className="sa-desk-grid">
        <div className="sa-desk-copy">
          <span className="eyebrow">Guided booking entry</span>
          <h2>One booking desk for every service you sell</h2>
          <p>Staff pick the service first. The screen then lists what to prepare and walks through the same four checks, so a hotel stay, a tour, a visa case and a pilgrimage are all entered the same way.</p>
          <ol className="sa-desk-steps">
            <li><span>1</span><div><span className="b">Customer</span><small>Select an existing customer or add a new one</small></div></li>
            <li><span>2</span><div><span className="b">Schedule</span><small>Stay, departure, appointment or group dates</small></div></li>
            <li><span>3</span><div><span className="b">Pricing</span><small>Review the total and the amount due</small></div></li>
            <li><span>4</span><div><span className="b">Final check</span><small>Availability and details before saving</small></div></li>
          </ol>
        </div>
        <div className="sa-desk-mock" aria-label="Example of the Create Booking screen">
          <div className="sa-desk-bar"><span /><span /><span /><em>Create booking</em></div>
          <div className="sa-desk-body">
            <div className="sa-desk-q">
              <span className="b">What would you like to book?</span>
              <small>4 available</small>
            </div>
            <div className="sa-svc">
              {SERVICES.map((s) => (
                <div key={s.name} className={s.on ? "sa-svc-item on" : "sa-svc-item"}>
                  <span className="sa-svc-ico"><Icon name={s.icon} /></span>
                  <span className="b">{s.name}</span>
                  <small><Icon name="i-calendar" /> {s.when}</small>
                  <small className="sa-svc-need">{s.needs}</small>
                </div>
              ))}
            </div>
            <div className="sa-desk-low">
              <div className="sa-prep">
                <span className="sa-lbl">Before you start · Hotel booking</span>
                <ul>
                  <li><Icon name="i-check" /> Hotel and room availability</li>
                  <li><Icon name="i-check" /> Guest contact details</li>
                  <li><Icon name="i-check" /> Stay dates and payment plan</li>
                </ul>
                <div className="sa-track">
                  {STEPS.map((s, i) => <span key={s} className={i === 0 ? "now" : undefined}>{s}</span>)}
                </div>
              </div>
              <div className="sa-drafts">
                <span className="sa-lbl">Auto-saved drafts</span>
                {DRAFTS.map((d) => (
                  <div key={d.id} className="sa-draft">
                    <span className="sa-ring" style={{ ["--p" as string]: d.pct }}><span>{d.pct}%</span></span>
                    <div><span className="b">{d.id} · {d.who}</span><small>{d.kind} · {d.ago}</small></div>
                    <span className="sa-resume">Resume</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
        <p className="hj-note">Example data.</p>
      </div>
    </section>
  );
}

// Calendar: October-style month starting on Thursday, 31 days.
type Ev = { t: string; s: "hotel" | "tour" | "visa" | "hajj"; st: "ok" | "wait" | "risk" };
const EVENTS: Record<number, Ev[]> = {
  3: [{ t: "Check-in · HB-0012", s: "hotel", st: "ok" }],
  6: [{ t: "Visa appointment", s: "visa", st: "wait" }],
  9: [{ t: "City tour departs", s: "tour", st: "ok" }],
  13: [{ t: "Visa expected", s: "visa", st: "wait" }, { t: "Check-out · HB-0012", s: "hotel", st: "ok" }],
  14: [{ t: "Visa expected", s: "visa", st: "risk" }],
  17: [{ t: "Umrah group A", s: "hajj", st: "ok" }],
  21: [{ t: "Beach tour departs", s: "tour", st: "wait" }],
  24: [{ t: "Check-in · HB-0015", s: "hotel", st: "wait" }],
  28: [{ t: "Intended travel", s: "visa", st: "ok" }],
};
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const LEAD = 4; // month starts on Thursday
const SEL = 13;

export function SalesTop2() {
  const cells: (number | null)[] = [...Array(LEAD).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  return (
    <section className="section sa-cal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Booking calendar</span>
          <h2>See every stay, departure and appointment on one month</h2>
          <p>Hotel stays, tour departures, visa dates and pilgrimage groups share one schedule. Colour shows the service, the dot shows whether it is confirmed, pending or at risk.</p>
        </div>
        <div className="sa-cal-wrap">
          <div className="sa-cal-main">
            <div className="sa-cal-top">
              <span className="b">Month view</span>
              <div className="sa-cal-tabs"><span className="on">Month</span><span>Agenda</span></div>
              <div className="sa-cal-keys">
                <span className="k hotel">Hotel</span><span className="k tour">Tour</span><span className="k visa">Visa</span><span className="k hajj">Hajj &amp; Umrah</span>
              </div>
            </div>
            <div className="sa-cal-scroll">
              <div className="sa-cal-grid" role="grid" aria-label="Example booking calendar">
                {DAYS.map((d) => <span key={d} className="sa-dow">{d}</span>)}
                {cells.map((n, i) => (
                  <div key={i} className={`sa-day${n === null ? " off" : ""}${n === SEL ? " sel" : ""}`}>
                    {n !== null && <span className="sa-dnum">{n}</span>}
                    {n !== null && EVENTS[n]?.map((e) => (
                      <span key={e.t} className={`sa-ev ${e.s}`}><i className={e.st} />{e.t}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="sa-cal-side">
            <span className="sa-lbl">Selected day</span>
            <h3>Day {SEL}</h3>
            <small className="muted">2 scheduled items</small>
            <ul className="sa-agenda">
              <li className="visa"><span className="b">Visa expected completion</span><small>Visa process · Customer 04</small><em className="wait">Pending · follow up</em></li>
              <li className="hotel"><span className="b">Hotel check-out</span><small>Hotel booking · Customer 01</small><em className="ok">Confirmed · ready</em></li>
            </ul>
            <div className="sa-status">
              <div><span className="b">Confirmed</span><small>Ready for service</small></div>
              <div><span className="b">Pending</span><small>Need follow-up</small></div>
              <div><span className="b">At risk</span><small>Operations review</small></div>
            </div>
          </aside>
        </div>
        <p className="hj-note">Example data.</p>
      </div>
    </section>
  );
}

const FUNNEL = [
  { n: "Enquiries", v: 1000, p: 100 },
  { n: "Quotations sent", v: 560, p: 56 },
  { n: "Follow-up done", v: 380, p: 38 },
  { n: "Proposal accepted", v: 230, p: 23 },
  { n: "Booking confirmed", v: 160, p: 16 },
  { n: "Paid & closed", v: 140, p: 14 },
];

const KPIS = [
  { l: "Gross sales", v: "$420,000", d: "+12%" },
  { l: "Paid bookings", v: "140", d: "+9%" },
  { l: "Conversion rate", v: "14.0%", d: "+0.8pt" },
  { l: "Avg deal size", v: "$3,000", d: "+4%" },
];

const CHANNELS = [
  { n: "Direct / walk-in", p: 50, c: "ca" },
  { n: "Agent network", p: 30, c: "cb" },
  { n: "Online / portal", p: 20, c: "cc" },
];

const TOP = [
  { n: "Premium Umrah 14 days", m: "Hajj/Umrah", u: 40, r: "$180,000", g: "18%" },
  { n: "Tourist visa", m: "Visa", u: 120, r: "$36,000", g: "32%" },
  { n: "Beach resort 3N/4D", m: "Tour", u: 60, r: "$54,000", g: "26%" },
];

export function SalesBottom() {
  return (
    <section className="section alt mod-after sa-rep">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Sales report</span>
          <h2>Find where enquiries drop off, month by month</h2>
          <p>The sales report follows enquiries all the way to paid bookings, splits sales by channel, compares the month with the one before and ranks your packages by revenue and margin.</p>
        </div>
        <div className="sa-rep-grid">
          <div className="sa-funnel" aria-label="Example sales funnel">
            <div className="sa-rep-h"><span className="b">Sales funnel</span><small>Enquiry to closed booking</small></div>
            <ol>
              {FUNNEL.map((f, i) => (
                <li key={f.n}>
                  <span className="sa-fbar" style={{ width: `${Math.max(f.p, 22)}%` }}><span>{f.v.toLocaleString("en-US")}</span></span>
                  <span className="sa-fname">{f.n} <small>· {f.p}% of enquiries</small></span>
                  {i < FUNNEL.length - 1 && (
                    <small className="sa-fnext">{Math.round((FUNNEL[i + 1].v / f.v) * 100)}% moved to next stage</small>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="sa-rep-side">
            <div className="sa-kpis">
              {KPIS.map((k) => (
                <div key={k.l}><small>{k.l}</small><span className="b">{k.v}</span><em><Icon name="i-trend" /> {k.d} vs last month</em></div>
              ))}
            </div>
            <div className="sa-mix">
              <div className="sa-rep-h"><span className="b">Sales channel mix</span></div>
              <div className="sa-mix-bar">{CHANNELS.map((c) => <span key={c.n} className={c.c} style={{ width: `${c.p}%` }} />)}</div>
              <ul>{CHANNELS.map((c) => <li key={c.n}><i className={c.c} />{c.n}<span className="b">{c.p}%</span></li>)}</ul>
            </div>
            <div className="sa-top">
              <div className="sa-rep-h"><span className="b">Top performing packages</span><small>By revenue</small></div>
              <table>
                <thead><tr><th>Package</th><th>Units</th><th>Revenue</th><th>Margin</th></tr></thead>
                <tbody>
                  {TOP.map((t) => (
                    <tr key={t.n}><td><span className="b">{t.n}</span><small>{t.m}</small></td><td>{t.u}</td><td>{t.r}</td><td>{t.g}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="hj-note">Example data. Reports can be exported.</p>
      </div>
    </section>
  );
}
