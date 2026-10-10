// Vendor Management page: marketplace settings, onboarding queue and how vendor bookings reach payables.
// Based on the Vendor Settings, Vendor Dashboard, Vendors, Vendor Bookings and Vendor Payments screens.
// All data is fictional.
import { Icon } from "../ui";

const TABS = [
  { icon: "i-globe", t: "Marketplace", s: "Agency or marketplace workflow", on: true },
  { icon: "i-layers", t: "Vendor types", s: "Reusable vendor categories", on: false },
  { icon: "i-shield", t: "KYC controls", s: "Verification and expiry rules", on: false },
];

export function VendorsTop1() {
  return (
    <section className="section alt vn-mode">
      <div className="container vn-mode-grid">
        <div className="vn-mode-copy">
          <span className="eyebrow">Agency or marketplace</span>
          <h2>Choose how you work with vendors, in one setting</h2>
          <p>Keep working as an agency that sells its own products, or switch on marketplace mode for vendor-owned bookings. Your in-house products stay available either way, and admins stay in control.</p>
          <div className="vn-modes">
            <div><span className="vn-mode-ico"><Icon name="i-building" /></span><h3>Agency workflow</h3><p>You sell in-house products and buy from suppliers. Vendors are partners you manage.</p></div>
            <div className="on"><span className="vn-mode-ico"><Icon name="i-users" /></span><h3>Marketplace workflow</h3><p>Bookings of vendor-assigned services earn your default commission, as a percentage or a fixed amount.</p></div>
          </div>
        </div>
        <div className="vn-set" aria-label="Example of the Vendor Settings screen">
          <nav className="vn-set-nav">
            <span className="vn-set-title">Vendor settings</span>
            {TABS.map((t) => (
              <div key={t.t} className={t.on ? "on" : undefined}><Icon name={t.icon} /><div><span className="b">{t.t}</span><small>{t.s}</small></div></div>
            ))}
          </nav>
          <div className="vn-set-pane">
            <h3>Marketplace mode</h3>
            <p className="vn-set-help">Set marketplace availability and the commission rule used for vendor-owned bookings.</p>
            <div className="vn-toggle-row">
              <span className="vn-toggle" aria-hidden="true"><span /></span>
              <div><span className="b">Enable marketplace mode</span><small>Keeps admin control and enables vendor marketplace workflows. In-house products remain available.</small></div>
            </div>
            <span className="vn-flabel">Default commission type</span>
            <div className="vn-radio"><span className="on"><i />Percentage</span><span><i />Fixed amount</span></div>
            <span className="vn-flabel">Default commission (%)</span>
            <div className="vn-input"><span>10</span><em>%</em></div>
            <p className="vn-calc"><Icon name="i-percent" /> On a $1,000 vendor booking, your commission is $100.</p>
            <span className="vn-save">Save marketplace settings</span>
          </div>
        </div>
      </div>
      <div className="container"><p className="hj-note">Example settings.</p></div>
    </section>
  );
}

const QUEUE = [
  { n: "Blue Lagoon Tours", id: "VND-00006", t: "Tour operator" },
  { n: "Desert Road Transfers", id: "VND-00005", t: "Transport" },
];
const ATTN = [
  { icon: "i-users", t: "Vendors pending approval", s: "KYC and approval queue", n: 3 },
  { icon: "i-file", t: "Contracts expiring soon", s: "Renew before they lapse", n: 1 },
  { icon: "i-idcard", t: "Documents expiring soon", s: "Based on KYC expiry rules", n: 2 },
  { icon: "i-calendar", t: "Open vendor bookings", s: "Services still to deliver", n: 4 },
];

export function VendorsTop2() {
  return (
    <section className="section vn-queue">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Onboarding and attention</span>
          <h2>New vendors wait in a queue until they are checked</h2>
          <p>Each vendor profile carries an onboarding status and a separate operation status. The vendor dashboard lists only the exceptions that need an admin: approvals, expiring contracts and expiring documents.</p>
        </div>
        <div className="vn-queue-grid">
          <div className="vn-stack" aria-label="Example vendor onboarding queue">
            {QUEUE.map((q, i) => (
              <div key={q.id} className={`vn-back b${i + 1}`}><span className="b">{q.n}</span><small>{q.id} · {q.t}</small></div>
            ))}
            <article className="vn-front">
              <header>
                <span className="vn-avatar">SS</span>
                <div><span className="b">Sky Stays Hotel</span><small>VND-00007 · Hotel resort</small></div>
                <span className="vn-pill wait">Pending approval</span>
              </header>
              <dl className="vn-props">
                <div><dt>Onboarding</dt><dd>Pending</dd></div>
                <div><dt>Operation</dt><dd><span className="vn-pill off">Inactive</span></dd></div>
                <div><dt>Rating</dt><dd>0 / 5 · new</dd></div>
              </dl>
              <span className="vn-sub">KYC documents</span>
              <ul className="vn-kyc">
                <li><Icon name="i-check" /><span>Business licence</span><small>Verified · expires in 11 months</small></li>
                <li><Icon name="i-check" /><span>Owner ID</span><small>Verified</small></li>
                <li className="warn"><Icon name="i-clock" /><span>Service contract</span><small>Expires in 20 days</small></li>
              </ul>
              <div className="vn-actions"><span className="vn-btn">View profile</span><span className="vn-btn main">Review</span></div>
            </article>
          </div>
          <div className="vn-attn">
            <span className="vn-sub">Needs attention</span>
            <small className="muted">Only exceptions that require admin action</small>
            <ul>
              {ATTN.map((a) => (
                <li key={a.t}><span className="vn-attn-ico"><Icon name={a.icon} /></span><div><span className="b">{a.t}</span><small>{a.s}</small></div><span className="vn-count">{a.n}</span></li>
              ))}
            </ul>
            <div className="vn-states">
              <div><span className="vn-sub">Onboarding</span><p>Draft <Icon name="i-right" /> Pending <Icon name="i-right" /> Approved</p></div>
              <div><span className="vn-sub">Operation</span><p>Active or inactive</p></div>
            </div>
          </div>
        </div>
        <p className="hj-note">Example data. KYC verification and expiry rules are set in vendor settings.</p>
      </div>
    </section>
  );
}

const FORMS = [
  { icon: "i-bed", t: "Hotel form" },
  { icon: "i-map", t: "Tour form" },
  { icon: "i-passport", t: "Visa form" },
  { icon: "i-kaaba", t: "Hajj & Umrah form" },
];

export function VendorsBottom() {
  return (
    <section className="section alt mod-after vn-flow">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Behind every vendor booking</span>
          <h2>Assign a vendor once, and bookings and payables follow</h2>
          <p>Pick the vendor on the hotel, tour, visa or Hajj &amp; Umrah form. When a customer books that service, a vendor booking appears with a snapshot of the value, commission and payable, and the payable is tracked in the shared accounts records.</p>
        </div>
        <div className="vn-hub" aria-label="Example of how a vendor booking is created">
          <div className="vn-forms">
            <span className="vn-sub">1 · Assign in the module form</span>
            {FORMS.map((f, i) => (
              <div key={f.t} className={i === 0 ? "vn-form on" : "vn-form"}>
                <Icon name={f.icon} /><span className="b">{f.t}</span>
                <span className="vn-select">{i === 0 ? "Vendor: Sky Stays Hotel" : "Vendor: select"}<Icon name="i-chev" /></span>
              </div>
            ))}
          </div>
          <div className="vn-pipe" aria-hidden="true"><span /></div>
          <div className="vn-ticket">
            <span className="vn-sub">2 · Customer books, snapshot saved</span>
            <div className="vn-ticket-card">
              <div className="vn-ticket-top"><span className="b">VB-1042</span><span className="vn-pill ok">Confirmed</span></div>
              <dl>
                <div><dt>Vendor</dt><dd>Sky Stays Hotel</dd></div>
                <div><dt>Service</dt><dd>Deluxe room, 3 nights</dd></div>
                <div><dt>Travel date</dt><dd>Day 14</dd></div>
                <div><dt>Booking value</dt><dd>$1,000</dd></div>
                <div><dt>Commission</dt><dd>$100</dd></div>
                <div className="hl"><dt>Vendor payable</dt><dd>$900</dd></div>
                <div><dt>Customer payment</dt><dd><span className="vn-pill wait">Partial</span></dd></div>
              </dl>
            </div>
          </div>
          <div className="vn-pipe" aria-hidden="true"><span /></div>
          <div className="vn-pay">
            <span className="vn-sub">3 · Pay from vendor payments</span>
            <div className="vn-pay-card">
              <div className="vn-pay-kpis">
                <div><small>Total payable</small><span className="b">$900</span></div>
                <div><small>Overdue</small><span className="b">$0</span></div>
                <div><small>Paid this month</small><span className="b">$0</span></div>
                <div><small>Open payables</small><span className="b">1</span></div>
              </div>
              <div className="vn-pay-row">
                <div><span className="b">Sky Stays Hotel</span><small>Booking VB-1042 · Due Day 20</small></div>
                <div className="vn-pay-amt"><small>Paid $0 · Due $900</small><span className="vn-pill wait">Unpaid</span></div>
              </div>
            </div>
          </div>
        </div>
        <p className="hj-note">Example data.</p>
      </div>
    </section>
  );
}
