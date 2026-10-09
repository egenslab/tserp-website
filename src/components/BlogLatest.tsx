import Link from "next/link";
import { POSTS } from "@/lib/content";
import { Icon, PostCard } from "./ui";

/** Latest three blog posts, shown on the home page. */
export default function BlogLatest() {
  return (
    <section className="section" id="blog">
      <div className="container">
        <div className="section-head with-controls">
          <div><span className="eyebrow">Latest from the blog</span><h2>Practical guides for travel agencies</h2></div>
          <Link href="/blog" className="btn btn-outline">View all articles <Icon name="i-arrow" /></Link>
        </div>
        <div className="post-grid">{POSTS.slice(0, 3).map((p) => <PostCard key={p.slug} p={p} />)}</div>
      </div>
    </section>
  );
}
