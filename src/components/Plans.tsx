import { WA } from "@/lib/content";

const usd = (value: number) => "$" + Math.round(value).toLocaleString("en-US");

function PlanPrice({ lifetime }: { lifetime: number }) {
  return (
    <>
      <div className="price"><span className="b">{usd(lifetime)}</span><small>one-time</small></div>
      <p className="billing-note">Lifetime updates</p>
    </>
  );
}

/** "Buy now" opens WhatsApp with the chosen plan and its lifetime license price already written in the message. */
function BuyNow({ plan, lifetime, featured = false }: { plan: string; lifetime: number; featured?: boolean }) {
  const text = `Hi, I want to buy the TravelSuite ERP ${plan} plan (lifetime license, ${usd(lifetime)}).`;
  return (
    <a href={`${WA}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener" data-plan={plan} data-value={lifetime} className={`btn btn-block ${featured ? "btn-lime" : "btn-outline"}`}>
      <svg className="ic fill"><use href="#i-wa" /></svg>Buy now
    </a>
  );
}

/** Pricing plans in USD: one-time lifetime licenses. */
export default function Plans() {
  return (
    <>
      <div className="plans">
        <div className="plan">
          <h3>Starter</h3>
          <p className="plan-sub">For small agencies going digital</p>
          <PlanPrice lifetime={599} />
          <BuyNow plan="Starter" lifetime={599} />
          <ul>
            <li>Agency website + B2C booking</li>
            <li>Any 2 booking modules</li>
            <li>CRM, invoices & payments</li>
            <li>3 staff users · 1 branch</li>
            <li>WhatsApp inbox</li>
          </ul>
        </div>
        <div className="plan">
          <h3>Growth</h3>
          <p className="plan-sub">For agencies with a sales team</p>
          <PlanPrice lifetime={799} />
          <BuyNow plan="Growth" lifetime={799} />
          <ul>
            <li>Everything in Starter</li>
            <li>All 6+ booking modules</li>
            <li>Finance & accounting, expenses</li>
            <li>10 staff users · 2 branches</li>
            <li>Messenger & Instagram inbox</li>
          </ul>
        </div>
        <div className="plan featured">
          <span className="badge">Most popular</span>
          <h3>Business</h3>
          <p className="plan-sub">For B2B agencies & Hajj operators</p>
          <PlanPrice lifetime={1499} />
          <BuyNow plan="Business" lifetime={1499} featured />
          <ul>
            <li>Everything in Growth</li>
            <li>B2B agents with commission & payouts</li>
            <li>Full ERP: HR, help desk, workflows</li>
            <li>AI agents & AI trip planner</li>
            <li>E-invoicing in 8 countries</li>
            <li>Unlimited users · 5 branches</li>
          </ul>
        </div>
        <div className="plan">
          <h3>Enterprise</h3>
          <p className="plan-sub">For consolidators & groups</p>
          <div className="price"><span className="b">Custom</span><small /></div>
          <p className="billing-note">Tailored contract</p>
          <a href={WA} target="_blank" rel="noopener" className="btn btn-outline btn-block">Talk to sales</a>
          <ul>
            <li>Everything in Business</li>
            <li>GDS API integrations</li>
            <li>Android & iOS apps</li>
            <li>Source code & custom development</li>
            <li>Dedicated account manager</li>
          </ul>
        </div>
      </div>
    </>
  );
}
