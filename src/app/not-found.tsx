import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Page not found — TravelSuite ERP" },
  description: "The page you are looking for has moved or does not exist. Go back to the TravelSuite ERP home page to find travel agency software, features and pricing.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="pill">404</span>
        <h1>Page not found</h1>
        <p className="lead">The page you are looking for has moved or does not exist.</p>
        <div className="hero-ctas"><Link href="/" className="btn btn-lime btn-lg">Back to home <Icon name="i-arrow" /></Link></div>
      </div>
    </section>
  );
}
