import SuccessGrid from "@/components/SuccessGrid";
import { JsonLd, PageHero } from "@/components/ui";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Customer Success Stories — TravelSuite ERP",
  description: "See how travel and visa agencies in the UK, Bangladesh and the UAE run flights, hotels, visas and their business on TravelSuite ERP.",
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
