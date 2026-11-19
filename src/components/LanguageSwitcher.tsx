"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();
  return (
    <div className={cn("flex items-center gap-1 rounded-full border border-[#E9E7F0] bg-white p-1", compact && "border-transparent bg-slate-100")} role="group" aria-label="Language">
      <Globe className="ms-2 h-4 w-4 text-[#73738A]" />
      {(["en", "ar"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold transition-all",
            locale === l ? "bg-[#171625] text-white shadow" : "text-[#73738A] hover:text-[#171625]"
          )}
          aria-pressed={locale === l}
        >
          {l === "en" ? "EN" : "عربي"}
        </button>
      ))}
    </div>
  );
}
