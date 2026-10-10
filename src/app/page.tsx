import Link from "next/link";
import BlogLatest from "@/components/BlogLatest";
import CountUp from "@/components/CountUp";
import Markets from "@/components/Markets";
import Plans from "@/components/Plans";
import SearchCard from "@/components/SearchCard";
import StoriesCarousel from "@/components/StoriesCarousel";
import SuccessGrid from "@/components/SuccessGrid";
import WaPill from "@/components/WaPill";
import { JsonLd } from "@/components/ui";
import { ORG_LD, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "TravelSuite ERP — All-in-one Travel ERP for Travel Agencies",
  description: "All-in-one travel ERP for travel agencies, Hajj & Umrah and tour operators: B2B & B2C booking, accounting, CRM, your website and WhatsApp in one platform.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={ORG_LD} />
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill">B2B & B2C Booking · Travel ERP · Website · AI · Omnichannel</span>
            <h1>All-in-one travel ERP for modern <span className="hl">travel agencies</span></h1>
            <p className="lead">Manage tour packages, hotels, transport, visas, Hajj & Umrah, CRM, HRM, bookings, accounting and agents in one platform.</p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-lime btn-lg">Request a demo <svg className="ic"><use href="#i-arrow" /></svg></Link>
              {" "}
              <WaPill />
            </div>
          </div>
          <SearchCard />
        </div>
      </section>
      {/* Stats */}
      <section className="stats-wrap" aria-label="TravelSuite ERP at a glance">
        <div className="container">
          <div className="stats">
            <div className="stat">
              <div>
                <CountUp value={6} />
                <span className="b">Travel services</span>
                <small>Flight, hotel, visa, Hajj & Umrah, tours, transport</small>
              </div>
            </div>
            <div className="stat">
              <div>
                <CountUp value={12} />
                <span className="b">ERP modules</span>
                <small>CRM, sales, finance, HR, help desk and more</small>
              </div>
            </div>
            <div className="stat">
              <div>
                <CountUp value={4} />
                <span className="b">Channels, one inbox</span>
                <small>WhatsApp, Messenger, Instagram, website</small>
              </div>
            </div>
            <div className="stat">
              <div>
                <CountUp value={24} suffix="/7" />
                <span className="b">AI automation</span>
                <small>Replies, follow-ups and lead qualification</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Travel services */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Core travel services</span>
            <h2>Sell more travel products from one platform</h2>
            <p>Every service shares the same customers, agents, pricing rules and accounts, so nothing is entered twice.</p>
          </div>
          <div className="products">
            <article className="product">
              <div className="p-ico">
                <svg><use href="#i-plane" /></svg>
              </div>
              <h3>Flight Tickets</h3>
              <p>Search and book fares, issue tickets, manage PNRs, reissues, refunds and void requests.</p>
              <Link href="/features/flights" className="link-arrow">Learn more <svg className="ic"><use href="#i-arrow" /></svg></Link>
            </article>
            <article className="product">
              <div className="p-ico">
                <svg><use href="#i-bed" /></svg>
              </div>
              <h3>Hotel Booking</h3>
              <p>Your own hotel contracts and supplier rates side by side, with room-level markup and vouchers.</p>
              <Link href="/features/hotels" className="link-arrow">Learn more <svg className="ic"><use href="#i-arrow" /></svg></Link>
            </article>
            <article className="product highlight">
              <span className="new-tag">For Hajj & Umrah agencies</span>
              <div className="p-ico">
                <svg><use href="#i-kaaba" /></svg>
              </div>
              <h3>Hajj & Umrah</h3>
              <p>Pilgrim registration, passport and visa tracking, group allocation, Makkah & Madinah hotels, packages and instalment payments.</p>
              <Link href="/features/hajj" className="link-arrow">Learn more <svg className="ic"><use href="#i-arrow" /></svg></Link>
            </article>
            <article className="product">
              <div className="p-ico">
                <svg><use href="#i-passport" /></svg>
              </div>
              <h3>Visa Processing</h3>
              <p>Country requirements, document checklists, application stages and status updates for each applicant.</p>
              <Link href="/features/visa" className="link-arrow">Learn more <svg className="ic"><use href="#i-arrow" /></svg></Link>
            </article>
            <article className="product">
              <div className="p-ico">
                <svg><use href="#i-map" /></svg>
              </div>
              <h3>Tour Packages</h3>
              <p>Build day-by-day itineraries, departures, inclusions and group pricing, then sell them online.</p>
              <Link href="/features/tours" className="link-arrow">Learn more <svg className="ic"><use href="#i-arrow" /></svg></Link>
            </article>
            <article className="product">
              <div className="p-ico">
                <svg><use href="#i-car" /></svg>
              </div>
              <h3>Transport Booking</h3>
              <p>Airport transfers, intercity transport and rentals with vehicles, drivers and route pricing.</p>
              <Link href="/features/transport" className="link-arrow">Learn more <svg className="ic"><use href="#i-arrow" /></svg></Link>
            </article>
          </div>
          <div className="b2b-strip">
            <div>
              <h4>B2B & B2C booking platform</h4>
              <p>One inventory, two storefronts.</p>
            </div>
            <ul>
              <li><svg className="ic"><use href="#i-check" /></svg>B2B agent booking portal</li>
              <li><svg className="ic"><use href="#i-check" /></svg>B2C customer booking platform</li>
              <li><svg className="ic"><use href="#i-check" /></svg>Agent & customer management</li>
              <li><svg className="ic"><use href="#i-check" /></svg>Pricing & markup management</li>
              <li><svg className="ic"><use href="#i-check" /></svg>Booking & reservation workflow</li>
              <li><svg className="ic"><use href="#i-check" /></svg>Online payment integration</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Business modules (ERP) */}
      <section className="section modules-wrap" id="modules">
        <div className="container">
          <div className="section-head light">
            <span className="eyebrow">Powerful travel ERP</span>
            <h2>Run your entire agency from one platform</h2>
            <p>Your team works from one centralized system instead of spreadsheets, chat groups and separate accounting software.</p>
          </div>
          <div className="modules">
            <Link className="module" href="/features/crm">
              <span className="m-ico"><svg><use href="#i-users" /></svg></span>
              <h3>CRM</h3>
              <p>Customer profiles, lead pipeline, travel history and follow-up reminders.</p>
            </Link>
            {" "}
            <Link className="module" href="/features/sales">
              <span className="m-ico"><svg><use href="#i-trend" /></svg></span>
              <h3>Sales Management</h3>
              <p>Quotations, sales targets, staff performance and conversion tracking.</p>
            </Link>
            {" "}
            <Link className="module" href="/features/finance">
              <span className="m-ico"><svg><use href="#i-wallet" /></svg></span>
              <h3>Finance & Accounting</h3>
              <p>Double-entry ledgers, supplier payables, agent balances, bank and cash.</p>
            </Link>
            {" "}
            <Link className="module" href="/features/hr">
              <span className="m-ico"><svg><use href="#i-idcard" /></svg></span>
              <h3>HR & Employees</h3>
              <p>Employee records, attendance, leave, payroll and role permissions.</p>
            </Link>
            {" "}
            <Link className="module" href="/features/helpdesk">
              <span className="m-ico"><svg><use href="#i-headset" /></svg></span>
              <h3>Help Desk & Support</h3>
              <p>Support tickets, assignment, SLAs and full conversation history.</p>
            </Link>
            {" "}
            <Link className="module" href="/features/expenses">
              <span className="m-ico"><svg><use href="#i-receipt" /></svg></span>
              <h3>Expense Management</h3>
              <p>Office and trip expenses, approvals and branch-wise cost tracking.</p>
            </Link>
            {" "}
            <Link className="module" href="/features/invoices">
              <span className="m-ico"><svg><use href="#i-file" /></svg></span>
              <h3>Invoice & Payment</h3>
              <p>Branded invoices, money receipts, partial payments and dues.</p>
            </Link>
            {" "}
            <Link className="module" href="/features/reports">
              <span className="m-ico"><svg><use href="#i-chart" /></svg></span>
              <h3>Reports & Analytics</h3>
              <p>Sales, profit per booking, receivables, payables and cash flow.</p>
            </Link>
            {" "}
            <Link className="module" href="/features/tasks">
              <span className="m-ico"><svg><use href="#i-tasks" /></svg></span>
              <h3>Tasks & Workflows</h3>
              <p>Assign tasks, track deadlines and automate routine handovers.</p>
            </Link>
          </div>
        </div>
      </section>
      {/* Platform: website, AI, omnichannel */}
      <section className="section alt" id="platform">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Beyond the back office</span>
            <h2>Attract, engage and automate</h2>
            <p>Your website, AI assistants and every customer chat are connected to the same CRM and bookings.</p>
          </div>
          <div className="platform">
            <article className="pcard">
              <div className="pcard-top">
                <span className="m-ico dark"><svg><use href="#i-globe" /></svg></span>
                <span className="pcard-kicker">Professional website</span>
              </div>
              <h3>Your digital storefront, built for travel</h3>
              <ul>
                <li>Modern, responsive website</li>
                <li>Travel product showcase</li>
                <li>Online booking integration</li>
                <li>Inquiry forms & lead capture</li>
                <li>CMS and SEO-friendly structure</li>
                <li>Direct ERP integration</li>
              </ul>
            </article>
            <article className="pcard feature-card">
              <div className="pcard-top">
                <span className="m-ico"><svg><use href="#i-bot" /></svg></span>
                <span className="pcard-kicker">AI automation</span>
              </div>
              <h3>Work smarter. Automate more.</h3>
              <ul>
                <li>AI agents & AI trip planners</li>
                <li>Customer query automation</li>
                <li>Lead qualification</li>
                <li>Automated follow-ups</li>
                <li>Task & workflow automation</li>
                <li>AI-assisted operations</li>
              </ul>
            </article>
            <article className="pcard">
              <div className="pcard-top">
                <span className="m-ico dark"><svg><use href="#i-chat" /></svg></span>
                <span className="pcard-kicker">Omnichannel conversation</span>
              </div>
              <h3>Every customer conversation. One inbox.</h3>
              <div className="channel-logos">
                <img src="/assets/img/partners/whatsapp.svg" alt="WhatsApp" width="26" height="26" />
                {" "}
                <img src="/assets/img/partners/messenger.svg" alt="Messenger" width="26" height="26" />
                {" "}
                <img src="/assets/img/partners/instagram.svg" alt="Instagram" width="26" height="26" />
                {" "}
                <img src="/assets/img/partners/facebook.svg" alt="Facebook" width="26" height="26" />
              </div>
              <ul>
                <li>Unified customer inbox</li>
                <li>Team-based conversation assignment</li>
                <li>Full conversation history</li>
                <li>Conversation-to-CRM in one click</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
      {/* Connected journey */}
      <section className="section" id="journey">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Connected business journey</span>
            <h2>Five modules, one connected ecosystem</h2>
            <p>Customers find you on your website or social channels, start a conversation, become a qualified lead, convert into a booking and flow straight into finance and operations.</p>
          </div>
          <ol className="journey2">
            <li className="jcard dark">
              <div className="j-art">
                <img src="/assets/img/journey/attract.svg" alt="Attract travellers with your website and online booking" width="160" height="110" loading="lazy" />
              </div>
              <span className="j-ribbon"><span>Step</span> 01</span>
              <div className="j-body">
                <h3>Attract</h3>
                <span className="b">Website + B2C</span>
                <p>Travellers discover you through your website and online booking.</p>
              </div>
            </li>
            <li className="jcard">
              <div className="j-art">
                <img src="/assets/img/journey/engage.svg" alt="Engage customers on WhatsApp, Facebook and Instagram" width="160" height="110" loading="lazy" />
              </div>
              <span className="j-ribbon"><span>Step</span> 02</span>
              <div className="j-body">
                <h3>Engage</h3>
                <span className="b">WhatsApp + Facebook + Instagram</span>
                <p>Chats from every channel land in one shared inbox.</p>
              </div>
            </li>
            <li className="jcard dark">
              <div className="j-art">
                <img src="/assets/img/journey/convert.svg" alt="Convert leads with CRM, sales and booking" width="160" height="110" loading="lazy" />
              </div>
              <span className="j-ribbon"><span>Step</span> 03</span>
              <div className="j-body">
                <h3>Convert</h3>
                <span className="b">CRM + Sales + Booking</span>
                <p>Leads become quotations and confirmed bookings.</p>
              </div>
            </li>
            <li className="jcard">
              <div className="j-art">
                <img src="/assets/img/journey/operate.svg" alt="Operate ticketing, finance, HR and help desk in one ERP" width="160" height="110" loading="lazy" />
              </div>
              <span className="j-ribbon"><span>Step</span> 04</span>
              <div className="j-body">
                <h3>Operate</h3>
                <span className="b">ERP + Finance + HR + Help Desk</span>
                <p>Ticketing, accounts, HR and support run in one ERP.</p>
              </div>
            </li>
            <li className="jcard dark">
              <div className="j-art">
                <img src="/assets/img/journey/grow.svg" alt="Grow with reports and analytics" width="160" height="110" loading="lazy" />
              </div>
              <span className="j-ribbon"><span>Step</span> 05</span>
              <div className="j-body">
                <h3>Grow</h3>
                <span className="b">Reports + Analytics + Better CX</span>
                <p>Reports show what sells and where to grow next.</p>
              </div>
            </li>
          </ol>
          <div className="flow-strip" aria-label="Customer journey">
            <span>Conversation</span>
            <span>Lead</span>
            <span>CRM</span>
            <span>Sales</span>
            <span>Booking</span>
            <span>Finance & Operations</span>
          </div>
        </div>
      </section>
      {/* Features preview */}
      <section className="section alt" id="features">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Features</span>
            <h2>Included with every installation</h2>
          </div>
          <div className="features">
            <div className="feature">
              <span className="f-ico"><svg><use href="#i-palette" /></svg></span>
              <h4>White-label branding</h4>
              <p>Your logo, colours, domain and email templates.</p>
            </div>
            <div className="feature">
              <span className="f-ico"><svg><use href="#i-lang" /></svg></span>
              <h4>Multi-language</h4>
              <p>English, বাংলা, العربية and any language you add.</p>
            </div>
            <div className="feature">
              <span className="f-ico"><svg><use href="#i-coins" /></svg></span>
              <h4>Multi-currency</h4>
              <p>BDT, USD, SAR, AED and more with exchange rates.</p>
            </div>
            <div className="feature">
              <span className="f-ico"><svg><use href="#i-card" /></svg></span>
              <h4>Online payments</h4>
              <p>Visa, Mastercard, PayPal, Stripe, Apple Pay and more.</p>
            </div>
            <div className="feature">
              <span className="f-ico"><svg><use href="#i-percent" /></svg></span>
              <h4>Markup & discounts</h4>
              <p>Rules by service, supplier, agent group or date.</p>
            </div>
            <div className="feature">
              <span className="f-ico"><svg><use href="#i-lock" /></svg></span>
              <h4>Roles & permissions</h4>
              <p>Control what each staff member and branch sees.</p>
            </div>
            <div className="feature">
              <span className="f-ico"><svg><use href="#i-search" /></svg></span>
              <h4>CMS & SEO</h4>
              <p>Landing pages, offers, blog posts and meta tags.</p>
            </div>
            <div className="feature">
              <span className="f-ico"><svg><use href="#i-file" /></svg></span>
              <h4>Invoices & vouchers</h4>
              <p>Branded PDF invoices, e-tickets and hotel vouchers.</p>
            </div>
          </div>
          <div className="center-cta">
            <Link href="/features" className="btn btn-outline btn-lg">See all features <svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
        </div>
      </section>
      {/* Integrations */}
      <section className="section" id="integrations">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Integrations</span>
            <h2>Connect the suppliers and tools you already use</h2>
            <p>Bring your own supplier credentials and we connect them. New integrations are available on request.</p>
          </div>
          <div className="int-groups">
            <div className="int-group">
              <h4><svg className="ic"><use href="#i-plane" /></svg>Flights (GDS & NDC)</h4>
              <div className="logos">
                <span className="logo-tile"><span className="mono" style={{ "--c": "#0c2a6c" }}>A</span>Amadeus</span>
                {" "}
                <span className="logo-tile"><span className="mono" style={{ "--c": "#e50000" }}>S</span>Sabre</span>
                {" "}
                <span className="logo-tile"><span className="mono" style={{ "--c": "#4b2c83" }}>T</span>Travelport</span>
                {" "}
                <span className="logo-tile"><span className="mono" style={{ "--c": "#0d0d0d" }}>D</span>Duffel</span>
                {" "}
                <span className="logo-tile"><span className="mono" style={{ "--c": "#00a991" }}>K</span>Kiwi.com</span>
                {" "}
                <span className="logo-tile"><span className="mono" style={{ "--c": "#1d3c78" }}>N</span>Airline NDC</span>
              </div>
            </div>
            <div className="int-group">
              <h4><svg className="ic"><use href="#i-bed" /></svg>Hotels & tours</h4>
              <div className="logos">
                <span className="logo-tile"><span className="mono" style={{ "--c": "#f26b21" }}>H</span>Hotelbeds</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/expedia.svg" alt="Expedia logo" width="22" height="22" />Expedia</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/hotelsdotcom.svg" alt="Hotels.com logo" width="22" height="22" />Hotels.com</span>
                {" "}
                <span className="logo-tile"><span className="mono" style={{ "--c": "#1aa3dd" }}>W</span>WebBeds</span>
                {" "}
                <span className="logo-tile"><span className="mono" style={{ "--c": "#e31e24" }}>T</span>TBO</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/tripadvisor.svg" alt="Tripadvisor logo" width="22" height="22" />Tripadvisor</span>
                {" "}
                <span className="logo-tile"><span className="mono" style={{ "--c": "#ff5533" }}>G</span>GetYourGuide</span>
              </div>
            </div>
            <div className="int-group">
              <h4><svg className="ic"><use href="#i-card" /></svg>Payments</h4>
              <div className="logos">
                <span className="logo-tile"><img src="/assets/img/partners/visa.svg" alt="Visa logo" width="22" height="22" />Visa</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/mastercard.svg" alt="Mastercard logo" width="22" height="22" />Mastercard</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/americanexpress.svg" alt="American Express logo" width="22" height="22" />American Express</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/paypal.svg" alt="PayPal logo" width="22" height="22" />PayPal</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/stripe.svg" alt="Stripe logo" width="22" height="22" />Stripe</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/applepay.svg" alt="Apple Pay logo" width="22" height="22" />Apple Pay</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/googlepay.svg" alt="Google Pay logo" width="22" height="22" />Google Pay</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/razorpay.svg" alt="Razorpay logo" width="22" height="22" />Razorpay</span>
                {" "}
                <span className="logo-tile"><span className="mono" style={{ "--c": "#e2136e" }}>b</span>bKash</span>
                {" "}
                <span className="logo-tile"><span className="mono" style={{ "--c": "#2a3a8c" }}>S</span>SSLCommerz</span>
              </div>
            </div>
            <div className="int-group">
              <h4><svg className="ic"><use href="#i-chat" /></svg>Messaging & AI</h4>
              <div className="logos">
                <span className="logo-tile"><img src="/assets/img/partners/whatsapp.svg" alt="WhatsApp logo" width="22" height="22" />WhatsApp</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/messenger.svg" alt="Messenger logo" width="22" height="22" />Messenger</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/instagram.svg" alt="Instagram logo" width="22" height="22" />Instagram</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/twilio.svg" alt="Twilio SMS logo" width="22" height="22" />Twilio SMS</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/mailgun.svg" alt="Mailgun logo" width="22" height="22" />Mailgun</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/openai.svg" alt="OpenAI logo" width="22" height="22" />OpenAI</span>
              </div>
            </div>
            <div className="int-group">
              <h4><svg className="ic"><use href="#i-chart" /></svg>Accounting & analytics</h4>
              <div className="logos">
                <span className="logo-tile"><img src="/assets/img/partners/quickbooks.svg" alt="QuickBooks logo" width="22" height="22" />QuickBooks</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/xero.svg" alt="Xero logo" width="22" height="22" />Xero</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/googleanalytics.svg" alt="Google Analytics logo" width="22" height="22" />Google Analytics</span>
                {" "}
                <span className="logo-tile"><img src="/assets/img/partners/googlemaps.svg" alt="Google Maps logo" width="22" height="22" />Google Maps</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Markets />
      {/* Success stories */}
      <section className="section alt" id="success">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Success stories</span>
            <h2>Travel businesses growing on TravelSuite ERP</h2>
            <p>From Hajj & Umrah operators to B2B consolidators, here is how agencies use the platform.</p>
          </div>
          <div className="success-grid">
            <SuccessGrid limit={6} />
          </div>
          <div className="center-cta">
            <Link href="/success-stories" className="btn btn-outline btn-lg">All success stories <svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
        </div>
      </section>
      {/* Customer stories carousel */}
      <StoriesCarousel>
                <figure className="t-card">
                  <div className="stars" aria-label="5 out of 5">
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                  </div>
                  <blockquote>Very satisfied with the admin panel and the front end. You&apos;ve done phenomenal work for Imigo. Thanks to Mr. Shafiqul Islam and his team for their support throughout.</blockquote>
                  <span className="chip">Visa, flights & hotels on one platform</span>
                  <figcaption>
                    <img className="avatar photo" src="/assets/img/testimonials/syed-imigo.jpg" alt="Syed" width={46} height={46} loading="lazy" />
                    <span className="t-who"><span className="b t-name">Syed</span><span className="t-role">Founder · <span className="t-co">Imigo</span></span><span className="t-loc"><img src="/assets/img/flags/gb.svg" alt="United Kingdom flag" width={16} height={12} />United Kingdom</span></span>
                  </figcaption>
                </figure>
                <figure className="t-card">
                  <div className="stars" aria-label="5 out of 5">
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                  </div>
                  <blockquote>Since FlyAvro moved to TravelSuite ERP, bookings, invoices and follow-ups run from one dashboard. We save hours every week and support is quick.</blockquote>
                  <span className="chip">Everything in one dashboard</span>
                  <figcaption>
                    <img className="avatar photo" src="/assets/img/testimonials/flyavro.jpg" alt="Abubakar Siddiq" width={46} height={46} loading="lazy" />
                    <span className="t-who"><span className="b t-name">Abubakar Siddiq</span><span className="t-role">Founder · <span className="t-co">FlyAvro</span></span><span className="t-loc"><img src="/assets/img/flags/bd.svg" alt="Bangladesh flag" width={16} height={12} />Dhaka, Bangladesh</span></span>
                  </figcaption>
                </figure>
                <figure className="t-card">
                  <div className="stars" aria-label="5 out of 5">
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                  </div>
                  <blockquote>Our visa files, flight bookings and accounts now run in one system. Every application is tracked stage by stage, and our Dubai team has one clear view of the business.</blockquote>
                  <span className="chip">Visa, flights & ERP in one place</span>
                  <figcaption>
                    <img className="avatar photo" src="/assets/img/testimonials/globalskyvisa.jpg" alt="Golam Kibria" width={46} height={46} loading="lazy" />
                    <span className="t-who"><span className="b t-name">Golam Kibria</span><span className="t-role">Managing Director · <span className="t-co">Global Sky Visa</span></span><span className="t-loc"><img src="/assets/img/flags/ae.svg" alt="UAE flag" width={16} height={12} />Dubai, UAE</span></span>
                  </figcaption>
                </figure>
                <figure className="t-card">
                  <div className="stars" aria-label="5 out of 5">
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                  </div>
                  <blockquote>At Bengal Pass, flights, hotels, visas and tour packages now run on one platform. Bookings, payments and reports are finally in one place.</blockquote>
                  <span className="chip">Flights, hotels, visas & tours together</span>
                  <figcaption>
                    <img className="avatar photo" src="/assets/img/testimonials/bengalpass.jpg" alt="Auvi Deb Nath" width={46} height={46} loading="lazy" />
                    <span className="t-who"><span className="b t-name">Auvi Deb Nath</span><span className="t-role">Founder · <span className="t-co">Bengal Pass</span></span><span className="t-loc"><img src="/assets/img/flags/bd.svg" alt="Bangladesh flag" width={16} height={12} />Dhaka, Bangladesh</span></span>
                  </figcaption>
                </figure>
                <figure className="t-card">
                  <div className="stars" aria-label="5 out of 5">
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                  </div>
                  <blockquote>Our visa team tracks every file stage by stage, and customers get updates automatically. Calls asking for status dropped sharply.</blockquote>
                  <span className="chip">Fewer status calls</span>
                  <figcaption>
                    <span className="avatar a2">TJ</span>
                    <span className="t-who"><span className="b t-name">Operations Head</span><span className="t-role">Visa processing centre</span><span className="t-loc"><img src="/assets/img/flags/bd.svg" alt="Bangladesh flag" width={16} height={12} />Dhaka, Bangladesh</span></span>
                  </figcaption>
                </figure>
                <figure className="t-card">
                  <div className="stars" aria-label="5 out of 5">
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                    <svg><use href="#i-star" /></svg>
                  </div>
                  <blockquote>Setup, branding and payment gateway were done in under two weeks, and the support team answers quickly on WhatsApp.</blockquote>
                  <span className="chip">Live in 12 days</span>
                  <figcaption>
                    <span className="avatar a3">AR</span>
                    <span className="t-who"><span className="b t-name">CEO</span><span className="t-role">Online travel agency</span><span className="t-loc"><img src="/assets/img/flags/ae.svg" alt="UAE flag" width={16} height={12} />Dubai, UAE</span></span>
                  </figcaption>
                </figure>
      </StoriesCarousel>
      {/* Pricing teaser */}
      <section className="section alt" id="pricing">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Pricing</span>
            <h2>Plans that grow with your agency</h2>
            <p>Start with the services you sell today and add modules as you grow.</p>
          </div>
          <Plans />
          <div className="center-cta">
            <Link href="/pricing" className="btn btn-outline btn-lg">Compare all plans & add-ons <svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
        </div>
      </section>
      <BlogLatest />
      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container narrow">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Questions agencies ask us</h2>
          </div>
          <div className="faq">
            <details open>
              <summary>Is TravelSuite ERP a booking system or a full ERP?</summary>
              <p>Both. It combines B2B & B2C booking, a travel ERP (CRM, sales, finance, HR, help desk), your agency website, AI automation and an omnichannel inbox, all sharing one database.</p>
            </details>
            <details>
              <summary>Does it support Hajj & Umrah operations?</summary>
              <p>Yes. Manage pilgrim registration, passports and visas, group allocation, Makkah and Madinah hotels, transport, packages and instalment payments.</p>
            </details>
            <details>
              <summary>Can I connect WhatsApp, Facebook and Instagram?</summary>
              <p>Yes. Messages from WhatsApp, Messenger and Instagram arrive in one shared inbox, can be assigned to team members and turned into CRM leads.</p>
            </details>
            <details>
              <summary>Which payment methods are supported?</summary>
              <p>International gateways including Visa, Mastercard, American Express, PayPal, Stripe, Apple Pay and Google Pay, plus bank transfer, agent wallet and regional options such as bKash. Other gateways can be added on request.</p>
            </details>
            <details>
              <summary>Can I host it on my own server?</summary>
              <p>Yes. Choose our managed cloud on a monthly or yearly plan, or buy a lifetime license and we install it on your server free of charge.</p>
            </details>
            <details>
              <summary>How long does it take to go live?</summary>
              <p>Most agencies go live in 7 to 14 days, including branding, domain, payment gateway, data import and staff training.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
