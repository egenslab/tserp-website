"use client";

import Link from "next/link";
import { useState } from "react";

type Period = "monthly" | "yearly" | "lifetime";
type Currency = "BDT" | "USD";

// Prices are set in USD; BDT is converted and rounded to the nearest 100
const BDT_PER_USD = 120;
const YEARLY_DISCOUNT = 0.8;

const convert = (usd: number, currency: Currency) =>
  currency === "USD" ? Math.round(usd) : Math.round((usd * BDT_PER_USD) / 100) * 100;
const format = (value: number, currency: Currency) =>
  (currency === "USD" ? "$" : "৳ ") + value.toLocaleString("en-US");

function PlanPrice({ monthly, lifetime, period, currency }: { monthly: number; lifetime: number; period: Period; currency: Currency }) {
  const perMonth = convert(period === "yearly" ? monthly * YEARLY_DISCOUNT : monthly, currency);
  if (period === "lifetime") {
    return (
      <>
        <div className="price"><b>{format(convert(lifetime, currency), currency)}</b><small>one-time</small></div>
        <p className="billing-note">Self-hosted · 12 months updates</p>
      </>
    );
  }
  return (
    <>
      <div className="price"><b>{format(perMonth, currency)}</b><small>/month</small></div>
      <p className="billing-note">
        {period === "monthly" ? "Billed monthly" : <><span>Billed yearly:</span> {format(perMonth * 12, currency)}</>}
      </p>
    </>
  );
}

/** Pricing plans with billing period (monthly / yearly / lifetime) and currency (BDT / USD) toggles. */
export default function Plans() {
  const [period, setPeriod] = useState<Period>("monthly");
  const [currency, setCurrency] = useState<Currency>("BDT");
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
        <div className="seg small" role="group" aria-label="Currency">
          <button className={currency === "BDT" ? "active" : undefined} aria-pressed={currency === "BDT"} onClick={() => setCurrency("BDT")}>৳ BDT</button>
          {" "}
          <button className={currency === "USD" ? "active" : undefined} aria-pressed={currency === "USD"} onClick={() => setCurrency("USD")}>$ USD</button>
        </div>
      </div>
      <div className="plans">
        <div className="plan">
          <h3>Starter</h3>
          <p className="plan-sub">For small agencies going digital</p>
          <PlanPrice monthly={39} lifetime={599} period={period} currency={currency} />
          <Link href="/contact" className="btn btn-outline btn-block">Request a demo</Link>
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
          <PlanPrice monthly={89} lifetime={1299} period={period} currency={currency} />
          <Link href="/contact" className="btn btn-outline btn-block">Request a demo</Link>
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
          <PlanPrice monthly={179} lifetime={2499} period={period} currency={currency} />
          <Link href="/contact" className="btn btn-lime btn-block">Request a demo</Link>
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
          <div className="price"><b>Custom</b><small /></div>
          <p className="billing-note">Tailored contract</p>
          <a href="https://wa.me/8801325277120" target="_blank" rel="noopener" className="btn btn-outline btn-block">Talk to sales</a>
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
