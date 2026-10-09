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
            <b>Dhaka (DAC)</b>
          </div>
          <div className="field">
            <small>To</small>
            <b>Dubai (DXB)</b>
          </div>
          <div className="field">
            <small>Depart</small>
            <b>14 Nov 2026</b>
          </div>
          <div className="field">
            <small>Travellers</small>
            <b>2 Adults · Economy</b>
          </div>
        </div>
        <div className={tab === "hotel" ? "search-pane active" : "search-pane"}>
          <div className="field wide">
            <small>Destination</small>
            <b>Cox's Bazar, Bangladesh</b>
          </div>
          <div className="field">
            <small>Check-in</small>
            <b>20 Dec 2026</b>
          </div>
          <div className="field">
            <small>Check-out</small>
            <b>23 Dec 2026</b>
          </div>
        </div>
        <div className={tab === "umrah" ? "search-pane active" : "search-pane"}>
          <div className="field">
            <small>Package</small>
            <b>Umrah Economy · 14 Nights</b>
          </div>
          <div className="field">
            <small>Departure</small>
            <b>Jan 2027 · Dhaka</b>
          </div>
          <div className="field">
            <small>Makkah hotel</small>
            <b>600m from Haram</b>
          </div>
          <div className="field">
            <small>Pilgrims</small>
            <b>4 Adults</b>
          </div>
        </div>
        <div className={tab === "visa" ? "search-pane active" : "search-pane"}>
          <div className="field">
            <small>Nationality</small>
            <b>Bangladesh</b>
          </div>
          <div className="field">
            <small>Destination</small>
            <b>Thailand</b>
          </div>
          <div className="field">
            <small>Visa type</small>
            <b>Tourist · Single entry</b>
          </div>
          <div className="field">
            <small>Applicants</small>
            <b>2</b>
          </div>
        </div>
        <Link href="/contact" className="btn btn-forest btn-block">Search</Link>
      </div>
      <div className="results">
        <div className="result">
          <span className="carrier">EK</span>
          <div>
            <b>DAC 21:40 → DXB 01:10</b>
            <small>Non-stop · 5h 30m · 30kg</small>
          </div>
          <strong>৳ 49,450</strong>
        </div>
        <div className="result">
          <span className="carrier">BG</span>
          <div>
            <b>DAC 09:15 → DXB 12:50</b>
            <small>Non-stop · 5h 35m · 35kg</small>
          </div>
          <strong>৳ 46,700</strong>
        </div>
      </div>
      <p className="search-note">Example of the booking engine your customers and agents will use.</p>
    </div>
  );
}
