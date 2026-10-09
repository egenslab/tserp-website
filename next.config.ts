import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain HTML site to out/ that any static host can serve.
// Pages are written as out/features/flights.html, so the host must serve /features/flights from
// that file (Vercel, Netlify and Cloudflare Pages do; public/.htaccess covers Apache).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
