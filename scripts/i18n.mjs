#!/usr/bin/env node
// Translation tooling.
//
//   node scripts/i18n.mjs build   Copy src/i18n/<lang>.json to public/i18n/ (run before next dev / next build)
//   node scripts/i18n.mjs check   After `next build`: list visible English text in out/ that a language
//                                 has no translation for
//
// src/i18n/<lang>.json maps English text (whitespace collapsed) to the translation.
// "<Name> — TravelSuite ERP" page titles are derived from the translated name automatically.
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "node-html-parser";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src/i18n");
const OUT = join(ROOT, "public/i18n");
const LANGS = ["bn", "ar", "ur", "zh", "ms", "id", "tr", "th"];
const SUFFIX = " — TravelSuite ERP";

// Text that stays as written in every language: brand and product names
const BRANDS = new Set(`Amadeus Sabre Travelport Duffel Kiwi.com Hotelbeds Expedia Hotels.com WebBeds TBO Tripadvisor GetYourGuide
SSLCommerz Mastercard Stripe PayPal Razorpay WhatsApp Messenger Instagram Mailgun OpenAI QuickBooks Xero English
travelsuiteerp.com EN in f ChatGPT Claude Perplexity Topics Trustpilot LinkedIn Facebook YouTube Visa`.split(/\s+/));
["Twilio SMS", "Google Analytics", "Google Maps", "WhatsApp, Messenger, Instagram", "WhatsApp + Facebook + Instagram",
  "+ Messenger, Instagram", "Google AI", "Apple Pay", "Google Pay", "American Express", "TravelSuite ERP", "Google Gemini",
  "Microsoft Copilot", "Grok", "Booking.com", "Agoda"].forEach((b) => BRANDS.add(b));

const norm = (s) => s.replace(/\s+/g, " ").trim();
const load = (lang) => JSON.parse(readFileSync(join(SRC, `${lang}.json`), "utf8"));

function withTitles(dict, english) {
  const out = { ...dict };
  for (const en of english) {
    if (!(en in out) && en.endsWith(SUFFIX) && en.slice(0, -SUFFIX.length) in out) {
      out[en] = out[en.slice(0, -SUFFIX.length)] + SUFFIX;
    }
  }
  return out;
}

function build() {
  mkdirSync(OUT, { recursive: true });
  const english = Object.keys(load("bn"));
  const report = [];
  for (const lang of LANGS) {
    const dict = withTitles(load(lang), english);
    writeFileSync(join(OUT, `${lang}.json`), JSON.stringify(dict));
    report.push(`${lang} ${Object.keys(dict).length}`);
  }
  console.log(`i18n: wrote public/i18n (${report.join(", ")})`);
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "_next" ? [] : htmlFiles(p);
    return name.endsWith(".html") ? [p] : [];
  });
}

/** Visible text and translatable attributes of a built page, as the browser-side translator sees them. */
function collect(file) {
  const found = [];
  const walk = (node) => {
    if (node.nodeType === 3) { found.push(node.rawText); return; }
    if (node.nodeType !== 1) return;
    const tag = (node.rawTagName || "").toLowerCase();
    if (["script", "style", "svg", "title", "noscript", "head"].includes(tag) || node.hasAttribute?.("data-no-i18n")) return;
    for (const a of ["placeholder", "aria-label", "title"]) if (node.getAttribute?.(a)) found.push(node.getAttribute(a));
    node.childNodes.forEach(walk);
  };
  const root = parse(readFileSync(file, "utf8"), { comment: false });
  walk(root.querySelector("body") ?? root);
  const decode = (s) => parse(`<p>${s}</p>`).text;
  return found.map((t) => norm(decode(t))).filter((t) =>
    /[A-Za-z]{2}/.test(t) && !BRANDS.has(t) &&
    !/^[A-Z0-9 .:+→·\-/]{1,40}$/.test(t) &&   // codes such as DAC 21:40 → DXB 01:10
    !/^[a-z0-9-]+$/.test(t));                 // url labels in screenshots
}

function check() {
  const outDir = join(ROOT, "out");
  if (!existsSync(outDir)) throw new Error("out/ not found: run next build first");
  const missing = Object.fromEntries(LANGS.map((l) => [l, new Map()]));
  const dicts = Object.fromEntries(LANGS.map((l) => [l, load(l)]));
  for (const file of htmlFiles(outDir)) {
    const page = file.slice(outDir.length);
    for (const text of collect(file)) {
      for (const lang of LANGS) {
        if (!(text in dicts[lang]) && !missing[lang].has(text)) missing[lang].set(text, page);
      }
    }
  }
  let total = 0;
  for (const lang of LANGS) {
    const m = missing[lang];
    total += m.size;
    if (!m.size) continue;
    console.log(`\n${lang}: ${m.size} text(s) without a translation`);
    for (const [text, page] of m) console.log(`  [${page}] ${text}`);
  }
  console.log(total ? `\ni18n: add the texts above to src/i18n/<lang>.json` : "i18n: every visible text is translated in all languages.");
}

const cmd = process.argv[2];
if (cmd === "build") build();
else if (cmd === "check") check();
else { console.error("usage: node scripts/i18n.mjs build|check"); process.exit(1); }
