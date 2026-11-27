#!/usr/bin/env node
// IndexNow: tell Bing, Yandex, Seznam, Naver and Yep which pages changed, right after a deploy build.
// Runs at the end of `npm run build:hostinger` and never fails the build.
//
// How it finds what changed: every build writes out/indexnow-state.json (a hash of each page's visible text).
// The script fetches the state file of the site that is live now, compares, and submits only new or changed
// URLs. It submits nothing until the key file below is live, so the very first deploy only publishes the key.
// Set INDEXNOW=0 to skip.
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const KEY = "1f7c55e048c8a96c2b8acd100097afed";
const HOST = "www.travelsuiteerp.com";
const SITE = `https://${HOST}`;
const OUT = "out";
const log = (m) => console.log(`indexnow: ${m}`);

const get = async (url) => {
  const r = await fetch(url, { signal: AbortSignal.timeout(10000), cache: "no-store" });
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.text();
};

// /features/flights -> out/features/flights.html, / -> out/index.html
const fileFor = (url) => {
  const path = new URL(url).pathname.replace(/\/$/, "");
  return `${OUT}${path || "/index"}.html`;
};

// Visible text only, so build ids and chunk names do not count as changes
const textHash = (html) =>
  createHash("sha1")
    .update(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    .digest("hex")
    .slice(0, 16);

async function main() {
  const sitemap = readFileSync(`${OUT}/sitemap.xml`, "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const state = {};
  for (const u of urls) if (existsSync(fileFor(u))) state[u] = textHash(readFileSync(fileFor(u), "utf8"));
  writeFileSync(`${OUT}/indexnow-state.json`, JSON.stringify(state));
  log(`${Object.keys(state).length} pages hashed`);

  if (process.env.INDEXNOW === "0") return log("skipped (INDEXNOW=0)");

  // The key must already be live, or search engines reject the submission
  try {
    if ((await get(`${SITE}/${KEY}.txt`)).trim() !== KEY) return log("key file not live yet; nothing submitted");
  } catch (e) {
    return log(`key file not reachable (${e.message}); nothing submitted`);
  }

  let live = null;
  try { live = JSON.parse(await get(`${SITE}/indexnow-state.json`)); } catch { /* first run: submit everything */ }
  const changed = Object.keys(state).filter((u) => !live || live[u] !== state[u]);
  if (!changed.length) return log("no changed pages");

  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: changed.slice(0, 10000) }),
    signal: AbortSignal.timeout(15000),
  });
  log(`submitted ${changed.length} URL(s), response ${r.status}`);
  for (const u of changed.slice(0, 20)) log(`  ${u}`);
}

main().catch((e) => log(`skipped (${e.message})`));
