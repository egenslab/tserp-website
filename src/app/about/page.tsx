import Markets from "@/components/Markets";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About TravelSuite ERP — Travel Agency Software Company",
  description: "TravelSuite ERP is an all-in-one digital platform built for travel agencies, tour operators and Hajj & Umrah operators.",
  path: "/about",
});

const WHY: [icon: string, title: string, text: string, tags: string][] = [
  ["i-plane", "Made for travel, not adapted", "PNRs, pilgrims, visa files and agent wallets are built in, not bolted onto a generic ERP.", "Hajj|Visa|B2B"],
  ["i-wallet", "Local payments and language", "bKash, Nagad, SSLCommerz, BDT accounting and a বাংলা interface out of the box.", "bKash|Nagad|বাংলা"],
  ["i-layers", "One connected ecosystem", "Website, inbox, CRM, bookings and accounts share one database, so nothing is entered twice.", "One database"],
  ["i-headset", "Support that answers", "A real team on WhatsApp who know travel operations, from setup to your busiest season.", "WhatsApp support"],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container about-hero">
          <div>
            <span className="pill">About us</span>
            <h1>We build the platform travel agencies <span className="hl">actually run on</span></h1>
            <p className="lead">TravelSuite ERP is an all-in-one digital platform built specifically for travel agencies, tour operators and travel businesses. It connects bookings, customers, sales, finance, operations, website, communication and AI automation into one integrated ecosystem.</p>
          </div>
          <div className="about-stats">
            <div>
              <strong>200+</strong>
              <span>agencies</span>
            </div>
            <div>
              <strong>30</strong>
              <span>countries</span>
            </div>
            <div>
              <strong>6+</strong>
              <span>booking modules</span>
            </div>
            <div>
              <strong>12+</strong>
              <span>ERP modules</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Our story</span>
            <h2>Born inside a travel agency's daily chaos</h2>
            <p className="muted">Most agencies we met ran on a booking portal, a separate accounting tool, spreadsheets for agents and a dozen WhatsApp groups. Data was entered three times, dues were missed and owners had no clear view of profit.</p>
            <p className="muted">We built TravelSuite ERP so that one conversation can become a lead, a booking, an invoice and a ledger entry without anyone copying it across systems.</p>
          </div>
          <div className="mission-cards">
            <div className="mcard">
              <span className="m-ico dark"><svg><use href="#i-target" /></svg></span>
              <h3>Our mission</h3>
              <p>Give every travel business, small or large, the same digital tools as the biggest online travel agencies.</p>
            </div>
            <div className="mcard dark">
              <span className="m-ico"><svg><use href="#i-eye" /></svg></span>
              <h3>Our vision</h3>
              <p>A connected travel industry where agencies spend their time on travellers, not paperwork.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section founder" id="founder">
        <div className="container founder-grid">
          <figure className="founder-photo">
            <img src="/assets/img/team/founder.jpg" alt="Shafiqul Islam, Founder & CEO of TravelSuite ERP" width={640} height={764} loading="lazy" />
            <figcaption><span className="b">Shafiqul Islam</span><small>Founder &amp; CEO</small></figcaption>
          </figure>
          <div className="founder-msg">
            <span className="eyebrow">Message from our founder</span>
            <h2>From flight tickets to hotels, your whole agency on one platform</h2>
            <p>Most travel agencies issue flight tickets on one OTA portal, book hotels on another, then create invoices and do the accounting somewhere else. The same booking is typed again and again, and the real profit is hard to see.</p>
            <p>TravelSuite ERP brings it all together. Flights, hotels, visas and tours are booked, invoiced and accounted for in one place, so every ticket you issue updates the customer, the invoice and your ledger automatically.</p>
            <p>Our Business ERP then automates everything after the booking: CRM follow-ups, quotations, invoices, supplier payments, HR and reports, so your team spends its time selling, not on paperwork.</p>
            <ul className="founder-parts">
              <li><span className="fp-ico"><svg><use href="#i-plane" /></svg></span><span><span className="b">Booking</span><small>Flights, hotels, visa and tours</small></span></li>
              <li><span className="fp-ico"><svg><use href="#i-layers" /></svg></span><span><span className="b">Business ERP</span><small>CRM, sales, finance and HR</small></span></li>
              <li><span className="fp-ico"><svg><use href="#i-globe" /></svg></span><span><span className="b">Website &amp; B2B</span><small>Customer site and agent portal</small></span></li>
              <li><span className="fp-ico"><svg><use href="#i-chat" /></svg></span><span><span className="b">Communication</span><small>WhatsApp, Messenger and email</small></span></li>
            </ul>
            <p>Thank you for trusting us with your business. We&apos;re here to help you grow.</p>
            <div className="founder-sign">
              <span className="b">Shafiqul Islam</span>
              <small>Founder &amp; CEO, TravelSuite ERP</small>
            </div>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our goal is simple</span>
            <h2>What we help every agency do</h2>
          </div>
          <div className="goals">
            <div className="goal">
              <span className="f-ico"><svg><use href="#i-layers" /></svg></span>
              <h4>Centralize your business data</h4>
            </div>
            <div className="goal">
              <span className="f-ico"><svg><use href="#i-x" /></svg></span>
              <h4>Reduce fragmented tools</h4>
            </div>
            <div className="goal">
              <span className="f-ico"><svg><use href="#i-heart" /></svg></span>
              <h4>Improve customer experience</h4>
            </div>
            <div className="goal">
              <span className="f-ico"><svg><use href="#i-bot" /></svg></span>
              <h4>Automate repetitive work</h4>
            </div>
            <div className="goal">
              <span className="f-ico"><svg><use href="#i-tasks" /></svg></span>
              <h4>Streamline daily operations</h4>
            </div>
            <div className="goal">
              <span className="f-ico"><svg><use href="#i-rocket" /></svg></span>
              <h4>Build a scalable digital travel business</h4>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="why">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why agencies choose us</span>
            <h2>Built for how travel businesses really work</h2>
          </div>
          <div className="why">
            {WHY.map(([icon, title, text, tags], i) => (
              <div key={title} className="why-item">
                <div className="why-top"><span className="why-ico"><svg><use href={`#${icon}`} /></svg></span><span className="why-num">{String(i + 1).padStart(2, "0")}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="why-tags">{tags.split("|").map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Markets />
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Business impact</span>
            <h2>What changes after you switch</h2>
          </div>
          <ul className="impact">
            <li><svg className="ic"><use href="#i-check" /></svg>Increase sales opportunities</li>
            <li><svg className="ic"><use href="#i-check" /></svg>Centralize customer data</li>
            <li><svg className="ic"><use href="#i-check" /></svg>Manage B2B & B2C bookings</li>
            <li><svg className="ic"><use href="#i-check" /></svg>Streamline daily operations</li>
            <li><svg className="ic"><use href="#i-check" /></svg>Connect every customer conversation</li>
            <li><svg className="ic"><use href="#i-check" /></svg>Reduce repetitive workload</li>
            <li><svg className="ic"><use href="#i-check" /></svg>Automate business processes</li>
            <li><svg className="ic"><use href="#i-check" /></svg>Improve response time</li>
            <li><svg className="ic"><use href="#i-check" /></svg>Manage finance & accounting</li>
            <li><svg className="ic"><use href="#i-check" /></svg>Build a scalable digital travel business</li>
          </ul>
        </div>
      </section>
    </>
  );
}
