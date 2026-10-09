# TravelSuite ERP Website

Marketing website for **TravelSuite ERP**: B2B & B2C booking, travel ERP (CRM, sales, finance, HR, help desk), agency website, AI automation and omnichannel inbox for travel agencies, Hajj & Umrah operators and tour operators.

Static site — plain HTML, CSS and JavaScript, no build step.

## Structure

```
*.html                Generated pages (do not edit directly; run build.py)
                      index, pricing, about, contact      <- src/pages/
                      features, feature-*                 <- src/content.py FEATURES
                      solutions, solution-*               <- src/content.py SOLUTIONS
                      blog, blog-*                        <- src/content.py POSTS
                      terms, privacy, refund              <- src/content.py LEGAL
src/pages/            Hand-written page bodies with front matter (title, description, nav)
src/partials/         Shared parts: layout, header (mega menu), footer, icons,
                      WhatsApp pill, pricing plans and comparison, tools
src/content.py        Bilingual content for generated pages: T("English", "বাংলা")
build.py              Builds every page and assets/js/i18n-data.js; reports missing translations
assets/css/style.css  Styles (brand tokens in :root, responsive)
assets/js/i18n.js     Hand-written Bangla dictionary and language switcher
assets/js/i18n-data.js  Generated Bangla text from src/content.py
assets/js/main.js     Menus, carousel, pricing toggles, blog filter, form validation
assets/img/           Logos, favicon, support avatar, partner logos, success screenshots
tools/                showcase.html + screenshot-showcase.js: sample client sites for success stories
```

## Editing

1. Edit a hand-written page in `src/pages/`, a shared part in `src/partials/`, or content in `src/content.py`
   (new blog posts, features, solutions or legal sections go there).
2. Run `python3 build.py`. It regenerates every page and lists any visible English text without a Bangla translation.
3. Text in `src/content.py` is written as `T("English", "বাংলা")`. Text in `src/pages/` and `src/partials/`
   needs its Bangla version added to the `bn` dictionary in `assets/js/i18n.js`.

## Brand

- Forest green `#184332` and lime `#92EF59`, taken from the logo.
- Fonts: Poppins (from travelsuiteerp.com) with Hind Siliguri for Bangla, loaded from Google Fonts.

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Before going live

- **Pricing:** `data-monthly` / `data-lifetime` (USD) on each `.price`; BDT rate and yearly discount at the top of the pricing code in `main.js`. Current prices are placeholders.
- **Partner logos:** Amadeus, Sabre, Travelport, Hotelbeds, bKash, Nagad, SSLCommerz, TBO, WebBeds etc. use letter badges. Drop official SVG/PNG logos into `assets/img/partners/` and swap the `<span class="mono">` for an `<img>`.
- **Hours and location** on the contact page.
- **Success stories:** the six cards and their screenshots (`assets/img/success/`) are samples made with `tools/`. Replace with real client screenshots, names and results.
- **Support avatar:** `assets/img/support-agent.svg` is an illustration; replace with a real team photo if you like.
- **Testimonials:** replace with real customer quotes.
- **Legal pages:** Terms, Privacy and Refund policies are a starting draft (governing law: Bangladesh). Have them reviewed before publishing.
- **Blog dates and share links:** share links point to `https://travelsuiteerp.com/blog-<slug>.html`.
- **Contact form:** validates client-side only. Point it at your backend or a form service (add `action`/`method` and remove the `preventDefault` in `main.js`).

## Deploy

Upload the folder to any static host (cPanel, Netlify, Vercel, GitHub Pages).
