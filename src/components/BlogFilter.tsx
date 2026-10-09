"use client";

import { useState } from "react";
import type { Post } from "@/lib/content";
import { PostCard } from "./ui";

/** Category chips that filter the blog grid. */
export default function BlogFilter({ posts, categories, total }: { posts: Post[]; categories: { name: string; count: number }[]; total: number }) {
  const [cat, setCat] = useState("all");
  const chips = [{ id: "all", name: "All", count: total }, ...categories.map((c) => ({ id: c.name, ...c }))];
  return (
    <>
      <div className="blog-filter" role="group" aria-label="Filter articles by category">
        {chips.map((c) => (
          <button key={c.id} className={cat === c.id ? "active" : undefined} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
            {c.name} <em>{c.count}</em>
          </button>
        ))}
      </div>
      <div className="post-grid" id="postGrid">
        {posts.map((p) => <PostCard key={p.slug} p={p} hidden={cat !== "all" && p.cat !== cat} />)}
      </div>
    </>
  );
}
