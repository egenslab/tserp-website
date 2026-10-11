import { Icon } from "../ui";

/* Website CMS: how the team edits content (menus, pages, blog, media, reviews). */

const TREE: { label: string; kind: string; depth: number; sel?: boolean }[] = [
  { label: "Home", kind: "Page", depth: 0 },
  { label: "Hotels", kind: "Custom link", depth: 0 },
  { label: "Beach Hotel", kind: "Category", depth: 1 },
  { label: "City Hotel", kind: "Category", depth: 1 },
  { label: "Resort", kind: "Category", depth: 1 },
  { label: "Visa services", kind: "Page", depth: 0, sel: true },
  { label: "Blog", kind: "Page", depth: 0 },
  { label: "Contact", kind: "Page", depth: 0 },
];

const PAGES: [string, string, boolean][] = [
  ["Home", "Builder", true],
  ["About us", "Builder", false],
  ["Visa services", "Builder", false],
  ["Privacy policy", "Static", false],
];

export function CmsTop1() {
  return (
    <section className="section alt cm-struct">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Structure</span>
          <h2>Build menus by picking pages, categories and links</h2>
          <p>Choose a menu, add items from the left, nest them, then save. Main menu, quick links and every footer column are separate menus you edit the same way.</p>
        </div>

        <div className="cm-builder">
          <aside className="cm-src">
            <p className="cm-cap">Menu item type</p>
            <div className="cm-acc open">
              <div className="cm-acc-h"><span className="b">Categories</span><span>−</span></div>
              <ul>{["Beach Hotel", "City Hotel", "Resort", "Family Hotel"].map((c) => <li key={c}>{c}<span className="cm-add">+</span></li>)}</ul>
            </div>
            <div className="cm-acc"><div className="cm-acc-h"><span className="b">Pages</span><span>+</span></div></div>
            <div className="cm-acc"><div className="cm-acc-h"><span className="b">Custom links</span><span>+</span></div></div>
          </aside>

          <div className="cm-tree">
            <div className="cm-tree-top">
              <span className="cm-select">Main menu <Icon name="i-chev" /></span>
              <span className="cm-save">Save changes</span>
            </div>
            <ul>
              {TREE.map((t) => (
                <li key={t.label} className={`cm-node d${t.depth}${t.sel ? " sel" : ""}`}>
                  <span className="cm-grip" aria-hidden="true"><i /><i /><i /></span>
                  <span className="cm-node-l">{t.label}</span>
                  <span className={`cm-kind k-${t.kind.split(" ")[0].toLowerCase()}`}>{t.kind}</span>
                </li>
              ))}
            </ul>
            <div className="cm-menus">
              <span className="cm-menus-l">Other menus</span>
              <span>Quick links</span><span>Footer · Explore</span><span>Footer · Useful</span><span>Footer · Helpline</span>
            </div>
          </div>

          <div className="cm-side">
            <div className="cm-card">
              <div className="cm-card-h"><Icon name="i-file" /><h3>Pages</h3></div>
              <ul className="cm-pages">
                {PAGES.map(([n, t, home]) => (
                  <li key={n}>
                    <span className="cm-pg-n">{n}</span>
                    <span className={t === "Builder" ? "cm-type cm-bl" : "cm-type cm-st"}>{t}</span>
                    {home ? <span className="cm-home"><Icon name="i-star" /> Home</span> : <span className="cm-home off">Standard</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cm-card cm-tpl">
              <div className="cm-card-h"><Icon name="i-layers" /><h3>Details templates</h3></div>
              <p>The layout of each service details page, per module and page context, built from sections.</p>
              <div className="cm-tpl-blocks" aria-hidden="true"><i className="w" /><i /><i /><i className="w" /></div>
            </div>
          </div>
        </div>
        <p className="cm-note">Example data.</p>
      </div>
    </section>
  );
}

const STATES = ["Draft", "Review", "Scheduled", "Published", "Archived"];

export function CmsTop2() {
  return (
    <section className="section cm-editor">
      <div className="container">
        <div className="cm-ed-grid">
          <div className="cm-ed-intro">
            <span className="eyebrow">Blog editor</span>
            <h2>Write once, see how it looks in search before you publish</h2>
            <p>The post editor keeps content, SEO, category and publishing on one screen. The search preview updates as you type the meta title and description.</p>
            <ol className="cm-points">
              <li><span>1</span><div><h3>Stable URL</h3><p>Generated from the title and kept after publishing.</p></div></li>
              <li><span>2</span><div><h3>Summary</h3><p>Used on blog cards, search results and social previews.</p></div></li>
              <li><span>3</span><div><h3>Search preview</h3><p>Check the meta title and description as Google would show them.</p></div></li>
              <li><span>4</span><div><h3>Social image</h3><p>A 1200 × 630 share image, with the feature image as fallback.</p></div></li>
            </ol>
          </div>

          <div className="cm-doc" aria-hidden="true">
            <div className="cm-doc-bar">
              <span className="cm-doc-t">Add new blog post</span>
              <span className="cm-doc-btns"><span>Preview</span><span className="pri">Create post</span></span>
            </div>
            <div className="cm-doc-body">
              <div className="cm-doc-main">
                <p className="cm-lbl">Title <span className="cm-mk">1</span></p>
                <p className="cm-title">10 things to pack for your first Umrah</p>
                <p className="cm-lbl">Summary <span className="cm-mk">2</span></p>
                <p className="cm-sum">A short checklist for first-time pilgrims, from documents to comfortable footwear.</p>
                <p className="cm-lbl">Content</p>
                <div className="cm-lines"><i /><i /><i className="s" /><i /><i className="m" /></div>
                <p className="cm-count">640 words · 3,900 characters</p>

                <div className="cm-serp">
                  <p className="cm-lbl">Search preview <span className="cm-mk">3</span></p>
                  <p className="cm-serp-url">skytravels.example › blog › umrah-packing-list</p>
                  <p className="cm-serp-t">Umrah packing list: 10 things to bring | Sky Travels</p>
                  <p className="cm-serp-d">Packing for your first Umrah? Use this checklist of documents, clothing and essentials to travel light and stay comfortable.</p>
                  <div className="cm-meter"><span style={{ width: "78%" }} /></div>
                  <p className="cm-meter-l">Meta description · 124 characters</p>
                </div>
              </div>

              <div className="cm-doc-side">
                <div className="cm-box">
                  <p className="cm-lbl">Publishing</p>
                  <div className="cm-states">{STATES.map((s) => <span key={s} className={s === "Scheduled" ? "on" : ""}>{s}</span>)}</div>
                  <p className="cm-when"><Icon name="i-calendar" /> Goes live on the date you set</p>
                  <p className="cm-chk on"><i /> Enable featured</p>
                  <p className="cm-chk on"><i /> Allow comments</p>
                </div>
                <div className="cm-box">
                  <p className="cm-lbl">Category &amp; tags</p>
                  <span className="cm-sel">Hajj &amp; Umrah guides</span>
                  <div className="cm-tags"><span>umrah</span><span>packing</span><span>first trip</span></div>
                </div>
                <div className="cm-box">
                  <p className="cm-lbl">SEO image <span className="cm-mk">4</span></p>
                  <div className="cm-img"><Icon name="i-kaaba" /><small>1200 × 630</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="cm-note">Example post.</p>
      </div>
    </section>
  );
}

const MEDIA = [
  { n: "umrah-hero.jpg", fav: true, ic: "i-kaaba" },
  { n: "beach-resort.jpg", fav: false, ic: "i-bed" },
  { n: "logo.svg", fav: true, ic: "i-spark" },
  { n: "city-tour.jpg", fav: false, ic: "i-map" },
  { n: "visa-guide.pdf", fav: false, ic: "i-file" },
  { n: "promo-video.mp4", fav: false, ic: "i-eye" },
];

const MOD: [string, number, string][] = [
  ["Pending", 3, "p"],
  ["Approved", 12, "a"],
  ["Spam", 2, "s"],
  ["Rejected", 1, "r"],
];

export function CmsBottom() {
  const total = MOD.reduce((a, [, n]) => a + n, 0);
  return (
    <section className="section alt mod-after cm-assets">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Media and community</span>
          <h2>Files, comments, reviews and FAQs, each with its own home</h2>
          <p>Upload images once and reuse them anywhere. Keep conversations clean with a moderation queue, and manage the testimonials and FAQs your pages display.</p>
        </div>

        <div className="cm-wall">
          <div className="cm-lib">
            <div className="cm-lib-h">
              <span className="cm-lib-t"><Icon name="i-layers" /> Media library</span>
              <span className="cm-up">Upload</span>
            </div>
            <div className="cm-lib-body">
              <ul className="cm-folders">
                <li className="on">All media</li><li>Hajj &amp; Umrah</li><li>Hotels</li><li>Tours</li><li>Brand</li>
                <li className="cm-trash">Trash</li>
              </ul>
              <div className="cm-lib-main">
                <div className="cm-filters"><span className="on">Images</span><span>SVG</span><span>Videos</span><span>Documents</span><span>Favourites</span><span>Duplicates</span></div>
                <div className="cm-grid">
                  {MEDIA.map((m) => (
                    <div key={m.n} className="cm-file">
                      <span className="cm-thumb"><Icon name={m.ic} />{m.fav && <span className="cm-fav"><Icon name="i-heart" /></span>}</span>
                      <span className="cm-fname">{m.n}</span>
                    </div>
                  ))}
                </div>
                <div className="cm-store"><span>Storage</span><div className="cm-store-bar"><i style={{ width: "34%" }} /></div><span>Newest first · 24 per page</span></div>
              </div>
            </div>
          </div>

          <div className="cm-mod">
            <h3><Icon name="i-chat" /> Comment moderation</h3>
            <div className="cm-stack" role="img" aria-label="Comments by status">
              {MOD.map(([l, n, k]) => <span key={l} className={`cm-m-${k}`} style={{ flexGrow: n }} />)}
            </div>
            <ul className="cm-legend">
              {MOD.map(([l, n, k]) => <li key={l}><i className={`cm-m-${k}`} />{l}<span>{n}</span></li>)}
            </ul>
            <div className="cm-comment">
              <p className="cm-c-who"><span className="cm-c-av">C1</span> Customer 01 <small>on Umrah packing list</small></p>
              <p className="cm-c-txt">Very useful, thank you. Do you have a list for Hajj too?</p>
              <div className="cm-c-act"><span className="ok">Approve</span><span>Spam</span><span>Reject</span></div>
            </div>
            <p className="cm-total">{total} comments in this example</p>
          </div>

          <div className="cm-blocks">
            <div className="cm-quote">
              <div className="cm-q-top"><span className="cm-stars"><Icon name="i-star" /><Icon name="i-star" /><Icon name="i-star" /><Icon name="i-star" /><Icon name="i-star" /></span><span className="cm-q-feat">Featured</span></div>
              <p>“Everything was arranged on time and the team answered every question.”</p>
              <p className="cm-q-who">Customer 02 · <Icon name="i-eye" /> video · order 1</p>
            </div>
            <div className="cm-faq">
              <h3><Icon name="i-search" /> FAQ</h3>
              <ol>
                <li><span>1</span>How early should I apply for a visa?<em>Active</em></li>
                <li><span>2</span>Can I pay in instalments?<em>Active</em></li>
                <li><span>3</span>What is included in the package?<em className="off">Inactive</em></li>
              </ol>
            </div>
          </div>
        </div>
        <p className="cm-note">Example data.</p>
      </div>
    </section>
  );
}
