import BlogFilter from "@/components/BlogFilter";
import { JsonLd, PageHero, PostCard } from "@/components/ui";
import { BLOG_CATEGORIES, POSTS } from "@/lib/content";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Travel Agency Business Blog — TravelSuite ERP",
  description: "Practical guides for travel agencies on Hajj & Umrah, B2B portals, accounting, WhatsApp sales, AI and choosing the right travel ERP.",
  path: "/blog",
});

export default function BlogPage() {
  const categories = BLOG_CATEGORIES.map((name) => ({ name, count: POSTS.filter((p) => p.cat === name).length }));
  return (
    <>
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Blog", null]], "/blog")} />
      <PageHero crumbs={[["Home", "/"], ["Blog", null]]} title="TravelSuite blog" lead="Guides, ideas and news for travel agencies running their business online." />
      <section className="section">
        <div className="container">
          <PostCard p={POSTS[0]} featured />
          <BlogFilter posts={POSTS.slice(1)} categories={categories} total={POSTS.length} />
        </div>
      </section>
    </>
  );
}
