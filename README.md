# Travel Suite ERP Website

Marketing website for **Travel Suite ERP**: booking engine, B2B agent portal, supplier extranet, accounting, CRM and reports for travel agencies, OTAs and tour operators.

Static site — plain HTML, CSS and JavaScript, no build step.

## Structure

```
index.html            Landing page: hero with booking widget, products, business models,
                      ERP ledger example, live demo panels, features, integrations,
                      getting started, pricing, testimonials, FAQ, contact
assets/css/style.css  Styles (brand tokens in :root, responsive)
assets/js/main.js     Mobile menu, search/demo tabs, pricing toggle, form validation
assets/img/           logo.png, logo-light.png (for dark backgrounds), favicon.png
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

- **Contact details:** email, WhatsApp number and hours in the `#contact` section are placeholders.
- **Demo URLs & logins:** in the `#demo` section.
- **Pricing:** `data-cloud` / `data-license` attributes on each `.price`.
- **Testimonials:** replace with real customer quotes.
- **Contact form:** validates client-side only. Point it at your backend or a form service (add `action`/`method` and remove the `preventDefault` in `main.js`).

## Deploy

Upload the folder to any static host (cPanel, Netlify, Vercel, GitHub Pages).
