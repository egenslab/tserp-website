"use client";

import Link from "next/link";
import { useState } from "react";

type Tab = "flight" | "hotel" | "umrah" | "visa";
type Result = { badge: string; title: string; meta: string; price: string };

const BUTTON: Record<Tab, string> = { flight: "Search flights", hotel: "Search hotels", umrah: "Find packages", visa: "Check visa" };

// Sample results for each tab, matching the search shown above them
const RESULTS: Record<Tab, Result[]> = {
  flight: [
    { badge: "EK", title: "DAC 21:40 → DXB 01:10", meta: "Non-stop · 5h 30m · 30kg", price: "৳ 49,450" },
    { badge: "BG", title: "DAC 09:15 → DXB 12:50", meta: "Non-stop · 5h 35m · 35kg", price: "৳ 46,700" },
  ],
  hotel: [
    { badge: "5★", title: "Sea Pearl Beach Resort", meta: "Sea view · Breakfast · 3 nights", price: "৳ 38,900" },
    { badge: "4★", title: "Long Beach Hotel", meta: "Deluxe room · Free cancellation", price: "৳ 24,600" },
  ],
  umrah: [
    { badge: "14N", title: "Economy Umrah Package", meta: "Flight · Visa · Makkah 600m from Haram", price: "৳ 1,45,000" },
    { badge: "10N", title: "Premium Umrah Package", meta: "Flight · Visa · 5★ next to Haram", price: "৳ 2,35,000" },
  ],
  visa: [
    { badge: "TH", title: "Thailand Tourist Visa", meta: "Single entry · 60 days · 7–10 working days", price: "৳ 6,500" },
    { badge: "eV", title: "Thailand e-Visa", meta: "Online · 3–5 working days", price: "৳ 7,900" },
  ],
};

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
        <Link href="/contact" className="btn btn-forest btn-block">{BUTTON[tab]}</Link>
      </div>
      <div className="results" key={tab}>
        {RESULTS[tab].map((r) => (
          <div key={r.title} className="result">
            <span className="carrier">{r.badge}</span>
            <div>
              <span className="b">{r.title}</span>
              <small>{r.meta}</small>
            </div>
            <strong>{r.price}</strong>
          </div>
        ))}
      </div>
      <p className="search-note">Example of the booking engine your customers and agents will use.</p>
    </div>
  );
}
