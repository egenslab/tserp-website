// Hotels feature page: one room priced from three sources, with the agency's profit on each,
// and the contracted allotment for the week. A static illustration of the hotel module.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Icon } from "./ui";

const SELL = 189;

const RATES = [
  { icon: "i-file", source: "Direct contract", note: "Your own seasonal rate", net: 142, best: true },
  { icon: "i-building", source: "Hotel vendor", note: "Partner rate, commission included", net: 158 },
  { icon: "i-code", source: "Supplier API", note: "Live bedbank rate", net: 171 },
];

// [day, date, rooms left]; 0 = sold out (stop-sell)
const ALLOTMENT: [string, number, number][] = [["Thu", 12, 12], ["Fri", 13, 9], ["Sat", 14, 5], ["Sun", 15, 2], ["Mon", 16, 0], ["Tue", 17, 7], ["Wed", 18, 10]];

const SUPPLIERS = ["Hotelbeds", "WebBeds", "TBO Holidays", "RateHawk", "Expedia", "Local suppliers"];

/** Real photo if public/assets/img/hotels/a.jpg exists, otherwise the drawn placeholder */
const PHOTO = existsSync(join(process.cwd(), "public/assets/img/hotels/a.jpg")) ? "/assets/img/hotels/a.jpg" : null;

const usd = (n: number) => "$" + n.toLocaleString("en-US");
const level = (n: number) => (n === 0 ? "out" : n <= 3 ? "low" : "ok");

export default function HotelShowcase() {
  const maxProfit = Math.max(...RATES.map((r) => SELL - r.net));
  return (
    <section className="section hotel-showcase">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Hotel contracting</span>
          <h2>One room, three sources, one clear profit</h2>
          <p>See every rate you can sell for the same room, what each one earns you, and how many rooms are left.</p>
        </div>

        <div className="hx" aria-label="Example of hotel rates and allotment in TravelSuite ERP">
          <div className="hx-hotel">
            <div className="hx-search">
              <span><Icon name="i-pin" />Makkah · near Haram</span>
              <span><Icon name="i-calendar" />12 – 16 Mar · 4 nights</span>
              <span><Icon name="i-users" />2 rooms · 4 guests</span>
            </div>
            <div className="hx-photo">
              {PHOTO && <img src={PHOTO} alt="Deluxe double room at Haram View Tower" width={560} height={300} loading="lazy" />}
              <span className="hx-badge"><Icon name="i-star" />5-star · 300 m to Haram</span>
            </div>
            <div className="hx-title">
              <div>
                <h3>Haram View Tower</h3>
                <p>Deluxe double · Breakfast · Free cancellation until 7 days</p>
              </div>
              <span className="hx-score">9.1</span>
            </div>
            <div className="hx-allot">
              <div className="hx-allot-head"><span className="b">Contracted allotment</span><small>Rooms left per night</small></div>
              <ol>
                {ALLOTMENT.map(([d, date, n]) => (
                  <li key={date} className={`lv-${level(n)}`}>
                    <small>{d}</small><span className="b">{date}</span><em>{n === 0 ? "Stop" : n}</em>
                  </li>
                ))}
              </ol>
              <p className="hx-legend"><i className="lv-ok" />Available <i className="lv-low" />Last rooms <i className="lv-out" />Stop-sell</p>
            </div>
          </div>

          <div className="hx-rates">
            <div className="hx-rates-head">
              <span className="b">Same room, per night</span>
              <span className="hx-sell">Sell price <span className="b">{usd(SELL)}</span></span>
            </div>
            <ul>
              {RATES.map((r) => {
                const profit = SELL - r.net;
                return (
                  <li key={r.source} className={r.best ? "best" : undefined}>
                    <span className="hx-src-ico"><Icon name={r.icon} /></span>
                    <div className="hx-src">
                      <span className="b">{r.source}{r.best && <em>Best margin</em>}</span>
                      <small>{r.note}</small>
                      <span className="hx-bar" aria-hidden="true"><i style={{ width: `${(profit / maxProfit) * 100}%` }} /></span>
                    </div>
                    <div className="hx-nums">
                      <small>Net {usd(r.net)}</small>
                      <span className="b">+{usd(profit)}</span>
                      <small>{Math.round((profit / SELL) * 100)}% margin</small>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="hx-channels">
              <span>Sell the same room as</span>
              <div>
                <span><Icon name="i-globe" />Website <span className="b">{usd(SELL)}</span></span>
                <span><Icon name="i-users" />B2B agent <span className="b">{usd(176)}</span></span>
                <span><Icon name="i-kaaba" />Umrah package <span className="b">Included</span></span>
              </div>
            </div>
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
