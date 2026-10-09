# TravelSuite ERP Website

Marketing website for **TravelSuite ERP**: B2B & B2C booking, travel ERP (CRM, sales, finance, HR, help desk), agency website, AI automation and omnichannel inbox for travel agencies, Hajj & Umrah operators and tour operators.

Built with **Next.js (App Router), React and TypeScript**, exported as a static site. Available in 9 languages: English, 简体中文, العربية (RTL), বাংলা, Bahasa Indonesia, Türkçe, اردو (RTL), ไทย and Bahasa Melayu.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/, then checks translations
npm start        # serve out/ locally
```

## URLs

| Page | URL | Source |
| --- | --- | --- |
| Home | `/` | `src/app/page.tsx` |
| Features | `/features`, `/features/flights` … | `src/app/features/`, content in `src/content/features.json` |
| Solutions | `/solutions`, `/solutions/hajj-umrah` … | `src/app/solutions/`, `src/content/solutions.json` |
| Success stories | `/success-stories`, `/success-stories/umrah-portal` … | `src/app/success-stories/`, `src/content/success.json` |
| Blog | `/blog`, `/blog/ai-trip-planners` … | `src/app/blog/`, `src/content/posts.json` |
| Pricing, About, Contact | `/pricing`, `/about`, `/contact` | `src/app/<page>/page.tsx` |
| Terms, Privacy, Refund | `/terms`, `/privacy`, `/refund` | `src/content/legal.json` |

`sitemap.xml` and `robots.txt` are generated from the same content (`src/app/sitemap.ts`, `src/app/robots.ts`).

## Structure

```
src/app/              Pages (one folder per URL), root layout, sitemap, robots, 404
src/app/globals.css   All styles (brand tokens in :root, responsive, RTL rules)
src/components/       Header (mega menus, language menu), Footer, Plans (pricing toggles),
                      StoriesCarousel, SearchCard, CountUp, ContactForm, BlogFilter,
                      ReadingProgress, ScrollSpyNav, Markets, Icons (SVG sprite), ui.tsx (shared blocks)
src/content/*.json    Feature, solution, blog, success-story and legal content; countries,
                      social links, payment methods and AI links (site.json)
src/lib/content.ts    Typed access to the content, SITE domain and WhatsApp link
src/lib/seo.ts        Page metadata (canonical, Open Graph) and JSON-LD helpers
src/lib/i18n.ts       Browser-side translator and the language list
src/i18n/<lang>.json  Translations: English text -> translated text
scripts/i18n.mjs      Copies translations to public/i18n and checks the build for untranslated text
public/assets/img/    Logos, favicon, flags, partner logos, success-story screenshots, journey art
tools/                showcase.html + screenshot-showcase.js: sample client sites for success stories
```

## Translations

Pages are written in English. When a visitor picks another language, `src/lib/i18n.ts` loads
`/i18n/<lang>.json` and replaces every text (and `placeholder`, `aria-label`, `title`) by looking up
its English version. Arabic and Urdu switch the page to right-to-left. The choice is remembered.

To add or change text:

1. Edit the page, component or content file in English.
2. Run `npm run build`. It lists every visible text that is missing from a language.
3. Add the English text and its translation to each `src/i18n/<lang>.json`.
   Page titles like `Hotel Booking — TravelSuite ERP` are filled in automatically from the translated name.

Mark an element with `data-no-i18n` to keep it untranslated (used for the language names in the menu).
To add a language, add it to `LANGS` in `src/lib/i18n.ts` and `scripts/i18n.mjs`, then add `src/i18n/<code>.json`.

## Deploy

`npm run build` writes a plain static site to `out/`. Pages are saved as `out/features/flights.html`, so the
host must serve `/features/flights` from that file:

- **Vercel, Netlify, Cloudflare Pages:** works as is (Vercel can also run `next build` directly).
- **Apache / cPanel:** upload the contents of `out/`; the included `.htaccess` maps clean URLs to the `.html` files.
- **Nginx:** `try_files $uri $uri.html $uri/ =404;`

## Brand

- Forest green `#184332` and lime `#92EF59`, taken from the logo.
- Fonts: Poppins with Hind Siliguri for Bangla, plus Noto fonts loaded on demand for Arabic, Urdu, Chinese and Thai.

## Before going live

- **Pricing:** USD prices are the `monthly` / `lifetime` props of each `PlanPrice` in `src/components/Plans.tsx`; the BDT rate and yearly discount are at the top of that file. Current prices are placeholders.
- **Partner logos:** Amadeus, Sabre, Travelport, Hotelbeds, bKash, Nagad, SSLCommerz, TBO, WebBeds etc. use letter badges. Drop official logos into `public/assets/img/partners/` and swap the `<span className="mono">` for an `<img>`.
- **Social links:** the URLs in `social` (`src/content/site.json`) are placeholders (`/travelsuiteerp`). Replace with your real profiles.
- **Domain:** canonical URLs, sitemap and structured data use `https://travelsuiteerp.com` (`SITE` in `src/lib/content.ts`).
- **Success stories:** the six stories, their numbers and screenshots (`public/assets/img/success/`) are samples made with `tools/`. Replace with real client results.
- **Support avatar:** `public/assets/img/support-agent.svg` is an illustration; replace with a real team photo if you like.
- **Testimonials:** replace with real customer quotes (home page, `StoriesCarousel` slides in `src/app/page.tsx`).
- **Legal pages:** Terms, Privacy and Refund policies are a starting draft (governing law: Bangladesh). Have them reviewed before publishing.
- **Contact form:** validates in the browser only. Send the data to your backend or a form service in `onSubmit` in `src/components/ContactForm.tsx`.
