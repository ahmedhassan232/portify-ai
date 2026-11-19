"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Monitor, Tablet, Smartphone, ArrowLeft, Download, PenLine } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { TemplateRenderer } from "@/components/TemplateRenderer";
import { loadProject, type StoredProject } from "@/lib/storage";
import { demoPortfolio } from "@/lib/demo-data";
import { defaultDesign } from "@/lib/storage";
import { cn } from "@/lib/utils";

type Mode = "desktop" | "tablet" | "mobile";

export default function PreviewPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [project, setProject] = useState<StoredProject | null>(null);
  const [mode, setMode] = useState<Mode>("desktop");

  useEffect(() => {
    (async () => {
      const p = await loadProject();
      if (!p) {
        setProject({ cvText: "", cvFileName: "", profession: "software-developer", portfolioLanguage: "en", templateId: "modern-business", data: demoPortfolio("en"), design: defaultDesign(), updatedAt: Date.now() });
      } else setProject(p);
    })();
  }, []);

  if (!project) return <main className="grid min-h-[60vh] place-items-center text-sm text-[#73738A]">{t("common.loading")}</main>;

  const widths: Record<Mode, string> = { desktop: "max-w-6xl", tablet: "max-w-[820px]", mobile: "max-w-[400px]" };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#ECEAF3] pb-16">
      <div className="sticky top-16 z-30 border-b border-[#E9E7F0] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
          <button onClick={() => router.push("/editor")} className="inline-flex items-center gap-1.5 rounded-full border border-[#E9E7F0] px-4 py-2 text-xs font-bold hover:border-[#6C4CF1]"><ArrowLeft className="h-3.5 w-3.5 flip-rtl" />{t("preview.back")}</button>
          <div className="mx-auto flex items-center gap-1 rounded-full bg-slate-100 p-1">
            {([["desktop", Monitor, t("preview.desktop")], ["tablet", Tablet, t("preview.tablet")], ["mobile", Smartphone, t("preview.mobile")]] as const).map(([m, Icon, label]) => (
              <button key={m} onClick={() => setMode(m)} className={cn("inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition", mode === m ? "bg-white shadow" : "text-[#73738A]")}><Icon className="h-3.5 w-3.5" />{label}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => router.push("/editor")} className="hidden items-center gap-1.5 rounded-full border border-[#E9E7F0] px-4 py-2 text-xs font-bold sm:inline-flex"><PenLine className="h-3.5 w-3.5" />Edit</button>
            <button onClick={() => router.push("/export")} className="inline-flex items-center gap-1.5 rounded-full bg-[#6C4CF1] px-5 py-2 text-xs font-bold text-white shadow-lg"><Download className="h-3.5 w-3.5" />{t("preview.export")}</button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 px-4 transition-all">
        <div className={cn("mx-auto overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-black/10 transition-all duration-300", widths[mode])}>
          <TemplateRenderer templateId={project.templateId} data={project.data} lang={project.portfolioLanguage} design={project.design} />
        </div>
        <p className="mt-4 text-center font-mono text-xs text-[#73738A]" dir="ltr">{mode} • {project.templateId} • {project.portfolioLanguage.toUpperCase()} • responsive live render</p>
      </div>
    </main>
  );
}
