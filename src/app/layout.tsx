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
import "@/styles/solutions-index.css";
import "@/styles/einvoice.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import I18nProvider from "@/components/I18nProvider";
import ScrollToTop from "@/components/ScrollToTop";
import Icons from "@/components/Icons";
import WaFloat from "@/components/WaFloat";
import CookieBanner from "@/components/CookieBanner";
import { CONSENT_KEY } from "@/lib/consent";
import { SITE } from "@/lib/content";
import { EARLY_SCRIPT } from "@/lib/i18n";

/** Google Analytics 4 (gtag.js) measurement ID. */
const GA_ID = "G-YE5B754YF2";

/** Microsoft Clarity project ID. */
const CLARITY_ID = "ywjws0uzun";

/** Google Tag Manager container. Loaded after the consent defaults above, on the same dataLayer. */
const GTM_ID = "GTM-TQMVBHT7";
const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

/** Countries where analytics cookies wait for consent (EEA, UK, Switzerland). Elsewhere they are on until the visitor declines. */
const CONSENT_REGIONS = "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH".split(" ");

/** Google Consent Mode v2 defaults, the visitor's saved choice (CookieBanner), then the GA4 config. */
const GTAG_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:${JSON.stringify(CONSENT_REGIONS)},wait_for_update:500});
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
try{var c=localStorage.getItem('${CONSENT_KEY}');if(c==='granted'||c==='denied')gtag('consent','update',{analytics_storage:c});}catch(e){}
gtag('js',new Date());gtag('config','${GA_ID}');`;

/** Microsoft Clarity. A visitor who declined analytics cookies is passed on as no consent. */
const CLARITY_SCRIPT = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");
try{if(localStorage.getItem('${CONSENT_KEY}')==='denied')clarity('consent',false);}catch(e){}`;

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
        <script dangerouslySetInnerHTML={{ __html: GTAG_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: CLARITY_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript>
        <I18nProvider>
          <ScrollToTop />
          <Icons />
          <Header />
          <main>{children}</main>
          <Footer />
          <WaFloat />
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
