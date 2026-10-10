// Omnichannel Inbox page sections. Every label follows the Conversations module screens
// (dashboard, inbox, contacts, reports, settings). All names and numbers are example data.
import { Icon } from "../ui";

type Ch = "wa" | "fb" | "ig";
const CH: Record<Ch, { name: string; short: string }> = {
  wa: { name: "WhatsApp", short: "WA" },
  fb: { name: "Facebook Messenger", short: "FB" },
  ig: { name: "Instagram", short: "IG" },
};

function ChBadge({ c }: { c: Ch }) {
  return (
    <span className={`oc-ch oc-ch-${c}`} title={CH[c].name} aria-label={CH[c].name}>
      {c === "wa" ? <Icon name="i-wa" className="ic fill" /> : CH[c].short}
    </span>
  );
}

const THREADS: { name: string; c: Ch; msg: string; time: string; unread?: number; state: string; on?: boolean }[] = [
  { name: "Customer 01", c: "wa", msg: "Is the 5-night Bali package still open for May?", time: "09:42", unread: 2, state: "Open", on: true },
  { name: "Customer 02", c: "ig", msg: "Commented on your post: price for 2 adults?", time: "09:30", unread: 1, state: "Unassigned" },
  { name: "Customer 03", c: "fb", msg: "Thanks, I will send the passport copy today", time: "09:12", state: "Waiting" },
  { name: "Customer 04", c: "wa", msg: "Can I pay the balance in two parts?", time: "Yesterday", state: "Open" },
];

/** Top 1: three-pane shared inbox with channel badges, filters, thread and contact panel. */
export function OmnichannelTop1() {
  return (
    <section className="section alt oc-inbox">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Shared inbox</span>
          <h2>One inbox for every chat your agency receives</h2>
          <p>WhatsApp, Messenger and Instagram messages land in the same list. Filter, assign, label and reply without switching apps or phones.</p>
        </div>

        <div className="oc-app" aria-label="Example of the shared inbox">
          <aside className="oc-list">
            <div className="oc-list-head">
              <span className="b">Conversations</span>
              <span className="oc-search"><Icon name="i-search" />Search</span>
            </div>
            <div className="oc-filters">
              <span className="on">Open <i>3</i></span>
              <span>Waiting <i>1</i></span>
              <span>Unread <i>2</i></span>
              <span>Unassigned <i>1</i></span>
            </div>
            <ul>
              {THREADS.map((t) => (
                <li key={t.name} className={t.on ? "on" : undefined}>
                  <span className="oc-av">{t.name.slice(-2)}<ChBadge c={t.c} /></span>
                  <span className="oc-li-body">
                    <span className="oc-li-top"><span className="b">{t.name}</span><small>{t.time}</small></span>
                    <span className="oc-li-msg">{t.msg}</span>
                    <span className="oc-li-tags"><em>{t.state}</em>{t.unread ? <i>{t.unread}</i> : null}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="oc-thread">
            <div className="oc-thread-head">
              <span className="oc-av sm">01<ChBadge c="wa" /></span>
              <span><span className="b">Customer 01</span><small>WhatsApp · Sky Travels main number</small></span>
              <span className="oc-assign"><Icon name="i-users" />Assigned to Agent A</span>
            </div>
            <div className="oc-msgs">
              <span className="oc-day">Today</span>
              <p className="oc-in">Hi, is the 5-night Bali package still open for May?</p>
              <p className="oc-in">We are 2 adults and 1 child.</p>
              <p className="oc-out">Yes, May departures are open. The package starts from USD 1,200 per adult. Shall I hold seats for your dates?<small>Read <Icon name="i-check" /></small></p>
              <p className="oc-in">Yes please, 12 to 17 May.</p>
              <span className="oc-typing" aria-label="Typing"><i /><i /><i /></span>
            </div>
            <div className="oc-compose">
              <span className="oc-qr"><Icon name="i-spark" />Quick replies</span>
              <span className="oc-field">Type a reply…</span>
              <span className="oc-send"><Icon name="i-right" /></span>
            </div>
          </div>

          <aside className="oc-side">
            <div className="oc-side-card">
              <span className="oc-side-t">Contact</span>
              <span className="b">Customer 01</span>
              <small>WhatsApp · Active</small>
            </div>
            <div className="oc-side-card">
              <span className="oc-side-t">Labels</span>
              <div className="oc-labels"><span>Bali</span><span>Family</span><span>Hot lead</span></div>
            </div>
            <div className="oc-side-card oc-crm">
              <span className="oc-side-t">CRM link</span>
              <span className="oc-linked"><Icon name="i-target" />Linked CRM lead</span>
              <small>Chat history stays with the lead</small>
            </div>
          </aside>
        </div>
        <p className="hj-note">Example data.</p>
      </div>
    </section>
  );
}

const ROWS: { label: string; note: string; wa: boolean; fb: boolean; ig: boolean }[] = [
  { label: "Shared inbox, assignment and labels", note: "Inbox", wa: true, fb: true, ig: true },
  { label: "Templates and quick replies", note: "Settings", wa: true, fb: true, ig: true },
  { label: "After-hours automations on business hours", note: "Settings", wa: true, fb: true, ig: true },
  { label: "Contact linked to a CRM lead or customer", note: "Contacts", wa: true, fb: true, ig: true },
  { label: "Reply up to 7 days after the 24-hour window", note: "Option", wa: false, fb: true, ig: true },
  { label: "Fetch the customer's name and photo", note: "Option", wa: false, fb: true, ig: true },
  { label: "Claim the thread from another connected app", note: "Option", wa: false, fb: true, ig: true },
  { label: "Turn a post comment into a conversation", note: "Option", wa: false, fb: false, ig: true },
];

/** Top 2: channel matrix showing what is shared and what is channel-specific. */
export function OmnichannelTop2() {
  return (
    <section className="section oc-matrix">
      <div className="container oc-mx-grid">
        <div className="oc-mx-intro">
          <span className="eyebrow">Channels</span>
          <h2>Three channels, one way of working</h2>
          <p>Your team uses the same inbox, labels and quick replies on every channel. Where Messenger and Instagram work differently from WhatsApp, settings let you choose how the inbox behaves.</p>
          <ul className="oc-mx-steps">
            <li><Icon name="i-layers" />Add each business account under Channel Accounts</li>
            <li><Icon name="i-code" />Connect its webhook in Webhook Setup</li>
            <li><Icon name="i-chart" />Check the channel summary: zero traffic usually means the webhook is not connected</li>
          </ul>
        </div>

        <div className="oc-mx" role="table" aria-label="Inbox features by channel">
          <div className="oc-mx-row oc-mx-head" role="row">
            <span role="columnheader">Feature</span>
            {(["wa", "fb", "ig"] as Ch[]).map((c) => (
              <span key={c} role="columnheader" className="oc-mx-ch"><ChBadge c={c} /><small>{c === "fb" ? "Messenger" : CH[c].name}</small></span>
            ))}
          </div>
          {ROWS.map((r) => (
            <div key={r.label} className="oc-mx-row" role="row">
              <span role="cell" className="oc-mx-label">{r.label}<small>{r.note}</small></span>
              {([r.wa, r.fb, r.ig]).map((v, n) => (
                <span key={n} role="cell" className={v ? "oc-yes" : "oc-no"} aria-label={v ? "Yes" : "Not applicable"}>
                  {v ? <Icon name="i-check" /> : "–"}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MSG = [
  { k: "Incoming", v: 100 },
  { k: "Outgoing", v: 86 },
  { k: "Delivered", v: 82 },
  { k: "Read", v: 64 },
  { k: "Failed", v: 3 },
];
const STATUS = [
  { k: "Open", v: 30, c: "a" },
  { k: "Pending", v: 15, c: "b" },
  { k: "Resolved", v: 40, c: "c" },
  { k: "Closed", v: 15, c: "d" },
];
const STAFF = [
  { k: "Agent A", v: 92 },
  { k: "Agent B", v: 74 },
  { k: "Agent C", v: 51 },
];

/** Bottom: conversation reports wall with message bars, status split and staff replies. */
export function OmnichannelBottom() {
  return (
    <section className="section alt mod-after oc-reports">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Conversation reports</span>
          <h2>See how fast your team answers, channel by channel</h2>
          <p>Filter reports by date, channel, account and staff member, then print to PDF or export to Excel CSV.</p>
        </div>

        <div className="oc-wall">
          <div className="oc-tile oc-tile-kpi">
            <Icon name="i-clock" />
            <span className="oc-kpi">4 min</span>
            <span className="b">Average first response</span>
            <small>From the first inbound message to the first staff reply</small>
          </div>

          <div className="oc-tile oc-tile-msg">
            <span className="oc-tile-t">Message report</span>
            <ul className="oc-bars">
              {MSG.map((m) => (
                <li key={m.k} className={m.k === "Failed" ? "bad" : undefined}>
                  <span>{m.k}</span>
                  <span className="oc-bar"><i style={{ width: `${Math.max(m.v, 2)}%` }} /></span>
                  <em>{m.v}</em>
                </li>
              ))}
            </ul>
          </div>

          <div className="oc-tile oc-tile-status">
            <span className="oc-tile-t">Conversation report</span>
            <div className="oc-stack" aria-hidden="true">
              {STATUS.map((s) => <i key={s.k} className={`oc-s-${s.c}`} style={{ flexGrow: s.v }} />)}
            </div>
            <ul className="oc-legend">
              {STATUS.map((s) => <li key={s.k}><i className={`oc-s-${s.c}`} />{s.k}<span className="b">{s.v}</span></li>)}
            </ul>
          </div>

          <div className="oc-tile oc-tile-ch">
            <span className="oc-tile-t">Channel report</span>
            <table className="oc-table">
              <thead><tr><th>Channel</th><th>Chats</th><th>CRM leads</th></tr></thead>
              <tbody>
                <tr><td><ChBadge c="wa" />WhatsApp</td><td>60</td><td>18</td></tr>
                <tr><td><ChBadge c="fb" />Messenger</td><td>25</td><td>6</td></tr>
                <tr><td><ChBadge c="ig" />Instagram</td><td>15</td><td>5</td></tr>
              </tbody>
            </table>
          </div>

          <div className="oc-tile oc-tile-staff">
            <span className="oc-tile-t">Staff report · replies</span>
            <ul className="oc-cols">
              {STAFF.map((s) => (
                <li key={s.k}><span className="oc-col"><i style={{ height: `${s.v}%` }} /></span><small>{s.k}</small></li>
              ))}
            </ul>
          </div>

          <div className="oc-tile oc-tile-auto">
            <span className="oc-tile-t">Automation report</span>
            <div className="oc-auto">
              <span><span className="b">40</span>Executed</span>
              <span className="ok"><span className="b">38</span>Successful</span>
              <span className="bad"><span className="b">2</span>Failed</span>
            </div>
          </div>
        </div>
        <p className="hj-note">Example data.</p>
      </div>
    </section>
  );
}
