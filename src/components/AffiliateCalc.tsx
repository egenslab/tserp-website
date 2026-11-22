"use client";

import { useState } from "react";
import { AFFILIATE } from "@/lib/affiliate";

// USD list prices, matching the pricing page
const PLANS = [
  { name: "Starter", lifetime: 599 },
  { name: "Growth", lifetime: 799 },
  { name: "Business", lifetime: 1499 },
];

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/** Estimate of affiliate earnings for a number of referred agencies. */
export default function AffiliateCalc() {
  const [count, setCount] = useState(5);
  const [plan, setPlan] = useState(1);
  const p = PLANS[plan];
  const rate = AFFILIATE.commission / 100;
  const perAgency = p.lifetime * rate;
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
      </div>
      <div className="aff-calc-result" aria-live="polite">
        <small>Your estimated commission</small>
        <strong>{usd(perAgency * count)}</strong>
        <p>{usd(perAgency)} per agency · {`${AFFILIATE.commission}% of the one-time license`}</p>
      </div>
    </div>
  );
}
