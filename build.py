#!/usr/bin/env python3
"""Build the static site.

Hand-written pages live in src/pages/. Each starts with a front-matter block:

    <!--
    title: Page title
    description: Meta description
    nav: features
    -->

`{{> name}}` includes src/partials/name.html (or a generated partial).
Feature, solution, success story, blog and legal pages are generated from
src/content.py, src/content_seo.py and src/content_more.py.
All pages are wrapped in src/partials/layout.html and written to the repository root,
together with sitemap.xml and robots.txt.

The build also writes assets/js/i18n-data.js (Bangla text from the content files) and
reports any visible English text that has no Bangla translation.

Usage: python3 build.py
"""
import html
import json
import pathlib
import re
import sys
from html.parser import HTMLParser
from urllib.parse import quote

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
PARTIALS = SRC / "partials"
sys.path.insert(0, str(SRC))
import content as C  # noqa: E402
import content_more as M  # noqa: E402
import content_seo as S  # noqa: E402

SITE = "https://travelsuiteerp.com/"
INCLUDE = re.compile(r"\{\{>\s*([\w-]+)\s*\}\}")
FRONT = re.compile(r"\A<!--(.*?)-->\s*", re.S)
WA = "https://wa.me/8801325277120"

PAIRS = {}          # English -> Bangla, collected from the content files
GENERATED = {}      # generated partials
OUTPUT = {}         # file name -> (meta, body)


def tr(value):
    """Return English text for a T() pair or plain string, remembering the translation."""
    if isinstance(value, tuple):
        en, bn = value
        PAIRS[en] = bn
        return en
    return value


def e(value):
    return html.escape(tr(value), quote=False)


def a(value):
    """Escape for an attribute value."""
    return html.escape(tr(value), quote=True)


def icon(name, cls="ic"):
    return f'<svg class="{cls}"><use href="#{name}"/></svg>'


def T_(en, bn):
    return (en, bn)


for pair in C.UI + C.BLOG_CATEGORIES + M.UI_MORE:
    tr(pair)
for c in M.COUNTRIES:
    tr(c["name"])

FEATURES = {f["slug"]: f for f in C.FEATURES}
GROUP_TITLE = dict(C.FEATURE_GROUPS)


# ---------------------------------------------------------------------------
# SEO helpers
# ---------------------------------------------------------------------------
def jsonld(obj):
    return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False) + "</script>"


def breadcrumb_ld(items):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i, "name": tr(label), "item": SITE + (href or "")}
        for i, (label, href) in enumerate(items, 1)]}


def faq_ld(faqs):
    return {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": tr(q), "acceptedAnswer": {"@type": "Answer", "text": tr(ans)}} for q, ans in faqs]}


def faq_section(faqs, title="Frequently asked questions", alt=False):
    items = "".join(f"<details{' open' if i == 0 else ''}><summary>{e(q)}</summary><p>{e(ans)}</p></details>"
                    for i, (q, ans) in enumerate(faqs))
    return f'''<section class="section{' alt' if alt else ''}" id="faq">
  <div class="container narrow">
    <div class="section-head"><span class="eyebrow">{e("FAQ")}</span><h2>{e(title)}</h2></div>
    <div class="faq">{items}</div>
  </div>
</section>'''


# ---------------------------------------------------------------------------
# Shared fragments
# ---------------------------------------------------------------------------
def breadcrumb(items):
    parts = []
    for label, href in items:
        parts.append(f'<a href="{href}">{e(label)}</a>' if href else f'<span aria-current="page">{e(label)}</span>')
    return f'<nav class="breadcrumb" aria-label="{a("Breadcrumb")}">' + '<span class="sep">/</span>'.join(parts) + "</nav>"


def crumbs_for_ld(items, current):
    out = []
    for label, href in items:
        out.append((label, href if href is not None else current))
    return [(lbl, "" if h == "index.html" else h) for lbl, h in out]


def hero_ctas():
    return ('<div class="hero-ctas">'
            f'<a href="contact.html" class="btn btn-lime btn-lg">{e("Request a demo")} {icon("i-arrow")}</a>'
            "{{> wa-pill}}</div>")


def feature_card(f):
    return (f'<a class="link-card" href="feature-{f["slug"]}.html">'
            f'<span class="m-ico dark sm"><svg><use href="#{f["icon"]}"/></svg></span>'
            f'<span><b>{e(f["title"])}</b><small>{e(f["desc"])}</small></span>'
            f'{icon("i-arrow", "ic go")}</a>')


def overview_section(title, paragraphs, keywords=""):
    paras = "".join(f"<p>{e(p)}</p>" for p in paragraphs)
    return f'''<section class="section overview">
  <div class="container narrow">
    <span class="eyebrow">{e("Overview")}</span>
    <h2>{e(title)}</h2>
    <div class="prose">{paras}</div>
  </div>
</section>'''


# ---------------------------------------------------------------------------
# Features
# ---------------------------------------------------------------------------
def build_features_overview():
    nav, body = [], []
    for gid, gname in C.FEATURE_GROUPS:
        items = [f for f in C.FEATURES if f["group"] == gid]
        nav.append(f'<p class="fnav-group">{e(gname)}</p>' + "".join(
            f'<a href="#{f["slug"]}">{icon(f["icon"])}{e(f["title"])}</a>' for f in items))
        body.append(f'<h2 class="fgroup-title" id="{gid}">{e(gname)}</h2>')
        for f in items:
            lis = "".join(f"<li>{e(b)}</li>" for b in f["bullets"])
            body.append(f'''<article class="fdetail" id="{f["slug"]}">
  <div class="fdetail-head"><span class="m-ico dark"><svg><use href="#{f["icon"]}"/></svg></span><div><h3>{e(f["title"])}</h3><p>{e(f["desc"])}</p></div></div>
  <ul class="fdetail-list">{lis}</ul>
  <a href="feature-{f["slug"]}.html" class="link-arrow">{e("Learn more")} {icon("i-arrow")}</a>
</article>''')
    page = f'''<section class="page-hero">
  <div class="container">
    {breadcrumb([("Home", "index.html"), ("Features", None)])}
    <h1>{e("Everything your agency needs, in")} <span class="hl">{e("one platform")}</span></h1>
    <p class="lead">{e("6 travel services, 9 business modules and a connected website, AI and inbox. Explore what each part does.")}</p>
    <div class="jump-chips"><a href="#services">{e("Travel services")}</a><a href="#modules">{e("Business modules")}</a><a href="#platform">{e("Platform")}</a></div>
  </div>
</section>
<section class="section features-page">
  <div class="container fp-grid">
    <aside class="fnav" aria-label="{a("Features navigation")}"><div class="fnav-inner">{"".join(nav)}</div></aside>
    <div class="fbody">{"".join(body)}</div>
  </div>
</section>
{{{{> tools}}}}'''
    OUTPUT["features.html"] = (dict(
        title="Features — TravelSuite ERP",
        description="Every feature of TravelSuite ERP: flights, hotels, Hajj & Umrah, visa, tours, transport, CRM, sales, finance, HR, help desk, reports, AI automation and omnichannel inbox.",
        nav="features",
        head=jsonld(breadcrumb_ld([("Home", ""), ("Features", "features.html")]))), page)


def build_feature_pages():
    tr(T_("Overview", "সংক্ষিপ্ত পরিচিতি"))
    for f in C.FEATURES:
        seo = S.FEATURE_SEO[f["slug"]]
        name = f"feature-{f['slug']}.html"
        caps = "".join(f'<div class="cap">{icon("i-check")}<span>{e(b)}</span></div>' for b in f["bullets"])
        steps = "".join(f"<li><span>{i}</span><h4>{e(s)}</h4></li>" for i, s in enumerate(f["steps"], 1))
        benefits = "".join(f"<li>{icon('i-check')}<span>{e(b)}</span></li>" for b in f["benefits"])
        related = [g for g in C.FEATURES if g["group"] == f["group"] and g["slug"] != f["slug"]][:3]
        crumbs = [("Home", "index.html"), ("Features", "features.html"), (f["title"], None)]
        page = f'''<section class="page-hero">
  <div class="container detail-hero">
    <div>
      {breadcrumb(crumbs)}
      <span class="pill">{e(GROUP_TITLE[f["group"]])}</span>
      <h1><span class="hero-ico"><svg><use href="#{f["icon"]}"/></svg></span>{e(f["title"])}</h1>
      <p class="lead">{e(f["intro"])}</p>
      {hero_ctas()}
    </div>
    <aside class="benefit-card">
      <h2>{e("Why agencies use it")}</h2>
      <ul>{benefits}</ul>
    </aside>
  </div>
</section>
{overview_section(f["title"], seo["overview"], seo["keywords"])}
<section class="section alt">
  <div class="container">
    <div class="section-head"><span class="eyebrow">{e("Key capabilities")}</span><h2>{e(f["desc"])}</h2></div>
    <div class="caps">{caps}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><span class="eyebrow">{e("How it works")}</span><h2>{e(f["title"])}</h2></div>
    <ol class="steps three">{steps}</ol>
  </div>
</section>
{faq_section(seo["faqs"], alt=True)}
<section class="section">
  <div class="container">
    <div class="connect-strip">
      <span class="m-ico"><svg><use href="#i-layers"/></svg></span>
      <div><h3>{e("Works with every TravelSuite module")}</h3><p>{e("Bookings, customers, payments and accounts stay in one database, so this module shares data with everything else automatically.")}</p></div>
    </div>
    <div class="related">
      <div class="related-head"><h2>{e("Related features")}</h2><a href="features.html" class="link-arrow">{e("All features")} {icon("i-arrow")}</a></div>
      <div class="link-cards">{"".join(feature_card(g) for g in related)}</div>
    </div>
  </div>
</section>'''
        title = f"{tr(f['title'])} — TravelSuite ERP"
        PAIRS.setdefault(title, None)
        head = jsonld(breadcrumb_ld(crumbs_for_ld(crumbs, name))) + jsonld(faq_ld(seo["faqs"])) + jsonld({
            "@context": "https://schema.org", "@type": "SoftwareApplication", "name": f"TravelSuite ERP — {tr(f['title'])}",
            "applicationCategory": "BusinessApplication", "operatingSystem": "Web", "description": tr(f["intro"]),
            "offers": {"@type": "Offer", "url": SITE + "pricing.html"}})
        OUTPUT[name] = (dict(title=title, description=tr(seo["overview"][0])[:300], nav="products",
                             keywords=seo["keywords"], head=head), page)


# ---------------------------------------------------------------------------
# Solutions
# ---------------------------------------------------------------------------
def solution_card(s):
    return f'''<a class="solution-card" href="solution-{s["slug"]}.html">
  <span class="m-ico dark"><svg><use href="#{s["icon"]}"/></svg></span>
  <h3>{e(s["title"])}</h3>
  <p>{e(s["tagline"])}</p>
  <span class="link-arrow">{e("Explore solution")} {icon("i-arrow")}</span>
</a>'''


def build_solutions():
    page = f'''<section class="page-hero">
  <div class="container">
    {breadcrumb([("Home", "index.html"), ("Solutions", None)])}
    <h1>{e("Solutions for every travel business")}</h1>
    <p class="lead">{e("Pick the setup that matches how you sell. Every solution runs on the same platform, so you can add more later.")}</p>
  </div>
</section>
<section class="section">
  <div class="container"><div class="solution-grid">{"".join(solution_card(s) for s in C.SOLUTIONS)}</div></div>
</section>
{{{{> markets}}}}'''
    OUTPUT["solutions.html"] = (dict(
        title="Solutions — TravelSuite ERP",
        description="TravelSuite ERP solutions for travel agencies, Hajj & Umrah operators, B2B consolidators, tour operators, online travel agencies and corporate travel desks.",
        nav="solutions", head=jsonld(breadcrumb_ld([("Home", ""), ("Solutions", "solutions.html")]))), page)
    tr(T_("TravelSuite ERP solutions for travel agencies, Hajj & Umrah operators, B2B consolidators, tour operators, online travel agencies and corporate travel desks.",
          "ট্রাভেল এজেন্সি, হজ ও উমরাহ অপারেটর, B2B কনসোলিডেটর, ট্যুর অপারেটর, অনলাইন ট্রাভেল এজেন্সি ও কর্পোরেট ট্রাভেল ডেস্কের জন্য TravelSuite ERP সলিউশন।"))

    for s in C.SOLUTIONS:
        seo = S.SOLUTION_SEO[s["slug"]]
        name = f"solution-{s['slug']}.html"
        challenges = "".join(f'<div class="challenge">{icon("i-x")}<span>{e(c)}</span></div>' for c in s["challenges"])
        helps = "".join(f'<div class="help">{icon("i-check")}<span>{e(h)}</span></div>' for h in s["helps"])
        modules = "".join(feature_card(FEATURES[m]) for m in s["modules"])
        others = "".join(f'<a href="solution-{o["slug"]}.html">{icon(o["icon"])}{e(o["title"])}</a>'
                         for o in C.SOLUTIONS if o["slug"] != s["slug"])
        crumbs = [("Home", "index.html"), ("Solutions", "solutions.html"), (s["title"], None)]
        page = f'''<section class="page-hero">
  <div class="container detail-hero">
    <div>
      {breadcrumb(crumbs)}
      <span class="pill">{e(s["title"])}</span>
      <h1>{e(s["headline"])}</h1>
      <p class="lead">{e(s["intro"])}</p>
      {hero_ctas()}
    </div>
    <aside class="benefit-card plan-hint">
      <span class="m-ico"><svg><use href="#{s["icon"]}"/></svg></span>
      <h2>{e(s["title"])}</h2>
      <p>{e(s["tagline"])}</p>
      <div class="plan-pill"><small>{e("Recommended plan")}</small><b>{e(s["plan"])}</b></div>
      <a href="pricing.html" class="link-arrow light">{e("See plan details")} {icon("i-arrow")}</a>
    </aside>
  </div>
</section>
{overview_section(s["title"], seo["overview"], seo["keywords"])}
<section class="section alt">
  <div class="container">
    <div class="section-head"><span class="eyebrow">{e("Common challenges")}</span><h2>{e("What slows these businesses down")}</h2></div>
    <div class="challenges">{challenges}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><span class="eyebrow">{e("How TravelSuite helps")}</span><h2>{e("Built around your daily work")}</h2></div>
    <div class="helps">{helps}</div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="related-head"><h2>{e("Recommended modules")}</h2><a href="features.html" class="link-arrow">{e("All features")} {icon("i-arrow")}</a></div>
    <div class="link-cards">{modules}</div>
  </div>
</section>
{faq_section(seo["faqs"])}
<section class="section alt">
  <div class="container">
    <div class="other-solutions"><h3>{e("Other solutions")}</h3><div class="chips-row">{others}</div></div>
  </div>
</section>'''
        title = f"{tr(s['title'])} — TravelSuite ERP"
        PAIRS.setdefault(title, None)
        head = jsonld(breadcrumb_ld(crumbs_for_ld(crumbs, name))) + jsonld(faq_ld(seo["faqs"]))
        OUTPUT[name] = (dict(title=title, description=tr(seo["overview"][0])[:300], nav="solutions",
                             keywords=seo["keywords"], head=head), page)


# ---------------------------------------------------------------------------
# Success stories
# ---------------------------------------------------------------------------
def success_card(st):
    chips = "".join(f"<span>{e(c)}</span>" for c in st["chips"])
    return f'''<article class="success-card">
  <a class="site-shot" href="success-{st["slug"]}.html" tabindex="-1" aria-hidden="true">
    <span class="sm-bar"><i></i><i></i><i></i><span>{st["url"]}</span></span>
    <img src="assets/img/success/{st["shot"]}.jpg" alt="" loading="lazy" width="960" height="600">
  </a>
  <div class="success-body">
    <h3><a href="success-{st["slug"]}.html">{e(st["type"])}</a></h3>
    <p class="loc"><svg class="ic"><use href="#i-pin"/></svg>{e(st["location"])}</p>
    <div class="mini-chips">{chips}</div>
    <p class="metric"><svg class="ic"><use href="#i-trend"/></svg>{e(st["metric"])}</p>
    <a href="success-{st["slug"]}.html" class="link-arrow">{e("Read the story")} {icon("i-arrow")}</a>
  </div>
</article>'''


def build_success():
    GENERATED["success-grid"] = "".join(success_card(st) for st in M.SUCCESS)
    page = f'''<section class="page-hero">
  <div class="container">
    {breadcrumb([("Home", "index.html"), ("Success stories", None)])}
    <h1>{e("Success stories")}</h1>
    <p class="lead">{e("Real results from travel businesses using TravelSuite ERP across Bangladesh, Malaysia and the GCC.")}</p>
  </div>
</section>
<section class="section"><div class="container"><div class="success-grid">{{{{> success-grid}}}}</div></div></section>'''
    OUTPUT["success-stories.html"] = (dict(title="Success stories — TravelSuite ERP",
                                           description=tr(M.UI_MORE[8]), nav="company",
                                           head=jsonld(breadcrumb_ld([("Home", ""), ("Success stories", "success-stories.html")]))), page)

    stars = "".join('<svg><use href="#i-star"/></svg>' for _ in range(5))
    for st in M.SUCCESS:
        name = f"success-{st['slug']}.html"
        crumbs = [("Home", "index.html"), ("Success stories", "success-stories.html"), (st["type"], None)]
        results = "".join(f'<div class="result-card"><strong>{e(v)}</strong><span>{e(lbl)}</span></div>' for v, lbl in st["results"])
        sol = "".join(f'<li>{icon("i-check")}<span>{e(x)}</span></li>' for x in st["solution"])
        mods = "".join(feature_card(FEATURES[m]) for m in st["modules"])
        others = "".join(success_card(o) for o in M.SUCCESS if o["slug"] != st["slug"])
        page = f'''<section class="page-hero">
  <div class="container">
    {breadcrumb(crumbs)}
    <span class="pill">{e("Success story")}</span>
    <h1 class="story-title">{e(st["headline"])}</h1>
    <p class="lead">{e(st["intro"])}</p>
    <dl class="story-facts">
      <div><dt>{e("Business type")}</dt><dd>{e(st["type"])}</dd></div>
      <div><dt>{e("Location")}</dt><dd>{e(st["location"])}</dd></div>
      <div><dt>{e("Time to go live")}</dt><dd>{e(st["golive"])}</dd></div>
      <div><dt>{e("Website")}</dt><dd>{st["url"]}</dd></div>
    </dl>
  </div>
</section>
<section class="section story-shot-wrap">
  <div class="container">
    <figure class="story-shot">
      <div class="sm-bar"><i></i><i></i><i></i><span>{st["url"]}</span></div>
      <img src="assets/img/success/{st["shot"]}.jpg" alt="" width="960" height="600">
    </figure>
    <div class="story-results">{results}</div>
  </div>
</section>
<section class="section">
  <div class="container story-grid">
    <div class="story-block">
      <span class="eyebrow">{e("The challenge")}</span>
      <p class="prose-lg">{e(st["challenge"])}</p>
    </div>
    <div class="story-block">
      <span class="eyebrow">{e("The solution")}</span>
      <ul class="story-list">{sol}</ul>
    </div>
  </div>
  <div class="container narrow">
    <figure class="t-card t-featured story-quote">
      <div class="stars" aria-label="{a("5 out of 5")}">{stars}</div>
      <blockquote>{e(st["quote"])}</blockquote>
      <figcaption><span class="avatar">{"".join(w[0] for w in tr(st["person"]).split()[:2])}</span><span><b>{e(st["person"])}</b><small><span>{e(st["type"])}</span>, <span>{e(st["location"])}</span></small></span></figcaption>
    </figure>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="related-head"><h2>{e("Modules used")}</h2><a href="features.html" class="link-arrow">{e("All features")} {icon("i-arrow")}</a></div>
    <div class="link-cards">{mods}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="related-head"><h2>{e("More success stories")}</h2><a href="success-stories.html" class="link-arrow">{e("All success stories")} {icon("i-arrow")}</a></div>
    <div class="success-grid">{others}</div>
  </div>
</section>'''
        title = f"{tr(st['headline'])} — TravelSuite ERP"
        PAIRS[title] = f"{st['headline'][1]} — TravelSuite ERP"
        head = jsonld(breadcrumb_ld(crumbs_for_ld(crumbs, name)))
        OUTPUT[name] = (dict(title=title, description=tr(st["intro"]), nav="company", head=head,
                             image=f"assets/img/success/{st['shot']}.jpg"), page)


# ---------------------------------------------------------------------------
# Blog
# ---------------------------------------------------------------------------
def post_card(p, featured=False):
    cls = "post-card featured-post" if featured else "post-card"
    chip = f'<span class="feat-chip">{e("Featured article")}</span>' if featured else ""
    return f'''<article class="{cls}" data-cat="{html.escape(p["cat"])}">
  <a href="blog-{p["slug"]}.html" class="post-cover" style="--c:{p["color"]}" tabindex="-1" aria-hidden="true">
    <svg><use href="#{p["icon"]}"/></svg><span class="cover-chip">{e(p["cat"])}</span>
  </a>
  <div class="post-body">
    {chip}
    <p class="post-meta"><span>{e(p["date"])}</span><span class="dotsep"></span><span>{p["read"]}</span> <span>{e("min read")}</span></p>
    <h3><a href="blog-{p["slug"]}.html">{e(p["title"])}</a></h3>
    <p>{e(p["excerpt"])}</p>
    <a href="blog-{p["slug"]}.html" class="link-arrow">{e("Read article")} {icon("i-arrow")}</a>
  </div>
</article>'''


ISO_DATES = {"digitize-hajj-umrah-agency": "2026-10-02", "b2b-agent-credit-limits": "2026-09-24",
             "double-entry-accounting-travel": "2026-09-15", "whatsapp-for-travel-agencies": "2026-09-05",
             "ai-trip-planners": "2026-08-27", "choosing-a-travel-erp": "2026-08-18"}


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def build_blog():
    counts = {}
    for p in C.POSTS:
        counts[p["cat"]] = counts.get(p["cat"], 0) + 1
    chips = f'<button class="active" data-filter="all" aria-pressed="true">{e("All")} <em>{len(C.POSTS)}</em></button>' + "".join(
        f'<button data-filter="{html.escape(tr(c))}" aria-pressed="false">{e(c)} <em>{counts.get(tr(c), 0)}</em></button>'
        for c in C.BLOG_CATEGORIES)
    page = f'''<section class="page-hero">
  <div class="container">
    {breadcrumb([("Home", "index.html"), ("Blog", None)])}
    <h1>{e("TravelSuite blog")}</h1>
    <p class="lead">{e("Guides, ideas and news for travel agencies running their business online.")}</p>
  </div>
</section>
<section class="section">
  <div class="container">
    {post_card(C.POSTS[0], featured=True)}
    <div class="blog-filter" role="group" aria-label="{a("Filter articles by category")}">{chips}</div>
    <div class="post-grid" id="postGrid">{"".join(post_card(p) for p in C.POSTS[1:])}</div>
  </div>
</section>'''
    OUTPUT["blog.html"] = (dict(title="Blog — TravelSuite ERP",
                                description="Guides, ideas and news for travel agencies running their business online.",
                                nav="company", head=jsonld(breadcrumb_ld([("Home", ""), ("Blog", "blog.html")]))), page)
    tr(T_("Blog — TravelSuite ERP", "ব্লগ — TravelSuite ERP"))

    GENERATED["blog-latest"] = f'''<section class="section alt" id="blog">
  <div class="container">
    <div class="section-head with-controls">
      <div><span class="eyebrow">{e("Latest from the blog")}</span><h2>{e("Practical guides for travel agencies")}</h2></div>
      <a href="blog.html" class="btn btn-outline">{e("View all articles")} {icon("i-arrow")}</a>
    </div>
    <div class="post-grid">{"".join(post_card(p) for p in C.POSTS[:3])}</div>
  </div>
</section>'''

    for p in C.POSTS:
        extra = M.BLOG_EXTRA.get(p["slug"], {})
        body = list(p["body"])
        # keep the closing paragraph last when extra sections are added
        closing = [body.pop()] if body and body[-1][0] == "p" and len(body) > 3 else []
        body += extra.get("blocks", []) + closing
        parts, toc = [], []
        for kind, value in body:
            if kind == "h2":
                hid = slugify(tr(value))
                toc.append(f'<a href="#{hid}">{e(value)}</a>')
                parts.append(f'<h2 id="{hid}">{e(value)}</h2>')
            elif kind == "p":
                parts.append(f"<p>{e(value)}</p>")
            elif kind == "ul":
                parts.append("<ul>" + "".join(f"<li>{e(v)}</li>" for v in value) + "</ul>")
        faqs = extra.get("faqs", [])
        if faqs:
            toc.append(f'<a href="#post-faq">{e("Frequently asked questions")}</a>')
            parts.append(f'<h2 id="post-faq">{e("Frequently asked questions")}</h2><div class="faq">' + "".join(
                f"<details><summary>{e(q)}</summary><p>{e(ans)}</p></details>" for q, ans in faqs) + "</div>")
        takeaways = "".join(f"<li>{e(t)}</li>" for t in extra.get("takeaways", []))
        related = [q for q in C.POSTS if q["slug"] != p["slug"] and q["cat"] == p["cat"]]
        related += [q for q in C.POSTS if q["slug"] != p["slug"] and q not in related]
        name = f"blog-{p['slug']}.html"
        url = SITE + name
        title = tr(p["title"])
        share = (f'<a class="share wa" href="https://wa.me/?text={quote(title + " " + url)}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg><use href="#i-wa"/></svg></a>'
                 f'<a class="share fb" href="https://www.facebook.com/sharer/sharer.php?u={quote(url)}" target="_blank" rel="noopener" aria-label="Facebook">f</a>'
                 f'<a class="share in" href="https://www.linkedin.com/sharing/share-offsite/?url={quote(url)}" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>')
        crumbs = [("Home", "index.html"), ("Blog", "blog.html"), (p["cat"], None)]
        words = sum(len(tr(v).split()) if k != "ul" else sum(len(tr(x).split()) for x in v) for k, v in body)
        page = f'''<div class="read-progress" aria-hidden="true"><span id="readBar"></span></div>
<section class="page-hero post-hero">
  <div class="container narrow">
    {breadcrumb(crumbs)}
    <span class="pill">{e(p["cat"])}</span>
    <h1>{e(p["title"])}</h1>
    <p class="post-meta light"><span>{e("TravelSuite Team")}</span><span class="dotsep"></span><span>{e(p["date"])}</span><span class="dotsep"></span><span>{p["read"]}</span> <span>{e("min read")}</span></p>
  </div>
</section>
<section class="section post-section">
  <div class="container post-layout">
    <aside class="post-toc" aria-label="{a("Table of contents")}">
      <div class="toc-inner">
        <p class="fnav-group">{e("Table of contents")}</p>
        <nav id="tocNav">{"".join(toc)}</nav>
        <div class="toc-share"><span>{e("Share this article")}</span><div>{share}</div></div>
      </div>
    </aside>
    <div class="post-main">
      <div class="post-cover big" style="--c:{p["color"]}" aria-hidden="true"><svg><use href="#{p["icon"]}"/></svg></div>
      <article class="article" id="article">
        <p class="article-lead">{e(p["excerpt"])}</p>
        {f'<div class="takeaways"><h2 class="tk-title">{e("Key takeaways")}</h2><ul>{takeaways}</ul></div>' if takeaways else ""}
        {"".join(parts)}
      </article>
      <div class="author-box">
        <img src="assets/img/favicon.png" alt="" width="56" height="56">
        <div><small>{e("About the author")}</small><b>{e("TravelSuite Team")}</b><p>{e("The TravelSuite team builds travel booking and ERP software for agencies in Bangladesh, Malaysia, the GCC and the USA.")}</p></div>
      </div>
      <div class="share-row"><span>{e("Share this article")}</span>{share}</div>
      <div class="article-cta">
        <div><h3>{e("Want to see this in your agency?")}</h3><p>{e("Book a free 30-minute walkthrough with our team.")}</p></div>
        <a href="contact.html" class="btn btn-lime">{e("Request a demo")} {icon("i-arrow")}</a>
      </div>
      <a href="blog.html" class="link-arrow back">{icon("i-left")} {e("Back to blog")}</a>
    </div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="related-head"><h2>{e("Related articles")}</h2><a href="blog.html" class="link-arrow">{e("View all articles")} {icon("i-arrow")}</a></div>
    <div class="post-grid">{"".join(post_card(q) for q in related[:3])}</div>
  </div>
</section>'''
        page_title = f"{title} — TravelSuite ERP"
        PAIRS[page_title] = f"{p['title'][1]} — TravelSuite ERP"
        ld = {"@context": "https://schema.org", "@type": "BlogPosting", "headline": title, "description": tr(p["excerpt"]),
              "datePublished": ISO_DATES.get(p["slug"], ""), "wordCount": words, "articleSection": p["cat"],
              "author": {"@type": "Organization", "name": "TravelSuite ERP"},
              "publisher": {"@type": "Organization", "name": "TravelSuite ERP", "logo": {"@type": "ImageObject", "url": SITE + "assets/img/logo.png"}},
              "mainEntityOfPage": url}
        head = jsonld(ld) + jsonld(breadcrumb_ld(crumbs_for_ld(crumbs, name))) + (jsonld(faq_ld(faqs)) if faqs else "")
        head += '\n  <meta property="og:type" content="article">'
        OUTPUT[name] = (dict(title=page_title, description=tr(p["excerpt"]), nav="company", head=head), page)


# ---------------------------------------------------------------------------
# Legal
# ---------------------------------------------------------------------------
def build_legal():
    for doc in C.LEGAL:
        toc, body = [], []
        for n, (heading, paras) in enumerate(doc["sections"], 1):
            sid = f"s{n}"
            toc.append(f'<a href="#{sid}">{e(heading)}</a>')
            content = "".join(f"<p>{e(x)}</p>" for x in paras) if len(paras) == 1 else \
                "<ul>" + "".join(f"<li>{e(x)}</li>" for x in paras) + "</ul>"
            body.append(f'<section id="{sid}"><h2>{e(heading)}</h2>{content}</section>')
        title = tr(doc["title"])
        page = f'''<section class="page-hero legal-hero">
  <div class="container">
    {breadcrumb([("Home", "index.html"), ("Legal", None), (doc["title"], None)])}
    <h1>{e(doc["title"])}</h1>
    <p class="lead">{e(doc["intro"])}</p>
    <p class="updated">{e("Last updated: 9 October 2026")}</p>
  </div>
</section>
<section class="section">
  <div class="container legal-grid">
    <aside class="legal-toc" aria-label="{a("On this page")}"><p class="fnav-group">{e("On this page")}</p>{"".join(toc)}</aside>
    <div class="legal-body">
      {"".join(body)}
      <div class="legal-contact">
        <h3>{e("Questions about this policy?")}</h3>
        <p>{e("Message us on WhatsApp at +880 13 2527 7120 and our team will help.")}</p>
        <a href="{WA}" target="_blank" rel="noopener" class="btn btn-forest"><svg class="ic fill"><use href="#i-wa"/></svg>{e("Chat on WhatsApp")}</a>
      </div>
    </div>
  </div>
</section>'''
        page_title = f"{title} — TravelSuite ERP"
        PAIRS[page_title] = f"{doc['title'][1]} — TravelSuite ERP"
        OUTPUT[f"{doc['slug']}.html"] = (dict(title=page_title, description=tr(doc["intro"]), nav=""), page)


# ---------------------------------------------------------------------------
# Markets, footer pieces
# ---------------------------------------------------------------------------
def build_shared_partials():
    flags = "".join(
        f'<li class="market{" has-office" if c["office"] else ""}"><img src="assets/img/flags/{c["code"]}.svg" alt="" width="36" height="27">'
        f'<span><b>{e(c["name"])}</b><small>{e(c["region"])}</small></span>'
        + (f'<em class="office-badge">{icon("i-building")}{e("Office")}</em>' if c["office"] else "") + "</li>"
        for c in M.COUNTRIES)
    GENERATED["markets"] = f'''<section class="section markets-wrap" id="markets">
  <div class="container">
    <div class="section-head"><span class="eyebrow">{e("Where we work")}</span><h2>{e("Serving travel businesses across the GCC, Southeast Asia and beyond")}</h2><p>{e("Local teams in the USA, Malaysia and Bangladesh support agencies in every market we serve.")}</p></div>
    <ul class="markets">{flags}</ul>
  </div>
</section>'''
    GENERATED["footer-flags"] = "".join(
        f'<li><img src="assets/img/flags/{c["code"]}.svg" alt="" width="24" height="18"><span>{e(c["name"])}</span>'
        + (f'<em>{e("Office")}</em>' if c["office"] else "") + "</li>" for c in M.COUNTRIES)
    GENERATED["footer-offices"] = "".join(
        f'<li><img src="assets/img/flags/{c["code"]}.svg" alt="" width="28" height="21"><span>{e(c["name"])}</span></li>'
        for c in M.COUNTRIES if c["office"])
    q = quote(M.AI_PROMPT)
    GENERATED["footer-ai"] = "".join(
        f'<a class="ai-btn" href="{url}{q}" target="_blank" rel="noopener"><img src="assets/img/partners/{logo}.svg" alt="" width="18" height="18">{name}</a>'
        for name, logo, url in M.AI_LINKS)
    GENERATED["footer-social"] = "".join(
        f'<a href="{url}" target="_blank" rel="noopener" aria-label="{name}"><img src="assets/img/partners/{logo}.svg" alt="" width="18" height="18"></a>'
        for name, logo, url in M.SOCIAL)
    GENERATED["footer-pay"] = "".join(
        f'<span class="pay-badge" title="{name}"><img src="assets/img/partners/{logo}.svg" alt="{name}" width="26" height="18"></span>'
        for name, logo in M.PAYMENTS)


# ---------------------------------------------------------------------------
# Rendering
# ---------------------------------------------------------------------------
def include(text, depth=0):
    if depth > 6:
        raise RuntimeError("partials nested too deeply")

    def sub(m):
        name = m.group(1)
        if name in GENERATED:
            return include(GENERATED[name], depth + 1)
        return include((PARTIALS / f"{name}.html").read_text(encoding="utf-8"), depth + 1)
    return INCLUDE.sub(sub, text)


ORG_LD = jsonld({"@context": "https://schema.org", "@type": "Organization", "name": "TravelSuite ERP", "url": SITE,
                 "logo": SITE + "assets/img/logo.png",
                 "sameAs": [url for _, _, url in M.SOCIAL if "wa.me" not in url],
                 "contactPoint": {"@type": "ContactPoint", "telephone": "+8801325277120", "contactType": "sales",
                                  "areaServed": ["BD", "MY", "SA", "AE", "QA", "KW", "OM", "BH", "US"],
                                  "availableLanguage": ["English", "Bengali"]},
                 "address": [{"@type": "PostalAddress", "addressCountry": c} for c in ("US", "MY", "BD")]})


def render(name, meta, body, layout):
    page = layout.replace("{{body}}", body)
    page = include(page)
    canonical = SITE + ("" if name == "index.html" else name)
    head = f'<link rel="canonical" href="{canonical}">\n  <meta property="og:url" content="{canonical}">'
    if meta.get("keywords"):
        head += f'\n  <meta name="keywords" content="{html.escape(meta["keywords"], quote=True)}">'
    head += "\n  " + ORG_LD if name == "index.html" else ""
    head += "\n  " + meta.get("head", "")
    page = page.replace("{{head}}", head)
    page = page.replace("{{image}}", meta.get("image", "assets/img/logo.png"))
    page = page.replace("{{title}}", html.escape(meta.get("title", ""), quote=True))
    page = page.replace("{{description}}", html.escape(meta.get("description", ""), quote=True))
    nav = meta.get("nav", "")
    if nav:
        page = page.replace(f'data-nav="{nav}"', f'data-nav="{nav}" aria-current="page"')
    (ROOT / name).write_text(page, encoding="utf-8")


def load_hand_pages():
    for page in sorted((SRC / "pages").glob("*.html")):
        raw = page.read_text(encoding="utf-8")
        match = FRONT.match(raw)
        if not match:
            raise SystemExit(f"{page.name}: missing front matter")
        meta = {}
        for line in match.group(1).strip().splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip()
        OUTPUT[page.name] = (meta, raw[match.end():])


def write_sitemap():
    order = ["index.html", "features.html", "solutions.html", "pricing.html", "success-stories.html", "blog.html", "about.html", "contact.html"]
    names = order + sorted(n for n in OUTPUT if n not in order)
    urls = "".join(f"  <url><loc>{SITE}{'' if n == 'index.html' else n}</loc><changefreq>{'weekly' if n.startswith('blog') or n == 'index.html' else 'monthly'}</changefreq></url>\n"
                   for n in names)
    (ROOT / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                                      + urls + "</urlset>\n", encoding="utf-8")
    (ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nDisallow: /src/\nDisallow: /tools/\n\nSitemap: {SITE}sitemap.xml\n", encoding="utf-8")


def write_translations():
    hand = hand_dictionary()
    for key, value in list(PAIRS.items()):
        # "<Name> — TravelSuite ERP" titles reuse the translated name
        if value is None and key.endswith(" — TravelSuite ERP"):
            name = key[: -len(" — TravelSuite ERP")]
            bn = PAIRS.get(name) or hand.get(name)
            if bn:
                PAIRS[key] = f"{bn} — TravelSuite ERP"
    data = {k: v for k, v in PAIRS.items() if v}
    js = ("/* Generated by build.py from src/content*.py. Do not edit by hand. */\n"
          "window.TS_DICT_EXTRA = { bn: " + json.dumps(data, ensure_ascii=False, indent=1, sort_keys=True) + " };\n")
    (ROOT / "assets/js/i18n-data.js").write_text(js, encoding="utf-8")
    return data


# ---------------------------------------------------------------------------
# Translation check
# ---------------------------------------------------------------------------
BRANDS = set("""Amadeus Sabre Travelport Duffel Kiwi.com Hotelbeds Expedia Hotels.com WebBeds TBO Tripadvisor GetYourGuide
SSLCommerz Mastercard Stripe PayPal Razorpay WhatsApp Messenger Instagram Mailgun OpenAI QuickBooks Xero English
travelsuiteerp.com EN in f ChatGPT Claude Perplexity Topics""".split()) | {
    "Twilio SMS", "Google Analytics", "Google Maps", "WhatsApp, Messenger, Instagram", "WhatsApp + Facebook + Instagram",
    "+ Messenger, Instagram", "LinkedIn", "Facebook", "YouTube", "Google AI", "Apple Pay", "Google Pay", "American Express"}


def hand_dictionary():
    """Parse the hand-written Bangla dictionary in assets/js/i18n.js into {english: bangla}."""
    text = (ROOT / "assets/js/i18n.js").read_text(encoding="utf-8")
    pairs = {}
    for m in re.finditer(r"^\s*(['\"])(.*?)(?<!\\)\1\s*:\s*(['\"])(.*?)(?<!\\)\3,?\s*$", text, re.M):
        pairs[m.group(2).replace("\\'", "'")] = m.group(4).replace("\\'", "'")
    return pairs


class TextCollector(HTMLParser):
    SKIP = ("script", "style", "svg", "title")

    def __init__(self):
        super().__init__()
        self.skip = 0
        self.no_i18n = 0
        self.stack = []
        self.found = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in self.SKIP:
            self.skip += 1
        if "data-no-i18n" in attrs:
            self.no_i18n += 1
            self.stack.append(tag)
        for k in ("placeholder", "aria-label", "title"):
            if attrs.get(k):
                self.found.append(attrs[k])

    def handle_endtag(self, tag):
        if tag in self.SKIP:
            self.skip -= 1
        if self.stack and tag == self.stack[-1]:
            self.stack.pop()
            self.no_i18n -= 1

    def handle_data(self, data):
        if not self.skip and not self.no_i18n:
            self.found.append(data)


def check_translations(extra):
    known = set(hand_dictionary()) | set(extra)
    missing = {}
    for name in OUTPUT:
        parser = TextCollector()
        parser.feed((ROOT / name).read_text(encoding="utf-8"))
        for raw in parser.found:
            text = re.sub(r"\s+", " ", raw).strip()
            if not re.search(r"[A-Za-z]{2}", text) or text in known or text in BRANDS:
                continue
            if re.fullmatch(r"[A-Z0-9 .:+→·\-/]{1,40}", text):  # codes such as DAC 21:40 → DXB 01:10
                continue
            if re.fullmatch(r"[a-z0-9-]+", text):  # url labels in screenshots
                continue
            missing.setdefault(text, name)
    if missing:
        print(f"\n{len(missing)} text(s) without a Bangla translation:")
        for text, name in sorted(missing.items(), key=lambda x: x[1]):
            print(f"  [{name}] {text}")
    else:
        print("All visible text has a Bangla translation.")


def build():
    layout = (PARTIALS / "layout.html").read_text(encoding="utf-8")
    build_shared_partials()
    build_features_overview()
    build_feature_pages()
    build_solutions()
    build_success()
    build_blog()
    build_legal()
    load_hand_pages()
    for name, (meta, body) in OUTPUT.items():
        render(name, meta, body, layout)
    write_sitemap()
    extra = write_translations()
    print(f"built {len(OUTPUT)} pages, {len(extra)} generated translations, sitemap.xml and robots.txt")
    check_translations(extra)


if __name__ == "__main__":
    build()
