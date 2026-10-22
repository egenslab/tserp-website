// Article blocks for blog posts: headings, paragraphs, lists, tables, quotes, related links and
// small illustrations (workflow diagram, invoice, plans, dashboard). Text stays in whole sentences
// or labels so the runtime translator can match every piece.
import Link from "next/link";
import { slugify, type Block, type ListItem } from "@/lib/content";
import { Icon } from "./ui";

function Item({ item }: { item: ListItem }) {
  if (typeof item === "string") return <li>{item}</li>;
  const [label, text] = item;
  return text ? <li><strong>{label}</strong> {text}</li> : <li>{label}</li>;
}

/** Plain text of a block, for the article word count. */
export function blockText(b: Block): string {
  switch (b[0]) {
    case "ul": case "ol": return b[1].map((x) => (typeof x === "string" ? x : x.join(" "))).join(" ");
    case "lp": return `${b[1]} ${b[2]}`;
    case "table": return [...b[1], ...b[2].flat()].join(" ");
    case "flow": return [...b[1], b[2]].join(" ");
    case "links": case "sources": case "figure": return "";
    default: return b[1];
  }
}

export function BlockView({ block }: { block: Block }) {
  switch (block[0]) {
    case "h2": return <h2 id={slugify(block[1])}>{block[1]}</h2>;
    case "h3": return <h3 id={slugify(block[1])}>{block[1]}</h3>;
    case "p": return <p>{block[1]}</p>;
    case "lp": return <p><strong>{block[1]}</strong> {block[2]}</p>;
    case "ul": return <ul>{block[1].map((x, i) => <Item key={i} item={x} />)}</ul>;
    case "ol": return <ol className="post-ol">{block[1].map((x, i) => <Item key={i} item={x} />)}</ol>;
    case "quote": return <blockquote className="post-quote"><p>{block[1]}</p></blockquote>;
    case "note": return <p className="post-note">{block[1]}</p>;
    case "read":
      return <p className="read-more"><span>Related guide</span><Link href={block[2]}>{block[1]} <Icon name="i-arrow" /></Link></p>;
    case "table":
      return (
        <div className="post-table-wrap">
          <table className="post-table">
            <thead><tr>{block[1].map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{block[2].map((r) => <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}</tr>)}</tbody>
          </table>
        </div>
      );
    case "flow":
      return (
        <figure className="post-fig pb-flow">
          <ol>{block[1].map((s, i) => <li key={s}><span className="pb-n">{i + 1}</span>{s}</li>)}</ol>
          <figcaption className="pb-db"><Icon name="i-layers" />{block[2]}</figcaption>
        </figure>
      );
    case "links":
      return (
        <nav className="post-links" aria-label="Explore the modules">
          <p className="pl-h">Explore the modules</p>
          <div>{block[1].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
        </nav>
      );
    case "sources":
      return (
        <div className="post-sources">
          <p className="pl-h">Sources</p>
          <ul>{block[1].map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener">{label}</a></li>)}</ul>
        </div>
      );
    case "figure":
      return block[1] === "invoice" ? <InvoiceFig /> : block[1] === "plans" ? <PlansFig /> : <DashboardFig />;
  }
}

const usd = (n: number) => "$" + n.toLocaleString("en-US");

// Same lines and payments as the invoice on the Finance & Accounting page
const LINES = [
  { d: "Premium Umrah 14 days", s: "Hajj & Umrah booking · HU-0021", q: 2, p: 2400 },
  { d: "Umrah visa processing", s: "Service item", q: 2, p: 150 },
  { d: "Airport transfer", s: "Service item", q: 1, p: 100 },
];
const PAYMENTS = [{ m: "Cash", d: "Day 1", a: 1500 }, { m: "Bank transfer", d: "Day 6", a: 500 }];
const TOTAL = LINES.reduce((a, l) => a + l.q * l.p, 0);
const PAID = PAYMENTS.reduce((a, p) => a + p.a, 0);

function InvoiceFig() {
  return (
    <figure className="post-fig pb-invoice">
      <div className="pb-card" aria-label="Example invoice">
        <div className="pb-inv-head"><span className="b">INVOICE</span><small>INV-2026-0042</small><span className="pb-chip warn">Partly paid</span></div>
        <table className="pb-lines">
          <thead><tr><th>Item</th><th>Qty</th><th>Amount</th></tr></thead>
          <tbody>{LINES.map((l) => <tr key={l.d}><td><span className="b">{l.d}</span><small>{l.s}</small></td><td>{l.q}</td><td>{usd(l.q * l.p)}</td></tr>)}</tbody>
        </table>
        <div className="pb-pay">
          {PAYMENTS.map((p) => <div key={p.m}><span>{p.m}</span><small>{p.d}</small><span className="b">{usd(p.a)}</span></div>)}
        </div>
        <div className="pb-totals">
          <div><span>Total</span><span className="b">{usd(TOTAL)}</span></div>
          <div><span>Paid</span><span>{usd(PAID)}</span></div>
          <div className="due"><span>Due</span><span className="b">{usd(TOTAL - PAID)}</span></div>
        </div>
      </div>
      <figcaption>Bookings become invoices, and every payment is recorded against the invoice, so the paid amount and the balance are always current. Example data.</figcaption>
    </figure>
  );
}

// Keep in step with components/Plans.tsx
const PLANS = [
  { name: "Starter", sub: "For small agencies going digital", price: "$39", items: ["Agency website + B2C booking", "Any 2 booking modules", "CRM, invoices & payments", "3 staff users · 1 branch"] },
  { name: "Growth", sub: "For agencies with a sales team", price: "$49", items: ["Everything in Starter", "All 6+ booking modules", "Finance & accounting, expenses", "10 staff users · 2 branches"] },
  { name: "Business", sub: "For B2B agencies & Hajj operators", price: "$99", items: ["B2B agents with commission & payouts", "AI agents & AI trip planner", "E-invoicing in 8 countries", "Unlimited users · 5 branches"], featured: true },
  { name: "Enterprise", sub: "For consolidators & groups", price: "", items: ["Everything in Business", "GDS API integrations", "Android & iOS apps", "Source code & custom development"] },
];

function PlansFig() {
  return (
    <figure className="post-fig pb-plans">
      <div className="pb-plan-grid">
        {PLANS.map((p) => (
          <div key={p.name} className={`pb-plan${p.featured ? " featured" : ""}`}>
            <p className="pb-plan-name" data-no-i18n>{p.name}</p>
            <small>{p.sub}</small>
            <p className="pb-price">{p.price ? <><span className="b">{p.price}</span><small>/month</small></> : <span className="b">Custom</span>}</p>
            <ul>{p.items.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
      <figcaption><Link href="/pricing">Compare all plans <Icon name="i-arrow" /></Link></figcaption>
    </figure>
  );
}

const KPIS = [
  { k: "Sales this month", v: "$48,250" },
  { k: "Receivables", v: "$12,980" },
  { k: "Payables", v: "$9,410" },
  { k: "Bookings", v: "126" },
];
const RECENT = [
  { id: "FL-1048", c: "Customer 01", s: "Flight", a: "$1,240", st: "Paid", tone: "ok" },
  { id: "HU-0021", c: "Customer 07", s: "Hajj & Umrah", a: "$5,200", st: "Partly paid", tone: "warn" },
  { id: "HT-0315", c: "Customer 12", s: "Hotel", a: "$640", st: "Paid", tone: "ok" },
  { id: "VS-0207", c: "Customer 04", s: "Visa", a: "$180", st: "Due", tone: "due" },
];

function DashboardFig() {
  return (
    <figure className="post-fig pb-dash">
      <div className="pb-card" aria-label="Example dashboard">
        <div className="pb-kpis">{KPIS.map((x) => <div key={x.k}><small>{x.k}</small><span className="b">{x.v}</span></div>)}</div>
        <p className="pb-sub">Recent bookings</p>
        <table className="pb-lines">
          <tbody>
            {RECENT.map((r) => (
              <tr key={r.id}><td data-no-i18n>{r.id}</td><td>{r.c}</td><td>{r.s}</td><td>{r.a}</td><td><span className={`pb-chip ${r.tone}`}>{r.st}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption>Sales, receivables and recent bookings in one view. Example data.</figcaption>
    </figure>
  );
}
