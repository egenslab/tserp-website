#!/usr/bin/env python3
"""Build the static site.

Hand-written pages live in src/pages/. Each starts with a front-matter block:

    <!--
    title: Page title
    description: Meta description
    nav: features
    -->

`{{> name}}` includes src/partials/name.html (or a generated partial).
Feature, solution, blog and legal pages are generated from src/content.py.
All pages are wrapped in src/partials/layout.html and written to the repository root.

The build also writes assets/js/i18n-data.js (Bangla text from src/content.py) and
reports any visible English text that has no Bangla translation.

Usage: python3 build.py
"""
import html
import json
import pathlib
import re
import sys
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
PARTIALS = SRC / "partials"
sys.path.insert(0, str(SRC))
import content as C  # noqa: E402

INCLUDE = re.compile(r"\{\{>\s*([\w-]+)\s*\}\}")
FRONT = re.compile(r"\A<!--(.*?)-->\s*", re.S)
WA = "https://wa.me/8801325277120"

PAIRS = {}          # English -> Bangla, collected from content.py
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


def icon(name, cls="ic"):
    return f'<svg class="{cls}"><use href="#{name}"/></svg>'


for pair in C.UI:
    tr(pair)
for pair in C.BLOG_CATEGORIES:
    tr(pair)

FEATURES = {f["slug"]: f for f in C.FEATURES}
GROUP_TITLE = dict(C.FEATURE_GROUPS)


# ---------------------------------------------------------------------------
# Shared fragments
# ---------------------------------------------------------------------------
def breadcrumb(items):
    parts = []
    for label, href in items:
        parts.append(f'<a href="{href}">{e(label)}</a>' if href else f'<span aria-current="page">{e(label)}</span>')
    return '<nav class="breadcrumb" aria-label="Breadcrumb">' + '<span class="sep">/</span>'.join(parts) + "</nav>"


def hero_ctas():
    return ('<div class="hero-ctas">'
            f'<a href="contact.html" class="btn btn-lime btn-lg">{e("Request a demo")} {icon("i-arrow")}</a>'
            "{{> wa-pill}}</div>")


def feature_card(f):
    return (f'<a class="link-card" href="feature-{f["slug"]}.html">'
            f'<span class="m-ico dark sm"><svg><use href="#{f["icon"]}"/></svg></span>'
            f'<span><b>{e(f["title"])}</b><small>{e(f["desc"])}</small></span>'
            f'{icon("i-arrow", "ic go")}</a>')


def post_card(p):
    return f'''<article class="post-card" data-cat="{html.escape(p["cat"])}">
  <a href="blog-{p["slug"]}.html" class="post-cover" style="--c:{p["color"]}" tabindex="-1" aria-hidden="true">
    <svg><use href="#{p["icon"]}"/></svg><span class="cover-chip">{e(p["cat"])}</span>
  </a>
  <div class="post-body">
    <p class="post-meta"><span>{e(p["date"])}</span><span class="dotsep"></span><span>{p["read"]}</span> <span>{e("min read")}</span></p>
    <h3><a href="blog-{p["slug"]}.html">{e(p["title"])}</a></h3>
    <p>{e(p["excerpt"])}</p>
    <a href="blog-{p["slug"]}.html" class="link-arrow">{e("Read article")} {icon("i-arrow")}</a>
  </div>
</article>'''


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
    <aside class="fnav" aria-label="{e("Features navigation")}"><div class="fnav-inner">{"".join(nav)}</div></aside>
    <div class="fbody">{"".join(body)}</div>
  </div>
</section>
{{{{> tools}}}}'''
    OUTPUT["features.html"] = (dict(
        title="Features — TravelSuite ERP",
        description="Every feature of TravelSuite ERP: flights, hotels, Hajj & Umrah, visa, tours, transport, CRM, sales, finance, HR, help desk, reports, AI automation and omnichannel inbox.",
        nav="features"), page)


def build_feature_pages():
    for f in C.FEATURES:
        caps = "".join(f'<div class="cap">{icon("i-check")}<span>{e(b)}</span></div>' for b in f["bullets"])
        steps = "".join(f"<li><span>{i}</span><h4>{e(s)}</h4></li>" for i, s in enumerate(f["steps"], 1))
        benefits = "".join(f"<li>{icon('i-check')}<span>{e(b)}</span></li>" for b in f["benefits"])
        related = [g for g in C.FEATURES if g["group"] == f["group"] and g["slug"] != f["slug"]][:3]
        page = f'''<section class="page-hero">
  <div class="container detail-hero">
    <div>
      {breadcrumb([("Home", "index.html"), ("Features", "features.html"), (f["title"], None)])}
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
<section class="section">
  <div class="container">
    <div class="section-head"><span class="eyebrow">{e("Key capabilities")}</span><h2>{e(f["desc"])}</h2></div>
    <div class="caps">{caps}</div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head"><span class="eyebrow">{e("How it works")}</span><h2>{e(f["title"])}</h2></div>
    <ol class="steps three">{steps}</ol>
  </div>
</section>
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
        OUTPUT[f"feature-{f['slug']}.html"] = (dict(
            title=f"{tr(f['title'])} — TravelSuite ERP", description=tr(f["intro"]), nav="products"), page)
        # translate the generated <title>
        PAIRS.setdefault(f"{tr(f['title'])} — TravelSuite ERP", None)


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
</section>'''
    OUTPUT["solutions.html"] = (dict(
        title="Solutions — TravelSuite ERP",
        description="TravelSuite ERP solutions for travel agencies, Hajj & Umrah operators, B2B consolidators, tour operators, online travel agencies and corporate travel desks.",
        nav="solutions"), page)
    tr(T_("Solutions — TravelSuite ERP", "সলিউশন — TravelSuite ERP"))
    tr(T_("TravelSuite ERP solutions for travel agencies, Hajj & Umrah operators, B2B consolidators, tour operators, online travel agencies and corporate travel desks.",
          "ট্রাভেল এজেন্সি, হজ ও উমরাহ অপারেটর, B2B কনসোলিডেটর, ট্যুর অপারেটর, অনলাইন ট্রাভেল এজেন্সি ও কর্পোরেট ট্রাভেল ডেস্কের জন্য TravelSuite ERP সলিউশন।"))

    for s in C.SOLUTIONS:
        challenges = "".join(f'<div class="challenge">{icon("i-x")}<span>{e(c)}</span></div>' for c in s["challenges"])
        helps = "".join(f'<div class="help">{icon("i-check")}<span>{e(h)}</span></div>' for h in s["helps"])
        modules = "".join(feature_card(FEATURES[m]) for m in s["modules"])
        others = "".join(f'<a href="solution-{o["slug"]}.html">{icon(o["icon"])}{e(o["title"])}</a>'
                         for o in C.SOLUTIONS if o["slug"] != s["slug"])
        page = f'''<section class="page-hero">
  <div class="container detail-hero">
    <div>
      {breadcrumb([("Home", "index.html"), ("Solutions", "solutions.html"), (s["title"], None)])}
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
    <div class="other-solutions"><h3>{e("Other solutions")}</h3><div class="chips-row">{others}</div></div>
  </div>
</section>'''
        title = f"{tr(s['title'])} — TravelSuite ERP"
        OUTPUT[f"solution-{s['slug']}.html"] = (dict(title=title, description=tr(s["intro"]), nav="solutions"), page)
        PAIRS.setdefault(title, None)


def T_(en, bn):
    return (en, bn)


# ---------------------------------------------------------------------------
# Blog
# ---------------------------------------------------------------------------
def build_blog():
    chips = f'<button class="active" data-filter="all" aria-pressed="true">{e("All")}</button>' + "".join(
        f'<button data-filter="{html.escape(tr(c))}" aria-pressed="false">{e(c)}</button>' for c in C.BLOG_CATEGORIES)
    page = f'''<section class="page-hero">
  <div class="container">
    {breadcrumb([("Home", "index.html"), ("Blog", None)])}
    <h1>{e("TravelSuite blog")}</h1>
    <p class="lead">{e("Guides, ideas and news for travel agencies running their business online.")}</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="blog-filter" role="group" aria-label="{e("Filter articles by category")}">{chips}</div>
    <div class="post-grid" id="postGrid">{"".join(post_card(p) for p in C.POSTS)}</div>
  </div>
</section>'''
    OUTPUT["blog.html"] = (dict(title="Blog — TravelSuite ERP",
                                description="Guides, ideas and news for travel agencies running their business online.",
                                nav="company"), page)
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

    for i, p in enumerate(C.POSTS):
        parts = []
        for kind, value in p["body"]:
            if kind == "h2":
                parts.append(f"<h2>{e(value)}</h2>")
            elif kind == "p":
                parts.append(f"<p>{e(value)}</p>")
            elif kind == "ul":
                parts.append("<ul>" + "".join(f"<li>{e(v)}</li>" for v in value) + "</ul>")
        related = [q for q in C.POSTS if q["slug"] != p["slug"] and q["cat"] == p["cat"]]
        related += [q for q in C.POSTS if q["slug"] != p["slug"] and q not in related]
        url = f"https://travelsuiteerp.com/blog-{p['slug']}.html"
        title = tr(p["title"])
        share = (f'<a class="share wa" data-share="wa" href="https://wa.me/?text={html.escape(title)}%20{url}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg><use href="#i-wa"/></svg></a>'
                 f'<a class="share fb" data-share="fb" href="https://www.facebook.com/sharer/sharer.php?u={url}" target="_blank" rel="noopener" aria-label="Facebook">f</a>'
                 f'<a class="share in" data-share="in" href="https://www.linkedin.com/sharing/share-offsite/?url={url}" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>')
        page = f'''<section class="page-hero post-hero">
  <div class="container narrow">
    {breadcrumb([("Home", "index.html"), ("Blog", "blog.html"), (p["cat"], None)])}
    <span class="pill">{e(p["cat"])}</span>
    <h1>{e(p["title"])}</h1>
    <p class="post-meta light"><span>{e("TravelSuite Team")}</span><span class="dotsep"></span><span>{e(p["date"])}</span><span class="dotsep"></span><span>{p["read"]}</span> <span>{e("min read")}</span></p>
  </div>
</section>
<section class="section post-section">
  <div class="container narrow">
    <div class="post-cover big" style="--c:{p["color"]}" aria-hidden="true"><svg><use href="#{p["icon"]}"/></svg></div>
    <article class="article">
      <p class="article-lead">{e(p["excerpt"])}</p>
      {"".join(parts)}
    </article>
    <div class="share-row"><span>{e("Share this article")}</span>{share}</div>
    <div class="article-cta">
      <div><h3>{e("Want to see this in your agency?")}</h3><p>{e("Book a free 30-minute walkthrough with our team.")}</p></div>
      <a href="contact.html" class="btn btn-lime">{e("Request a demo")} {icon("i-arrow")}</a>
    </div>
    <a href="blog.html" class="link-arrow back">{icon("i-left")} {e("Back to blog")}</a>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="related-head"><h2>{e("Related articles")}</h2><a href="blog.html" class="link-arrow">{e("View all articles")} {icon("i-arrow")}</a></div>
    <div class="post-grid">{"".join(post_card(q) for q in related[:3])}</div>
  </div>
</section>'''
        page_title = f"{title} — TravelSuite ERP"
        if isinstance(p["title"], tuple):
            PAIRS[page_title] = f"{p['title'][1]} — TravelSuite ERP"
        OUTPUT[f"blog-{p['slug']}.html"] = (dict(title=page_title, description=tr(p["excerpt"]), nav="company"), page)


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
    <aside class="legal-toc" aria-label="{e("On this page")}"><p class="fnav-group">{e("On this page")}</p>{"".join(toc)}</aside>
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


def render(name, meta, body, layout):
    page = layout.replace("{{body}}", body)
    page = include(page)
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
    js = ("/* Generated by build.py from src/content.py. Do not edit by hand. */\n"
          "window.TS_DICT_EXTRA = { bn: " + json.dumps(data, ensure_ascii=False, indent=1, sort_keys=True) + " };\n")
    (ROOT / "assets/js/i18n-data.js").write_text(js, encoding="utf-8")
    return data


# ---------------------------------------------------------------------------
# Translation check
# ---------------------------------------------------------------------------
BRANDS = set("""Amadeus Sabre Travelport Duffel Kiwi.com Hotelbeds Expedia Hotels.com WebBeds TBO Tripadvisor GetYourGuide
SSLCommerz Mastercard Stripe PayPal Razorpay WhatsApp Messenger Instagram Mailgun OpenAI QuickBooks Xero English
travelsuiteerp.com EN in f""".split()) | {"Twilio SMS", "Google Analytics", "Google Maps", "WhatsApp, Messenger, Instagram",
                                          "WhatsApp + Facebook + Instagram", "+ Messenger, Instagram", "LinkedIn", "Facebook"}


def hand_dictionary():
    """Parse the hand-written Bangla dictionary in assets/js/i18n.js into {english: bangla}."""
    text = (ROOT / "assets/js/i18n.js").read_text(encoding="utf-8")
    pairs = {}
    for m in re.finditer(r"^\s*(['\"])(.*?)(?<!\\)\1\s*:\s*(['\"])(.*?)(?<!\\)\3,?\s*$", text, re.M):
        pairs[m.group(2).replace("\\'", "'")] = m.group(4).replace("\\'", "'")
    return pairs


class TextCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.found = []

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "svg", "title"):
            self.skip += 1
        for k, v in attrs:
            if k in ("placeholder", "aria-label", "title") and v:
                self.found.append(v)

    def handle_endtag(self, tag):
        if tag in ("script", "style", "svg", "title"):
            self.skip -= 1

    def handle_data(self, data):
        if not self.skip:
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
    build_features_overview()
    build_feature_pages()
    build_solutions()
    build_blog()
    build_legal()
    load_hand_pages()
    for name, (meta, body) in OUTPUT.items():
        render(name, meta, body, layout)
    extra = write_translations()
    print(f"built {len(OUTPUT)} pages, {len(extra)} generated translations")
    check_translations(extra)


if __name__ == "__main__":
    build()
