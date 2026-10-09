# TravelSuite ERP Website

Marketing website for **TravelSuite ERP**: B2B & B2C booking, travel ERP (CRM, sales, finance, HR, help desk), agency website, AI automation and omnichannel inbox for travel agencies, Hajj & Umrah operators and tour operators.

Static site — plain HTML, CSS and JavaScript, no build step.

## Structure

```
index.html, features.html, pricing.html, about.html, contact.html
                      Generated pages (do not edit directly; run build.py)
src/pages/            Page bodies with front matter (title, description, nav)
src/partials/         Shared parts: layout, header (mega menu), footer, icons,
                      WhatsApp pill, pricing plans and comparison table
build.py              Builds the pages: python3 build.py
assets/css/style.css  Styles (brand tokens in :root, responsive)
assets/js/i18n.js     English / বাংলা translations and language switcher logic
assets/js/main.js     Menus, carousel, pricing toggles, booking widget tabs, form validation
assets/img/           logo.png, logo-light.png, favicon.png, support-agent.svg
assets/img/partners/  Partner logos (from Simple Icons, CC0)
```

## Editing

1. Edit a page in `src/pages/` or a shared part in `src/partials/`.
2. Run `python3 build.py` to regenerate the HTML files in the root.
3. If you add or change visible English text, add its Bangla version to the `bn` dictionary in `assets/js/i18n.js` (keyed by the exact English text). Untranslated text stays in English.

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
- **Success stories:** the six cards are examples; replace with real client names, sites and results.
- **Support avatar:** `assets/img/support-agent.svg` is an illustration; replace with a real team photo if you like.
- **Testimonials:** replace with real customer quotes.
- **Contact form:** validates client-side only. Point it at your backend or a form service (add `action`/`method` and remove the `preventDefault` in `main.js`).

## Deploy

Upload the folder to any static host (cPanel, Netlify, Vercel, GitHub Pages).
