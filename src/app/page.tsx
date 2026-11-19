"use client";

import Link from "next/link";
import { Sparkles, Upload, Palette, Wand2, FileText, ArrowRight, ArrowLeft, ShieldCheck, Zap, Eye, Download, Layers, Globe2, Check } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { TEMPLATES } from "@/lib/templates-registry";
import { demoPortfolio } from "@/lib/demo-data";
import { TemplateRenderer } from "@/components/TemplateRenderer";

export default function LandingPage() {
  const { t, locale, isRTL } = useI18n();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const demoEn = demoPortfolio(locale === "ar" ? "ar" : "en");

  const features = [
    { icon: Sparkles, title: t("features.ai.title"), desc: t("features.ai.desc") },
    { icon: Layers, title: t("features.templates.title"), desc: t("features.templates.desc") },
    { icon: Wand2, title: t("features.editor.title"), desc: t("features.editor.desc") },
    { icon: Eye, title: t("features.preview.title"), desc: t("features.preview.desc") },
    { icon: Download, title: t("features.export.title"), desc: t("features.export.desc") },
    { icon: ShieldCheck, title: t("features.privacy.title"), desc: t("features.privacy.desc") },
  ];

  const steps = [
    { icon: Upload, n: "01", title: t("how.1.title"), desc: t("how.1.desc") },
    { icon: Palette, n: "02", title: t("how.2.title"), desc: t("how.2.desc") },
    { icon: Wand2, n: "03", title: t("how.3.title"), desc: t("how.3.desc") },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-32 start-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-[#6C4CF1]/15 blur-3xl rtl:translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 md:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9E7F0] bg-white px-4 py-1.5 text-xs font-semibold text-[#4b4a63] shadow-sm">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#6C4CF1] text-white"><Zap className="h-3 w-3" /></span>
              {t("hero.badge")}
            </div>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#171625] md:text-6xl animate-fade-up">{t("hero.title")}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#73738A]">{t("hero.subtitle")}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/upload" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6C4CF1] px-8 py-3.5 text-[15px] font-bold text-white shadow-xl shadow-[#6C4CF1]/30 transition hover:bg-[#5a3fe0] sm:w-auto">
                {t("hero.cta1")}<Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 flip-rtl" />
              </Link>
              <Link href="/templates" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E9E7F0] bg-white px-8 py-3.5 text-[15px] font-bold text-[#171625] transition hover:border-[#6C4CF1] hover:text-[#6C4CF1] sm:w-auto">
                {t("hero.cta2")}
              </Link>
            </div>
            <p className="mt-4 text-xs font-medium text-[#73738A]">{t("hero.note")}</p>
          </div>

          {/* Visual: CV -> Portfolio */}
          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="grid items-stretch gap-4 md:grid-cols-[280px_64px_1fr]">
              <div className="card-shadow-lg animate-float rounded-3xl border border-[#E9E7F0] bg-white p-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FileText className="h-4 w-4 text-rose-500" />
                  <span className="truncate text-xs font-bold" dir="auto">{t("hero.cvLabel")}</span>
                  <span className="ms-auto rounded bg-rose-50 px-2 py-0.5 font-mono text-[10px] text-rose-600" dir="ltr">PDF</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-2.5 w-2/3 rounded bg-slate-900" />
                  <div className="h-2 w-1/2 rounded bg-[#6C4CF1]" />
                  {[90, 100, 75, 95, 60].map((w, i) => <div key={i} className="h-1.5 rounded bg-slate-100" style={{ width: `${w}%` }} />)}
                  <div className="flex gap-1.5 pt-1">{["React", "TS", "Node"].map((s) => <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px]">{s}</span>)}</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-1.5 rounded-full bg-[#171625] px-4 py-2 text-xs font-bold text-white shadow-xl">
                  <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" />{t("hero.transform")}
                </div>
              </div>
              <div className="card-shadow-lg overflow-hidden rounded-3xl border border-[#E9E7F0] bg-white">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-[#FAFAFC] px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ms-3 rounded-full bg-white px-3 py-0.5 font-mono text-[10px] text-slate-500" dir="ltr">saraahmed.dev</span>
                  <span className="ms-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{t("hero.portfolioLabel")}</span>
                </div>
                <div className="max-h-[340px] overflow-hidden">
                  <div className="pointer-events-none scale-[0.62] origin-top" style={{ width: "161%", height: 548 }}>
                    <TemplateRenderer templateId="modern-business" data={demoEn} lang={locale} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("how.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#73738A]">{t("how.subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card-shadow group rounded-3xl border border-[#E9E7F0] bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F1EFFD] text-[#6C4CF1] transition group-hover:bg-[#6C4CF1] group-hover:text-white"><s.icon className="h-6 w-6" /></span>
                <span className="font-mono text-sm font-bold text-[#E9E7F0]">{s.n}</span>
              </div>
              <h3 className="mt-5 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#73738A]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-y border-[#E9E7F0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("features.title")}</h2>
            <p className="mt-3 text-[#73738A]">{t("features.subtitle")}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-3xl border border-[#E9E7F0] bg-[#FAFAFC] p-6 transition hover:border-[#6C4CF1]/40 hover:bg-white">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#6C4CF1] shadow-sm ring-1 ring-[#E9E7F0]"><f.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-extrabold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-[#73738A]">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#73738A]">
            <Globe2 className="h-4 w-4 text-[#6C4CF1]" />
            <span dir="ltr">EN + AR • RTL / LTR • UTF-8 export • Local-first</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700"><Check className="h-3 w-3" /> No account</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-3 py-1 text-[#6C4CF1]"><Check className="h-3 w-3" /> ZIP download</span>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section id="templates" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("showcase.title")}</h2><p className="mt-3 text-[#73738A]">{t("showcase.subtitle")}</p></div>
          <Link href="/templates" className="inline-flex items-center gap-2 rounded-full border border-[#E9E7F0] bg-white px-5 py-2.5 text-sm font-bold hover:border-[#6C4CF1] hover:text-[#6C4CF1]">{t("showcase.preview")}<Arrow className="h-4 w-4 flip-rtl" /></Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(["modern-tech", "creative-designer", "executive-portfolio", "minimal-developer"] as const).map((id) => {
            const meta = TEMPLATES.find((x) => x.id === id)!;
            return (
              <article key={id} className="group overflow-hidden rounded-3xl border border-[#E9E7F0] bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <div className="h-56 overflow-hidden bg-slate-100">
                  <div className="pointer-events-none origin-top scale-[0.38]" style={{ width: "263%", height: 500 }}>
                    <TemplateRenderer templateId={id} data={demoEn} lang={locale} />
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-extrabold">{locale === "ar" ? meta.nameAr : meta.nameEn}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#73738A]">{locale === "ar" ? meta.descriptionAr : meta.descriptionEn}</p>
                  <Link href={`/templates?select=${id}`} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#6C4CF1] hover:text-cyan-300">{t("showcase.select")}<Arrow className="h-3.5 w-3.5 flip-rtl" /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-[#171625] px-6 py-14 text-center text-white md:py-20">
          <div className="pointer-events-none absolute -top-24 start-1/4 h-72 w-72 rounded-full bg-[#6C4CF1]/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 end-1/4 h-72 w-72 rounded-full bg-[#A78BFA]/20 blur-3xl" />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl">{t("cta.title")}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/60">{t("cta.subtitle")}</p>
          <Link href="/upload" className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[#6C4CF1] px-10 py-4 text-base font-bold shadow-2xl shadow-[#6C4CF1]/40 transition hover:bg-white hover:text-[#171625]">
            {t("cta.button")}<Arrow className="h-5 w-5 flip-rtl" />
          </Link>
        </div>
      </section>
    </main>
  );
}
