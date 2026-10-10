import ContactForm from "@/components/ContactForm";
import { COUNTRIES, EMAIL, WA } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Us & Request a Demo — TravelSuite ERP",
  description: "Request a TravelSuite ERP demo, chat with our team on WhatsApp at +880 13 2527 7120 or email info@travelsuiteerp.com.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="pill">Contact us</span>
          <h1>Let's set up TravelSuite ERP <span className="hl">for your agency</span></h1>
          <p className="lead">Tell us what you sell and how your team works. We'll prepare a walkthrough with your branding and answer every question.</p>
        </div>
      </section>
      <section className="section contact-page">
        <div className="container contact-grid">
          <div className="contact-side">
            <div className="contact-cards">
              <div className="ccard">
                <span className="f-ico"><svg className="ic fill"><use href="#i-wa" /></svg></span>
                <div>
                  <small>WhatsApp</small>
                  <b><a href={WA} target="_blank" rel="noopener">+880 13 2527 7120</a></b>
                </div>
              </div>
              <div className="ccard">
                <span className="f-ico"><svg><use href="#i-mail" /></svg></span>
                <div>
                  <small>Email</small>
                  <b><a href={`mailto:${EMAIL}`}>{EMAIL}</a></b>
                </div>
              </div>
              <div className="ccard wide">
                <span className="f-ico"><svg><use href="#i-pin" /></svg></span>
                <div>
                  <small>Our offices</small>
                  <ul className="office-flags">
                    {COUNTRIES.filter((c) => c.office).map((c) => (
                      <li key={c.code}><img src={`/assets/img/flags/${c.code}.svg`} alt="" width={28} height={21} /><span>{c.name}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="next-steps">
              <h3>What happens next</h3>
              <ol>
                <li>
                  <b>We call you</b>
                  <span>Within one business day, to understand your services.</span>
                </li>
                <li>
                  <b>Personal demo</b>
                  <span>A 30-minute online walkthrough with your workflows.</span>
                </li>
                <li>
                  <b>Proposal</b>
                  <span>A plan and quote that fits your agency.</span>
                </li>
              </ol>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
