"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LANGS, type LangCode } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";
import SiteSearch from "./SiteSearch";
import { Icon } from "./ui";

type MegaKey = "products" | "solutions" | "company";

// Solutions menu: how a customer moves through TravelSuite ERP
const JOURNEY: [icon: string, title: string, text: string][] = [
  ["i-chat", "Conversation", "WhatsApp, Messenger and web chat"],
  ["i-target", "Lead", "Captured and qualified automatically"],
  ["i-users", "CRM", "One profile for every customer"],
  ["i-trend", "Sales", "Quotes that turn into bookings"],
  ["i-plane", "Booking", "Flights, hotels, visas and packages"],
  ["i-wallet", "Finance & Operations", "Invoices, ledgers and reports"],
];

/** Main menu item highlighted for the current page */
function activeNav(path: string) {
  if (path === "/features") return "features";
  if (path.startsWith("/features/")) return "products";
  if (path.startsWith("/solutions")) return "solutions";
  if (path === "/pricing") return "pricing";
  if (/^\/(about|contact|blog|success-stories|affiliate)/.test(path)) return "company";
  return "";
}

/** Site header: mega menus (hover on desktop, click everywhere, accordion in the mobile drawer) and language menu. */
export default function Header() {
  const pathname = usePathname();
  const active = activeNav(pathname);
  const { lang, changeLanguage } = useI18n();
  const [drawer, setDrawer] = useState(false);
  const [mega, setMega] = useState<MegaKey | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isMobile = () => window.matchMedia("(max-width: 960px)").matches;
  const closeAll = useCallback(() => { setMega(null); setDrawer(false); setLangOpen(false); }, []);
  const toggleMega = (key: MegaKey) => setMega((m) => (m === key ? null : key));
  const hoverProps = (key: MegaKey) => ({
    onMouseEnter: () => { if (!isMobile()) { clearTimeout(timer.current); setMega(key); } },
    onMouseLeave: () => { if (!isMobile()) timer.current = setTimeout(() => setMega((m) => (m === key ? null : m)), 150); },
  });
  // Any link in the menu closes it (also when it points to the current page)
  const onNavClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) { setMega(null); setDrawer(false); }
  };

  useEffect(closeAll, [pathname, closeAll]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!isMobile() && !target.closest(".has-mega")) setMega(null);
      if (!langRef.current?.contains(target)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAll(); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [closeAll]);

  return (
      <header className={scrolled ? "header scrolled" : "header"} id="top">
        <div className="container header-inner">
          <Link href="/" className="logo" aria-label="TravelSuite ERP home">
            <img src="/assets/img/logo.png" alt="TravelSuite ERP" width="230" height="30" />
          </Link>
          <nav className={drawer ? "nav open" : "nav"} id="nav" aria-label="Main" onClick={onNavClick}>
            <ul className="nav-list">
              <li className={"has-mega" + (mega === "products" ? " open" : "")} {...hoverProps("products")}>
                <button className="nav-link" data-nav="products" aria-current={active === "products" ? "page" : undefined} aria-expanded={mega === "products"} aria-controls="mega-products" onClick={(e) => { e.stopPropagation(); toggleMega("products"); }}>Products <svg className="ic chev"><use href="#i-chev" /></svg></button>
                <div className="mega" id="mega-products">
                  <div className="mega-inner container prod">
                    <div className="mega-col">
                      <h6>Travel services</h6>
                      <Link href="/features/flights" className="mega-item">
                        <span className="mi"><svg><use href="#i-plane" /></svg></span>
                        <span><span className="b">Flight Tickets</span><small>Bookings & ticketing workflows</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/hotels" className="mega-item">
                        <span className="mi"><svg><use href="#i-bed" /></svg></span>
                        <span><span className="b">Hotel Booking</span><small>Hotel products & reservations</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/hajj" className="mega-item">
                        <span className="mi"><svg><use href="#i-kaaba" /></svg></span>
                        <span><span className="b">Hajj & Umrah</span><small>Pilgrims, packages & services</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/visa" className="mega-item">
                        <span className="mi"><svg><use href="#i-passport" /></svg></span>
                        <span><span className="b">Visa Processing</span><small>Applications & documents</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/tours" className="mega-item">
                        <span className="mi"><svg><use href="#i-map" /></svg></span>
                        <span><span className="b">Tour Packages</span><small>Create & sell packages</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/transport" className="mega-item">
                        <span className="mi"><svg><use href="#i-car" /></svg></span>
                        <span><span className="b">Transport Booking</span><small>Transfers & transport</small></span>
                      </Link>
                    </div>
                    <div className="mega-col">
                      <h6>Business modules</h6>
                      <Link href="/features/crm" className="mega-item">
                        <span className="mi"><svg><use href="#i-users" /></svg></span>
                        <span><span className="b">CRM</span><small>Customers & leads</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/sales" className="mega-item">
                        <span className="mi"><svg><use href="#i-trend" /></svg></span>
                        <span><span className="b">Sales</span><small>Quotes to confirmed bookings</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/proposals" className="mega-item">
                        <span className="mi"><svg><use href="#i-file" /></svg></span>
                        <span><span className="b">Proposals & Quotations</span><small>Branded offers with validity</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/finance" className="mega-item">
                        <span className="mi"><svg><use href="#i-wallet" /></svg></span>
                        <span><span className="b">Finance & Accounting</span><small>Ledgers, invoices, payments</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/vendors" className="mega-item">
                        <span className="mi"><svg><use href="#i-building" /></svg></span>
                        <span><span className="b">Vendor Management</span><small>Suppliers, commission, payouts</small></span>
                      </Link>
                    </div>
                    <div className="mega-col">
                      <h6 aria-hidden="true"></h6>
                      <Link href="/features/hr" className="mega-item">
                        <span className="mi"><svg><use href="#i-idcard" /></svg></span>
                        <span><span className="b">HR & Employees</span><small>Staff, attendance, payroll</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/helpdesk" className="mega-item">
                        <span className="mi"><svg><use href="#i-headset" /></svg></span>
                        <span><span className="b">Help Desk</span><small>Tickets & customer support</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/reports" className="mega-item">
                        <span className="mi"><svg><use href="#i-chart" /></svg></span>
                        <span><span className="b">Reports & Analytics</span><small>Sales, profit, performance</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/marketing" className="mega-item">
                        <span className="mi"><svg><use href="#i-mail" /></svg></span>
                        <span><span className="b">Marketing</span><small>Targeted email campaigns</small></span>
                      </Link>
                    </div>
                    <div className="mega-col">
                      <h6>Platform</h6>
                      <Link href="/features/b2b" className="mega-item">
                        <span className="mi"><svg><use href="#i-layers" /></svg></span>
                        <span><span className="b">B2B & B2C Booking</span><small>Agent portal + customer site</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/website" className="mega-item">
                        <span className="mi"><svg><use href="#i-globe" /></svg></span>
                        <span><span className="b">Agency Website</span><small>Your digital storefront</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/cms" className="mega-item">
                        <span className="mi"><svg><use href="#i-palette" /></svg></span>
                        <span><span className="b">Website CMS</span><small>Pages, blog, menus & SEO</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/ai" className="mega-item">
                        <span className="mi"><svg><use href="#i-bot" /></svg></span>
                        <span><span className="b">AI Automation</span><small>AI agents & trip planners</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/document-intelligence" className="mega-item">
                        <span className="mi"><svg><use href="#i-eye" /></svg></span>
                        <span><span className="b">Document Intelligence</span><small>Passport & document OCR</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/omnichannel" className="mega-item">
                        <span className="mi"><svg><use href="#i-chat" /></svg></span>
                        <span><span className="b">Omnichannel Inbox</span><small>WhatsApp, Messenger, Instagram</small></span>
                      </Link>
                    </div>
                    <div className="mega-promo">
                      <span className="tag-lime">Free walkthrough</span>
                      <h5>See TravelSuite ERP with your own data</h5>
                      <p>A 30-minute online session, tailored to the services you sell.</p>
                      <Link href="/contact" className="btn btn-lime btn-block">Request a demo</Link>
                      {" "}
                      <Link href="/features" className="link-arrow light">Explore all features <svg className="ic"><use href="#i-arrow" /></svg></Link>
                    </div>
                  </div>
                </div>
              </li>
              <li className={"has-mega" + (mega === "solutions" ? " open" : "")} {...hoverProps("solutions")}>
                <button className="nav-link" data-nav="solutions" aria-current={active === "solutions" ? "page" : undefined} aria-expanded={mega === "solutions"} aria-controls="mega-solutions" onClick={(e) => { e.stopPropagation(); toggleMega("solutions"); }}>Solutions <svg className="ic chev"><use href="#i-chev" /></svg></button>
                <div className="mega" id="mega-solutions">
                  <div className="mega-inner container sol">
                    <div className="mega-col">
                      <h6>Who it's for</h6>
                      <Link href="/solutions/travel-agencies" className="mega-item">
                        <span className="mi"><svg><use href="#i-building" /></svg></span>
                        <span><span className="b">Travel agencies</span><small>Ticketing, hotels and visa under one roof</small></span>
                      </Link>
                      {" "}
                      <Link href="/solutions/hajj-umrah" className="mega-item">
                        <span className="mi"><svg><use href="#i-kaaba" /></svg></span>
                        <span><span className="b">Hajj & Umrah operators</span><small>Pilgrim registration, groups, packages</small></span>
                      </Link>
                      {" "}
                      <Link href="/solutions/b2b-consolidators" className="mega-item">
                        <span className="mi"><svg><use href="#i-users" /></svg></span>
                        <span><span className="b">B2B consolidators</span><small>Agent network, credit and commissions</small></span>
                      </Link>
                    </div>
                    <div className="mega-col">
                      <h6 className="spacer" aria-hidden="true">
                      </h6>
                      <Link href="/solutions/tour-operators" className="mega-item">
                        <span className="mi"><svg><use href="#i-map" /></svg></span>
                        <span><span className="b">Tour operators & DMCs</span><small>Packages, departures, suppliers</small></span>
                      </Link>
                      {" "}
                      <Link href="/solutions/online-travel-agencies" className="mega-item">
                        <span className="mi"><svg><use href="#i-globe" /></svg></span>
                        <span><span className="b">Online travel agencies</span><small>B2C website with online payment</small></span>
                      </Link>
                      {" "}
                      <Link href="/solutions/corporate-travel" className="mega-item">
                        <span className="mi"><svg><use href="#i-idcard" /></svg></span>
                        <span><span className="b">Corporate travel desks</span><small>Policies, approvals, monthly billing</small></span>
                      </Link>
                    </div>
                    <div className="mega-col">
                      <h6>By goal</h6>
                      <Link href="/features/website" className="mega-item">
                        <span className="mi"><svg><use href="#i-rocket" /></svg></span>
                        <span><span className="b">Sell online 24/7</span><small>Booking website with online payment</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/b2b" className="mega-item">
                        <span className="mi"><svg><use href="#i-layers" /></svg></span>
                        <span><span className="b">Grow an agent network</span><small>B2B portal, markups, credit and wallets</small></span>
                      </Link>
                      {" "}
                      <Link href="/features/finance" className="mega-item">
                        <span className="mi"><svg><use href="#i-wallet" /></svg></span>
                        <span><span className="b">Run the back office</span><small>Accounts, invoices and supplier dues</small></span>
                      </Link>
                    </div>
                    <div className="mega-journey">
                      <h6>The connected journey</h6>
                      <p className="mj-title">From first chat to final invoice</p>
                      <ol>
                        {JOURNEY.map(([icon, title, text]) => (
                          <li key={title}>
                            <span className="mj-dot"><Icon name={icon} /></span>
                            <span className="mj-text"><span className="b">{title}</span><small>{text}</small></span>
                          </li>
                        ))}
                      </ol>
                      <Link href="/solutions" className="btn btn-lime btn-block mj-cta">All solutions <Icon name="i-arrow" /></Link>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link className="nav-link" data-nav="features" aria-current={active === "features" ? "page" : undefined} href="/features">Features</Link>
              </li>
              <li>
                <Link className="nav-link" data-nav="pricing" aria-current={active === "pricing" ? "page" : undefined} href="/pricing">Pricing</Link>
              </li>
              <li className={"has-mega small" + (mega === "company" ? " open" : "")} {...hoverProps("company")}>
                <button className="nav-link" data-nav="company" aria-current={active === "company" ? "page" : undefined} aria-expanded={mega === "company"} aria-controls="mega-company" onClick={(e) => { e.stopPropagation(); toggleMega("company"); }}>Company <svg className="ic chev"><use href="#i-chev" /></svg></button>
                <div className="mega" id="mega-company">
                  <div className="mega-inner">
                    <Link href="/about" className="mega-item">
                      <span className="mi"><svg><use href="#i-heart" /></svg></span>
                      <span><span className="b">About us</span><small>Who we are and why we build</small></span>
                    </Link>
                    {" "}
                    <Link href="/success-stories" className="mega-item">
                      <span className="mi"><svg><use href="#i-award" /></svg></span>
                      <span><span className="b">Success stories</span><small>Agencies growing with TravelSuite</small></span>
                    </Link>
                    {" "}
                    <Link href="/#stories" className="mega-item">
                      <span className="mi"><svg><use href="#i-star" /></svg></span>
                      <span><span className="b">Customer reviews</span><small>What our clients say</small></span>
                    </Link>
                    {" "}
                    <Link href="/blog" className="mega-item">
                      <span className="mi"><svg><use href="#i-file" /></svg></span>
                      <span><span className="b">Blog</span><small>Guides for travel agencies</small></span>
                    </Link>
                    {" "}
                    <Link href="/affiliate" className="mega-item">
                      <span className="mi"><svg><use href="#i-percent" /></svg></span>
                      <span><span className="b">Affiliate program</span><small>Earn by referring agencies</small></span>
                    </Link>
                    {" "}
                    <Link href="/contact" className="mega-item">
                      <span className="mi"><svg><use href="#i-headset" /></svg></span>
                      <span><span className="b">Contact us</span><small>Sales and support</small></span>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
            <div className="nav-mobile-ctas">
              <Link href="/contact" className="btn btn-lime btn-block">Request a demo</Link>
            </div>
          </nav>
          <div className="header-actions">
            <SiteSearch />
            <div className={langOpen ? "lang open" : "lang"} id="lang" ref={langRef}>
              <button className="lang-btn" aria-expanded={langOpen} aria-controls="lang-menu" aria-label="Change language" onClick={() => setLangOpen((o) => !o)}>
                <Icon name="i-globe" /><span className="lang-current" data-no-i18n="">{LANGS[lang].label}</span><Icon name="i-chev" className="ic chev" />
              </button>
              <ul className="lang-menu" id="lang-menu">
                <li className="lang-head" data-no-i18n=""><span>Choose your language</span><small>{Object.keys(LANGS).length} languages</small></li>
                {(Object.keys(LANGS) as LangCode[]).map((code) => (
                  <li key={code}>
                    <button lang={code} data-no-i18n="" aria-current={code === lang} onClick={() => { changeLanguage(code); setLangOpen(false); }}>
                      <span className="b">{LANGS[code].native}</span><small>{LANGS[code].english}</small><Icon name="i-check" className="ic tick" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/contact" className="btn btn-lime hide-xs">Request a demo</Link>
            {" "}
            <button className="menu-toggle" id="menuToggle" aria-label={drawer ? "Close menu" : "Open menu"} aria-expanded={drawer} aria-controls="nav" onClick={() => setDrawer((d) => !d)}> <span /><span /><span /> </button>
          </div>
        </div>
      </header>
  );
}
