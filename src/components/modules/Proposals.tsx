// Proposals & Quotations page: validity timeline, anatomy of a quotation and quote-to-invoice handover.
// Based on the Proposals, Quotations, Invoices and Finance Settings screens. All data is fictional.
import { Icon } from "../ui";

const DAYS = 30;
const TODAY = 18;
type Row = { no: string; kind: "Proposal" | "Quotation"; title: string; who: string; owner: string; from: number; to: number; st: string; tone: "draft" | "wait" | "won" | "late"; svc?: number; flag?: string };
const ROWS: Row[] = [
  { no: "QTN-2026-0011-R1", kind: "Quotation", title: "Beach holiday, 3 nights", who: "Customer 05", owner: "SA", from: 3, to: 9, st: "Converted", tone: "won" },
  { no: "QTN-2026-0009", kind: "Quotation", title: "City hotel stay", who: "Walk-in customer", owner: "RK", from: 2, to: 11, st: "Awaiting decision", tone: "late", flag: "Validity passed" },
  { no: "PRP-2026-0006-R1", kind: "Proposal", title: "School study trip", who: "Company 02", owner: "SA", from: 5, to: 19, st: "Awaiting customer", tone: "wait", flag: "Ends tomorrow" },
  { no: "QTN-2026-0012", kind: "Quotation", title: "Family Umrah, 4 travellers", who: "Customer 02", owner: "NH", from: 14, to: 21, st: "Awaiting decision", tone: "wait", svc: 27 },
  { no: "PRP-2026-0007", kind: "Proposal", title: "Corporate retreat", who: "Company 01", owner: "RK", from: 12, to: 26, st: "Draft", tone: "draft" },
  { no: "QTN-2026-0013", kind: "Quotation", title: "Tourist visa package", who: "Customer 09", owner: "NH", from: 16, to: 23, st: "Waiting to send", tone: "draft" },
];
const pct = (d: number) => `${((d - 1) / DAYS) * 100}%`;

export function ProposalsTop1() {
  return (
    <section className="section alt pq-val">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Validity at a glance</span>
          <h2>Every offer has a start, an end and an owner</h2>
          <p>Each proposal has a date and a validity, each quotation a valid-until date. Laid out side by side, it is clear which offers to chase today and which have already run out.</p>
        </div>
        <div className="pq-gantt" aria-label="Example timeline of open proposals and quotations">
          <div className="pq-g-head">
            <span className="b">Open offers this month</span>
            <div className="pq-g-key"><span className="draft">Draft / to send</span><span className="wait">Awaiting customer</span><span className="won">Converted</span><span className="late">Past validity</span></div>
          </div>
          <div className="pq-g-scroll">
            <div className="pq-g-body">
              <div className="pq-g-axis"><span />
                <div className="pq-g-ticks">
                  {[1, 8, 15, 22, 29].map((d) => <span key={d} style={{ left: pct(d) }}>Day {d}</span>)}
                </div>
              </div>
              {ROWS.map((r) => (
                <div key={r.no} className="pq-g-row">
                  <div className="pq-g-doc">
                    <span className={r.kind === "Proposal" ? "pq-kind p" : "pq-kind q"}>{r.kind === "Proposal" ? "PRP" : "QTN"}</span>
                    <div><span className="b">{r.title}</span><small>{r.no} · {r.who}</small></div>
                    <span className="pq-owner" title="Assigned staff">{r.owner}</span>
                  </div>
                  <div className="pq-g-lane">
                    <span className={`pq-bar ${r.tone}`} style={{ left: pct(r.from), width: `${((r.to - r.from) / DAYS) * 100}%` }}>
                      <em>{r.st}</em>
                    </span>
                    {r.svc && <span className="pq-svc" style={{ left: pct(r.svc) }} title="Service date"><Icon name="i-plane" /></span>}
                    {r.flag && <span className={`pq-flag ${r.tone}`} style={{ left: pct(r.to) }}>{r.flag}</span>}
                  </div>
                </div>
              ))}
              <span className="pq-today" style={{ left: `calc(var(--pq-doc) + (100% - var(--pq-doc)) * ${(TODAY - 1) / DAYS})` }}><em>Today</em></span>
            </div>
          </div>
        </div>
        <p className="hj-note">Example data. The plane marks a quotation&apos;s service date.</p>
      </div>
    </section>
  );
}

const CALLOUTS = [
  { t: "Number and revision", x: "Each document gets a number from its prefix. A revised offer keeps the number and adds R1, R2 and so on." },
  { t: "Existing or walk-in", x: "Quote a customer already in your records, or a walk-in customer you have not added yet." },
  { t: "Assigned staff", x: "One staff member owns the follow-up. Unassigned offers are easy to spot." },
  { t: "Valid until and service date", x: "The validity tells the customer how long the price holds. The service date is when the trip happens." },
  { t: "Subject and total", x: "A clear subject and the total value, shown in the list for every offer." },
  { t: "Status", x: "Draft, waiting to send, awaiting decision, then converted when the customer accepts." },
];

export function ProposalsTop2() {
  return (
    <section className="section pq-anat">
      <div className="container pq-anat-grid">
        <div className="pq-sheet-wrap" aria-label="Example quotation with numbered callouts">
          <span className="pq-ghost g2">Original</span>
          <span className="pq-ghost g1">Revision 1</span>
          <article className="pq-sheet">
            <header>
              <span className="pq-pin">1</span>
              <div><span className="pq-kicker">Quotation</span><span className="b pq-no">QTN-2026-0012-R1</span></div>
              <span className="pq-rev">Revision 1</span>
            </header>
            <div className="pq-field"><span className="pq-pin">2</span><small>Customer</small><span className="b">Customer 02</span><span className="pq-tag">Existing customer</span></div>
            <div className="pq-field"><span className="pq-pin">3</span><small>Assigned to</small><span className="b"><span className="pq-av">NH</span> Staff member 03</span></div>
            <div className="pq-field pq-dates"><span className="pq-pin">4</span>
              <div><small>Date</small><span className="b">Day 14</span></div>
              <div><small>Valid until</small><span className="b">Day 21</span></div>
              <div><small>Service</small><span className="b">Day 27</span></div>
            </div>
            <div className="pq-field pq-sum"><span className="pq-pin">5</span>
              <div><small>Subject</small><span className="b">Family Umrah package, 4 travellers</span></div>
              <div className="pq-total"><small>Total</small><span>$6,200</span></div>
            </div>
            <footer><span className="pq-pin">6</span><small>Status</small><span className="pq-status">Awaiting decision</span></footer>
          </article>
        </div>
        <div className="pq-anat-copy">
          <span className="eyebrow">Anatomy of a quotation</span>
          <h2>Six things every offer carries</h2>
          <ol className="pq-callouts">
            {CALLOUTS.map((c, i) => (
              <li key={c.t}><span className="pq-pin">{i + 1}</span><div><h3>{c.t}</h3><p>{c.x}</p></div></li>
            ))}
          </ol>
        </div>
      </div>
      <div className="container"><p className="hj-note">Example data.</p></div>
    </section>
  );
}

const MAP = [
  { a: "Customer 02 · Existing customer", f: "Customer", b: "Customer 02" },
  { a: "Family Umrah package, 4 travellers", f: "What is sold", b: "Quotation invoice" },
  { a: "Total $6,200", f: "Amount", b: "Paid $0 / $6,200" },
  { a: "Valid until Day 21", f: "Dates", b: "Issue Day 20 · Due Day 27" },
  { a: "Status: Converted", f: "Status", b: "Status: Unpaid" },
];

const PREFIXES = [
  { p: "PRP", t: "Proposal", x: "Numbering set in the Proposal tab" },
  { p: "QTN", t: "Quotation", x: "Numbering set in the Quotation tab" },
  { p: "-R1", t: "Revision", x: "Added when an offer is revised" },
  { p: "INV", t: "Invoice", x: "Prefix, due days and terms in the Invoice tab" },
];

export function ProposalsBottom() {
  return (
    <section className="section alt mod-after pq-conv">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Quote to invoice</span>
          <h2>An accepted quotation becomes the invoice</h2>
          <p>When the customer says yes, the quotation is marked converted and a quotation invoice is created for the same customer and amount. Accounts take it from there without retyping.</p>
        </div>
        <div className="pq-map" aria-label="Example of the fields carried from a quotation to its invoice">
          <div className="pq-map-h">
            <span className="pq-doc-chip q"><Icon name="i-file" /> QTN-2026-0012-R1</span>
            <span className="pq-map-mid">Carried over</span>
            <span className="pq-doc-chip i"><Icon name="i-receipt" /> INV-2026-0050</span>
          </div>
          {MAP.map((m) => (
            <div key={m.f} className="pq-map-row">
              <span className="pq-cell">{m.a}</span>
              <span className="pq-link"><em>{m.f}</em></span>
              <span className="pq-cell out">{m.b}</span>
            </div>
          ))}
        </div>
        <div className="pq-prefix">
          {PREFIXES.map((p) => (
            <div key={p.p}><span className="pq-code">{p.p}</span><span className="b">{p.t}</span><small>{p.x}</small></div>
          ))}
        </div>
        <p className="hj-note">Example data. Numbering and terms are set in Finance settings and apply to new documents.</p>
      </div>
    </section>
  );
}
