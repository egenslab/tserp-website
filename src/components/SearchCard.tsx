"use client";

import Link from "next/link";
import { useState } from "react";

type Tab = "flight" | "hotel" | "umrah" | "visa";

/** Hero booking engine preview with service tabs. */
export default function SearchCard() {
  const [tab, setTab] = useState<Tab>("flight");
  return (
    <div className="search-card" aria-label="Booking engine preview">
      <div className="search-tabs" role="tablist">
        <button className={tab === "flight" ? "active" : undefined} role="tab" aria-selected={tab === "flight"} onClick={() => setTab("flight")}><svg className="ic"><use href="#i-plane" /></svg>Flights</button>
        {" "}
        <button className={tab === "hotel" ? "active" : undefined} role="tab" aria-selected={tab === "hotel"} onClick={() => setTab("hotel")}><svg className="ic"><use href="#i-bed" /></svg>Hotels</button>
        {" "}
        <button className={tab === "umrah" ? "active" : undefined} role="tab" aria-selected={tab === "umrah"} onClick={() => setTab("umrah")}><svg className="ic"><use href="#i-kaaba" /></svg>Umrah</button>
        {" "}
        <button className={tab === "visa" ? "active" : undefined} role="tab" aria-selected={tab === "visa"} onClick={() => setTab("visa")}><svg className="ic"><use href="#i-passport" /></svg>Visa</button>
      </div>
      <div className="search-body">
        <div className={tab === "flight" ? "search-pane active" : "search-pane"}>
          <div className="field">
            <small>From</small>
            <span className="b">Dhaka (DAC)</span>
          </div>
          <div className="field">
            <small>To</small>
            <span className="b">Dubai (DXB)</span>
          </div>
          <div className="field">
            <small>Depart</small>
            <span className="b">14 Nov 2026</span>
          </div>
          <div className="field">
            <small>Travellers</small>
            <span className="b">2 Adults · Economy</span>
          </div>
        </div>
        <div className={tab === "hotel" ? "search-pane active" : "search-pane"}>
          <div className="field wide">
            <small>Destination</small>
            <span className="b">Cox's Bazar, Bangladesh</span>
          </div>
          <div className="field">
            <small>Check-in</small>
            <span className="b">20 Dec 2026</span>
          </div>
          <div className="field">
            <small>Check-out</small>
            <span className="b">23 Dec 2026</span>
          </div>
        </div>
        <div className={tab === "umrah" ? "search-pane active" : "search-pane"}>
          <div className="field">
            <small>Package</small>
            <span className="b">Umrah Economy · 14 Nights</span>
          </div>
          <div className="field">
            <small>Departure</small>
            <span className="b">Jan 2027 · Dhaka</span>
          </div>
          <div className="field">
            <small>Makkah hotel</small>
            <span className="b">600m from Haram</span>
          </div>
          <div className="field">
            <small>Pilgrims</small>
            <span className="b">4 Adults</span>
          </div>
        </div>
        <div className={tab === "visa" ? "search-pane active" : "search-pane"}>
          <div className="field">
            <small>Nationality</small>
            <span className="b">Bangladesh</span>
          </div>
          <div className="field">
            <small>Destination</small>
            <span className="b">Thailand</span>
          </div>
          <div className="field">
            <small>Visa type</small>
            <span className="b">Tourist · Single entry</span>
          </div>
          <div className="field">
            <small>Applicants</small>
            <span className="b">2</span>
          </div>
        </div>
        <Link href="/contact" className="btn btn-forest btn-block">Search</Link>
      </div>
      <div className="results">
        <div className="result">
          <span className="carrier">EK</span>
          <div>
            <span className="b">DAC 21:40 → DXB 01:10</span>
            <small>Non-stop · 5h 30m · 30kg</small>
          </div>
          <strong>৳ 49,450</strong>
        </div>
        <div className="result">
          <span className="carrier">BG</span>
          <div>
            <span className="b">DAC 09:15 → DXB 12:50</span>
            <small>Non-stop · 5h 35m · 35kg</small>
          </div>
          <strong>৳ 46,700</strong>
        </div>
      </div>
      <p className="search-note">Example of the booking engine your customers and agents will use.</p>
    </div>
  );
}
