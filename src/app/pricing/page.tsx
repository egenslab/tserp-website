import Compare from "@/components/Compare";
import Plans from "@/components/Plans";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pricing — TravelSuite ERP",
  description: "TravelSuite ERP plans for travel agencies, Hajj & Umrah operators and B2B consolidators. Monthly, yearly or lifetime license in BDT or USD.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="pill">Pricing</span>
          <h1>Simple plans that <span className="hl">grow with you</span></h1>
          <p className="lead">Pay monthly, save 20% yearly, or own a lifetime license on your own server. Every plan includes setup and training.</p>
        </div>
      </section>
      <section className="section pricing-page" id="pricing">
        <div className="container">
          <Plans />
          {" "}
          <Compare />
          <p className="note">Prices are indicative and exclude supplier fees and VAT. Lifetime licenses include free installation and 12 months of updates.</p>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Every plan includes</span>
            <h2>No hidden setup fees</h2>
          </div>
          <div className="includes">
            <div className="include">
              <span className="f-ico"><svg><use href="#i-rocket" /></svg></span>
              <div>
                <h4>Free setup</h4>
                <p>Domain, branding, modules and payment gateway configured for you.</p>
              </div>
            </div>
            <div className="include">
              <span className="f-ico"><svg><use href="#i-users" /></svg></span>
              <div>
                <h4>Staff training</h4>
                <p>Live online sessions for your team, recorded for new joiners.</p>
              </div>
            </div>
            <div className="include">
              <span className="f-ico"><svg><use href="#i-file" /></svg></span>
              <div>
                <h4>Data import</h4>
                <p>Customers, agents and opening balances imported from Excel.</p>
              </div>
            </div>
            <div className="include">
              <span className="f-ico"><svg><use href="#i-shield" /></svg></span>
              <div>
                <h4>Secure backups</h4>
                <p>Daily backups and SSL on every cloud plan.</p>
              </div>
            </div>
            <div className="include">
              <span className="f-ico"><svg><use href="#i-spark" /></svg></span>
              <div>
                <h4>Regular updates</h4>
                <p>New features and fixes rolled out without downtime.</p>
              </div>
            </div>
            <div className="include">
              <span className="f-ico"><svg><use href="#i-headset" /></svg></span>
              <div>
                <h4>Local support</h4>
                <p>Help in English and বাংলা over WhatsApp, phone and email.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container narrow">
          <div className="section-head">
            <span className="eyebrow">Pricing FAQ</span>
            <h2>Questions about plans and billing</h2>
          </div>
          <div className="faq">
            <details open>
              <summary>What is the difference between cloud and lifetime license?</summary>
              <p>Cloud plans are hosted and maintained by us for a monthly or yearly fee. A lifetime license is a one-time payment; we install it on your own server and you get 12 months of updates, after which updates can be renewed.</p>
            </details>
            <details>
              <summary>Can I change plans later?</summary>
              <p>Yes. You can upgrade at any time and only pay the difference for the remaining period. Your data stays exactly where it is.</p>
            </details>
            <details>
              <summary>How do I pay?</summary>
              <p>Card (Visa, Mastercard, American Express), PayPal, Stripe, Apple Pay, Google Pay or bank transfer. Customers in Bangladesh can also pay in BDT; international customers are invoiced in USD.</p>
            </details>
            <details>
              <summary>Are supplier API fees included?</summary>
              <p>No. GDS, NDC and bedbank suppliers charge their own fees under your contract with them. We charge only for connecting and maintaining the integration.</p>
            </details>
            <details>
              <summary>Is there a free trial?</summary>
              <p>We offer a guided demo with sample data so you can see your workflows before you decide. Contact us to book one.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
