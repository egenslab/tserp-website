// Transport page: transport inside trips (tour transport types and airport pickup) and hired
// vehicles through the Vendor Management module. Vendors and amounts are examples.
import { Icon } from "./ui";

const LEGS = [
  { icon: "i-car", mode: "Private car", route: "Dhaka airport → hotel", when: "Day 1 · 14:30", part: "Tour package", by: "Own vehicle" },
  { icon: "i-plane", mode: "Domestic flight", route: "Dhaka → Cox's Bazar", when: "Day 2 · 08:10", part: "Flight booking", by: "Airline" },
  { icon: "i-users", mode: "Coach bus", route: "Cox's Bazar → Teknaf", when: "Day 2 · 11:00", part: "Tour package", by: "Vendor" },
  { icon: "i-globe", mode: "Boat transfer", route: "Teknaf → Saint Martin", when: "Day 2 · 15:30", part: "Tour package", by: "Vendor" },
];

const SERVICES = [
  { name: "Airport sedan", place: "Jeddah airport → Makkah", vendor: "Haram Express Transport", price: 120, payout: 96 },
  { name: "49-seat coach", place: "Makkah → Madinah", vendor: "Al-Safa Coaches", price: 640, payout: 540 },
  { name: "Microbus with driver", place: "Sylhet, full day", vendor: "Green Valley Rent-a-Car", price: 85, payout: 70 },
];

const VENDORS = [
  { name: "Haram Express Transport", rating: 4.8, trips: 214, kyc: "Verified" },
  { name: "Al-Safa Coaches", rating: 4.6, trips: 132, kyc: "Verified" },
  { name: "Sea Pearl Boats", rating: 4.3, trips: 58, kyc: "Expires in 21 days" },
];

const usd = (n: number) => "$" + n.toLocaleString("en-US");

export function TransportTrip() {
  return (
    <section className="section alt tr-trip">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Transport in every trip</span>
          <h2>Every transfer, on the same booking</h2>
          <p>Car, coach, domestic flight and boat legs sit inside the tour, Umrah or hotel booking, so the customer, the operations team and accounts all see the same plan.</p>
        </div>
        <ol className="tr-legs" aria-label="Example trip with four transport legs">
          {LEGS.map((l) => (
            <li key={l.route}>
              <span className="tr-ico"><Icon name={l.icon} /></span>
              <span className="tr-mode">{l.mode}</span>
              <span className="b">{l.route}</span>
              <small>{l.when}</small>
              <div className="tr-foot"><span>{l.part}</span><span className={l.by === "Vendor" ? "v" : undefined}>{l.by}</span></div>
            </li>
          ))}
        </ol>
        <p className="hj-note">Transport types from the tour module settings. Example trip.</p>
      </div>
    </section>
  );
}

export function TransportVendors() {
  return (
    <section className="section tr-vend">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Hired vehicles</span>
          <h2>Know what you keep on every hired vehicle</h2>
          <p>Add transport companies as vendors and their vehicles as services. Each one shows the customer price, your commission and what you owe the vendor.</p>
        </div>
        <div className="tr-svc">
          {SERVICES.map((s) => {
            const com = s.price - s.payout;
            return (
              <article key={s.name}>
                <div className="tr-svc-top"><span className="hm-ico"><Icon name="i-car" /></span><div><span className="b">{s.name}</span><small>{s.place}</small></div></div>
                <small className="tr-by">{s.vendor}</small>
                <span className="tr-split" aria-hidden="true">
                  <i style={{ width: `${(s.payout / s.price) * 100}%` }} />
                </span>
                <dl>
                  <div><dt>Customer price</dt><dd>{usd(s.price)}</dd></div>
                  <div><dt>Vendor payout</dt><dd>{usd(s.payout)}</dd></div>
                  <div className="you"><dt>Your commission</dt><dd>+{usd(com)}</dd></div>
                </dl>
              </article>
            );
          })}
        </div>
        <div className="tr-pay">
          <span className="b"><Icon name="i-wallet" />Vendor payables this month</span>
          <div><small>Total</small><span className="b">$8,420</span></div>
          <div><small>Paid</small><span className="b">$6,100</span></div>
          <div className="due"><small>Due</small><span className="b">$2,320</span></div>
        </div>
        <p className="hj-note">Example vendors and amounts.</p>
      </div>
    </section>
  );
}

export function TransportScorecard() {
  return (
    <section className="section alt tr-score">
      <div className="container tr-score-grid">
        <div>
          <span className="eyebrow">Vendor performance</span>
          <h2>Book the transport companies that deliver</h2>
          <p className="muted">Rate every vendor after the trip, keep their KYC documents on file with expiry alerts, and see your best partners at the top of the leaderboard.</p>
          <ul className="tr-points">
            <li><Icon name="i-star" />Ratings and feedback after each booking</li>
            <li><Icon name="i-shield" />KYC verification with expiry rules</li>
            <li><Icon name="i-percent" />Default commission as a percentage or fixed amount</li>
          </ul>
        </div>
        <div className="tr-board" aria-label="Example vendor leaderboard">
          <div className="tr-board-head"><span className="b">Vendor leaderboard</span><small>Transport</small></div>
          {VENDORS.map((v, i) => (
            <div key={v.name} className="tr-vrow">
              <span className="tr-rank">{i + 1}</span>
              <div><span className="b">{v.name}</span><small>{v.trips} bookings</small></div>
              <span className="tr-rate"><Icon name="i-star" />{v.rating}</span>
              <span className={v.kyc === "Verified" ? "tr-kyc ok" : "tr-kyc warn"}>{v.kyc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
