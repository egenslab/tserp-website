#!/usr/bin/env python3
"""Build the static site.

Each file in src/pages/ starts with a front-matter block:

    <!--
    title: Page title
    description: Meta description
    nav: features
    -->

The rest of the file is the page body. `{{> name}}` includes src/partials/name.html.
Pages are wrapped in src/partials/layout.html and written to the repository root.

Usage: python3 build.py
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
PARTIALS = SRC / "partials"
INCLUDE = re.compile(r"\{\{>\s*([\w-]+)\s*\}\}")
FRONT = re.compile(r"\A<!--(.*?)-->\s*", re.S)


def include(text, depth=0):
    if depth > 5:
        raise RuntimeError("partials nested too deeply")
    return INCLUDE.sub(lambda m: include((PARTIALS / f"{m.group(1)}.html").read_text(encoding="utf-8"), depth + 1), text)


def build():
    layout = (PARTIALS / "layout.html").read_text(encoding="utf-8")
    for page in sorted((SRC / "pages").glob("*.html")):
        raw = page.read_text(encoding="utf-8")
        match = FRONT.match(raw)
        if not match:
            raise SystemExit(f"{page.name}: missing front matter")
        meta = dict(
            line.split(":", 1) for line in match.group(1).strip().splitlines() if ":" in line
        )
        meta = {k.strip(): v.strip() for k, v in meta.items()}
        html = layout.replace("{{body}}", raw[match.end():])
        html = include(html)
        for key in ("title", "description"):
            html = html.replace("{{%s}}" % key, meta.get(key, ""))
        # Mark the active top-level nav item
        nav = meta.get("nav", "")
        html = re.sub(r'data-nav="%s"' % re.escape(nav) if nav else r"(?!)", 'data-nav="%s" aria-current="page"' % nav, html)
        (ROOT / page.name).write_text(html, encoding="utf-8")
        print("built", page.name)


if __name__ == "__main__":
    build()
