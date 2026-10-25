import Link from "next/link";
import { Icon } from "../ui";

/* Agency Website: the customer-facing storefront and what it sells. */

function Pin({ n }: { n: number }) {
  return <span className="ws-pin" aria-hidden="true">{n}</span>;
}

const CALLOUTS: [string, string][] = [
  ["SEO & analytics", "Site-wide meta tags and analytics tracking."],
  ["Logo & branding", "Your logo, site name and tagline."],
  ["Header & footer", "Navigation and footer menus, links and contact."],
  ["Translation", "Offer the site in more than one language."],
  ["Customer portal", "Sign-up, login and guest booking rules."],
  ["Theme", "Colours and layout that match your brand."],
  ["Your services", "Flight tickets first, then your active tours, hotels, visas and Hajj & Umrah packages."],
  ["Social media", "Links to your social profiles in the footer."],
  ["AI booking chat", "An AI assistant that helps visitors book flights, tours, Hajj & Umrah and visas."],
];

export function WebsiteTop1() {
  return (
    <section className="section alt ws-store">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Your storefront</span>
          <h2>One website, every part set from your admin</h2>
          <p>Each numbered area of the site below maps to a settings screen in TravelSuite ERP. No theme files, no developer queue.</p>
        </div>

        <div className="ws-store-grid">
          <div className="ws-browser" aria-hidden="true">
            <div className="ws-chrome">
              <span className="ws-dots"><i /><i /><i /></span>
              <span className="ws-url"><Icon name="i-lock" /> skytravels.example <Pin n={1} /></span>
            </div>
            <div className="ws-head">
              <span className="ws-logo"><span className="ws-logo-mk"><Icon name="i-plane" /></span> Sky Travels <Pin n={2} /></span>
              <span className="ws-nav"><span>Flights</span><span>Tours</span><span>Hotels</span><span>Visa</span><span>Hajj &amp; Umrah</span></span><Pin n={3} />
              <span className="ws-tools"><span className="ws-chip"><Icon name="i-lang" /> EN</span><Pin n={4} /><span className="ws-signin">Sign in</span><Pin n={5} /></span>
            </div>
            <div className="ws-hero">
              <Pin n={6} />
              <p className="ws-hero-t">Plan your next trip with us</p>
              <div className="ws-search">
                <div className="ws-tabs"><span className="on"><Icon name="i-plane" /> Flights</span><span>Tours</span><span>Hotels</span><span>Visa</span><span>Hajj &amp; Umrah</span></div>
                <div className="ws-fields"><span><Icon name="i-plane" /> From → To</span><span><Icon name="i-calendar" /> Travel date</span><span className="ws-go"><Icon name="i-search" /> Search</span></div>
              </div>
            </div>
            <div className="ws-cards">
              <Pin n={7} />
              {[["i-plane", "Flight deal", "Return fare · from $420"], ["i-map", "Featured tour", "5 days · from $450"], ["i-passport", "Tourist visa", "Processing 7 days"]].map(([ic, t, s]) => (
                <div key={t} className="ws-card">
                  <span className="ws-card-img"><Icon name={ic} /></span>
                  <span className="ws-card-t">{t}</span>
                  <span className="ws-card-s">{s}</span>
                </div>
              ))}
            </div>
            <div className="ws-foot">
              <span><span className="b">Explore</span><i /><i /></span>
              <span><span className="b">Useful</span><i /><i /></span>
              <span><span className="b">Helpline</span><i /><i /></span>
              <span className="ws-social"><Pin n={8} /><Icon name="i-globe" /><Icon name="i-chat" /><Icon name="i-mail" /></span>
            </div>
            <span className="ws-ai-fab"><Pin n={9} /><span className="ws-ai-fab-b"><Icon name="i-bot" /> Book with AI</span></span>
          </div>

          <ol className="ws-legend">
            {CALLOUTS.map(([t, d], i) => (
              <li key={t}><Pin n={i + 1} /><div><h3>{t}</h3><p>{d}</p></div></li>
            ))}
          </ol>
        </div>
        <p className="ws-note">Example site. Your own name, domain and content appear here.</p>
      </div>
    </section>
  );
}

const FARES: [string, string, string][] = [
  ["Airline A", "1 stop · 7h 40m · 30 kg", "$568"],
  ["Airline B", "Non-stop · 6h 05m · 40 kg", "$745"],
  ["Airline C", "1 stop · 9h 15m · 20 kg", "$588"],
];

const AI_SERVICES: [string, string][] = [
  ["i-plane", "Flight tickets"], ["i-map", "Tour packages"], ["i-kaaba", "Hajj & Umrah"], ["i-passport", "Visa processing"],
];

export function WebsiteTop2() {
  return (
    <section className="section ws-shelf">
      <div className="container">
        <div className="ws-shelf-head">
          <div>
            <span className="eyebrow">What the site sells</span>
            <h2>Your services, published straight from the modules that run them</h2>
          </div>
          <p>Flight tickets lead the site, next to every tour, hotel, visa or package you mark active, with the same prices and details your team uses. Featured items get the front row.</p>
        </div>

        <div className="ws-bento">
          <article className="ws-tile ws-t-flight">
            <div className="ws-fl-copy">
              <header><span className="ws-t-ic"><Icon name="i-plane" /></span><h3>Flight tickets</h3><span className="ws-feat"><Icon name="i-star" /> Featured</span></header>
              <p>Customers search fares, compare airlines and book flights on your site. Fares come from the GDS, NDC and low-cost sources you connect, with your markup applied, and the e-ticket and invoice go out automatically.</p>
              <div className="ws-tags"><span>One-way, return, multi-city</span><span>Airline, stops and baggage filters</span><span>Fare rules</span><span>Your markup</span><span>E-ticket by email</span></div>
            </div>
            <div className="ws-fl-mock" aria-label="Example fare search">
              <div className="ws-fl-q"><span className="b">DAC → JED</span><small>12 Mar · 1 adult · Economy</small></div>
              {FARES.map(([air, info, price], i) => (
                <div key={air} className={i === 0 ? "ws-fl-row best" : "ws-fl-row"}>
                  <span className="ws-fl-air"><Icon name="i-plane" /></span>
                  <span className="ws-fl-info"><span className="b">{air}</span><small>{info}</small></span>
                  <span className="ws-fl-price">{price}</span>
                  <span className="ws-fl-btn">Book</span>
                </div>
              ))}
              <small className="ws-fl-note">Example fares.</small>
            </div>
          </article>
          <article className="ws-tile ws-t-tour">
            <header><span className="ws-t-ic"><Icon name="i-map" /></span><h3>Tours</h3><span className="ws-feat"><Icon name="i-star" /> Featured</span></header>
            <p>Packages with destination, type and duration, adult price, categories and day-by-day itinerary.</p>
            <div className="ws-tags"><span>Destination</span><span>Tour type</span><span>Duration</span><span>Adult price</span><span>Categories</span><span>Amenities</span></div>
          </article>
          <article className="ws-tile ws-t-hotel">
            <header><span className="ws-t-ic"><Icon name="i-bed" /></span><h3>Hotels</h3><span className="ws-feat"><Icon name="i-star" /> Featured</span></header>
            <p>Properties by location with room types, rates and availability, and extra services.</p>
            <div className="ws-tags"><span>Location</span><span>Room types</span><span>Rates</span><span>Extra services</span></div>
          </article>
          <article className="ws-tile ws-t-visa">
            <header><span className="ws-t-ic"><Icon name="i-passport" /></span><h3>Visa</h3></header>
            <p>Visa packages by country and visa type, with processing time and price.</p>
            <div className="ws-tags"><span>Country</span><span>Visa type</span><span>Processing</span><span>Price</span></div>
          </article>
          <article className="ws-tile ws-t-hajj">
            <header><span className="ws-t-ic"><Icon name="i-kaaba" /></span><h3>Hajj &amp; Umrah</h3></header>
            <p>Hajj, Umrah and Ramadan Umrah packages with their services and departure dates.</p>
            <div className="ws-tags"><span>Hajj</span><span>Umrah</span><span>Ramadan Umrah</span></div>
          </article>
          <article className="ws-tile ws-t-lead">
            <span className="ws-t-ic"><Icon name="i-chat" /></span>
            <div><h3>Enquiries become leads</h3><p>Customer enquiries can create CRM leads automatically, tagged with the Website source.</p></div>
          </article>
          <article className="ws-tile ws-t-cms">
            <span className="ws-t-ic"><Icon name="i-file" /></span>
            <div><h3>Pages and blog</h3><p>About, contact, policies and articles are edited in the <Link href="/features/cms">Website CMS</Link>.</p></div>
          </article>
        </div>

        <div className="ws-ai">
          <div className="ws-ai-copy">
            <span className="eyebrow">AI booking assistant</span>
            <h3>Customers can book through an AI chat on your site</h3>
            <p>An AI assistant on your website answers questions and takes the customer from first message to booking, for flight tickets, tour packages, Hajj & Umrah packages and visa processing. Your team sees every chat and can take over at any time.</p>
            <div className="ws-ai-svc">
              {AI_SERVICES.map(([ic, t]) => <span key={t}><Icon name={ic} /> {t}</span>)}
            </div>
            <ol className="ws-ai-steps">
              <li>Asks for the route or destination, dates and number of travellers</li>
              <li>Shows matching flights, packages or visa services with prices</li>
              <li>Collects traveller details and creates the booking</li>
              <li>Hands the booking to your team, with the full chat attached</li>
            </ol>
            <p className="ws-ai-plan"><Icon name="i-spark" /> Included with AI agents on the Business plan.</p>
          </div>
          <div className="ws-chat" aria-label="Example AI booking chat">
            <div className="ws-chat-head"><span className="ws-chat-av"><Icon name="i-bot" /></span><div><span className="b">Sky Travels assistant</span><small>AI · replies instantly</small></div></div>
            <div className="ws-chat-body">
              <p className="ws-msg me">I need a flight from Dhaka to Jeddah on 12 March for 2 adults.</p>
              <div className="ws-msg ai">
                <p>Here are the best options for 12 March, 2 adults:</p>
                <div className="ws-chat-opt"><span><span className="b">Airline A</span><small>1 stop · 30 kg baggage</small></span><span className="b">$1,136</span></div>
                <div className="ws-chat-opt"><span><span className="b">Airline B</span><small>Non-stop · 40 kg baggage</small></span><span className="b">$1,490</span></div>
              </div>
              <p className="ws-msg me">The first one. Can you add an Umrah package too?</p>
              <p className="ws-msg ai">Of course. Our 14-day Umrah package starts at $2,400 per person. Shall I add it to the same booking?</p>
              <div className="ws-chat-quick"><span>Yes, add it</span><span>Show other packages</span><span>Talk to an agent</span></div>
            </div>
            <div className="ws-chat-input"><span>Type your message…</span><span className="ws-chat-send"><Icon name="i-arrow" /></span></div>
          </div>
        </div>
        <p className="ws-note">Example conversation and fares.</p>
      </div>
    </section>
  );
}

const METHODS: [string, string, string, boolean][] = [
  ["i-coins", "Cash", "Both", true],
  ["i-building", "Bank transfer", "Both", true],
  ["i-phone", "Mobile wallet", "Both", false],
  ["i-card", "Card (credit / debit)", "Receive payment", false],
  ["i-receipt", "Cheque", "Both", false],
];

const CURRENCIES: [string, string, string, string][] = [
  ["$", "USD", "$1,234.56", "Default currency"],
  ["د.إ", "AED", "1,234.56 د.إ", "Symbol after amount"],
  ["৳", "BDT", "৳1,234.56", "Symbol before amount"],
  ["€", "EUR", "1.234,56 €", "Comma for decimals"],
  ["د.ب", "BHD", "1,234.560 د.ب", "3 decimals"],
];

export function WebsiteBottom() {
  return (
    <section className="section alt mod-after ws-money">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Prices and payment</span>
          <h2>Show prices in the right format, and only the payment options you accept</h2>
          <p>Currencies and payment methods are set once and used by the website, invoices and accounts alike.</p>
        </div>

        <div className="ws-money-grid">
          <div className="ws-panel">
            <div className="ws-panel-head"><Icon name="i-wallet" /><h3>Payment methods</h3><span className="ws-col-h">Customer checkout</span></div>
            <ul className="ws-switches">
              {METHODS.map(([ic, name, use, on]) => (
                <li key={name}>
                  <span className="ws-m-ic"><Icon name={ic} /></span>
                  <span className="ws-m-name"><span className="b">{name}</span><small>Available for: {use}</small></span>
                  <span className={on ? "ws-tog on" : "ws-tog"}><i /></span>
                  <span className="ws-tog-l">{on ? "Shown" : "Hidden"}</span>
                </li>
              ))}
            </ul>
            <p className="ws-panel-foot"><Icon name="i-shield" /> Online card gateways are not built in yet. Gateway credentials can be added securely once integrations are released.</p>
          </div>

          <div className="ws-panel ws-cur">
            <div className="ws-panel-head"><Icon name="i-coins" /><h3>Currencies</h3><span className="ws-col-h">Format</span></div>
            <ul className="ws-cur-list">
              {CURRENCIES.map(([sym, code, fmt, note]) => (
                <li key={code}>
                  <span className="ws-sym">{sym}</span>
                  <span className="ws-code"><span className="b">{code}</span><small>{note}</small></span>
                  <span className="ws-fmt">{fmt}</span>
                </li>
              ))}
            </ul>
            <div className="ws-rate">
              <span className="ws-rate-ic"><Icon name="i-trend" /></span>
              <div><span className="b">Exchange rates</span><small>Update manually or pull fresh rates from an exchange-rate API.</small></div>
            </div>
          </div>
        </div>
        <p className="ws-note">Example settings.</p>
      </div>
    </section>
  );
}
