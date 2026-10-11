import Markets from "@/components/Markets";
import { SolutionMatrix, SolutionPath, SolutionShowcase } from "@/components/SolutionsIndex";
import { FaqSection, JsonLd, PageHero } from "@/components/ui";
import type { Faq } from "@/lib/content";
import { breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Travel Software Solutions by Business Type — TravelSuite",
  description: "TravelSuite ERP setups for travel agencies, Hajj & Umrah operators, B2B consolidators, tour operators, OTAs and corporate travel desks.",
  path: "/solutions",
});

const FAQS: Faq[] = [
  ["What is the difference between the solutions?", "They run on the same TravelSuite ERP platform. Each solution is a starting setup: the modules, workflow and reports that a business of that type needs first."],
  ["My business fits more than one type. What should I choose?", "Choose the type that brings most of your revenue and add the other modules you need. A travel agency that also runs Umrah groups, for example, starts as a travel agency and adds the Hajj & Umrah module."],
  ["Can I add modules later?", "Yes. You can switch on more modules or upgrade your plan at any time, and you only pay the difference for the remaining period. Your data stays where it is."],
  ["Which plan does each solution need?", "Each solution card shows the plan most businesses of that type start on. The pricing page lists what every plan includes, and our team can recommend one in a short call."],
  ["Do the solutions work in my country?", "TravelSuite ERP runs travel businesses in Bangladesh, the UAE, Jordan, the UK and the USA, and our teams in Bangladesh, Malaysia and the USA support agencies across the GCC and Southeast Asia."],
  ["How long does it take to go live?", "Most businesses go live in 7 to 14 days, including setup, data import from Excel and staff training. Larger setups and custom work can take longer."],
];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([["Home", "/"], ["Solutions", null]], "/solutions"), faqLd(FAQS)]} />
      <PageHero
        crumbs={[["Home", "/"], ["Solutions", null]]}
        title="Solutions for every travel business"
        lead="Pick the setup that matches how you sell. Every solution runs on the same platform, so you can add more later."
      />
      <SolutionShowcase />
      <SolutionMatrix />
      <SolutionPath />
      <Markets />
      <FaqSection faqs={FAQS} alt />
    </>
  );
}
