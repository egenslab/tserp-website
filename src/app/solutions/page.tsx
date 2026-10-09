import Markets from "@/components/Markets";
import { JsonLd, PageHero, SolutionCard } from "@/components/ui";
import { SOLUTIONS } from "@/lib/content";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Solutions — TravelSuite ERP",
  description: "TravelSuite ERP solutions for travel agencies, Hajj & Umrah operators, B2B consolidators, tour operators, online travel agencies and corporate travel desks.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Solutions", null]], "/solutions")} />
      <PageHero
        crumbs={[["Home", "/"], ["Solutions", null]]}
        title="Solutions for every travel business"
        lead="Pick the setup that matches how you sell. Every solution runs on the same platform, so you can add more later."
      />
      <section className="section">
        <div className="container"><div className="solution-grid">{SOLUTIONS.map((s) => <SolutionCard key={s.slug} s={s} />)}</div></div>
      </section>
      <Markets />
    </>
  );
}
