"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Code2, Palette, TrendingUp, Briefcase, GraduationCap, ArrowRight, ArrowLeft, Check, Sparkles, Languages } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { PROFESSIONS } from "@/lib/professions";
import { StepNav } from "@/components/StepNav";
import { cn } from "@/lib/utils";

const ICONS: Record<string, typeof Code2> = {
  "software-developer": Code2, "frontend-developer": Code2, "backend-developer": Code2, "fullstack-developer": Code2,
  "ui-ux-designer": Palette, "graphic-designer": Palette, "product-designer": Palette,
  "digital-marketer": TrendingUp, "content-creator": TrendingUp,
  "business-professional": Briefcase, accountant: Briefcase, engineer: Briefcase,
  student: GraduationCap, other: Sparkles,
};

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredProfession(): string {
  try {
    return window.localStorage.getItem("portify-profession") || "software-developer";
  } catch {
    return "software-developer";
  }
}

function getStoredSuggested(): string | null {
  try {
    return window.localStorage.getItem("portify-suggested-profession") || null;
  } catch {
    return null;
  }
}

function getStoredLang(): "en" | "ar" {
  try {
    const s = window.localStorage.getItem("portify-portfolio-lang");
    return s === "ar" || s === "en" ? s : "en";
  } catch {
    return "en";
  }
}

export default function ProfessionPage() {
  const { t, locale, isRTL } = useI18n();
  const router = useRouter();

  const syncedProf = useSyncExternalStore(subscribeStorage, getStoredProfession, () => "software-developer");
  const suggested = useSyncExternalStore(subscribeStorage, getStoredSuggested, () => null);
  const syncedLang = useSyncExternalStore(subscribeStorage, getStoredLang, () => "en");

  const [selectedProf, setSelectedProf] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<"en" | "ar" | null>(null);

  const selected = selectedProf ?? syncedProf;
  const outLang = selectedLang ?? syncedLang;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  function cont() {
    try {
      window.localStorage.setItem("portify-profession", selected);
      window.localStorage.setItem("portify-portfolio-lang", outLang);
    } catch {}
    router.push("/processing");
  }

  return (
    <main className="pb-20">
      <StepNav current="profession" />
      <div className="mx-auto mt-8 max-w-4xl px-4">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("profession.title")}</h1>
          <p className="mx-auto mt-3 max-w-lg text-[#73738A]">{t("profession.subtitle")}</p>
        </div>

        <div className="mt-8 rounded-[28px] border border-[#E9E7F0] bg-white p-6">
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-[#6C4CF1]" />
            <h2 className="font-extrabold">{t("profession.langTitle")}</h2>
          </div>
          <p className="mt-1 text-sm text-[#73738A]">{t("profession.langDesc")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["en", "ar"] as const).map((l) => (
              <button key={l} onClick={() => setSelectedLang(l)} className={cn("rounded-2xl border-2 p-4 text-start transition", outLang === l ? "border-[#6C4CF1] bg-[#F5F2FF]" : "border-[#E9E7F0] hover:border-[#6C4CF1]/40")}>
                <span className="flex items-center justify-between font-extrabold">{t(l === "en" ? "profession.lang.en" : "profession.lang.ar")}{outLang === l && <Check className="h-5 w-5 text-[#6C4CF1]" />}</span>
                <span className="mt-1 block text-xs text-[#73738A]" dir={l === "ar" ? "rtl" : "ltr"}>{l === "ar" ? "محتوى عربي احترافي كامل مع دعم RTL" : "Full professional English content with LTR layout"}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROFESSIONS.map((p) => {
            const Icon = ICONS[p.id] || Briefcase;
            const active = selected === p.id;
            const isSug = suggested === p.id;
            return (
              <button key={p.id} onClick={() => setSelectedProf(p.id)} className={cn("group relative rounded-3xl border-2 bg-white p-5 text-start transition", active ? "border-[#6C4CF1] shadow-xl shadow-[#6C4CF1]/15" : "border-[#E9E7F0] hover:border-[#6C4CF1]/40 hover:shadow-lg")}>
                {isSug && <span className="absolute -top-2.5 start-4 inline-flex items-center gap-1 rounded-full bg-[#6C4CF1] px-2.5 py-0.5 text-[10px] font-bold text-white"><Sparkles className="h-3 w-3" />{t("profession.suggested")}</span>}
                <span className={cn("grid h-11 w-11 place-items-center rounded-2xl transition", active ? "bg-[#6C4CF1] text-white" : "bg-[#F1EFFD] text-[#6C4CF1]")}><Icon className="h-5 w-5" /></span>
                <span className="mt-3 block font-extrabold">{locale === "ar" ? p.ar : p.en}</span>
                <span className="mt-0.5 block text-xs text-[#73738A]">{locale === "ar" ? p.descriptionAr : p.descriptionEn}</span>
                {active && <span className="absolute end-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-[#6C4CF1] text-white"><Check className="h-4 w-4" /></span>}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <button onClick={() => router.push("/upload")} className="flex-1 rounded-full border border-[#E9E7F0] bg-white px-6 py-3 text-sm font-bold">{t("profession.back")}</button>
          <button onClick={cont} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#6C4CF1] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#6C4CF1]/25 hover:bg-[#5a3fe0]">{t("profession.continue")}<Arrow className="h-4 w-4 flip-rtl" /></button>
        </div>
      </div>
    </main>
  );
}
