"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { savedLanguage, setLanguage, translatePage, type LangCode } from "@/lib/i18n";

type I18nContext = { lang: LangCode; changeLanguage: (lang: LangCode) => void };

const Ctx = createContext<I18nContext>({ lang: "en", changeLanguage: () => {} });
export const useI18n = () => useContext(Ctx);

/** Holds the chosen language and keeps the page translated across client-side navigation. */
export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LangCode>("en");
  const pathname = usePathname();

  const changeLanguage = useCallback((next: LangCode) => {
    setLanguage(next).then(setLang);
  }, []);

  useEffect(() => {
    const saved = savedLanguage();
    if (saved !== "en") changeLanguage(saved);
  }, [changeLanguage]);

  // A new page arrives in English; translate it once React has rendered it
  useEffect(() => {
    if (lang !== "en") requestAnimationFrame(translatePage);
  }, [pathname, lang]);

  return <Ctx.Provider value={{ lang, changeLanguage }}>{children}</Ctx.Provider>;
}
