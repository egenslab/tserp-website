// Help Desk & Support page: ticket thread with SLA, routing from modules to queues, and settings/reports.
// Based on the Support Tickets admin screens (Dashboard, All Tickets, Categories, Reports, Settings).
import { Icon } from "../ui";

const STAGES = ["Open", "In progress", "Pending", "Awaiting customer", "Resolved", "Closed"];
const CURRENT = 3;

export function HelpdeskTop1() {
  // SLA ring: share of the response target already used
  const used = 62;
  return (
    <section className="section alt hd-ticket">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Inside a ticket</span>
          <h2>The whole case on one screen</h2>
          <p>Each ticket carries the customer, the module it relates to, a category, a priority, the assigned staff member and an SLA, with the team&apos;s replies and the status history in one place.</p>
        </div>
        <div className="hd-tk">
          <aside className="hd-meta">
            <span className="hd-no">TKT-1042</span>
            <h3>Visa appointment date needs to change</h3>
            <dl>
              <div><dt>Customer</dt><dd>Customer 01</dd></div>
              <div><dt>Module</dt><dd><span className="hd-mod"><Icon name="i-passport" /> Visa</span></dd></div>
              <div><dt>Category</dt><dd>Visa issue</dd></div>
              <div><dt>Priority</dt><dd><span className="hd-pri high">High</span></dd></div>
              <div><dt>Assigned</dt><dd>Support agent 02</dd></div>
            </dl>
            <div className="hd-sla">
              <div className="hd-ring" style={{ background: `conic-gradient(var(--forest-2) 0 ${used}%, var(--line) ${used}% 100%)` }}>
                <span><span className="b">1h 30m</span><small>left</small></span>
              </div>
              <div>
                <h4>SLA</h4>
                <p>Response due within the target for High priority.</p>
              </div>
            </div>
          </aside>
          <div className="hd-thread">
            <div className="hd-thread-head"><Icon name="i-chat" /> Conversation</div>
            <div className="hd-msg in">
              <span className="hd-av">C1</span>
              <div><p>Our embassy appointment clashes with a flight. Can it move to next week?</p><small>Customer 01 · 09:12</small></div>
            </div>
            <div className="hd-msg out">
              <div><p>We can request a new slot. Please confirm two dates that work for you.</p><small>Support agent 02 · 09:40</small></div>
              <span className="hd-av staff">S2</span>
            </div>
            <div className="hd-msg in">
              <span className="hd-av">C1</span>
              <div><p>Tuesday or Thursday morning, both fine.</p><small>Customer 01 · 10:05</small></div>
            </div>
            <div className="hd-reply">
              <span>Write a reply…</span>
              <span className="hd-send"><Icon name="i-right" /></span>
            </div>
          </div>
          <ol className="hd-status" aria-label="Ticket status">
            {STAGES.map((s, i) => (
              <li key={s} className={i < CURRENT ? "done" : i === CURRENT ? "now" : ""}>
                <span className="hd-sdot">{i < CURRENT ? <Icon name="i-check" /> : null}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="hd-note">Example data.</p>
      </div>
    </section>
  );
}

const MODULES = [
  { icon: "i-passport", t: "Visa" },
  { icon: "i-kaaba", t: "Hajj & Umrah" },
  { icon: "i-bed", t: "Hotel" },
  { icon: "i-map", t: "Tour" },
  { icon: "i-receipt", t: "Finance" },
];
const CATS = ["Visa issue", "Booking change", "Refund question", "Document query"];
const QUEUES = [
  { t: "Urgent open", s: "Needs immediate action", icon: "i-bell", cls: "urgent" },
  { t: "My assigned", s: "Assigned to you", icon: "i-users", cls: "" },
  { t: "Unassigned", s: "Waiting for assignment", icon: "i-tasks", cls: "" },
];
const PIPE = [
  { t: "Open", v: 14 },
  { t: "In progress", v: 9 },
  { t: "Pending", v: 5 },
  { t: "Resolved", v: 22 },
];

export function HelpdeskTop2() {
  const total = PIPE.reduce((s, p) => s + p.v, 0);
  return (
    <section className="section hd-route">
      <div className="container">
        <div className="hd-route-head">
          <div>
            <span className="eyebrow">Routing</span>
            <h2>From any module to the right queue</h2>
          </div>
          <p>Tickets can relate to any part of the business. Categories you define sort them, priority sets the urgency, and the dashboard shows what is urgent, what is yours and what nobody has picked up yet.</p>
        </div>
        <div className="hd-board">
          <div className="hd-col">
            <h3><span>1</span> Module</h3>
            <ul>{MODULES.map((m, i) => <li key={m.t} className={i === 0 ? "on" : ""}><Icon name={m.icon} />{m.t}</li>)}</ul>
          </div>
          <div className="hd-rail" aria-hidden="true"><Icon name="i-right" /></div>
          <div className="hd-col">
            <h3><span>2</span> Category</h3>
            <ul>{CATS.map((c, i) => <li key={c} className={i === 0 ? "on" : ""}>{c}</li>)}</ul>
          </div>
          <div className="hd-rail" aria-hidden="true"><Icon name="i-right" /></div>
          <div className="hd-col">
            <h3><span>3</span> Priority</h3>
            <ul className="hd-pris">
              <li><span className="hd-pri low">Low</span></li>
              <li><span className="hd-pri med">Medium</span></li>
              <li className="on"><span className="hd-pri high">High</span></li>
              <li><span className="hd-pri urgent">Urgent</span></li>
            </ul>
          </div>
          <div className="hd-rail" aria-hidden="true"><Icon name="i-right" /></div>
          <div className="hd-col hd-queues">
            <h3><span>4</span> Queue</h3>
            <ul>
              {QUEUES.map((q, i) => (
                <li key={q.t} className={`${q.cls} ${i === 1 ? "on" : ""}`}>
                  <Icon name={q.icon} />
                  <div><span className="b">{q.t}</span><small>{q.s}</small></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hd-pipe">
          <div className="hd-pipe-head"><h3>Ticket pipeline</h3><span>{total} tickets across all stages</span></div>
          <div className="hd-pipe-bar" aria-hidden="true">
            {PIPE.map((p, i) => <i key={p.t} className={`hd-s${i}`} style={{ flexGrow: p.v }} />)}
          </div>
          <ul>
            {PIPE.map((p, i) => <li key={p.t}><span className={`hd-key hd-s${i}`} />{p.t}<span className="b">{p.v}</span></li>)}
          </ul>
        </div>
        <p className="hd-note">Example data.</p>
      </div>
    </section>
  );
}

const TABS = ["General", "Customer portal", "Automation", "SLA policies", "Notifications"];
const KPIS = [
  { k: "Avg. first response", v: "1.4 hrs" },
  { k: "Avg. resolution", v: "11 hrs" },
  { k: "Currently overdue", v: "2" },
];
const BY_CAT = [
  { t: "Visa issue", v: 38 },
  { t: "Booking change", v: 27 },
  { t: "Refund question", v: 21 },
  { t: "Other", v: 14 },
];

export function HelpdeskBottom() {
  const rate = 86;
  return (
    <section className="section alt mod-after hd-cfg">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Settings and reports</span>
          <h2>Set the rules once, then measure the service</h2>
          <p>Ticket defaults, SLA policies, automation and notifications are configured in one settings screen. Reports cover workload, SLA health, response timing and staff performance for any date range.</p>
        </div>
        <div className="hd-cfg-grid">
          <div className="hd-win">
            <div className="hd-win-bar"><i /><i /><i /><span>Support ticket settings</span></div>
            <div className="hd-win-body">
              <ul className="hd-win-nav">
                {TABS.map((t, i) => <li key={t} className={i === 0 ? "on" : ""}>{t}</li>)}
              </ul>
              <div className="hd-form">
                <h3>Ticket defaults</h3>
                <label className="hd-field"><span>Ticket number prefix</span><span className="hd-input">TKT-</span></label>
                <div className="hd-field">
                  <span>Default priority</span>
                  <span className="hd-seg"><i>Low</i><i className="on">Medium</i><i>High</i><i>Urgent</i></span>
                </div>
                <div className="hd-two">
                  <label className="hd-field"><span>Auto-close after (days)</span><span className="hd-input">7</span></label>
                  <label className="hd-field"><span>Max attachment size (MB)</span><span className="hd-input">10</span></label>
                </div>
                <div className="hd-toggle">
                  <span className="hd-sw on" aria-hidden="true"><i /></span>
                  <div><span className="b">Allow customer to close tickets</span><small>For the customer portal workflow</small></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hd-rep">
            <div className="hd-rep-top">
              <div className="hd-donut" style={{ background: `conic-gradient(var(--lime) 0 ${rate}%, var(--bg-alt) ${rate}% 100%)` }}>
                <span><span className="b">{rate}%</span><small>Resolution rate</small></span>
              </div>
              <ul className="hd-kpis">
                {KPIS.map((k) => <li key={k.k}><small>{k.k}</small><span className="b">{k.v}</span></li>)}
              </ul>
            </div>
            <h3>Tickets by category</h3>
            <ul className="hd-bars">
              {BY_CAT.map((c) => (
                <li key={c.t}><span>{c.t}</span><span className="hd-bar"><i style={{ width: `${c.v}%` }} /></span><span className="b">{c.v}%</span></li>
              ))}
            </ul>
            <div className="hd-rep-foot"><span><Icon name="i-calendar" /> From / to</span><span className="hd-csv"><Icon name="i-file" /> Export CSV</span></div>
          </div>
        </div>
        <p className="hd-note">Example data.</p>
      </div>
    </section>
  );
}
