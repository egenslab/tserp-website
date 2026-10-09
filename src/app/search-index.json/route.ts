import { buildSearchIndex } from "@/lib/search";

// Written once at build time to out/search-index.json and loaded when a visitor opens search
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
