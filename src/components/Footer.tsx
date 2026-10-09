import Link from "next/link";
import { AI_LINKS, AI_PROMPT, COUNTRIES, PAYMENTS, SOCIAL } from "@/lib/content";
import WaPill from "./WaPill";

/** Call-to-action band and site footer. */
export default function Footer() {
  return (
    <>
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>Ready to run your agency from one platform?</h2>
            <p>Book a free walkthrough or message our team on WhatsApp.</p>
          </div>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-forest btn-lg">Request a demo <svg className="ic"><use href="#i-arrow" /></svg></Link>
            {" "}
            <WaPill />
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="ask-ai-band">
            <div className="ask-ai-head">
              <div className="ask-ai-copy">
                <span className="ask-ai-ico"><svg className="ic"><use href="#i-spark" /></svg></span>
                <h3>Ask any AI about TravelSuite ERP</h3>
                <p>Get an instant, independent summary of our platform from your favourite AI assistant.</p>
              </div>
              <div className="ai-prompt">
                <small>We'll ask</small>
                <q>What is TravelSuite ERP? Summarize its features for travel agencies, Hajj & Umrah operators and B2B consolidators.</q>
              </div>
            </div>
            <div className="ai-cards">
              {AI_LINKS.map((ai) => (
                <a key={ai.name} className="ai-card" href={ai.url + encodeURIComponent(AI_PROMPT)} target="_blank" rel="noopener" aria-label={ai.name}>
                  <span className="ai-logo"><img src={`/assets/img/partners/${ai.logo}.svg`} alt="" width={26} height={26} /></span>
                  <span className="ai-name" data-no-i18n=""><b>{ai.name}</b><small>{ai.maker}</small></span>
                </a>
              ))}
            </div>
          </div>
          <div className="footer-hero">
            <div className="footer-brand">
              <img src="/assets/img/logo-light.png" alt="TravelSuite ERP" width="230" height="30" />
              <p>All-in-one booking and ERP platform for travel agencies, Hajj & Umrah operators and B2B consolidators. Sell, manage and automate your entire travel business from one place.</p>
              <div className="footer-follow">
                <small>Follow us</small>
                <div className="socials">
                  {SOCIAL.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener" aria-label={s.name}><img src={`/assets/img/partners/${s.logo}.svg`} alt="" width={18} height={18} /></a>
              ))}
                </div>
              </div>
            </div>
            <div className="footer-side">
              <div className="review-badges">
                <a className="review-card" href="https://www.google.com/search?q=TravelSuite+ERP+reviews" target="_blank" rel="noopener">
                  <img src="/assets/img/partners/google-g.svg" alt="" width="28" height="28" />
                  {" "}
                  <span className="rv-text"><b>Google Reviews</b><span className="rv-stars g" aria-hidden="true">★★★★★</span><small>Read or write a review</small></span>
                </a>
                {" "}
                <a className="review-card" href="https://www.trustpilot.com/review/travelsuiteerp.com" target="_blank" rel="noopener">
                  <img src="/assets/img/partners/trustpilot.svg" alt="" width="28" height="28" />
                  {" "}
                  <span className="rv-text"><b>Trustpilot</b><span className="rv-stars tp" aria-hidden="true"><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></span><small>Read or write a review</small></span>
                </a>
              </div>
              <Link className="demo-card" href="/contact">
                <span className="demo-ico"><svg className="ic"><use href="#i-calendar" /></svg></span>
                {" "}
                <span className="demo-text"><b>Book a free 30-minute demo</b><small>See TravelSuite ERP set up with your own services, agents and branding.</small></span>
                {" "}
                <span className="demo-go">Book now <svg className="ic"><use href="#i-arrow" /></svg></span>
              </Link>
            </div>
          </div>
          <div className="footer-grid">
            <div className="fcol">
              <h5>Services</h5>
              <Link href="/features/flights">Flight Tickets</Link>
              <Link href="/features/hotels">Hotel Booking</Link>
              <Link href="/features/hajj">Hajj & Umrah</Link>
              <Link href="/features/visa">Visa Processing</Link>
              <Link href="/features/tours">Tour Packages</Link>
              <Link href="/features/transport">Transport Booking</Link>
            </div>
            <div className="fcol">
              <h5>Platform</h5>
              <Link href="/features/crm">Travel ERP</Link>
              <Link href="/features/b2b">B2B & B2C Booking</Link>
              <Link href="/features/website">Agency Website</Link>
              <Link href="/features/cms">Website CMS</Link>
              <Link href="/features/ai">AI Automation</Link>
              <Link href="/features/omnichannel">Omnichannel Inbox</Link>
              <Link href="/features">All features</Link>
            </div>
            <div className="fcol">
              <h5>Solutions</h5>
              <Link href="/solutions/travel-agencies">Travel agencies</Link>
              <Link href="/solutions/hajj-umrah">Hajj & Umrah operators</Link>
              <Link href="/solutions/b2b-consolidators">B2B consolidators</Link>
              <Link href="/solutions/tour-operators">Tour operators & DMCs</Link>
              <Link href="/solutions/online-travel-agencies">Online travel agencies</Link>
              <Link href="/solutions/corporate-travel">Corporate travel desks</Link>
            </div>
            <div className="fcol">
              <h5>Company</h5>
              <Link href="/about">About us</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/success-stories">Success stories</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/affiliate">Affiliate program</Link>
              <Link href="/contact">Contact us</Link>
            </div>
            <div className="fcol">
              <h5>Legal</h5>
              <Link href="/terms">Terms & Conditions</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/refund">Refund Policy</Link>
            </div>
          </div>
          <div className="footer-markets">
            <div className="fm-head">
              <h5>Markets we serve</h5>
            </div>
            <ul className="flag-list">
              {COUNTRIES.map((c) => (
            <li key={c.code}><img src={`/assets/img/flags/${c.code}.svg`} alt="" width={24} height={18} /><span>{c.name}</span>{c.office && <em>Office</em>}</li>
          ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom-wrap">
          <div className="container footer-bottom">
            <span className="copy"><span>© <span>{new Date().getFullYear()}</span> TravelSuite ERP. All rights reserved.</span><small className="division">A division of Egens Lab Limited</small></span>
            <div className="pay-strip">
              <small>Secure international payments</small>
              <div className="pay-row">
                {PAYMENTS.map((p) => (
              <span key={p.name} className="pay-badge" title={p.name}><img src={`/assets/img/partners/${p.logo}.svg`} alt={p.name} width={26} height={18} /></span>
            ))}
              </div>
            </div>
            <a href="#top" className="to-top" aria-label="Back to top">
              <svg className="ic"><use href="#i-chev" /></svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
