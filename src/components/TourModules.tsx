// Tour package page: package builder, pricing & booking rules and the website catalogue.
// Field names, tour types, categories and options follow the tour module's Add Tour form and Tour Settings.
import { Icon } from "./ui";

const SPECS: [string, string][] = [
  ["Meals", "Breakfast · Lunch · Dinner"],
  ["Transport", "Private car · Boat"],
  ["Stay", "Resort"],
  ["Guide", "Included"],
  ["Activity level", "Moderate"],
  ["Best season", "Winter"],
];

const DAYS = [
  { title: "Arrive in Sylhet", text: "Airport pickup, check in, evening at the tea gardens.", act: "Sightseeing", meals: "Dinner", ride: "Private car" },
  { title: "Ratargul swamp forest", text: "Boat ride through the swamp, lunch by the river.", act: "Boat ride", meals: "All meals", ride: "Boat" },
  { title: "Jaflong & departure", text: "Stone collection site and Khasia village, drop to the airport.", act: "Cultural visit", meals: "Breakfast, lunch", ride: "Private car" },
];

const TYPES = [
  ["i-users", "Group", "Shared trips with a minimum and maximum group size"],
  ["i-calendar", "Fixed departure", "Set dates and a limited number of tickets"],
  ["i-heart", "Private", "One family or company, with a private-tour charge"],
  ["i-spark", "Custom", "Built for one customer and sold as a custom booking"],
];

const PRICES: [string, string, string?][] = [["Adult", "$240", "$280"], ["Child", "$180"], ["Infant", "$40"], ["Private tour extra", "+$90"]];
const UNITS = ["Per person", "Per ticket", "Per group", "Per booking"];

const RULES = [
  ["i-clock", "Cut-off", "Bookings close 3 days before departure"],
  ["i-tasks", "Maximum tickets", "20 tickets for this departure"],
  ["i-check", "Instant booking", "Customers book and pay online"],
  ["i-chat", "Enquiry form", "Or send a question before booking"],
];

const CATEGORIES = [
  ["i-target", "Adventure Tours"],
  ["i-users", "Family Holidays"],
  ["i-heart", "Honeymoon Escapes"],
  ["i-building", "Cultural Exploration"],
  ["i-globe", "Beach Getaways"],
  ["i-kaaba", "Pilgrimage & Spiritual"],
];

const FILTERS: [string, string[]][] = [
  ["Tour type", ["Group", "Private", "Fixed departure", "Custom"]],
  ["Difficulty", ["Easy", "Moderate", "Challenging", "Hard"]],
  ["Accommodation", ["Hotel", "Resort", "Villa", "Guest house"]],
  ["Best season", ["Spring", "Summer", "Autumn", "Winter"]],
];

export function TourBuilder() {
  return (
    <section className="section alt tp-build">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Package builder</span>
          <h2>From a blank page to a bookable tour</h2>
          <p>Details, specifications and a day-by-day itinerary on one screen. Set the duration and the itinerary days are generated for you.</p>
        </div>
        <div className="tp-grid" aria-label="Example tour package">
          <article className="tp-card">
            <div className="tp-card-top">
              <span className="hj-tag">Group</span>
              <span className="tp-dur"><span className="b">3D</span>/2N</span>
            </div>
            <h3>Sylhet Tea Gardens &amp; Ratargul</h3>
            <p className="tp-meta"><span><Icon name="i-pin" />Sylhet, Bangladesh</span><span><Icon name="i-users" />2 – 20 travellers</span><span><Icon name="i-trend" />Easy</span></p>
            <dl className="tp-specs">
              {SPECS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <div className="tp-inc">
              <div><span className="b">Includes</span><ul><li>Hotel stay</li><li>Airport pickup</li><li>Breakfast</li></ul></div>
              <div className="ex"><span className="b">Excludes</span><ul><li>Personal expenses</li><li>Travel insurance</li></ul></div>
            </div>
          </article>

          <ol className="tp-days">
            {DAYS.map((d, i) => (
              <li key={d.title}>
                <span className="tp-day">Day<span className="b">{i + 1}</span></span>
                <div>
                  <h4>{d.title}</h4>
                  <p>{d.text}</p>
                  <div className="tp-tags"><span>{d.act}</span><span><Icon name="i-car" />{d.ride}</span><span>{d.meals}</span></div>
                </div>
              </li>
            ))}
            <li className="tp-gen"><Icon name="i-spark" />Days generated from the tour duration, then edited</li>
          </ol>
        </div>
        <p className="hj-note">Example tour. Field names and options from the TravelSuite tour module.</p>
      </div>
    </section>
  );
}

export function TourPricing() {
  return (
    <section className="section tp-price">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Pricing &amp; booking rules</span>
          <h2>Price it the way you sell it</h2>
          <p>Four tour types, separate prices for adults, children and infants, and rules that decide how customers book.</p>
        </div>
        <ul className="tp-types">
          {TYPES.map(([i, t, d]) => <li key={t}><span className="hm-ico"><Icon name={i} /></span><span className="b">{t}</span><small>{d}</small></li>)}
        </ul>
        <div className="tp-price-grid">
          <div className="tp-pricebox">
            <span className="tp-label">Prices</span>
            <ul>
              {PRICES.map(([k, v, was]) => (
                <li key={k}><span>{k}</span><span className="tp-amt">{was && <s>{was}</s>}<span className="b">{v}</span></span></li>
              ))}
            </ul>
            <span className="tp-label">Price unit</span>
            <div className="tp-units">{UNITS.map((u, i) => <span key={u} className={i === 0 ? "on" : undefined}>{u}</span>)}</div>
          </div>
          <ul className="tp-rules">
            {RULES.map(([i, t, d]) => <li key={t}><Icon name={i} /><div><span className="b">{t}</span><small>{d}</small></div></li>)}
            <li className="tp-owner">
              <Icon name="i-building" />
              <div><span className="b">Product owner</span><small>Your own tour, or a vendor&apos;s tour you resell on commission</small></div>
              <span className="tp-own"><span className="on">In-house</span><span>Vendor</span></span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function TourCatalogue() {
  return (
    <section className="section alt tp-cat">
      <div className="container tp-cat-grid">
        <div>
          <span className="eyebrow">Tour catalogue</span>
          <h2>A tour shop on your own website</h2>
          <p className="muted">Every active tour appears on your website with photos, video, map, FAQs and SEO fields. Categories and filters help travellers find the right trip, and featured or popular tours lead the list.</p>
          <ul className="tp-cats">
            {CATEGORIES.map(([i, c]) => <li key={c}><Icon name={i} />{c}</li>)}
          </ul>
        </div>
        <div className="tp-filter" aria-label="Example tour search filters">
          <div className="tp-filter-head"><Icon name="i-search" /><span className="b">Find your tour</span></div>
          {FILTERS.map(([k, opts], n) => (
            <div key={k} className="tp-fgroup">
              <span className="tp-label">{k}</span>
              <div>{opts.map((o, i) => <span key={o} className={i === (n % 2) ? "on" : undefined}>{o}</span>)}</div>
            </div>
          ))}
          <span className="tp-fbtn">Show 24 tours <Icon name="i-arrow" /></span>
        </div>
      </div>
    </section>
  );
}
