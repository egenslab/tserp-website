# TravelSuite ERP Website

Marketing website for **TravelSuite ERP**: B2B & B2C booking, travel ERP (CRM, sales, finance, HR, help desk), agency website, AI automation and omnichannel inbox for travel agencies, Hajj & Umrah operators and tour operators.

Static site — plain HTML, CSS and JavaScript, no build step.

## Structure

```
index.html            Landing page: mega-menu header, hero with booking widget, stats,
                      travel services (incl. Hajj & Umrah), ERP business modules,
                      finance example, website/AI/omnichannel, connected journey,
                      features, integrations, getting started, pricing (period +
                      currency toggles, comparison table, add-ons), testimonials,
                      FAQ, contact
assets/css/style.css  Styles (brand tokens in :root, responsive)
assets/js/main.js     Mega menu + mobile drawer, booking widget tabs, pricing, form validation
assets/img/           logo.png, logo-light.png (for dark backgrounds), favicon.png
assets/img/partners/  Partner logos (from Simple Icons, CC0)
```

## Brand

- Forest green `#184332` and lime `#92EF59`, taken from the logo.
- Fonts: Sora (headings) and DM Sans (body), loaded from Google Fonts.

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Before going live

- **Pricing:** `data-monthly` / `data-lifetime` (USD) on each `.price`; BDT rate and yearly discount at the top of the pricing code in `main.js`. Current prices are placeholders.
- **Partner logos:** Amadeus, Sabre, Travelport, Hotelbeds, bKash, Nagad, SSLCommerz, TBO, WebBeds etc. use letter badges. Drop official SVG/PNG logos into `assets/img/partners/` and swap the `<span class="mono">` for an `<img>`.
- **Hours** in the contact section.
- **Testimonials:** replace with real customer quotes.
- **Contact form:** validates client-side only. Point it at your backend or a form service (add `action`/`method` and remove the `preventDefault` in `main.js`).

## Deploy

Upload the folder to any static host (cPanel, Netlify, Vercel, GitHub Pages).
