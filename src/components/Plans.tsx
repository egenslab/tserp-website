"use client";

import { useState } from "react";
import { WA } from "@/lib/content";

type Period = "monthly" | "yearly" | "lifetime";

const YEARLY_DISCOUNT = 0.8;
const PERIOD_LABEL: Record<Period, string> = { monthly: "monthly", yearly: "yearly", lifetime: "lifetime license" };

const usd = (value: number) => "$" + Math.round(value).toLocaleString("en-US");

function PlanPrice({ monthly, lifetime, period }: { monthly: number; lifetime: number; period: Period }) {
  const perMonth = period === "yearly" ? monthly * YEARLY_DISCOUNT : monthly;
  if (period === "lifetime") {
    return (
      <>
        <div className="price"><span className="b">{usd(lifetime)}</span><small>one-time</small></div>
        <p className="billing-note">Self-hosted · 12 months updates</p>
      </>
    );
  }
  return (
    <>
      <div className="price"><span className="b">{usd(perMonth)}</span><small>/month</small></div>
      <p className="billing-note">
        {period === "monthly" ? "Billed monthly" : <><span>Billed yearly:</span> {usd(perMonth * 12)}</>}
      </p>
    </>
  );
}

/** "Buy now" opens WhatsApp with the chosen plan and billing already written in the message. */
function BuyNow({ plan, monthly, lifetime, period, featured = false }: { plan: string; monthly: number; lifetime: number; period: Period; featured?: boolean }) {
  const price = period === "lifetime" ? usd(lifetime)
    : period === "yearly" ? `${usd(monthly * YEARLY_DISCOUNT * 12)}/year` : `${usd(monthly)}/month`;
  const text = `Hi, I want to buy the TravelSuite ERP ${plan} plan (${PERIOD_LABEL[period]}, ${price}).`;
  return (
    <a href={`${WA}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener" className={`btn btn-block ${featured ? "btn-lime" : "btn-outline"}`}>
      <svg className="ic fill"><use href="#i-wa" /></svg>Buy now
    </a>
  );
}

/** Pricing plans in USD with a billing period toggle (monthly / yearly / lifetime). */
export default function Plans() {
  const [period, setPeriod] = useState<Period>("monthly");
  return (
    <>
      <div className="pricing-controls">
        <div className="seg" role="group" aria-label="Billing period">
          <button className={period === "monthly" ? "active" : undefined} aria-pressed={period === "monthly"} onClick={() => setPeriod("monthly")}>Monthly</button>
          {" "}
          <button className={period === "yearly" ? "active" : undefined} aria-pressed={period === "yearly"} onClick={() => setPeriod("yearly")}>Yearly <em>Save 20%</em></button>
          {" "}
          <button className={period === "lifetime" ? "active" : undefined} aria-pressed={period === "lifetime"} onClick={() => setPeriod("lifetime")}>Lifetime license</button>
        </div>
      </div>
      <div className="plans">
        <div className="plan">
          <h3>Starter</h3>
          <p className="plan-sub">For small agencies going digital</p>
          <PlanPrice monthly={39} lifetime={599} period={period} />
          <BuyNow plan="Starter" monthly={39} lifetime={599} period={period} />
          <ul>
            <li>Agency website + B2C booking</li>
            <li>Any 2 travel services</li>
            <li>CRM, invoices & payments</li>
            <li>3 staff users · 1 branch</li>
            <li>WhatsApp inbox</li>
          </ul>
        </div>
        <div className="plan">
          <h3>Growth</h3>
          <p className="plan-sub">For agencies with a sales team</p>
          <PlanPrice monthly={89} lifetime={1299} period={period} />
          <BuyNow plan="Growth" monthly={89} lifetime={1299} period={period} />
          <ul>
            <li>Everything in Starter</li>
            <li>All 6 travel services</li>
            <li>Finance & accounting, expenses</li>
            <li>10 staff users · 2 branches</li>
            <li>Messenger & Instagram inbox</li>
          </ul>
        </div>
        <div className="plan featured">
          <span className="badge">Most popular</span>
          <h3>Business</h3>
          <p className="plan-sub">For B2B agencies & Hajj operators</p>
          <PlanPrice monthly={179} lifetime={2499} period={period} />
          <BuyNow plan="Business" monthly={179} lifetime={2499} period={period} featured />
          <ul>
            <li>Everything in Growth</li>
            <li>B2B agent portal with credit & wallet</li>
            <li>Full ERP: HR, help desk, workflows</li>
            <li>AI agents & AI trip planner</li>
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
            <li>GDS / NDC API integrations</li>
            <li>Android & iOS apps</li>
            <li>Source code & custom development</li>
            <li>Dedicated account manager</li>
          </ul>
        </div>
      </div>
    </>
  );
}
