import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/styles/modules/sales.css";
import "@/styles/modules/proposals.css";
import "@/styles/modules/finance.css";
import "@/styles/modules/vendors.css";
import "@/styles/modules/hr.css";
import "@/styles/modules/helpdesk.css";
import "@/styles/modules/reports.css";
import "@/styles/modules/marketing.css";
import "@/styles/modules/b2b.css";
import "@/styles/modules/website.css";
import "@/styles/modules/cms.css";
import "@/styles/modules/ai.css";
import "@/styles/modules/document-intelligence.css";
import "@/styles/modules/omnichannel.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import I18nProvider from "@/components/I18nProvider";
import ScrollToTop from "@/components/ScrollToTop";
import Icons from "@/components/Icons";
import WaFloat from "@/components/WaFloat";
import { SITE } from "@/lib/content";
import { EARLY_SCRIPT } from "@/lib/i18n";

/** Google Analytics 4 (gtag.js) measurement ID. */
const GA_ID = "G-YE5B754YF2";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "TravelSuite ERP",
  icons: { icon: "/assets/img/favicon.png", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#184332",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: EARLY_SCRIPT }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <I18nProvider>
          <ScrollToTop />
          <Icons />
          <Header />
          <main>{children}</main>
          <Footer />
          <WaFloat />
        </I18nProvider>
      </body>
    </html>
  );
}
