"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Eye, Smartphone, Monitor, Search } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { useToast } from "@/components/Toast";
import { StepNav } from "@/components/StepNav";
import { TEMPLATES } from "@/lib/templates-registry";
import { demoPortfolio } from "@/lib/demo-data";
import { TemplateRenderer } from "@/components/TemplateRenderer";
import { loadProject, saveProject } from "@/lib/storage";
import { cn } from "@/lib/utils";

type Cat = "all" | "developer" | "designer" | "marketing" | "business";

function GalleryInner() {
  const { t, locale } = useI18n();
  const { push } = useToast();
  const router = useRouter();
  const params = useSearchParams();
  const [cat, setCat] = useState<Cat>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("modern-business");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [mobilePeek, setMobilePeek] = useState(false);
  const demo = useMemo(() => demoPortfolio(locale === "ar" ? "ar" : "en"), [locale]);

  useEffect(() => {
    (async () => {
      const p = await loadProject();
      if (p?.templateId) setSelected(p.templateId);
      const q = params.get("select");
      if (q && TEMPLATES.some((x) => x.id === q)) {
        setSelected(q);
        setPreviewId(q);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => (cat === "all" ? TEMPLATES : TEMPLATES.filter((x) => x.category === cat)).filter((x) =>
    `${x.nameEn} ${x.nameAr} ${x.descriptionEn} ${x.category}`.toLowerCase().includes(query.toLowerCase())
  ), [cat, query]);

  async function selectTemplate(id: string) {
    setSelected(id);
    try { window.localStorage.setItem("portify-template", id); } catch {}
    const existing = await loadProject();
    if (existing) {
      await saveProject({ ...existing, templateId: id });
    }
    push(locale === "ar" ? "تم اختيار القالب" : "Template selected", "success");
    router.push("/editor");
  }

  const cats: { id: Cat; label: string }[] = [
    { id: "all", label: t("templates.filterAll") },
    { id: "developer", label: t("templates.filterDeveloper") },
    { id: "designer", label: t("templates.filterDesigner") },
    { id: "marketing", label: t("templates.filterMarketing") },
    { id: "business", label: t("templates.filterBusiness") },
  ];

  const previewMeta = TEMPLATES.find((x) => x.id === previewId);

  return (
    <main className="pb-20">
      <StepNav current="templates" />
      <div className="mx-auto mt-8 max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("templates.title")}</h1><p className="mt-2 max-w-xl text-[#73738A]">{t("templates.subtitle")}</p></div>
          <button onClick={() => router.push("/editor")} className="rounded-full bg-[#171625] px-6 py-2.5 text-sm font-bold text-white">{t("common.next")} →</button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex max-w-sm items-center gap-2 rounded-2xl border border-[#E9E7F0] bg-white px-4 py-2.5 text-[#73738A] focus-within:border-[#6C4CF1]">
            <Search className="h-4 w-4" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search templates" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#73738A]" />
          </label>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {cats.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={cn("whitespace-nowrap rounded-full border px-5 py-2 text-sm font-bold transition", cat === c.id ? "border-[#171625] bg-[#171625] text-white" : "border-[#E9E7F0] bg-white hover:border-[#6C4CF1]")}>{c.label}</button>
          ))}
        </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => {
            const active = selected === m.id;
            return (
              <div key={m.id} className={cn("group overflow-hidden rounded-[24px] border-2 bg-white transition", active ? "border-[#6C4CF1] shadow-xl shadow-[#6C4CF1]/15" : "border-[#E9E7F0] hover:border-[#6C4CF1]/40 hover:shadow-xl")}>
                <div className="relative h-64 cursor-pointer overflow-hidden bg-slate-100" onClick={() => setPreviewId(m.id)}>
                  <div className="pointer-events-none origin-top scale-[0.42]" style={{ width: "238%", height: 600 }}>
                    <TemplateRenderer templateId={m.id} data={demo} lang={locale} />
                  </div>
                  <span className="absolute end-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">{m.category}</span>
                  {active && <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#6C4CF1] px-3 py-1 text-[11px] font-bold text-white"><Check className="h-3 w-3" />{t("templates.best")}</span>}
                  <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold"><Eye className="h-3.5 w-3.5" />{t("templates.preview")}</span>
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold">{locale === "ar" ? m.nameAr : m.nameEn}</h3>
                    <span className="h-5 w-5 rounded-full ring-1 ring-black/10" style={{ background: m.accent }} />
                  </div>
                  <p className="mt-1 line-clamp-2 min-h-10 text-[13px] leading-5 text-[#73738A]">{locale === "ar" ? m.descriptionAr : m.descriptionEn}</p>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setPreviewId(m.id)} className="flex-1 rounded-full border border-[#E9E7F0] px-4 py-2 text-xs font-bold hover:border-[#6C4CF1] hover:text-[#6C4CF1]">{t("templates.preview")}</button>
                    <button onClick={() => selectTemplate(m.id)} className={cn("flex-1 rounded-full px-4 py-2 text-xs font-bold text-white", active ? "bg-[#171625]" : "bg-[#6C4CF1] hover:bg-[#5a3fe0]")}>{t("templates.use")}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && <p className="mt-12 text-center text-sm text-[#73738A]">No templates match that search.</p>}
      </div>

      {previewMeta && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-[#171625]/70 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
            <p className="font-extrabold">{locale === "ar" ? previewMeta.nameAr : previewMeta.nameEn}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setMobilePeek(!mobilePeek)} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold">{mobilePeek ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}{mobilePeek ? t("preview.desktop") : t("preview.mobile")}</button>
              <button onClick={() => selectTemplate(previewMeta.id)} className="rounded-full bg-[#6C4CF1] px-5 py-1.5 text-xs font-bold">{t("templates.use")}</button>
              <button onClick={() => setPreviewId(null)} className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold">{t("common.close")}</button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className={cn("mx-auto overflow-hidden rounded-3xl bg-white shadow-2xl transition-all", mobilePeek ? "max-w-[390px]" : "max-w-5xl")}>
              <TemplateRenderer templateId={previewMeta.id} data={demo} lang={locale} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<main className="p-10 text-center text-sm">Loading…</main>}>
      <GalleryInner />
    </Suspense>
  );
}
