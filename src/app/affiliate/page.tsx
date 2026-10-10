import AffiliateCalc from "@/components/AffiliateCalc";
import AffiliateForm from "@/components/AffiliateForm";
import { FaqSection, Icon, JsonLd } from "@/components/ui";
import { AFFILIATE } from "@/lib/affiliate";
import { EMAIL, WA, type Faq } from "@/lib/content";
import { breadcrumbLd, faqLd, pageMeta, type Crumb } from "@/lib/seo";

const { commission, months, cookieDays, minPayout } = AFFILIATE;

export const metadata = pageMeta({
  title: "Affiliate Program — Earn With TravelSuite ERP",
  description: `Join the TravelSuite ERP affiliate program. Refer travel agencies to our travel ERP and earn ${commission}% commission, with a ${cookieDays}-day cookie and monthly payouts.`,
  path: "/affiliate",
  keywords: "travel software affiliate program, travel ERP affiliate, SaaS affiliate program, travel agency software referral, earn commission travel software",
});

const STEPS = [
  ["Apply", "Fill in the short form. We review every application within two business days."],
  ["Share your link", "Get your personal referral link and promote TravelSuite ERP to travel agencies."],
  ["Earn commission", `Earn ${commission}% of what each referred agency pays, paid out every month.`],
];

const WHO = [
  ["i-file", "Bloggers and creators", "Write about travel business, software or tourism and recommend a tool your readers need."],
  ["i-eye", "YouTubers and influencers", "Review TravelSuite ERP or show it in tutorials for agency owners."],
  ["i-code", "Web and IT agencies", "Recommend a ready travel platform to the agencies you build websites for."],
  ["i-users", "Travel consultants and trainers", "Help the agencies you coach move from spreadsheets to one system."],
  ["i-heart", "Happy customers", "Already use TravelSuite ERP? Introduce other agencies and earn on every sale."],
  ["i-globe", "Industry associations", "Offer your member agencies a trusted travel ERP and earn for the referral."],
];

const PERKS = [
  ["i-percent", `${commission}% commission`, `On every subscription payment for the first ${months} months, or on the full lifetime license.`],
  ["i-clock", `${cookieDays}-day cookie`, "Agencies often take time to decide. You still get credit if they sign up weeks later."],
  ["i-chart", "Real-time dashboard", "See clicks, sign-ups, sales and commission as they happen."],
  ["i-wallet", "Monthly payouts", `Paid by bank transfer, bKash or PayPal once you reach $${minPayout}.`],
  ["i-palette", "Marketing kit", "Banners, logos, screenshots, demo videos and ready-made copy in English and বাংলা."],
  ["i-headset", "Dedicated manager", "A partner manager helps you with campaigns and closes demos with your leads."],
];

const WHY = [
  "All-in-one travel ERP: flights, hotels, Hajj & Umrah, visa, tours and 12 business modules",
  "Monthly, yearly and lifetime plans for every agency size",
  "Website, B2B agent portal, AI and omnichannel inbox included",
  "Free setup, data import and staff training",
  "Local support in English and Bangla over WhatsApp",
  "Agencies in 30 countries already run on it",
];

const FAQS: Faq[] = [
  ["Who can join the affiliate program?", "Anyone who can reach travel agencies, tour operators or Hajj & Umrah operators: bloggers, YouTubers, web agencies, consultants, associations and existing customers. There is no fee to join."],
  ["How much commission do I earn?", `You earn ${commission}% of what each referred agency pays: on every subscription payment for the first ${months} months, or on the full price of a lifetime license.`],
  ["How long does the referral cookie last?", `${cookieDays} days. If an agency clicks your link and buys within ${cookieDays} days, the sale is credited to you.`],
  ["When and how am I paid?", `Commission is paid monthly by bank transfer, bKash or PayPal once your balance reaches $${minPayout}. Commission on a sale is confirmed after the refund period ends.`],
  ["Do I need to be a TravelSuite ERP customer?", "No. You don't need to use the software to promote it, although many of our best affiliates are agencies that already do."],
  ["Can I refer an agency directly instead of using a link?", "Yes. Send us the agency's details or bring them to a demo with our team, and we will credit the sale to you."],
  ["What can't I do when promoting?", "Don't bid on the TravelSuite ERP brand name in search ads, send spam or make claims about features or prices that aren't on our website."],
  ["How do I track my referrals?", "Your affiliate dashboard shows clicks, sign-ups, sales and commission earned and paid."],
];

const CRUMBS: Crumb[] = [["Home", "/"], ["Affiliate program", null]];

export default function AffiliatePage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd(CRUMBS, "/affiliate"), faqLd(FAQS)]} />
      <section className="page-hero">
        <div className="container about-hero">
          <div>
            <span className="pill">Affiliate program</span>
            <h1>Earn {commission}% for every travel agency <span className="hl">you refer</span></h1>
            <p className="lead">Recommend TravelSuite ERP to travel agencies, tour operators and Hajj & Umrah operators, and earn commission on every plan they buy. Free to join, with marketing materials and a partner manager to help you sell.</p>
            <div className="hero-ctas">
              <a href="#apply" className="btn btn-lime btn-lg">Become an affiliate <Icon name="i-arrow" /></a>
              <a href="#calculator" className="btn btn-ghost-light btn-lg">Estimate your earnings</a>
            </div>
          </div>
          <div className="about-stats">
            <div><strong>{commission}%</strong><span>commission</span></div>
            <div><strong>{months}</strong><span>months of recurring payouts</span></div>
            <div><strong>{cookieDays}</strong><span>day referral cookie</span></div>
            <div><strong>${minPayout}</strong><span>minimum payout</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Start earning in three steps</h2>
          </div>
          <ol className="steps three">
            {STEPS.map(([t, d], i) => <li key={t}><span>{i + 1}</span><h4>{t}</h4><p>{d}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Program benefits</span>
            <h2>Everything you need to promote and earn</h2>
          </div>
          <div className="includes">
            {PERKS.map(([i, t, d]) => (
              <div className="include" key={t}>
                <span className="f-ico"><svg><use href={`#${i}`} /></svg></span>
                <div><h4>{t}</h4><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="calculator">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Earnings calculator</span>
            <h2>See how much you could earn</h2>
            <p>Based on our list prices in USD. Your actual commission depends on the plan and billing each agency chooses.</p>
          </div>
          <AffiliateCalc />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Who it's for</span>
            <h2>Made for people who know travel businesses</h2>
          </div>
          <div className="includes">
            {WHO.map(([i, t, d]) => (
              <div className="include" key={t}>
                <span className="f-ico"><svg><use href={`#${i}`} /></svg></span>
                <div><h4>{t}</h4><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Why promote TravelSuite ERP</span>
            <h2>A product agencies keep paying for</h2>
            <p className="muted">TravelSuite ERP runs the whole agency, from the first enquiry to the final ledger entry. Once an agency's bookings, accounts and website live in one system, it stays, and your recurring commission keeps coming.</p>
          </div>
          <ul className="aff-why">
            {WHY.map((w) => <li key={w}><Icon name="i-check" />{w}</li>)}
          </ul>
        </div>
      </section>

      <section className="section alt contact-page" id="apply">
        <div className="container contact-grid">
          <div className="contact-side">
            <span className="eyebrow">Join the program</span>
            <h2>Apply in two minutes</h2>
            <p className="muted">Tell us about your audience and how you plan to promote TravelSuite ERP. Once approved, you get your referral link, dashboard access and the marketing kit.</p>
            <div className="contact-cards">
              <div className="ccard">
                <span className="f-ico"><svg className="ic fill"><use href="#i-wa" /></svg></span>
                <div><small>WhatsApp</small><span className="b"><a href={WA} target="_blank" rel="noopener">+880 13 2527 7120</a></span></div>
              </div>
              <div className="ccard">
                <span className="f-ico"><svg><use href="#i-mail" /></svg></span>
                <div><small>Email</small><span className="b"><a href={`mailto:${EMAIL}?subject=Affiliate%20program`}>{EMAIL}</a></span></div>
              </div>
            </div>
          </div>
          <AffiliateForm />
        </div>
      </section>

      <FaqSection faqs={FAQS} title="Affiliate program FAQ" />
    </>
  );
}
