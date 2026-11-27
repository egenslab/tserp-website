# Brief: write one TravelSuite ERP blog post (~3,000 words, SEO)

The repo (REPO = this repository's root) is read-only for the writer. Deliver one file: the post as a single JSON
object, written with a small Python script (json.dump, ensure_ascii=False, indent=2) so quoting is safe. Then run
`python3 tools/blog/check.py <post.json>` and fix everything it reports until it prints OK.

## Fields
- `slug`, `cat`, `icon`, `color`, `cover`, `date`: given in your task; copy exactly.
- `title`: the H1, sentence case, includes the primary keyword naturally (≤ 75 characters).
- `seoTitle`: ≤ 60 characters, primary keyword first.
- `metaDescription`: 130–155 characters, includes the primary keyword, says what the reader gets.
- `excerpt`: 1–2 sentences (≤ 220 characters), shown as the article lead.
- `read`: minutes = round((body words + FAQ words) / 200).
- `body`: list of blocks (schema below), about 2,700–3,000 words.
- `extra`: {"takeaways": [5 short strings], "faqs": [[question, answer], … 5 or 6]}. FAQ answers 50–90 words, self-contained.
- `keywords`: {"primary": "...", "secondary": [...]} (records only).
- `image_specs` (only when the task asks for in-article images): see "Images".

## Blocks (the only ones allowed)
- ["h2", text] main sections (6–9; they form the table of contents; no numbering). ["h3", text] subsections.
- ["p", text] 2–5 sentences, plain text: no markdown, no **bold**, no links inside text.
- ["lp", "Bold label.", "Rest of the paragraph."] paragraph with a bold lead-in.
- ["ul", [items]] / ["ol", [items]]: item = "string" or ["Bold label:", "text"].
- ["table", [headers], [[row], …]]: first cell is the row label (unique); max 4 columns; short cells.
- ["quote", text] a sample script or message, never a fake customer quote.
- ["note", text] small italic note (disclaimers, "Example data.").
- ["read", "Link title", "/path"] related-guide card (allowed paths only).
- ["flow", ["Step", … 4–6], "one-line caption"] process diagram.
- ["figure", "invoice" | "plans" | "dashboard"] prebuilt illustrations, at most one.
- ["image", "/assets/img/blog/<slug>-<key>.jpg", "alt text ≥ 20 chars", "one-sentence caption"] (when asked).
- ["sources", [["Source title", "https://…"], …]] official sources used; before the closing paragraph.
- ["links", [["Label", "/path"], …]] "Explore the modules" row, exactly once, near the end.
- ["cta", "Short heading", "One or two sentences"] a "Book a free demo" box (button and WhatsApp link are added
  automatically). Use 1–2: one after the section where the reader feels the problem most, one near the end.
  Speak to the reader's situation ("Running departures on spreadsheets? See it with your own packages.").
Each text must be a complete sentence or label: the site translates strings one by one into 8 languages.
Use at least 1 table, 1 flow or ol, 3–4 "read" links, 1 "links" row. The last block is a closing "p" that invites the reader to
book a free demo. The blog's purpose is leads: every article must make the next step obvious.

## SEO
One primary keyword in title, seoTitle, metaDescription, the first paragraph and 2–3 H2s, naturally; secondary
keywords and variations, never stuffed. Answer the reader's real question early, then go deep: practical, specific,
step by step, with checklists and tables. Readers: owners and managers of travel agencies, Hajj & Umrah operators and
B2B consolidators in Bangladesh, Malaysia, Indonesia, the Gulf, Türkiye, the USA/UK. Plain, confident British-leaning
English, short sentences, no hype words ("revolutionise", "seamless", "cutting-edge", "game-changer", "unlock"),
no em dashes.

## Originality
Never open, search for or copy competitor or software-vendor articles. Build from official sources and your own
structure, examples and wording.

## Accuracy (strict)
- Every TravelSuite ERP claim must be supported by REPO/src/content/features.json, solutions.json, einvoice.json,
  src/components/Plans.tsx, src/app/pricing/page.tsx or src/components/PricingSections.tsx. grep before claiming;
  otherwise write general advice ("look for…", "ask your vendor…").
- E-invoicing: TravelSuite is ADDING e-invoicing for 8 countries (Saudi Arabia/ZATCA, UAE, Oman, Egypt, Jordan,
  Türkiye, Malaysia, Indonesia) on the Business plan; customers ask the team for the go-live date. Never say it is live.
- GDS API integration is on the Enterprise plan; AI agents & AI trip planner and B2B commission & payouts on Business.
- No statistics, market sizes, customer results, testimonials, quotes from real people or invented stories. Example
  data is clearly marked. Regulations, fees, thresholds and dates only from official sources you confirmed (WebSearch
  restricted to the official domain is fine); otherwise say "varies" and point to the authority.
- Tax/legal/compliance content gets a "note" disclaimer: general information, not legal or tax advice.

## Images (when asked)
Add `image_specs` with exactly the keys you used in "image" blocks, each of one of three kinds:
- {"kind": "steps", "eyebrow": "2–3 words", "title": "...", "steps": ["2–4 words", … 4–6]}
- {"kind": "compare", "eyebrow": "...", "title": "...", "columns": [{"name": "...", "points": ["≤ 5 words", … 3]}, … 2–4]}
- {"kind": "checklist", "eyebrow": "...", "title": "...", "items": ["≤ 4 words", … 6–9]}
Put the same content as text (ol/table/ul) next to each image so search engines and translations get it.

## Internal links
Allowed in "read" and "links": every /blog/<slug> in src/content/posts.json (not your own), /features/<slug> for
every slug in features.json, the /solutions/<slug> pages, /e-invoicing and /e-invoicing/<country>, /pricing,
/success-stories, /contact. check.py lists any path it does not accept. Titles must be the real page names.

## Report back
2–3 sentences: word count, check.py result, and any claim you were unsure about.
