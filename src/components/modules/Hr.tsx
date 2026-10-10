// HR & Employees page: attendance sheet, payroll run with payslip, requests inbox and HR reports.
// Based on the HRM admin screens (Attendance, Payroll, Requests & Approvals, Reports, Settings).
import { Icon } from "../ui";

// Attendance status codes, as listed in the Attendance status filter
const STATUS: Record<string, { label: string; cls: string }> = {
  P: { label: "Present", cls: "p" },
  L: { label: "Late", cls: "l" },
  H: { label: "Half day", cls: "h" },
  W: { label: "Work from home", cls: "w" },
  A: { label: "Absent", cls: "a" },
  V: { label: "On leave", cls: "v" },
  O: { label: "Week off", cls: "o" },
  X: { label: "Holiday", cls: "x" },
};
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const SHEET: [string, string, string][] = [
  ["Employee 01", "Ticketing", "PPLPPOOPPPXPOO"],
  ["Employee 02", "Visa desk", "PPPPHOOPWPXPOO"],
  ["Employee 03", "Accounts", "VVVPPOOPPLXPOO"],
  ["Employee 04", "Sales", "PLPPPOOAPPXPOO"],
  ["Employee 05", "Hajj & Umrah", "WWPPPOOPPPXVOO"],
];
const TODAY = [
  { k: "Present", v: 18, cls: "p" },
  { k: "Late arrivals", v: 2, cls: "l" },
  { k: "Absent", v: 1, cls: "a" },
  { k: "On leave", v: 3, cls: "v" },
];

export function HrTop1() {
  const total = TODAY.reduce((s, t) => s + t.v, 0);
  return (
    <section className="section alt hr-att">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Attendance</span>
          <h2>Every working day, one sheet per month</h2>
          <p>Mark daily attendance with check-in, check-out, worked hours and overtime, then review the whole month at a glance. Shifts and weekend days decide what counts as a week off.</p>
        </div>
        <div className="hr-att-grid">
          <div className="hr-sheet">
            <div className="hr-sheet-bar">
              <div className="hr-tabs" role="presentation">
                <span>Daily attendance</span>
                <span className="on">Monthly sheet</span>
                <span>Shift assignments</span>
              </div>
              <span className="hr-month"><Icon name="i-calendar" /> First two weeks</span>
            </div>
            <div className="hr-sheet-scroll">
              <table className="hr-table">
                <thead>
                  <tr>
                    <th scope="col">Employee</th>
                    {DAYS.map((d, i) => <th key={i} scope="col"><span>{d}</span><small>{i + 1}</small></th>)}
                  </tr>
                </thead>
                <tbody>
                  {SHEET.map(([name, dept, codes]) => (
                    <tr key={name}>
                      <th scope="row"><span className="b">{name}</span><small>{dept}</small></th>
                      {codes.split("").map((c, i) => (
                        <td key={i}><span className={`hr-c ${STATUS[c].cls}`} title={STATUS[c].label}>{c === "O" || c === "X" ? "" : c}</span></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="hr-legend">
              {Object.entries(STATUS).map(([k, s]) => (
                <li key={k}><span className={`hr-c ${s.cls}`}>{k === "O" || k === "X" ? "" : k}</span>{s.label}</li>
              ))}
            </ul>
          </div>
          <div className="hr-side">
            <div className="hr-today">
              <h3>Today at a glance</h3>
              <div className="hr-stack" aria-hidden="true">
                {TODAY.map((t) => <i key={t.k} className={t.cls} style={{ flexGrow: t.v }} />)}
              </div>
              <ul>
                {TODAY.map((t) => <li key={t.k}><span className={`hr-dot ${t.cls}`} />{t.k}<span className="b">{t.v}</span></li>)}
              </ul>
              <p className="hr-cover">Attendance coverage <span className="b">{total} of {total}</span> recorded</p>
            </div>
            <div className="hr-punch">
              <h3>One attendance record</h3>
              <dl>
                <div><dt>Shift</dt><dd>Day shift</dd></div>
                <div><dt>Check in</dt><dd>09:04</dd></div>
                <div><dt>Check out</dt><dd>18:40</dd></div>
                <div><dt>Worked</dt><dd>9h 36m</dd></div>
                <div><dt>Overtime</dt><dd className="hr-ot">0h 36m</dd></div>
                <div><dt>Status</dt><dd><span className="hr-pill">Present</span></dd></div>
              </dl>
            </div>
          </div>
        </div>
        <p className="hr-note">Example data.</p>
      </div>
    </section>
  );
}

const CHECKS = [
  { t: "Zero salary", s: "0 employees", ok: true },
  { t: "Missing payment method", s: "0 employees", ok: true },
  { t: "Approved salary advances", s: "1 to recover", ok: false },
];
const RUN = ["Draft", "Pending approval", "Approved", "Paid"];

export function HrTop2() {
  return (
    <section className="section hr-pay">
      <div className="container hr-pay-wrap">
        <div className="hr-pay-copy">
          <span className="eyebrow">Payroll</span>
          <h2>Generate, check, approve and pay</h2>
          <p>Pick a pay cycle and period, review the pre-run checks, then move the salary sheet through approval. Attendance, leave, overtime and approved advances feed the draft.</p>
          <div className="hr-cycle" role="presentation">
            <span className="on">Monthly</span><span>Weekly</span><span>Biweekly</span>
          </div>
          <ul className="hr-checks">
            {CHECKS.map((c) => (
              <li key={c.t} className={c.ok ? "ok" : "warn"}>
                <Icon name={c.ok ? "i-check" : "i-bell"} />
                <span>{c.t}</span>
                <em>{c.s}</em>
              </li>
            ))}
          </ul>
          <ol className="hr-run">
            {RUN.map((r, i) => <li key={r} className={i < 2 ? "done" : i === 2 ? "now" : ""}><span>{r}</span></li>)}
          </ol>
          <p className="hr-small">Paid payroll runs stay read-only.</p>
        </div>
        <div className="hr-slip-wrap">
          <article className="hr-slip">
            <header>
              <div>
                <span className="hr-slip-k">Payslip</span>
                <h3>Sky Travels</h3>
              </div>
              <span className="hr-slip-period">Monthly<br /><span className="b">Example month</span></span>
            </header>
            <div className="hr-slip-who">
              <div><small>Employee</small><span className="b">Employee 01</span></div>
              <div><small>Designation</small><span>Ticketing executive</span></div>
              <div><small>Salary grade</small><span>Grade B</span></div>
            </div>
            <div className="hr-slip-cols">
              <div>
                <h4>Earnings</h4>
                <ul>
                  <li><span>Basic salary</span><span>$1,200.00</span></li>
                  <li><span>Overtime</span><span>$84.00</span></li>
                  <li><span>Salary adjustment</span><span>$50.00</span></li>
                </ul>
              </div>
              <div>
                <h4>Deductions</h4>
                <ul>
                  <li><span>Unpaid absence</span><span>-$40.00</span></li>
                  <li><span>Advance recovery</span><span>-$100.00</span></li>
                </ul>
              </div>
            </div>
            <footer>
              <span>Net pay</span>
              <span className="hr-net">$1,194.00</span>
            </footer>
            <div className="hr-slip-stamp">Approved</div>
          </article>
          <p className="hr-note">Example data. Line items depend on your payroll settings.</p>
        </div>
      </div>
    </section>
  );
}

const REQUESTS = [
  { type: "Salary advance", who: "Employee 04", text: "Advance of $150, recovered from next payroll", state: "Pending" },
  { type: "Leave", who: "Employee 02", text: "Annual leave, 3 days next week", state: "Awaiting HR" },
  { type: "Attendance", who: "Employee 05", text: "Missed check-out on Tuesday, left at 18:00", state: "Pending" },
];
const REPORTS = [
  { g: "People", icon: "i-users", items: ["Employee list", "Headcount summary", "New joiner report", "Resignation / termination"] },
  { g: "Attendance", icon: "i-clock", items: ["Attendance summary", "Late & absence report", "Overtime report"] },
  { g: "Leave", icon: "i-calendar", items: ["Leave summary", "Leave balance report"] },
  { g: "Payroll", icon: "i-wallet", items: ["Payroll summary", "Salary payment report"] },
  { g: "Requests", icon: "i-tasks", items: ["Request summary"] },
];

export function HrBottom() {
  return (
    <section className="section alt mod-after hr-req">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Requests and reports</span>
          <h2>One inbox for approvals, twelve reports for answers</h2>
          <p>Leave, attendance corrections and salary advances arrive in the same Requests &amp; Approvals inbox. HR reports run with only the filters they need and export to CSV or print.</p>
        </div>
        <div className="hr-req-grid">
          <div className="hr-inbox">
            <div className="hr-inbox-head">
              <h3><Icon name="i-tasks" /> Requests &amp; approvals</h3>
              <div className="hr-seg" role="presentation"><span className="on">All types</span><span>Leave</span><span>Attendance</span><span>Salary advance</span></div>
            </div>
            <div className="hr-stackcards">
              {[...REQUESTS].reverse().map((r, idx) => {
                const i = REQUESTS.length - 1 - idx;
                return i === 0 ? (
                  <article key={r.who} className="hr-rq hr-rq-0">
                    <div className="hr-rq-top">
                      <span className="hr-rq-type">{r.type}</span>
                      <span className="hr-rq-state">{r.state}</span>
                    </div>
                    <h4>{r.who}</h4>
                    <p>{r.text}</p>
                    <div className="hr-rq-act">
                      <span className="hr-btn ok"><Icon name="i-check" /> Approve</span>
                      <span className="hr-btn no"><Icon name="i-x" /> Reject</span>
                    </div>
                  </article>
                ) : (
                  <div key={r.who} className={`hr-rq hr-rq-peek hr-rq-${i}`}>
                    <span className="hr-rq-type">{r.type}</span>
                    <span className="hr-rq-who">{r.who}</span>
                    <span className="hr-rq-state">{r.state}</span>
                  </div>
                );
              })}
            </div>
            <p className="hr-note">Example data.</p>
          </div>
          <div className="hr-reports">
            <div className="hr-reports-head">
              <h3>HR reports</h3>
              <span className="hr-exp"><Icon name="i-file" /> CSV</span>
              <span className="hr-exp"><Icon name="i-receipt" /> Print</span>
            </div>
            <div className="hr-rgroups">
              {REPORTS.map((g) => (
                <div key={g.g} className="hr-rgroup">
                  <span className="hr-rg-ico"><Icon name={g.icon} /></span>
                  <div>
                    <h4>{g.g}</h4>
                    <ul>{g.items.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
