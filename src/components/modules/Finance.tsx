// Finance & Accounting page: invoice with payments, cash-basis P&L and receivables vs payables.
// Based on the Invoices, Transactions, Profit & Loss Report and Accounts Dashboard screens. All data is fictional.
import { Icon } from "../ui";

const usd = (n: number) => (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString("en-US");

const LINES = [
  { d: "Premium Umrah 14 days", s: "Hajj & Umrah booking · HU-0021", q: 2, p: 2400 },
  { d: "Umrah visa processing", s: "Service item", q: 2, p: 150 },
  { d: "Airport transfer", s: "Service item", q: 1, p: 100 },
];
const TOTAL = LINES.reduce((a, l) => a + l.q * l.p, 0);
const PAYMENTS = [
  { m: "Cash", d: "Day 1", a: 1500, r: "PAY-2026-0107" },
  { m: "Bank transfer", d: "Day 6", a: 500, r: "PAY-2026-0118" },
];
const PAID = PAYMENTS.reduce((a, p) => a + p.a, 0);

const SOURCES = ["Hotel booking", "Tour booking", "Visa booking", "Hajj & Umrah booking", "Quotation invoice", "Walk-in invoice", "Customer invoice"];

export function FinanceTop1() {
  return (
    <section className="section alt fn-inv">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Invoices and payments</span>
          <h2>Every invoice knows what was paid and what is left</h2>
          <p>Bookings and accepted quotations become invoices with their items. Each payment is recorded against the invoice with its method, so the paid amount, the balance and the status are always current.</p>
        </div>
        <div className="fn-inv-grid">
          <article className="fn-paper" aria-label="Example invoice">
            <header className="fn-paper-head">
              <div>
                <span className="fn-logo"><Icon name="i-globe" /> Your Agency</span>
                <small>Company details and invoice branding from settings</small>
              </div>
              <div className="fn-paper-no">
                <span className="b">INVOICE</span>
                <small>INV-2026-0042</small>
              </div>
            </header>
            <dl className="fn-paper-meta">
              <div><dt>Bill to</dt><dd>Customer 07</dd></div>
              <div><dt>Issue date</dt><dd>Day 1</dd></div>
              <div><dt>Due date</dt><dd>Day 8 <small>(7 due days)</small></dd></div>
            </dl>
            <table className="fn-lines">
              <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Amount</th></tr></thead>
              <tbody>
                {LINES.map((l) => (
                  <tr key={l.d}><td><span className="b">{l.d}</span><small>{l.s}</small></td><td>{l.q}</td><td>{usd(l.p)}</td><td>{usd(l.q * l.p)}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="fn-totals">
              <div><span>Total</span><span className="b">{usd(TOTAL)}</span></div>
              <div><span>Paid</span><span>{usd(PAID)}</span></div>
              <div className="due"><span>Due</span><span className="b">{usd(TOTAL - PAID)}</span></div>
            </div>
            <p className="fn-terms">Terms: invoice terms set once in finance settings.</p>
            <span className="fn-stamp">Partial</span>
          </article>
          <div className="fn-inv-side">
            <div className="fn-card">
              <span className="fn-lbl">Payments on this invoice</span>
              <ol className="fn-pays">
                {PAYMENTS.map((p) => (
                  <li key={p.d}><span className="fn-dot"><Icon name="i-wallet" /></span><div><span className="b">Payment · {p.m}</span><small>{p.r} · {p.d} · Completed</small></div><span className="fn-plus">+{usd(p.a)}</span></li>
                ))}
                <li className="next"><span className="fn-dot"><Icon name="i-clock" /></span><div><span className="b">Balance due</span><small>Shows in Bills Due Soon before the due date</small></div><span>{usd(TOTAL - PAID)}</span></li>
              </ol>
              <div className="fn-meter"><span style={{ width: `${(PAID / TOTAL) * 100}%` }} /></div>
              <small className="muted">{Math.round((PAID / TOTAL) * 100)}% collected</small>
            </div>
            <div className="fn-card">
              <span className="fn-lbl">Invoice types in one list</span>
              <div className="fn-src">{SOURCES.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
          </div>
        </div>
        <p className="hj-note">Example data.</p>
      </div>
    </section>
  );
}

// Waterfall (cash basis). Scale max = income received.
const MAX = 48000;
const FALL = [
  { l: "Income received", v: 48000, from: 0, k: "in" },
  { l: "Customer refunds", v: -3000, from: 45000, k: "out" },
  { l: "Net income", v: 45000, from: 0, k: "sub" },
  { l: "Expenses paid", v: -17000, from: 28000, k: "out" },
  { l: "Net profit", v: 28000, from: 0, k: "end" },
];
const METHODS = [
  { m: "Cash", i: 30000, p: 9000, r: 2000 },
  { m: "Bank transfer", i: 16000, p: 8000, r: 1000 },
  { m: "Cheque", i: 2000, p: 0, r: 0 },
];

export function FinanceTop2() {
  return (
    <section className="section fn-pl">
      <div className="container fn-pl-grid">
        <div className="fn-pl-copy">
          <span className="eyebrow">Profit &amp; loss</span>
          <h2>From money received to net profit, step by step</h2>
          <p>The Profit &amp; Loss report starts with customer payments, takes away refunds and expense payments and ends with net profit and margin. Switch to the accrual basis to include amounts still due.</p>
          <ul className="fn-pl-notes">
            <li><Icon name="i-calendar" /> Any date range, with a monthly performance chart</li>
            <li><Icon name="i-receipt" /> Invoice and expense balances: paid, partial, unpaid, overdue</li>
            <li><Icon name="i-chart" /> Top income sources and top expense categories</li>
            <li><Icon name="i-file" /> Print, export and the source records behind every total</li>
          </ul>
        </div>
        <div className="fn-pl-card" aria-label="Example income statement">
          <div className="fn-pl-top">
            <span className="b">Income statement</span>
            <div className="fn-basis"><span className="on">Cash (paid only)</span><span>Accrual (paid + due)</span></div>
          </div>
          <div className="fn-fall">
            {FALL.map((b) => (
              <div key={b.l} className="fn-col">
                <div className="fn-track">
                  <span className={`fn-bar ${b.k}`} style={{ bottom: `${(b.from / MAX) * 100}%`, height: `${(Math.abs(b.v) / MAX) * 100}%` }}>
                    <em>{usd(b.v)}</em>
                  </span>
                </div>
                <small>{b.l}</small>
              </div>
            ))}
          </div>
          <div className="fn-margin"><span>Profit margin</span><span className="b">{Math.round((28000 / 48000) * 100)}%</span><small>Net profit as a share of income</small></div>
          <div className="fn-methods">
            <span className="fn-lbl">Payment method summary</span>
            <table>
              <thead><tr><th>Method</th><th>Income</th><th>Paid</th><th>Refund</th><th>Net</th></tr></thead>
              <tbody>
                {METHODS.map((m) => (
                  <tr key={m.m}><td className="b">{m.m}</td><td>{usd(m.i)}</td><td>{usd(m.p)}</td><td>{usd(m.r)}</td><td className="b">{usd(m.i - m.p - m.r)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container"><p className="hj-note">Example data.</p></div>
    </section>
  );
}

const RECV = [
  { n: "Customer 03", r: "INV-2026-0038", d: "Due in 2 days", a: 1200 },
  { n: "Customer 07", r: "INV-2026-0042", d: "Due in 4 days", a: 3200 },
  { n: "Customer 11", r: "INV-2026-0045", d: "Due in 6 days", a: 4600 },
];
const PAYB = [
  { n: "Sky Stays Hotel", r: "EXP-2026-0019", d: "Due in 3 days", a: 8000 },
  { n: "Green Line Transport", r: "EXP-2026-0021", d: "Due in 5 days", a: 900 },
];

export function FinanceBottom() {
  return (
    <section className="section alt mod-after fn-bal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Receivables and payables</span>
          <h2>What customers owe you, against what you owe suppliers</h2>
          <p>The accounts dashboard weighs customer dues from open invoices against supplier dues from approved expenses, and lists the bills due in the next seven days on both sides.</p>
        </div>
        <div className="fn-scale" aria-label="Example receivables and payables">
          <div className="fn-beam" aria-hidden="true"><span className="fn-pivot" /></div>
          <div className="fn-pans">
            <div className="fn-pan heavy">
              <span className="fn-hook" aria-hidden="true" />
              <div className="fn-pan-head"><span className="fn-lbl">Customer due</span><span className="fn-big">$36,000</span><small>6 open invoices · $9,000 overdue</small></div>
              <span className="fn-sub">Customer invoices due soon</span>
              <ul>{RECV.map((r) => <li key={r.r}><div><span className="b">{r.n}</span><small>{r.r} · {r.d}</small></div><span>{usd(r.a)}</span></li>)}</ul>
            </div>
            <div className="fn-mid">
              <span className="fn-lbl">Net position</span>
              <span className="fn-net">+$23,500</span>
              <small>Receivables exceed payables</small>
            </div>
            <div className="fn-pan light">
              <span className="fn-hook" aria-hidden="true" />
              <div className="fn-pan-head"><span className="fn-lbl">Supplier due</span><span className="fn-big">$12,500</span><small>3 open expenses · $0 overdue</small></div>
              <span className="fn-sub">Supplier expenses due soon</span>
              <ul>{PAYB.map((r) => <li key={r.r}><div><span className="b">{r.n}</span><small>{r.r} · {r.d}</small></div><span>{usd(r.a)}</span></li>)}</ul>
            </div>
          </div>
        </div>
        <div className="fn-flow">
          <div><Icon name="i-coins" /><span className="b">Customer payments</span><small>Received against invoices, with advances</small></div>
          <div><Icon name="i-receipt" /><span className="b">Expense payments</span><small>Paid against approved supplier expenses</small></div>
          <div><Icon name="i-left" /><span className="b">Refunds</span><small>Linked to the original payment or advance</small></div>
          <div><Icon name="i-x" /><span className="b">Cancelled</span><small>Kept on record for the audit trail</small></div>
        </div>
        <p className="hj-note">Example data.</p>
      </div>
    </section>
  );
}
