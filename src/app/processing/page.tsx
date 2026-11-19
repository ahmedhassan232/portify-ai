"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { useToast } from "@/components/Toast";
import { StepNav } from "@/components/StepNav";
import { cvTextToDemoData } from "@/lib/demo-data";
import { emptyPortfolio, uid, type PortfolioData } from "@/types/portfolio";
import { defaultDesign, saveProject } from "@/lib/storage";
import { cn } from "@/lib/utils";

export default function ProcessingPage() {
  const { t, isRTL } = useI18n();
  const { push } = useToast();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [busy, setBusy] = useState(true);
  const ran = useRef(false);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const steps = [t("processing.step1"), t("processing.step2"), t("processing.step3"), t("processing.step4")];

  const buildLocal = useCallback((cvText: string, lang: "en" | "ar"): PortfolioData => {
    if (cvText && cvText.length > 60) return withIds(cvTextToDemoData(cvText, lang));
    return withIds(cvTextToDemoData("", lang));
  }, []);

  function withIds(d: PortfolioData): PortfolioData {
    return {
      ...d,
      experience: d.experience.map((e) => ({ ...e, id: e.id || uid("exp") })),
      projects: d.projects.map((p) => ({ ...p, id: p.id || uid("prj") })),
      education: d.education.map((e) => ({ ...e, id: e.id || uid("edu") })),
      certifications: d.certifications.map((c) => ({ ...c, id: typeof c === "string" ? uid("cert") : c.id || uid("cert"), name: typeof c === "string" ? c : c.name, issuer: typeof c === "string" ? "" : c.issuer || "", date: typeof c === "string" ? "" : c.date || "", url: "" })),
    };
  }

  const run = useCallback(async () => {
    setBusy(true);
    setError(null);
    setDemoMode(false);
    setStep(0);
    // The AI endpoint returns one completed response, not streamed milestones. Keep
    // the UI honest: the first state is active until the response actually arrives.

    try {
      const cvText = window.localStorage.getItem("portify-cv-text") || "";
      const profession = window.localStorage.getItem("portify-profession") || "software-developer";
      const pl = window.localStorage.getItem("portify-portfolio-lang");
      const portfolioLanguage: "en" | "ar" = pl === "ar" ? "ar" : "en";

      if (!cvText) {
        // no CV — use demo but let user continue
        const data = withIds(cvTextToDemoData("", portfolioLanguage));
        await saveProject({ cvText: "", cvFileName: "", profession, portfolioLanguage, templateId: window.localStorage.getItem("portify-template") || "modern-business", data, design: defaultDesign(), updatedAt: Date.now() });
        setDemoMode(true);
        setBusy(false);
        setStep(3);
        return;
      }

      const ctrl = new AbortController();
      const to = window.setTimeout(() => ctrl.abort(), 75000);
      const res = await fetch("/api/analyze-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText: cvText.slice(0, 30000), profession, portfolioLanguage }),
        signal: ctrl.signal,
      });
      window.clearTimeout(to);
      const j = await res.json().catch(() => ({}));

      if (res.status === 503 || j.error === "AI_NOT_CONFIGURED") {
        const data = buildLocal(cvText, portfolioLanguage);
        await saveProject({ cvText, cvFileName: window.localStorage.getItem("portify-cv-name") || "cv.pdf", profession, suggestedProfession: j.suggestedProfession, portfolioLanguage, templateId: window.localStorage.getItem("portify-template") || "modern-business", data, design: defaultDesign(), updatedAt: Date.now() });
        try { window.localStorage.setItem("portify-ai-demo", "1"); } catch {}
        setDemoMode(true);
        setBusy(false);
        setStep(3);
        return;
      }
      if (!res.ok) throw new Error(j.error || "AI failed");

      const a = j.data;
      const data: PortfolioData = {
        ...emptyPortfolio(),
        personalInfo: { ...emptyPortfolio().personalInfo, ...(a.personalInfo || {}) },
        professionalSummary: a.professionalSummary || "",
        skills: { technical: a.skills?.technical || [], soft: a.skills?.soft || [], tools: a.skills?.tools || [] },
        experience: (a.experience || []).map((e: Record<string, unknown>) => ({ id: uid("exp"), position: String(e.position || ""), company: String(e.company || ""), location: String(e.location || ""), startDate: String(e.startDate || ""), endDate: String(e.endDate || ""), description: (e.description as string[]) || [], achievements: (e.achievements as string[]) || [] })),
        projects: (a.projects || []).map((p: Record<string, unknown>) => ({ id: uid("prj"), name: String(p.name || ""), description: String(p.description || ""), technologies: (p.technologies as string[]) || [], projectUrl: String(p.projectUrl || ""), githubUrl: String(p.githubUrl || ""), image: "" })),
        education: (a.education || []).map((e: Record<string, unknown>) => ({ id: uid("edu"), degree: String(e.degree || ""), institution: String(e.institution || ""), startDate: String(e.startDate || ""), endDate: String(e.endDate || ""), description: String(e.description || "") })),
        certifications: (a.certifications || []).map((c: unknown) => (typeof c === "string" ? { id: uid("cert"), name: c, issuer: "", date: "", url: "" } : { id: uid("cert"), name: String((c as Record<string, unknown>).name || ""), issuer: String((c as Record<string, unknown>).issuer || ""), date: String((c as Record<string, unknown>).date || ""), url: String((c as Record<string, unknown>).url || "") })),
        languages: a.languages || [],
        socialLinks: (a.socialLinks || []).map((s: Record<string, unknown>) => ({ id: uid("s"), label: String(s.label || "Link"), url: String(s.url || "") })),
        additionalInformation: a.additionalInformation || [],
      };
      if (a.suggestedProfession) try { window.localStorage.setItem("portify-suggested-profession", String(a.suggestedProfession)); } catch {}
      try { window.localStorage.removeItem("portify-ai-demo"); } catch {}
      await saveProject({ cvText, cvFileName: window.localStorage.getItem("portify-cv-name") || "cv.pdf", profession, suggestedProfession: a.suggestedProfession, portfolioLanguage, templateId: window.localStorage.getItem("portify-template") || "modern-business", data, design: defaultDesign(), updatedAt: Date.now() });
      setStep(3);
      setBusy(false);
      push("Portfolio generated", "success");
      window.setTimeout(() => router.push("/templates"), 900);
    } catch (e) {
      setBusy(false);
      setError(e instanceof Error ? e.message : "Failed");
    }
  }, [buildLocal, push, router]);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    run();
  }, [run]);

  return (
    <main className="pb-20">
      <StepNav current="processing" />
      <div className="mx-auto mt-8 max-w-xl px-4 text-center">
        <div className="relative mx-auto grid h-32 w-32 place-items-center">
          <span className="absolute inset-0 rounded-full border border-cyan-300/30 animate-[spin_8s_linear_infinite]" />
          <span className="absolute inset-3 rounded-full border-2 border-violet-400/40 border-t-cyan-300 animate-[spin_3s_linear_infinite_reverse]" />
          <span className="grid h-16 w-16 place-items-center rounded-3xl bg-[#6C4CF1] text-white shadow-xl shadow-[#6C4CF1]/30">
          {busy ? <Loader2 className="h-8 w-8 animate-spin" /> : <Sparkles className="h-8 w-8" />}
        </span>
        </div>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight">{t("processing.title")}</h1>
        <p className="mt-2 text-[#73738A]">{t("processing.subtitle")}</p>

        <div className="mt-8 space-y-3 rounded-[28px] border border-[#E9E7F0] bg-white p-6 text-start">
          {steps.map((s, i) => (
            <div key={s} className={cn("flex items-center gap-3 rounded-2xl p-3", (!busy && !error) ? "bg-[#F5F2FF]" : i === 0 ? "bg-[#F5F2FF]" : "opacity-50")}>
              {!busy && !error ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : i === 0 && busy ? <Loader2 className="h-5 w-5 animate-spin text-[#6C4CF1]" /> : <span className="grid h-5 w-5 place-items-center rounded-full border border-[#E9E7F0] text-[10px] font-bold">{i + 1}</span>}
              <span className="text-sm font-semibold">{s}</span>
            </div>
          ))}
        </div>

        {demoMode && (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-start text-sm leading-7 text-amber-900">
            <p className="flex items-center gap-2 font-bold"><AlertTriangle className="h-4 w-4" />Preview mode</p>
            <p className="mt-1">{t("processing.demoNote")}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-start text-sm text-rose-900">
            <p className="font-bold">{t("processing.failed")}</p>
            <p className="mt-1 break-words">{error}</p>
            <button onClick={run} className="mt-3 rounded-full bg-rose-600 px-5 py-2 text-xs font-bold text-white">{t("processing.retry")}</button>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {(!busy) && <button onClick={() => router.push("/templates")} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#6C4CF1] px-6 py-3 text-sm font-bold text-white shadow-lg">{demoMode ? t("processing.useDemo") : t("processing.continue")}<Arrow className="h-4 w-4 flip-rtl" /></button>}
          {busy && <p className="mx-auto text-xs text-[#73738A]">…</p>}
        </div>
      </div>
    </main>
  );
}
