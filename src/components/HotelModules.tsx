// Hotels page: catalogue, rates calendar and daily operations, based on the hotel module's admin screens.
import { Icon } from "./ui";

const CATALOGUE = [
  { icon: "i-building", title: "Hotels & destinations", text: "Locations, star rating, featured hotels" },
  { icon: "i-bed", title: "Room types", text: "Price, capacity, beds, size and photos" },
  { icon: "i-star", title: "Amenities", text: "Wi-Fi, pool, parking and your own features" },
  { icon: "i-spark", title: "Extra services", text: "Breakfast, airport pickup, late check-out" },
  { icon: "i-layers", title: "Categories", text: "Resorts, city hotels, Haram-view and more" },
  { icon: "i-search", title: "SEO pages", text: "Each hotel gets its own search-friendly page" },
];

const DAYS = ["Fri 9", "Sat 10", "Sun 11", "Mon 12", "Tue 13", "Wed 14", "Thu 15"];
// [room type, base price, cells: price | "block" | "low"]
const MATRIX: [string, (number | string)[]][] = [
  ["Deluxe Double", [142, 165, 165, 142, 142, "block", 150]],
  ["Family Suite", [210, 240, "low", 210, 210, 210, 225]],
  ["Haram View", [260, 290, 290, "low", 260, 260, 275]],
];

const OPS = [
  { icon: "i-bell", title: "Operational alerts", text: "Unpaid stays and pending confirmations first" },
  { icon: "i-calendar", title: "Today's check-ins", text: "Who arrives today and which room they get" },
  { icon: "i-wallet", title: "Payment status", text: "Paid, partial and due for every booking" },
  { icon: "i-check", title: "Booking status", text: "Pending, confirmed or cancelled at a glance" },
];

const SETTINGS = ["General", "Booking", "Pricing", "Notifications", "SEO"];

export function HotelCatalogue() {
  return (
    <section className="section alt hm-cat">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Hotel catalogue</span>
          <h2>Everything a hotel listing needs</h2>
          <p>Add a hotel once and sell it on your website, to agents and in packages.</p>
        </div>
        <div className="hm-grid">
          {CATALOGUE.map((c) => (
            <div key={c.title} className="hm-tile">
              <span className="hm-ico"><Icon name={c.icon} /></span>
              <div><h3>{c.title}</h3><p>{c.text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HotelRates() {
  return (
    <section className="section hm-rates">
      <div className="container hm-rates-grid">
        <div>
          <span className="eyebrow">Rates &amp; availability</span>
          <h2>Set prices and block rooms for any date</h2>
          <p className="muted">One calendar for every room type. Change a weekend price, raise rates for the season or block rooms for maintenance in seconds.</p>
          <ul className="hm-points">
            <li><Icon name="i-check" />Daily price per room type</li>
            <li><Icon name="i-check" />Block a room type or one room</li>
            <li><Icon name="i-check" />Rooms left per night for the whole week</li>
          </ul>
        </div>
        <div className="hm-matrix" aria-label="Example rates and availability calendar">
          <div className="hm-mrow hm-mhead"><span>Room type</span>{DAYS.map((d) => <span key={d}>{d}</span>)}</div>
          {MATRIX.map(([room, cells]) => (
            <div key={room} className="hm-mrow">
              <span className="hm-room">{room}</span>
              {cells.map((c, i) => (
                <span key={i} className={c === "block" ? "hm-cell blk" : c === "low" ? "hm-cell low" : "hm-cell"}>
                  {c === "block" ? "Blocked" : c === "low" ? "1 left" : `$${c}`}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HotelOps() {
  return (
    <section className="section alt hm-ops">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Daily operations</span>
          <h2>A hotel dashboard for your front desk</h2>
          <p>See what needs attention today, then manage every stay from one booking list.</p>
        </div>
        <div className="hm-ops-grid">
          {OPS.map((o) => (
            <div key={o.title} className="hm-op">
              <span className="hm-ico"><Icon name={o.icon} /></span>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </div>
          ))}
        </div>
        <div className="hm-settings">
          <span className="b">Hotel settings</span>
          {SETTINGS.map((s) => <span key={s} className="hm-chip">{s}</span>)}
        </div>
      </div>
    </section>
  );
}
