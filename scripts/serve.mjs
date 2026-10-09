#!/usr/bin/env node
// Serve the static export in out/ with clean URLs (/features/flights -> out/features/flights.html).
// Used by `npm start`, locally or on a Node.js host behind a proxy (set PORT; defaults to 3000).
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, sep } from "node:path";

const ROOT = new URL("../out", import.meta.url).pathname;
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

// Old addresses -> new pages, shared with Vercel (vercel.json "redirects")
// ("/old/:slug" patterns match one path segment)
const REDIRECTS = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8")).redirects.map((r) => ({
  test: new RegExp(`^${r.source.replace(/\/+$/, "").replace(/:\w+/g, "[^/]+")}$`),
  to: r.destination,
}));

if (!existsSync(join(ROOT, "index.html"))) {
  console.error("out/ is missing: run `npm run build` first.");
  process.exit(1);
}

function resolve(urlPath) {
  const base = join(ROOT, normalize(urlPath));
  if (base !== ROOT && !base.startsWith(ROOT + sep)) return null;
  return [base, `${base}.html`, join(base, "index.html")].find((f) => existsSync(f) && statSync(f).isFile()) ?? null;
}

createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { allow: "GET, HEAD" }).end();
    return;
  }
  let path;
  try {
    path = decodeURIComponent((req.url ?? "/").split("?")[0]);
  } catch {
    res.writeHead(400).end("Bad request");
    return;
  }
  const moved = REDIRECTS.find((r) => r.test.test(path.replace(/\/+$/, "") || "/"))?.to;
  if (moved) {
    res.writeHead(301, { location: moved }).end();
    return;
  }
  if (path.length > 1 && path.endsWith("/")) {
    res.writeHead(301, { location: path.replace(/\/+$/, "") || "/" }).end();
    return;
  }
  const file = resolve(path);
  const status = file ? 200 : 404;
  const target = file ?? join(ROOT, "404.html");
  res.writeHead(status, {
    "content-type": TYPES[extname(target)] ?? "application/octet-stream",
    // Next.js puts a content hash in every file name under /_next/static, so those never change
    "cache-control": path.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "public, max-age=300",
  });
  if (req.method === "HEAD") res.end();
  else createReadStream(target).pipe(res);
}).listen(PORT, HOST, () => console.log(`TravelSuite ERP site on http://${HOST}:${PORT}`));
