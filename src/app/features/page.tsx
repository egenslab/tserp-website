import Link from "next/link";
import ScrollSpyNav from "@/components/ScrollSpyNav";
import Tools from "@/components/Tools";
import { Glyph, Icon, JsonLd, PageHero } from "@/components/ui";
import { FEATURE_GROUPS, FEATURES } from "@/lib/content";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Features — TravelSuite ERP",
  description: "Every feature of TravelSuite ERP: flights, hotels, Hajj & Umrah, visa, tours, transport, CRM, sales, finance, HR, help desk, reports, AI automation and omnichannel inbox.",
  path: "/features",
});

const groups = FEATURE_GROUPS.map((g) => ({ ...g, items: FEATURES.filter((f) => f.group === g.id) }));

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Features", null]], "/features")} />
      <PageHero
        crumbs={[["Home", "/"], ["Features", null]]}
        title={<>Everything your agency needs, in <span className="hl">one platform</span></>}
        lead="6 travel services, 9 business modules and a connected website, AI and inbox. Explore what each part does."
      >
        <div className="jump-chips"><a href="#services">Travel services</a><a href="#modules">Business modules</a><a href="#platform">Platform</a></div>
      </PageHero>
      <section className="section features-page">
        <div className="container fp-grid">
          <ScrollSpyNav groups={groups.map((g) => ({ title: g.title, items: g.items.map((f) => ({ id: f.slug, title: f.title, icon: f.icon })) }))} />
          <div className="fbody">
            {groups.map((g) => [
              <h2 key={g.id} className="fgroup-title" id={g.id}>{g.title}</h2>,
              ...g.items.map((f) => (
                <article key={f.slug} className="fdetail" id={f.slug}>
                  <div className="fdetail-head"><span className="m-ico dark"><Glyph name={f.icon} /></span><div><h3>{f.title}</h3><p>{f.desc}</p></div></div>
                  <ul className="fdetail-list">{f.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <Link href={`/features/${f.slug}`} className="link-arrow">Learn more <Icon name="i-arrow" /></Link>
                </article>
              )),
            ])}
          </div>
        </div>
      </section>
      <Tools />
    </>
  );
}
