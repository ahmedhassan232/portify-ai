import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import en from "./translations/en.json";
import ar from "./translations/ar.json";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale, isLocale } from "./config";

type Dict = Record<string, string>;

const dictionaries: Record<Locale, Dict> = {
  en: en as Dict,
  ar: ar as Dict,
};

interface LangCtx {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  setLocale: (l: Locale) => void;
  isRTL: boolean;
}

const Ctx = createContext<LangCtx>({
  locale: "en",
  dir: "ltr",
  t: (k) => k,
  setLocale: () => {},
  isRTL: false,
});

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getLocaleSnapshot(): Locale {
  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(saved) ? saved : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

function getServerLocaleSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const syncedLocale = useSyncExternalStore(subscribeStorage, getLocaleSnapshot, getServerLocaleSnapshot);
  const [overrideLocale, setOverrideLocale] = useState<Locale | null>(null);
  const locale = overrideLocale ?? syncedLocale;

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {}
  }, [locale]);

  const value = useMemo<LangCtx>(() => {
    const dict = dictionaries[locale];
    const t = (key: string): string => dict[key] ?? (dictionaries.en as Dict)[key] ?? key;
    return {
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      t,
      setLocale: (l: Locale) => {
        try {
          window.localStorage.setItem(LOCALE_STORAGE_KEY, l);
          window.dispatchEvent(new Event("storage"));
        } catch {}
        setOverrideLocale(l);
      },
      isRTL: locale === "ar",
    };
  }, [locale]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  return useContext(Ctx);
}
