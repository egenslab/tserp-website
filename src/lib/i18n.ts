// Client-side translation layer.
// Pages render in English. For another language the dictionary /i18n/<code>.json (written by
// scripts/i18n.mjs from src/i18n) is fetched once, and every text node plus the placeholder /
// aria-label / title attributes are looked up by their English text (whitespace collapsed).
// A MutationObserver keeps content that React adds or changes later (client navigation, menus,
// price toggles) translated. Missing entries stay in English.

export type LangCode = "en" | "zh" | "ar" | "bn" | "id" | "tr" | "ur" | "th" | "ms";

type LangInfo = { label: string; native: string; english: string; dir: "ltr" | "rtl"; font?: string };

// Order here is the order of the language menu
export const LANGS: Record<LangCode, LangInfo> = {
  en: { label: "EN", native: "English", english: "English", dir: "ltr" },
  zh: { label: "中文", native: "简体中文", english: "Chinese (Simplified)", dir: "ltr", font: "Noto+Sans+SC:wght@400;500;700" },
  ar: { label: "ع", native: "العربية", english: "Arabic", dir: "rtl", font: "Noto+Sans+Arabic:wght@400;500;600;700" },
  bn: { label: "বাং", native: "বাংলা", english: "Bengali", dir: "ltr", font: "Hind+Siliguri:wght@400;500;600;700" },
  id: { label: "ID", native: "Bahasa Indonesia", english: "Indonesian", dir: "ltr" },
  tr: { label: "TR", native: "Türkçe", english: "Turkish", dir: "ltr" },
  ur: { label: "اردو", native: "اردو", english: "Urdu", dir: "rtl", font: "Noto+Nastaliq+Urdu:wght@400;600;700" },
  th: { label: "ไทย", native: "ไทย", english: "Thai", dir: "ltr", font: "Noto+Sans+Thai:wght@400;500;600;700" },
  ms: { label: "MS", native: "Bahasa Melayu", english: "Malay", dir: "ltr" },
};

export const STORAGE_KEY = "ts-lang";
export const isLang = (v: unknown): v is LangCode => typeof v === "string" && v in LANGS;

const ATTRS = ["placeholder", "aria-label", "title"];
const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "svg", "SVG", "TITLE"]);

const dicts: Partial<Record<LangCode, Record<string, string>>> = {};
const loading: Partial<Record<LangCode, Promise<Record<string, string> | null>>> = {};
const originals = new WeakMap<Text, string>();      // text node -> English
const written = new WeakMap<Text, string>();        // text node -> value we last wrote
const attrOriginals = new WeakMap<Element, Record<string, string>>();
const attrWritten = new WeakMap<Element, Record<string, string>>();
const reverse = new Map<string, string>();          // translated title/description -> English
let current: LangCode = "en";

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

function lookup(text: string): string | null {
  if (current === "en") return null;
  const dict = dicts[current];
  const key = norm(text);
  return dict && Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : null;
}

export function loadDictionary(lang: LangCode) {
  if (dicts[lang]) return Promise.resolve(dicts[lang]!);
  loading[lang] ??= fetch(`/i18n/${lang}.json`)
    .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
    .then((d: Record<string, string>) => (dicts[lang] = d))
    .catch(() => { delete loading[lang]; return null; });
  return loading[lang]!;
}

function loadFont(lang: LangCode) {
  const family = LANGS[lang].font;
  if (!family || document.getElementById(`font-${lang}`)) return;
  const link = document.createElement("link");
  link.id = `font-${lang}`;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
  document.head.appendChild(link);
}

function skipped(el: Element | null) {
  for (; el; el = el.parentElement) {
    if (SKIP.has(el.nodeName) || el.hasAttribute("data-no-i18n")) return true;
  }
  return false;
}

function translateText(node: Text) {
  if (!originals.has(node) || (written.has(node) && node.nodeValue !== written.get(node))) {
    originals.set(node, node.nodeValue ?? "");   // new node, or React changed it since we wrote it
  }
  const src = originals.get(node)!;
  const t = lookup(src);
  const value = t === null ? src : src.match(/^\s*/)![0] + t + src.match(/\s*$/)![0];
  written.set(node, value);
  if (node.nodeValue !== value) node.nodeValue = value;
}

function translateAttrs(el: Element) {
  const saved = attrOriginals.get(el) ?? {};
  const wrote = attrWritten.get(el) ?? {};
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (v === null) continue;
    if (!(a in saved) || v !== wrote[a]) saved[a] = v;
    const t = lookup(saved[a]);
    wrote[a] = t ?? saved[a];
    if (v !== wrote[a]) el.setAttribute(a, wrote[a]);
  }
  attrOriginals.set(el, saved);
  attrWritten.set(el, wrote);
}

function translateTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    if (/\S/.test(root.nodeValue ?? "") && !skipped(root.parentElement)) translateText(root as Text);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE || skipped(root as Element)) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode(n) {
      if (n.nodeType === Node.ELEMENT_NODE) {
        const el = n as Element;
        if (SKIP.has(el.nodeName) || el.hasAttribute("data-no-i18n")) return NodeFilter.FILTER_REJECT;
        translateAttrs(el);
        return NodeFilter.FILTER_SKIP;
      }
      return /\S/.test(n.nodeValue ?? "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  translateAttrs(root as Element);
  let node: Node | null;
  while ((node = walker.nextNode())) translateText(node as Text);
}

function translateHead() {
  const title = reverse.get(document.title) ?? document.title;
  const t = lookup(title) ?? title;
  if (t !== title) reverse.set(t, title);
  if (document.title !== t) document.title = t;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    const content = meta.getAttribute("content") ?? "";
    const desc = reverse.get(content) ?? content;
    const td = lookup(desc) ?? desc;
    if (td !== desc) reverse.set(td, desc);
    meta.setAttribute("content", td);
  }
}

/** Translate the whole page into the current language (English restores the originals). */
export function translatePage() {
  translateTree(document.body);
  translateHead();
}

let observer: MutationObserver | null = null;

function observe() {
  if (observer) return;
  observer = new MutationObserver((records) => {
    for (const r of records) {
      if (r.type === "childList") r.addedNodes.forEach(translateTree);
      else if (r.type === "characterData") {
        const node = r.target as Text;
        if (node.nodeValue !== written.get(node) && !skipped(node.parentElement)) translateText(node);
      } else if (r.type === "attributes") {
        const el = r.target as Element;
        if (el.getAttribute(r.attributeName!) !== attrWritten.get(el)?.[r.attributeName!] && !skipped(el)) translateAttrs(el);
      }
    }
    translateHead();
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  const title = document.querySelector("title");
  if (title) observer.observe(title, { childList: true, characterData: true, subtree: true });
}

/** Switch language: load its dictionary and font, translate the page and remember the choice. */
export async function setLanguage(lang: LangCode): Promise<LangCode> {
  if (lang !== "en") {
    loadFont(lang);
    if (!(await loadDictionary(lang))) lang = "en";
  }
  current = lang;
  const root = document.documentElement;
  root.lang = lang;
  root.dir = LANGS[lang].dir;
  translatePage();
  observe();
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage unavailable */ }
  return lang;
}

export function savedLanguage(): LangCode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return isLang(v) ? v : "en";
  } catch {
    return "en";
  }
}

// Runs before the page paints (inline in <head>) so Arabic and Urdu open right-to-left without a jump
export const EARLY_SCRIPT = `try{var l=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var r={ar:1,ur:1};if(l&&l!=="en"){document.documentElement.lang=l;if(r[l])document.documentElement.dir="rtl"}}catch(e){}`;
