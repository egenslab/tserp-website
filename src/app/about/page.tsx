import Markets from "@/components/Markets";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About us — TravelSuite ERP",
  description: "TravelSuite ERP is an all-in-one digital platform built for travel agencies, tour operators and Hajj & Umrah operators.",
  path: "/about",
});

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
              <strong>6</strong>
              <span>travel services</span>
            </div>
            <div>
              <strong>12</strong>
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
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why agencies choose us</span>
            <h2>Built for how travel businesses really work</h2>
          </div>
          <div className="why">
            <div className="why-item">
              <span className="why-num">01</span>
              <h3>Made for travel, not adapted</h3>
              <p>PNRs, pilgrims, visa files and agent wallets are built in, not bolted onto a generic ERP.</p>
            </div>
            <div className="why-item">
              <span className="why-num">02</span>
              <h3>Local payments and language</h3>
              <p>bKash, Nagad, SSLCommerz, BDT accounting and a বাংলা interface out of the box.</p>
            </div>
            <div className="why-item">
              <span className="why-num">03</span>
              <h3>One connected ecosystem</h3>
              <p>Website, inbox, CRM, bookings and accounts share one database, so nothing is entered twice.</p>
            </div>
            <div className="why-item">
              <span className="why-num">04</span>
              <h3>Support that answers</h3>
              <p>A real team on WhatsApp who know travel operations, from setup to your busiest season.</p>
            </div>
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
