# Brief: translate new TravelSuite ERP site text into one language

You translate English UI, marketing and blog text of the TravelSuite ERP website (travel agency booking and ERP
software) into ONE target language: bn, ar, ur, zh, ms, id, tr or th. The repo is read-only for you.

- Input: <jobdir>/job.json, {id: "English text"}. Read it in pieces of about 60 lines.
- Output: after each piece write <jobdir>/out/<lang>-01.json, -02.json, … with {id: "translation"} for exactly that
  piece's ids, using a small Python script (json.dump, ensure_ascii=False). Give any helper script a unique name with
  your language code in it: other translators work in the same folder at the same time.
- If output files already exist, validate first and do only the missing ids.
- Finish with `python3 tools/blog/i18n_job.py validate <jobdir> <lang>` and fix everything until it prints OK.

## Style
- Natural, fluent, professional text a travel agency owner in that market would expect; not word for word. Headings
  stay headline-like, buttons and labels short. Bold lead-in labels ("Flights:", "Step 1: Register.") keep their
  punctuation style.
- Terminology: grep the site dictionary src/i18n/<lang>.json for existing terms (Hajj, Umrah, Makkah, Madinah,
  pilgrim, invoice, supplier, vendor, quotation, markup, commission, payable, receivable, e-invoicing, go-live,
  itinerary) and stay consistent with it.
- Keep unchanged: brand and product names (TravelSuite ERP, WhatsApp, Messenger, Instagram, Facebook, Google, Meta,
  Amadeus, Sabre, Travelport, Galileo, QuickBooks, Xero, ZATCA, FATOORA, IATA, BSP, GDS, NDC, API, CRM, ERP, B2B, B2C,
  OTA, DMC, SaaS, OCR, SEO, PNR, VAT codes, QR), plan names (Starter, Growth, Business, Enterprise), customer and
  person names, codes and IDs, $ and currency amounts, URLs and email addresses.
- Placeholders like "Customer 01" or "[Agency name]": translate the words, keep the numbers and brackets.
- Numbers: keep every number from the English (the validator checks this). Bangla uses Bangla digits in running text
  but Latin digits in $ amounts, IDs and codes; all other languages keep Latin digits.
- Language rules: Bangla VAT = ভ্যাট. Thai vendor = เวนเดอร์, supplier = ซัพพลายเออร์. Malay moderation = moderasi,
  e-invoice clearance = pengesahan. Indonesian e-invoice clearance = persetujuan. Turkish software vendor = sağlayıcı,
  travel supplier = tedarikçi. Chinese uses full-width punctuation.
- Legal and tax text: precise, formal register.

## Report back
Two sentences: the validation result and anything you were unsure about.
