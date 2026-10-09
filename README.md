# TSERP Website

Marketing website for **TSERP — Travel Suite ERP**: booking engine, B2B agent portal, supplier extranet, accounting, CRM and reports for travel agencies, OTAs and tour operators.

Static site — plain HTML, CSS and JavaScript, no build step.

## Structure

```
index.html            Landing page (hero, modules, ERP, demo, features, integrations, pricing, FAQ, contact)
assets/css/style.css  Styles (responsive, design tokens in :root)
assets/js/main.js     Mobile menu, demo tabs, pricing toggle, counters, scroll reveal, form validation
assets/img/           Logo and favicon
```

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Customise

- **Brand colors:** edit `--primary` and `--accent` in `assets/css/style.css`.
- **Pricing:** edit the `data-cloud` / `data-license` attributes on each `.price` in `index.html`.
- **Demo credentials & URLs:** in the `#demo` section of `index.html`.
- **Contact form:** currently validates client-side only. Point it at your backend or a form service (e.g. add `action`/`method` and remove the `preventDefault` in `main.js`).

## Deploy

Upload the folder to any static host (GitHub Pages, Netlify, Vercel, cPanel).
