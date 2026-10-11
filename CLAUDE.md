@AGENTS.md

# Project rules

## Every content change ships translated
Whenever text is added or changed anywhere on the site (pages, components, `src/content/*.json`, metadata, FAQs), add the translations in the same change, for all 8 languages: `bn`, `ar`, `ur`, `zh`, `ms`, `id`, `tr`, `th`. Do not leave new English text untranslated.

How translations work:
- `src/i18n/<lang>.json` maps the English text (whitespace collapsed, exactly as rendered) to the translation. The browser swaps text at runtime; `ar` and `ur` switch the page to right-to-left.
- `npm run build` ends with `node scripts/i18n.mjs check`, which lists every visible English text that has no translation, per language and page. Add the missing entries, rebuild, and repeat until it prints "every visible text is translated in all languages."
- Avoid building headings or sentences from fragments (`"What changes for " + name`): word order differs between languages. Prefer one complete string.

Conventions (keep consistent with the existing dictionaries):
- Keep unchanged: brand and product names (TravelSuite ERP, WhatsApp, Amadeus, Sabre, Travelport, Galileo, GDS, CRM, ERP, B2B, B2C, SEO…), customer and person names, plan names (Starter, Growth, Business, Enterprise), codes and IDs, $ amounts, URLs and email addresses.
- Translate interface labels, buttons and report names too ("Buy now", "All Bookings", "Sales report").
- Bangla uses Bangla digits in running text; IDs, codes and $ amounts stay in Latin digits. All other languages keep Latin digits.
- Example placeholders translate the word and keep the number ("Customer 01").
- Thai: vendor = เวนเดอร์, supplier = ซัพพลายเออร์. Malay: moderate/moderation = moderasi.
- Use the established local terms for Hajj, Umrah, Makkah, Madinah and pilgrims; look up existing entries in the dictionary before choosing a new term.

## Content accuracy
Claims about product features must match what the TravelSuite ERP backend actually offers. Mark example data in mock UIs ("Example data.") and never publish real customer data.
