export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "portify-locale";
export const PORTFOLIO_LANG_KEY = "portify-portfolio-lang";

export const localeMeta: Record<Locale, { label: string; nativeLabel: string; dir: "ltr" | "rtl"; font: string }> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr", font: "Inter" },
  ar: { label: "Arabic", nativeLabel: "العربية", dir: "rtl", font: "IBM Plex Sans Arabic" },
};

export function isLocale(v: unknown): v is Locale {
  return v === "en" || v === "ar";
}
