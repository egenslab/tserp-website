// Visa page: case pipeline and reports, based on the visa module's Pipeline View and Visa Reports.
// Case IDs, countries and numbers are examples; no customer data.
import { Icon } from "./ui";

const ALERTS = [
  { icon: "i-clock", n: 3, label: "Due soon", note: "Expected within 7 days" },
  { icon: "i-bell", n: 1, label: "Overdue", note: "Past expected close date", warn: true },
  { icon: "i-file", n: 4, label: "Docs for review", note: "Awaiting staff verification" },
  { icon: "i-calendar", n: 2, label: "Appointments today", note: "Biometric and interview" },
];

type Case = { id: string; country: string; type: string; docs: [number, number]; due: string; pri: "Low" | "Medium" | "High" | "Urgent" };
const COLUMNS: { stage: string; value: string; cases: Case[] }[] = [
  { stage: "Document Collection", value: "$1,450", cases: [
    { id: "CASE-1041", country: "Canada", type: "Student", docs: [2, 5], due: "18 Oct", pri: "High" },
    { id: "CASE-1047", country: "Malaysia", type: "Tourist", docs: [3, 5], due: "22 Oct", pri: "Low" },
  ] },
  { stage: "Medical", value: "$2,100", cases: [
    { id: "CASE-1032", country: "Saudi Arabia", type: "Work", docs: [4, 5], due: "15 Oct", pri: "Urgent" },
  ] },
  { stage: "Biometric", value: "$980", cases: [
    { id: "CASE-1029", country: "United Kingdom", type: "Student", docs: [4, 4], due: "16 Oct", pri: "Medium" },
  ] },
  { stage: "Under Review", value: "$1,760", cases: [
    { id: "CASE-1018", country: "Saudi Arabia", type: "Work", docs: [5, 5], due: "24 Oct", pri: "Medium" },
    { id: "CASE-1021", country: "Thailand", type: "Tourist", docs: [5, 5], due: "19 Oct", pri: "Low" },
  ] },
  { stage: "Approved", value: "$620", cases: [
    { id: "CASE-1009", country: "Maldives", type: "Work", docs: [6, 6], due: "Delivered", pri: "Low" },
  ] },
];

const SOURCES = ["Walk-in", "Phone call", "Website", "Facebook", "WhatsApp", "Agent", "Referral"];

const REPORTS = [
  ["i-trend", "Revenue trend", "Booking revenue against the previous period"],
  ["i-chart", "Booking status", "Draft, processing and closed cases"],
  ["i-award", "Visa outcome", "Approved, rejected and pending per applicant"],
  ["i-file", "Document compliance", "Latest document status across applicants"],
  ["i-calendar", "Appointments", "Scheduled, completed and rescheduled"],
  ["i-users", "Staff performance", "Cases handled and closed per staff member"],
];
const FILTERS = ["Date range", "Country", "Visa type", "Staff", "Booking status"];

const COUNTRIES: [string, number, string, number][] = [
  ["Saudi Arabia", 64, "$19,200", 96],
  ["United Kingdom", 22, "$13,860", 88],
  ["Canada", 18, "$12,600", 83],
  ["Malaysia", 41, "$4,920", 98],
  ["Thailand", 35, "$3,850", 97],
];

export function VisaPipeline() {
  return (
    <section className="section vs-pipe">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Case pipeline</span>
          <h2>Every visa case, one board</h2>
          <p>Cases move stage by stage, with documents, due dates and priority on each card. Late and blocked files stand out.</p>
        </div>

        <div className="vs-alerts">
          {ALERTS.map((a) => (
            <div key={a.label} className={a.warn ? "warn" : undefined}>
              <span className="vs-alert-ico"><Icon name={a.icon} /></span>
              <span className="b">{a.n}</span>
              <span className="vs-alert-txt">{a.label}<small>{a.note}</small></span>
            </div>
          ))}
        </div>

        <div className="vs-board" aria-label="Example visa case pipeline">
          {COLUMNS.map((c) => (
            <div key={c.stage} className="vs-col">
              <div className="vs-col-head"><span className="b">{c.stage}</span><small>{c.cases.length} {c.cases.length === 1 ? "case" : "cases"} · {c.value}</small></div>
              {c.cases.map((k) => {
                const done = k.docs[0] === k.docs[1];
                return (
                  <article key={k.id} className="vs-case">
                    <div className="vs-case-top"><span className="vs-id">{k.id}</span><span className={`vs-pri p-${k.pri.toLowerCase()}`}>{k.pri}</span></div>
                    <span className="b">{k.country}</span>
                    <small>{k.type} visa</small>
                    <div className="vs-case-foot">
                      <span className={done ? "ok" : undefined}><Icon name="i-file" />{k.docs[0]}/{k.docs[1]} verified</span>
                      <span><Icon name="i-calendar" />{k.due}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </div>

        <div className="vs-sources">
          <span>Cases arrive from</span>
          <ul>{SOURCES.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        <p className="hj-note">Stage names from the visa module. Cases and numbers are examples.</p>
      </div>
    </section>
  );
}

export function VisaReports() {
  return (
    <section className="section alt vs-rp">
      <div className="container vs-rp-grid">
        <div>
          <span className="eyebrow">Visa reports</span>
          <h2>Know which countries pay off</h2>
          <p className="muted">Bookings, revenue, collections and approval rates for any period, filtered the way you work, and exported to CSV.</p>
          <ul className="vs-filters">{FILTERS.map((x) => <li key={x}>{x}</li>)}</ul>
          <ul className="vs-rp-list">
            {REPORTS.map(([i, t, d]) => (
              <li key={t}><span className="hm-ico"><Icon name={i} /></span><div><span className="b">{t}</span><small>{d}</small></div></li>
            ))}
          </ul>
        </div>
        <div className="vs-table" aria-label="Example country performance report">
          <div className="vs-table-head"><span className="b">Country performance</span><span className="vs-csv"><Icon name="i-file" />Export CSV</span></div>
          <div className="vs-tr vs-th"><span>Country</span><span>Bookings</span><span>Revenue</span><span>Approval</span></div>
          {COUNTRIES.map(([c, b, r, a]) => (
            <div key={c} className="vs-tr">
              <span className="b">{c}</span><span>{b}</span><span>{r}</span>
              <span className="vs-appr"><i style={{ width: `${a}%` }} /><em>{a}%</em></span>
            </div>
          ))}
          <p className="vs-table-note">Example figures</p>
        </div>
      </div>
    </section>
  );
}
