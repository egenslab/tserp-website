# Blog artwork: the 16:9 cover and in-article illustrations, drawn as HTML and rendered with Playwright.
#   python3 tools/blog/art.py <art.json> [--preview]
# art.json: {"slug": "...", "cover": {...}, "images": {"<key>": {...}}} (formats below). Writes
# public/assets/img/blog/<slug>-guide.jpg and <slug>-<key>.jpg at 1600x900. Needs Python Pillow and a Node
# Playwright install: set PW_NODE_PATH to its node_modules (Chromium at /opt/pw-browsers/chromium by default).
#   cover:  {"pill": "FINANCE GUIDE", "title": ["Line one", "Line two"], "sub": "...", "icon": "<ICONS key>", "items": [4 short labels]}
#   images: {"kind": "steps", "eyebrow", "title", "steps": [...]} | {"kind": "compare", ..., "columns": [{"name", "points"}]}
#           | {"kind": "checklist", ..., "items": [...]}
import html, json, os, subprocess, sys, tempfile
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
FONTS = "".join(f"@font-face {{ font-family: P; font-weight: {w}; src: url(file://{HERE}/fonts/poppins-latin-{w}-normal.woff2); }}" for w in (500, 600, 700, 800))
LOGO_LIGHT = f"file://{ROOT}/public/assets/img/logo-light.png"
LOGO = f"file://{ROOT}/public/assets/img/logo.png"
esc = html.escape
CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="#0c241b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="#1f5540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>'
ICONS = {  # 48x48 line icons for the cover badge
    "kaaba": '<path d="M8 15 24 8l16 7v19l-16 7-16-7z"/><path d="M8 15l16 7 16-7M24 22v19"/><path d="M8 21l16 7 16-7" stroke-width="4"/><path d="M29 39v-8l5-2v8"/>',
    "b2b": '<circle cx="24" cy="12" r="5"/><circle cx="10" cy="34" r="5"/><circle cx="38" cy="34" r="5"/><path d="M21 16l-8 13M27 16l8 13M15 34h18"/>',
    "chart": '<path d="M8 40h32"/><path d="M12 34V24M20 34V18M28 34V22M36 34V12"/><path d="M10 18l9-7 8 5 11-8"/>',
    "chat": '<path d="M24 8c-9 0-16 6-16 14 0 4 2 8 5 10l-2 8 8-4c2 1 3 1 5 1 9 0 16-7 16-15S33 8 24 8z"/><path d="M17 22h.01M24 22h.01M31 22h.01" stroke-width="5"/>',
    "spark": '<path d="M22 8l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/><path d="M36 28l1.5 4.5L42 34l-4.5 1.5L36 40l-1.5-4.5L30 34l4.5-1.5z"/>',
    "list": '<rect x="9" y="7" width="30" height="36" rx="4"/><path d="M15 17l3 3 5-6M15 28l3 3 5-6M27 18h6M27 29h6"/>',
    "plane": '<path d="M42 10c-2-2-5-1-7 1l-8 8-17-5-4 4 13 8-6 7-6-1-3 3 7 4 4 7 3-3-1-6 7-6 8 13 4-4-5-17 8-8c2-2 3-5 1-7z"/>',
    "award": '<circle cx="24" cy="19" r="11"/><path d="M19 18l3.5 3.5L29 15"/><path d="M17 28l-4 13 7-3 4 6 3-12M31 28l4 13-7-3"/>',
    "receipt": '<path d="M12 6h24v36l-4-3-4 3-4-3-4 3-4-3-4 3z"/><path d="M18 15h12M18 22h12M18 29h7"/><rect x="28" y="27" width="6" height="6" rx="1"/>',
}

def cover(c):
    items = "".join(f'<div><i>{CHECK}</i>{esc(t)}</div>' for t in c["items"])
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{FONTS}
* {{ box-sizing: border-box; margin: 0; }}
html, body {{ width: 1200px; height: 675px; overflow: hidden; }}
body {{ font-family: P, sans-serif; color: #fff; position: relative; background: radial-gradient(circle at 82% 18%, rgba(146,239,89,.16), transparent 40%), #0c241b; }}
.band {{ position: absolute; top: -200px; height: 1300px; transform: rotate(38deg); transform-origin: top left; }}
.b1 {{ left: 560px; width: 150px; background: rgba(146,239,89,.06); }} .b2 {{ left: 760px; width: 230px; background: rgba(146,239,89,.09); }}
.grid {{ position: absolute; inset: 0; background: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px) 0 0 / 40px 40px, linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px) 0 0 / 40px 40px; -webkit-mask: linear-gradient(90deg, transparent 40%, #000); }}
.logo {{ position: absolute; left: 64px; top: 52px; height: 46px; }}
.pill {{ position: absolute; left: 64px; top: 162px; padding: 9px 22px; border-radius: 999px; background: #92ef59; color: #0c241b; font-weight: 700; font-size: 19px; letter-spacing: .06em; }}
h1 {{ position: absolute; left: 60px; top: 222px; font-weight: 800; font-size: 92px; line-height: 1.02; letter-spacing: -.02em; white-space: nowrap; }}
.sub {{ position: absolute; left: 64px; top: 448px; font-weight: 700; font-size: 34px; color: #92ef59; }}
.url {{ position: absolute; left: 64px; bottom: 50px; font-weight: 600; font-size: 22px; color: #cfe0d6; display: flex; align-items: center; gap: 10px; }}
.url::before {{ content: ""; width: 26px; height: 3px; border-radius: 2px; background: #92ef59; }}
.card {{ position: absolute; right: 60px; bottom: 60px; width: 380px; padding: 26px 28px; border-radius: 26px; background: #f6fbf3; color: #0c241b; display: grid; gap: 18px; box-shadow: 0 30px 60px rgba(0,0,0,.35); }}
.card div {{ display: flex; align-items: center; gap: 16px; font-weight: 700; font-size: 23px; }}
.card i {{ width: 34px; height: 34px; border-radius: 50%; background: #92ef59; display: grid; place-items: center; flex: none; }}
.card i svg {{ width: 18px; height: 18px; }}
.badge {{ position: absolute; right: 96px; top: 150px; width: 128px; height: 128px; border-radius: 34px; background: #92ef59; display: grid; place-items: center; transform: rotate(-6deg); box-shadow: 0 24px 50px rgba(0,0,0,.35), 0 0 0 10px rgba(146,239,89,.12); }}
.badge svg {{ width: 76px; height: 76px; fill: none; stroke: #0c241b; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }}
.arc {{ position: absolute; right: 225px; top: 96px; width: 250px; height: 170px; }}
</style></head><body>
<div class="band b1"></div><div class="band b2"></div><div class="grid"></div>
<img class="logo" src="{LOGO_LIGHT}" alt=""><span class="pill">{esc(c["pill"])}</span>
<h1 id="t">{"<br>".join(esc(x) for x in c["title"])}</h1><p class="sub">{esc(c["sub"])}</p><p class="url">www.travelsuiteerp.com</p>
<svg class="arc" viewBox="0 0 250 170" fill="none"><path d="M20 160 C 40 80, 110 25, 235 60" stroke="#92ef59" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.1 15"/></svg>
<div class="badge"><svg viewBox="0 0 48 48">{ICONS[c["icon"]]}</svg></div><div class="card">{items}</div>
<script>const t=document.getElementById('t');let s=92;while(t.scrollWidth>580&&s>60){{s-=2;t.style.fontSize=s+'px';}}</script>
</body></html>"""

BASE = f"""{FONTS}
* {{ box-sizing: border-box; margin: 0; }}
html, body {{ width: 1200px; height: 675px; overflow: hidden; }}
body {{ font-family: P, sans-serif; color: #0c241b; position: relative; padding: 56px 64px; background: radial-gradient(circle at 92% 8%, rgba(146,239,89,.28), transparent 32%), linear-gradient(180deg, #f6fbf3, #eef6ea); }}
body::before {{ content: ""; position: absolute; inset: 0; background: linear-gradient(rgba(24,67,50,.05) 1px, transparent 1px) 0 0 / 40px 40px, linear-gradient(90deg, rgba(24,67,50,.05) 1px, transparent 1px) 0 0 / 40px 40px; }}
.eyebrow {{ position: relative; display: inline-block; font-weight: 700; font-size: 15px; letter-spacing: .12em; color: #1f5540; text-transform: uppercase; }}
.eyebrow::before {{ content: ""; display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #92ef59; margin-right: 10px; box-shadow: 0 0 0 4px rgba(146,239,89,.3); }}
h1 {{ position: relative; font-weight: 800; font-size: 42px; letter-spacing: -.01em; margin: 10px 0 0; max-width: 980px; }}
.brand {{ position: absolute; right: 56px; bottom: 34px; height: 30px; }}
.foot {{ position: absolute; left: 64px; bottom: 40px; font-size: 15px; color: #64746d; font-weight: 600; }}
"""

def illustration(s):
    kind = s["kind"]
    if kind == "steps":
        n = len(s["steps"])
        body = '<ol class="tl">' + "".join(f'<li><span class="n">{i + 1}</span><span class="t">{esc(t)}</span></li>' for i, t in enumerate(s["steps"])) + "</ol>"
        css = f""".tl {{ position: relative; list-style: none; padding: 0; margin: 140px 0 0; display: grid; grid-template-columns: repeat({n}, 1fr); gap: 14px; }}
.tl::before {{ content: ""; position: absolute; left: 6%; right: 6%; top: 38px; height: 6px; border-radius: 3px; background: linear-gradient(90deg, #1f5540, #92ef59); }}
.tl li {{ position: relative; display: grid; justify-items: center; gap: 18px; text-align: center; }}
.n {{ width: 80px; height: 80px; border-radius: 50%; background: #184332; color: #92ef59; font-weight: 800; font-size: 32px; display: grid; place-items: center; box-shadow: 0 0 0 8px #f3f9ef, 0 14px 30px rgba(15,46,34,.25); }}
.tl li:last-child .n {{ background: #92ef59; color: #184332; }}
.t {{ font-weight: 700; font-size: 22px; line-height: 1.3; background: #fff; border: 1px solid #dfe7e2; border-radius: 16px; padding: 14px 12px; min-height: 110px; display: grid; place-items: center; width: 100%; box-shadow: 0 10px 24px rgba(15,46,34,.07); }}"""
    elif kind == "compare":
        cols = s["columns"]
        body = '<div class="g">' + "".join('<div class="c"><p class="nm">' + esc(c["name"]) + "</p><ul>" + "".join(f"<li><i>{CHECK}</i>{esc(p)}</li>" for p in c["points"]) + "</ul></div>" for c in cols) + "</div>"
        css = f""".g {{ position: relative; display: grid; grid-template-columns: repeat({len(cols)}, 1fr); gap: 18px; margin-top: 44px; }}
.c {{ background: #fff; border: 1px solid #dfe7e2; border-radius: 22px; padding: 26px 24px; box-shadow: 0 14px 30px rgba(15,46,34,.08); }}
.nm {{ font-weight: 800; font-size: 27px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px solid #e9fbdc; }}
ul {{ list-style: none; padding: 0; display: grid; gap: 14px; }}
li {{ display: flex; gap: 12px; align-items: flex-start; font-size: 19px; font-weight: 600; line-height: 1.35; }}
li i {{ flex: none; width: 28px; height: 28px; border-radius: 50%; background: #92ef59; display: grid; place-items: center; }} li i svg {{ width: 15px; height: 15px; }}"""
    else:
        items = s["items"]
        body = '<div class="g">' + "".join(f'<div class="d"><span class="ic">{DOC}</span><span>{esc(t)}</span><i>{CHECK}</i></div>' for t in items) + "</div>"
        css = f""".g {{ position: relative; display: grid; grid-template-columns: repeat({3 if len(items) > 6 else 2}, 1fr); gap: 16px; margin-top: 40px; }}
.d {{ display: flex; align-items: center; gap: 16px; background: #fff; border: 1px solid #dfe7e2; border-radius: 18px; padding: 18px 20px; font-size: 21px; font-weight: 700; box-shadow: 0 10px 24px rgba(15,46,34,.07); }}
.ic {{ flex: none; width: 52px; height: 52px; border-radius: 14px; background: #e9fbdc; display: grid; place-items: center; }} .ic svg {{ width: 28px; height: 28px; }}
.d span:nth-child(2) {{ flex: 1; line-height: 1.3; }}
.d i {{ flex: none; width: 30px; height: 30px; border-radius: 50%; background: #92ef59; display: grid; place-items: center; }} .d i svg {{ width: 16px; height: 16px; }}"""
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE}{css}</style></head><body>
<span class="eyebrow">{esc(s.get("eyebrow", ""))}</span><h1>{esc(s["title"])}</h1>{body}
<img class="brand" src="{LOGO}" alt=""><p class="foot">www.travelsuiteerp.com</p></body></html>"""

def main():
    art = json.load(open(sys.argv[1]))
    slug = art["slug"]
    pages = {}
    if "cover" in art: pages[f"{slug}-guide"] = cover(art["cover"])
    for key, spec in art.get("images", {}).items(): pages[f"{slug}-{key}"] = illustration(spec)
    tmp = tempfile.mkdtemp(prefix="blogart-")
    for name, page in pages.items(): open(f"{tmp}/{name}.html", "w").write(page)
    env = dict(os.environ, NODE_PATH=os.environ.get("PW_NODE_PATH", ""))
    subprocess.run(["node", f"{HERE}/render.js", tmp, *pages], check=True, env=env)
    for name in pages:
        im = Image.open(f"{tmp}/{name}.png").convert("RGB")
        out = f"{ROOT}/public/assets/img/blog/{name}.jpg"
        im.resize((1600, 900), Image.LANCZOS).save(out, quality=90, optimize=True, progressive=True, subsampling=0)
        if "--preview" in sys.argv: im.resize((1200, 675), Image.LANCZOS).save(f"{tmp}/{name}-preview.png")
        print("wrote", os.path.relpath(out, ROOT))
    print("html and previews in", tmp)

if __name__ == "__main__":
    main()
