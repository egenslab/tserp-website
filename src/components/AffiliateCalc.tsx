"use client";

import { useState } from "react";
import { AFFILIATE } from "@/lib/affiliate";

// USD list prices, matching the pricing page
const PLANS = [
  { name: "Starter", monthly: 39, lifetime: 599 },
  { name: "Growth", monthly: 89, lifetime: 1299 },
  { name: "Business", monthly: 179, lifetime: 2499 },
];

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/** Estimate of affiliate earnings for a number of referred agencies. */
export default function AffiliateCalc() {
  const [count, setCount] = useState(5);
  const [plan, setPlan] = useState(1);
  const [lifetime, setLifetime] = useState(false);
  const p = PLANS[plan];
  const rate = AFFILIATE.commission / 100;
  const perAgency = lifetime ? p.lifetime * rate : p.monthly * AFFILIATE.months * rate;
  return (
    <div className="aff-calc">
      <div className="aff-calc-form">
        <label htmlFor="aff-count">
          <span>Agencies you refer <span className="b">{count}</span></span>
          <input id="aff-count" type="range" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))} />
        </label>
        <div className="aff-field">
          <span>Plan they choose</span>
          <div className="seg" role="group" aria-label="Plan">
            {PLANS.map((x, i) => (
              <button key={x.name} type="button" className={plan === i ? "active" : undefined} aria-pressed={plan === i} onClick={() => setPlan(i)}>{x.name}</button>
            ))}
          </div>
        </div>
        <div className="aff-field">
          <span>Billing</span>
          <div className="seg" role="group" aria-label="Billing">
            <button type="button" className={!lifetime ? "active" : undefined} aria-pressed={!lifetime} onClick={() => setLifetime(false)}>Monthly</button>
            <button type="button" className={lifetime ? "active" : undefined} aria-pressed={lifetime} onClick={() => setLifetime(true)}>Lifetime license</button>
          </div>
        </div>
      </div>
      <div className="aff-calc-result" aria-live="polite">
        <small>Your estimated commission</small>
        <strong>{usd(perAgency * count)}</strong>
        <p>{usd(perAgency)} per agency · {AFFILIATE.commission}% of {lifetime ? "the one-time license" : `${AFFILIATE.months} months of subscription`}</p>
      </div>
    </div>
  );
}
