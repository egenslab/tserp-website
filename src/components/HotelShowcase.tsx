// Hotels feature page: a static mock of the hotel search results, with a map and the inventory sources.
import { Icon } from "./ui";

type Result = {
  name: string; stars: number; source: string; distance: string; room: string;
  tags: string[]; score: string; label: string; reviews: string; price: number; nights: number; art: string; active?: boolean;
};

const RESULTS: Result[] = [
  { name: "Marina Bay Suites", stars: 5, source: "Direct contract", distance: "0.4 km from Marina Walk", room: "Deluxe room · Breakfast included",
    tags: ["Free cancellation", "Pay at hotel"], score: "8.9", label: "Excellent", reviews: "1,284", price: 214, nights: 4, art: "a" },
  { name: "Palm Shore Resort", stars: 5, source: "Bedbank", distance: "2.1 km from Marina Walk", room: "Sea-view room · Half board",
    tags: ["Member deal"], score: "9.2", label: "Excellent", reviews: "2,310", price: 262, nights: 4, art: "b", active: true },
  { name: "City Walk Apartments", stars: 4, source: "Hotel vendor", distance: "1.2 km from Marina Walk", room: "One-bedroom apartment · Room only",
    tags: ["Free cancellation"], score: "8.4", label: "Very good", reviews: "642", price: 142, nights: 4, art: "c" },
];

// Price pins on the map: [left %, top %, price]
const PINS: [number, number, number][] = [[24, 16, 198], [44, 33, 214], [72, 21, 176], [86, 40, 131], [11, 46, 305], [18, 72, 262], [77, 62, 142], [55, 82, 158]];

const SOURCES = [
  { icon: "i-file", title: "Direct contracts", text: "Load the hotels you contract yourself, with your own seasons, rates and allotments." },
  { icon: "i-building", title: "Hotel vendors", text: "Add hotel partners as vendors with their rooms, prices, commission and payouts." },
  { icon: "i-code", title: "Supplier APIs", text: "Bring live rates from the bedbanks and wholesalers you work with, using your own credentials." },
];

const SUPPLIERS = ["Hotelbeds", "WebBeds", "TBO Holidays", "RateHawk", "Expedia", "Local suppliers"];

const usd = (n: number) => "$" + n.toLocaleString("en-US");

export default function HotelShowcase() {
  return (
    <section className="section hotel-showcase">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Hotel search</span>
          <h2>Every room you can sell, side by side</h2>
          <p>Your own contracts, hotel vendors and supplier rates in one result list, with the price on the map.</p>
        </div>
        <div className="hs-frame" aria-label="Example of hotel search results">
          <div className="hs-bar">
            <span><span className="b">248</span> properties from 3 sources</span>
            <span className="hs-sort"><Icon name="i-chart" />Sort: lowest price</span>
          </div>
          <div className="hs-body">
            <ul className="hs-list">
              {RESULTS.map((r) => (
                <li key={r.name} className={r.active ? "hs-item active" : "hs-item"}>
                  <div className={`hs-photo art-${r.art}`}><span>{r.source}</span></div>
                  <div className="hs-info">
                    <h3>{r.name} <span className="hs-stars" aria-label={`${r.stars} star hotel`}>{"★".repeat(r.stars)}</span></h3>
                    <p className="hs-dist"><Icon name="i-pin" />{r.distance}</p>
                    <p className="hs-room">{r.room}</p>
                    <div className="hs-tags">{r.tags.map((t) => <span key={t} className={t === "Free cancellation" ? "ok" : undefined}>{t === "Free cancellation" && <Icon name="i-check" />}{t}</span>)}</div>
                  </div>
                  <div className="hs-price">
                    <div className="hs-score"><span><span className="b">{r.label}</span><small>{r.reviews} reviews</small></span><em>{r.score}</em></div>
                    <p className="hs-amount"><span className="b">{usd(r.price)}</span> per night</p>
                    <small>{usd(r.price * r.nights)} · {r.nights} nights, taxes included</small>
                    <span className="hs-btn">View rooms</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hs-map" aria-hidden="true">
              <span className="hs-map-tag"><Icon name="i-map" />Map</span>
              <span className="hs-zoom"><i>+</i><i>−</i></span>
              <svg className="hs-roads" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path className="sea" d="M0 0 H20 L17 18 L23 40 L16 62 L22 100 H0 Z" />
                <path className="park" d="M62 66 H82 V82 H62 Z" />
                <path className="road" d="M74 0 L50 100" />
                <path className="road" d="M17 54 L100 40" />
                <path className="road" d="M30 84 H86" />
              </svg>
              {PINS.map(([x, y, p]) => (
                <span key={p} className={p === 262 ? "hs-pin active" : "hs-pin"} style={{ left: `${x}%`, top: `${y}%` }}>{usd(p)}</span>
              ))}
              <span className="hs-scale">1 km</span>
            </div>
          </div>
          <div className="hs-sources">
            {SOURCES.map((s, i) => (
              <div key={s.title}>
                <span className="hs-num">{String(i + 1).padStart(2, "0")} <Icon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hs-suppliers">
          <h3>Hotel suppliers you can connect</h3>
          <ul>{SUPPLIERS.map((s) => <li key={s}><span className="hs-mono" aria-hidden="true">{s[0]}</span>{s}</li>)}</ul>
          <p>Connected with your own supplier contracts and credentials.</p>
        </div>
      </div>
    </section>
  );
}
