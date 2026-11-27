# Validate a blog post JSON against tools/blog/BRIEF.md.
#   python3 tools/blog/check.py <post.json>
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load = lambda p: json.load(open(os.path.join(ROOT, p)))
try:
    post = json.load(open(sys.argv[1]))
except Exception as e:
    print("INVALID JSON:", e); sys.exit(1)
slug = post.get("slug", "")
posts = load("src/content/posts.json")["items"]
links = {f"/blog/{p['slug']}" for p in posts} | {f"/features/{f['slug']}" for f in load("src/content/features.json")["items"]}
links |= {f"/solutions/{s['slug']}" for s in load("src/content/solutions.json")}
links |= {"/e-invoicing"} | {f"/e-invoicing/{c['slug']}" for c in load("src/content/einvoice.json")["countries"]}
links |= {"/pricing", "/success-stories", "/contact", "/features", "/solutions", "/blog"}
links.discard(f"/blog/{slug}")

probs = []
for k in ["slug", "cat", "icon", "color", "cover", "date", "title", "seoTitle", "metaDescription", "excerpt", "read", "body", "extra"]:
    if k not in post: probs.append(f"missing {k}")
if post.get("cat") not in load("src/content/posts.json")["categories"]: probs.append("cat is not a blog category")
if len(post.get("seoTitle", "")) > 60: probs.append(f"seoTitle {len(post['seoTitle'])} chars > 60")
if not 120 <= len(post.get("metaDescription", "")) <= 158: probs.append(f"metaDescription {len(post.get('metaDescription', ''))} chars (want 130-155)")
if len(post.get("title", "")) > 75: probs.append("title > 75 chars")

def item(x):
    if isinstance(x, str): return x
    if isinstance(x, list) and len(x) == 2 and all(isinstance(y, str) for y in x): return " ".join(x)
    probs.append(f"bad list item {x!r}"); return ""

words, kinds, texts, images = 0, {}, [], []
for i, b in enumerate(post.get("body", [])):
    k = b[0] if isinstance(b, list) and b else None
    kinds[k] = kinds.get(k, 0) + 1
    t = ""
    if k in ("h2", "h3", "p", "quote", "note") and len(b) == 2 and isinstance(b[1], str): t = b[1]
    elif k == "lp" and len(b) == 3: t = b[1] + " " + b[2]
    elif k in ("ul", "ol") and len(b) == 2 and isinstance(b[1], list): t = " ".join(item(x) for x in b[1])
    elif k == "table" and len(b) == 3:
        t = " ".join(b[1] + [c for r in b[2] for c in r])
        if any(len(r) != len(b[1]) for r in b[2]): probs.append(f"block {i}: table row length differs from header")
        if len({r[0] for r in b[2]}) != len(b[2]): probs.append(f"block {i}: table row labels must be unique")
    elif k == "read" and len(b) == 3:
        if b[2] not in links: probs.append(f"block {i}: link {b[2]} not allowed")
    elif k == "flow" and len(b) == 3: t = " ".join(b[1]) + " " + b[2]
    elif k == "figure" and len(b) == 2 and b[1] in ("invoice", "plans", "dashboard"): pass
    elif k == "image" and len(b) == 4:
        t = b[3]; images.append(b[1])
        if not re.fullmatch(rf"/assets/img/blog/{re.escape(slug)}-[a-z0-9-]+\.jpg", b[1]): probs.append(f"block {i}: image src must be /assets/img/blog/{slug}-<key>.jpg")
        if len(b[2]) < 20: probs.append(f"block {i}: image alt text too short")
    elif k == "cta" and len(b) == 3: t = b[1] + " " + b[2]
    elif k == "sources" and len(b) == 2:
        for _, href in b[1]:
            if not href.startswith("https://"): probs.append(f"block {i}: source must be an https URL")
    elif k == "links" and len(b) == 2:
        for _, href in b[1]:
            if href not in links: probs.append(f"block {i}: link {href} not allowed")
    else:
        probs.append(f"block {i}: invalid block {str(b)[:80]}"); continue
    texts.append(t); words += len(t.split())

text = " ".join(texts)
if re.search(r"\*\*|\]\(|https?://", text): probs.append("markdown or raw URL inside text")
if "—" in text: probs.append("em dash used")
if not 2500 <= words <= 3300: probs.append(f"body has {words} words (want 2,700-3,000)")
if kinds.get("h2", 0) < 6: probs.append("fewer than 6 h2")
if not kinds.get("table"): probs.append("no table")
if kinds.get("read", 0) < 3: probs.append("fewer than 3 read links")
if kinds.get("links", 0) != 1: probs.append("need exactly one links row")
if kinds.get("cta", 0) < 1: probs.append("need at least one cta block (mid-article demo box)")
if post.get("body") and post["body"][-1][0] != "p": probs.append("last block must be a closing p")
ex = post.get("extra", {})
if len(ex.get("takeaways", [])) != 5: probs.append("need 5 takeaways")
if not 5 <= len(ex.get("faqs", [])) <= 6: probs.append("need 5-6 faqs")
heads = [b[1] for b in post.get("body", []) if b[0] in ("h2", "h3")]
if len(heads) != len(set(heads)): probs.append("duplicate headings")
specs = post.get("image_specs", {})
for src in images:
    key = src.rsplit("/", 1)[1][len(slug) + 1:-4]
    s = specs.get(key)
    if not s: probs.append(f"image_specs has no entry for '{key}'")
    elif s.get("kind") not in ("steps", "compare", "checklist"): probs.append(f"image_specs['{key}'].kind must be steps, compare or checklist")
print(f"{slug}: {words} body words, {kinds.get('h2', 0)} h2, {len(ex.get('faqs', []))} faqs, {len(images)} images")
for p in probs: print(" -", p)
print("OK" if not probs else "NOT OK")
