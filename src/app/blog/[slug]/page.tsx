import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressBar, TocNav } from "@/components/ReadingProgress";
import { Breadcrumb, FaqList, Glyph, Icon, JsonLd, PostCard, PostMeta } from "@/components/ui";
import { ISO_DATES, POSTS, SITE, slugify, type Block, type Post } from "@/lib/content";
import { breadcrumbLd, faqLd, pageMeta, type Crumb } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const p = postBySlug((await params).slug)!;
  return pageMeta({ title: p.seoTitle ?? (p.title.length > 45 ? p.title : `${p.title} — TravelSuite ERP`), description: p.excerpt, path: `/blog/${p.slug}`, article: true });
}

/** Article body: the post's own blocks plus the extra sections, with the closing paragraph kept last. */
function articleBlocks(p: Post): Block[] {
  const body = [...p.body];
  const closing = body.length > 3 && body[body.length - 1][0] === "p" ? [body.pop()!] : [];
  return [...body, ...(p.extra.blocks ?? []), ...closing];
}

function BlockView({ block }: { block: Block }) {
  if (block[0] === "ul") return <ul>{block[1].map((x) => <li key={x}>{x}</li>)}</ul>;
  const [kind, text] = block;
  return kind === "h2" ? <h2 id={slugify(text)}>{text}</h2> : <p>{text}</p>;
}

function ShareLinks({ title, url }: { title: string; url: string }) {
  return (
    <>
      <a className="share wa" href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener" aria-label="WhatsApp"><svg><use href="#i-wa" /></svg></a>
      <a className="share fb" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener" aria-label="Facebook">f</a>
      <a className="share in" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
    </>
  );
}

export default async function PostPage({ params }: Props) {
  const p = postBySlug((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const url = SITE + path;
  const blocks = articleBlocks(p);
  const faqs = p.extra.faqs ?? [];
  const takeaways = p.extra.takeaways ?? [];
  const toc = blocks.filter((b): b is ["h2", string] => b[0] === "h2").map(([, t]) => ({ id: slugify(t), title: t }));
  if (faqs.length) toc.push({ id: "post-faq", title: "Frequently asked questions" });
  const related = [
    ...POSTS.filter((q) => q.slug !== p.slug && q.cat === p.cat),
    ...POSTS.filter((q) => q.slug !== p.slug && q.cat !== p.cat),
  ].slice(0, 3);
  const words = blocks.reduce((n, [kind, v]) => n + (kind === "ul" ? v.join(" ") : v).split(/\s+/).length, 0);
  const crumbs: Crumb[] = [["Home", "/"], ["Blog", "/blog"], [p.cat, null]];

  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.excerpt,
          datePublished: ISO_DATES[p.slug] ?? "", wordCount: words, articleSection: p.cat,
          author: { "@type": "Organization", name: "TravelSuite ERP" },
          publisher: { "@type": "Organization", name: "TravelSuite ERP", logo: { "@type": "ImageObject", url: `${SITE}/assets/img/logo.png` } },
          mainEntityOfPage: url,
        },
        breadcrumbLd(crumbs, path),
        ...(faqs.length ? [faqLd(faqs)] : []),
      ]} />
      <ProgressBar toc={toc} />
      <section className="page-hero post-hero">
        <div className="container narrow">
          <Breadcrumb items={crumbs} />
          <span className="pill">{p.cat}</span>
          <h1>{p.title}</h1>
          <PostMeta p={p} light author />
        </div>
      </section>
      <section className="section post-section">
        <div className="container post-layout">
          <aside className="post-toc" aria-label="Table of contents">
            <div className="toc-inner">
              <p className="fnav-group">Table of contents</p>
              <TocNav toc={toc} />
              <div className="toc-share"><span>Share this article</span><div><ShareLinks title={p.title} url={url} /></div></div>
            </div>
          </aside>
          <div className="post-main">
            <div className="post-cover big" style={{ "--c": p.color }}>{p.cover ? <img className="cover-img" src={p.cover} alt={p.title} width={1200} height={675} /> : <Glyph name={p.icon} />}</div>
            <article className="article" id="article">
              <p className="article-lead">{p.excerpt}</p>
              {takeaways.length > 0 && (
                <div className="takeaways"><h2 className="tk-title">Key takeaways</h2><ul>{takeaways.map((t) => <li key={t}>{t}</li>)}</ul></div>
              )}
              {blocks.map((b, i) => <BlockView key={i} block={b} />)}
              {faqs.length > 0 && <><h2 id="post-faq">Frequently asked questions</h2><FaqList faqs={faqs} /></>}
            </article>
            <div className="author-box">
              <img src="/assets/img/favicon.png" alt="TravelSuite ERP" width={56} height={56} />
              <div><small>About the author</small><span className="b">TravelSuite Team</span><p>The TravelSuite team builds travel booking and ERP software for agencies in Bangladesh, Malaysia, the GCC and the USA.</p></div>
            </div>
            <div className="share-row"><span>Share this article</span><ShareLinks title={p.title} url={url} /></div>
            <div className="article-cta">
              <div><h3>Want to see this in your agency?</h3><p>Book a free 30-minute walkthrough with our team.</p></div>
              <Link href="/contact" className="btn btn-lime">Request a demo <Icon name="i-arrow" /></Link>
            </div>
            <Link href="/blog" className="link-arrow back"><Icon name="i-left" /> Back to blog</Link>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <div className="related-head"><h2>Related articles</h2><Link href="/blog" className="link-arrow">View all articles <Icon name="i-arrow" /></Link></div>
          <div className="post-grid">{related.map((q) => <PostCard key={q.slug} p={q} />)}</div>
        </div>
      </section>
    </>
  );
}
