import Link from "next/link";
import Compare from "@/components/Compare";
import Plans from "@/components/Plans";
import { CloudVsLifetime, GoLive, PlanFinder, PricingProof } from "@/components/PricingSections";
import { FaqSection, JsonLd } from "@/components/ui";
import type { Faq } from "@/lib/content";
import { breadcrumbLd, faqLd, pageMeta, type Crumb } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Travel ERP Pricing & Plans — TravelSuite ERP",
  description: "TravelSuite ERP plans for travel agencies, Hajj & Umrah operators and B2B consolidators. Monthly, yearly or lifetime license, priced in USD.",
  path: "/pricing",
});

const FAQS: Faq[] = [
  ["What is the difference between a cloud plan and a lifetime license?", "A cloud plan is hosted and maintained by us for a monthly or yearly fee. A lifetime license is a one-time payment: we install TravelSuite ERP on your own server and you get 12 months of updates, after which updates can be renewed."],
  ["Which plan should I start with?", "Small agencies selling two services usually start on Starter. Agencies with a sales team and accounts start on Growth. Hajj & Umrah operators, B2B consolidators and online travel agencies usually need Business. Our team can recommend a plan in a short call."],
  ["Can I change plans later?", "Yes. You can upgrade at any time and only pay the difference for the remaining period. Your data stays exactly where it is."],
  ["How do I buy and pay?", "Click Buy now on a plan and our team confirms the details with you on WhatsApp, then sends an invoice with the payment options for your country. Plans are priced in USD."],
  ["Is setup really free?", "Yes. Every plan includes setup of your domain, branding, modules and payment methods, import of your existing data from Excel and live training for your staff."],
  ["How long does it take to go live?", "Most agencies go live in 7 to 14 days. Larger setups, extra modules or custom development can take longer."],
  ["Are GDS and supplier fees included?", "No. Amadeus, Sabre, Travelport, Galileo and other suppliers charge their own fees under your contract with them. We quote separately for connecting and maintaining the integration."],
  ["Is there a free trial?", "We offer a guided demo with sample data so you can see your own workflows before you decide. Contact us to book one."],
  ["What if I want a refund?", "Refunds follow our refund policy, which explains what is covered and how to request one."],
];
const CRUMBS: Crumb[] = [["Home", "/"], ["Pricing", null]];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd(CRUMBS, "/pricing"), faqLd(FAQS)]} />
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
      <PlanFinder />
      <section className="section">
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
                <p>Domain, branding, modules and payment methods configured for you.</p>
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
      <CloudVsLifetime />
      <GoLive />
      <PricingProof />
      <FaqSection faqs={FAQS} title="Questions about plans and billing" />
      <div className="container narrow pricing-refund"><p>Read our <Link href="/refund">refund policy</Link>, <Link href="/terms">terms</Link> and <Link href="/privacy">privacy policy</Link>.</p></div>
    </>
  );
}
