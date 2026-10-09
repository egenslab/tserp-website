import SuccessGrid from "@/components/SuccessGrid";
import { JsonLd, PageHero } from "@/components/ui";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Success stories — TravelSuite ERP",
  description: "Real results from travel businesses using TravelSuite ERP across Bangladesh, Malaysia and the GCC.",
  path: "/success-stories",
});

export default function SuccessStoriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Success stories", null]], "/success-stories")} />
      <PageHero
        crumbs={[["Home", "/"], ["Success stories", null]]}
        title="Success stories"
        lead="Real results from travel businesses using TravelSuite ERP across Bangladesh, Malaysia and the GCC."
      />
      <section className="section"><div className="container"><div className="success-grid"><SuccessGrid /></div></div></section>
    </>
  );
}
