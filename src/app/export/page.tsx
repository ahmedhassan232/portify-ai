"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Eye, RotateCcw, CheckCircle2, Loader2, FileArchive, FileCode2, PackageCheck } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { useToast } from "@/components/Toast";
import { StepNav } from "@/components/StepNav";
import { loadProject, clearProject, type StoredProject } from "@/lib/storage";
import { buildStandaloneHTML, buildStylesheet, buildScriptJs, buildReadme } from "@/lib/export-html";
import { downloadBlob } from "@/lib/utils";

export default function ExportPage() {
  const { t } = useI18n();
  const { push } = useToast();
  const router = useRouter();
  const [project, setProject] = useState<StoredProject | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await loadProject();
      setProject(p);
    })();
  }, []);

  async function dataUrlToBytes(dataUrl: string): Promise<Uint8Array | null> {
    try {
      if (!dataUrl.startsWith("data:")) return null;
      const res = await fetch(dataUrl);
      const buf = await res.arrayBuffer();
      return new Uint8Array(buf);
    } catch {
      return null;
    }
  }

  async function doZip() {
    if (!project) return;
    setBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const html = buildStandaloneHTML(project.data, project.design, project.templateId, project.portfolioLanguage);
      const css = buildStylesheet(project.design, project.templateId, project.portfolioLanguage);
      const js = buildScriptJs();
      // inline profile image handling: if dataURL, extract to assets and rewrite reference
      let finalHtml = html;
      const folder = zip.folder("portfolio");
      if (!folder) throw new Error("zip failed");
      folder.file("index.html", finalHtml);
      folder.file("styles.css", css);
      folder.file("script.js", js);
      folder.file("README.md", buildReadme(project.data.personalInfo.fullName || "My Portfolio"));
      const assets = folder.folder("assets");
      if (project.data.personalInfo.profileImage?.startsWith("data:image")) {
        const bytes = await dataUrlToBytes(project.data.personalInfo.profileImage);
        if (bytes && assets) {
          const ext = project.data.personalInfo.profileImage.includes("data:image/png") ? "png" : "jpg";
          assets.file(`profile-image.${ext}`, bytes);
        }
      }
      const blob = await folder.generateAsync({ type: "blob" });
      downloadBlob(blob, `${(project.data.personalInfo.fullName || "portfolio").toLowerCase().replace(/\s+/g, "-")}-portfolio.zip`);
      setDone(true);
      push(t("export.success"), "success");
    } catch (e) {
      push(e instanceof Error ? e.message : "Export failed", "error");
    } finally {
      setBusy(false);
    }
  }

  function doHtml() {
    if (!project) return;
    const html = buildStandaloneHTML(project.data, project.design, project.templateId, project.portfolioLanguage)
      .replace('<link rel="stylesheet" href="styles.css"/>', `<style>${buildStylesheet(project.design, project.templateId, project.portfolioLanguage)}</style>`)
      .replace('<script src="script.js"></script>', `<script>${buildScriptJs()}</script>`);
    downloadBlob(new Blob([html], { type: "text/html;charset=utf-8" }), "portfolio.html");
    push(t("export.success"), "success");
  }

  return (
    <main className="pb-20">
      <StepNav current="export" />
      <div className="mx-auto mt-8 max-w-3xl px-4 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/30">
          {done ? <CheckCircle2 className="h-8 w-8" /> : <PackageCheck className="h-8 w-8" />}
        </span>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">{t("export.title")}</h1>
        <p className="mx-auto mt-2 max-w-lg text-[#73738A]">{t("export.subtitle")}</p>

        {!project ? (
          <div className="mt-8 rounded-3xl border border-[#E9E7F0] bg-white p-8">
            <p className="text-sm text-[#73738A]">No portfolio found locally. Start by uploading your CV.</p>
            <button onClick={() => router.push("/upload")} className="mt-4 rounded-full bg-[#6C4CF1] px-8 py-3 text-sm font-bold text-white">Start</button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <button onClick={doZip} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-3xl bg-[#6C4CF1] p-5 text-sm font-bold text-white shadow-xl shadow-[#6C4CF1]/25 transition hover:bg-[#5a3fe0] disabled:opacity-60">
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileArchive className="h-5 w-5" />}{t("export.downloadZip")}
              </button>
              <button onClick={doHtml} className="inline-flex items-center justify-center gap-2 rounded-3xl border-2 border-[#E9E7F0] bg-white p-5 text-sm font-bold transition hover:border-[#6C4CF1]">
                <FileCode2 className="h-5 w-5 text-[#6C4CF1]" />{t("export.downloadHtml")}
              </button>
              <button onClick={() => router.push("/preview")} className="inline-flex items-center justify-center gap-2 rounded-3xl border-2 border-[#E9E7F0] bg-white p-5 text-sm font-bold transition hover:border-[#6C4CF1]">
                <Eye className="h-5 w-5 text-[#6C4CF1]" />{t("export.preview")}
              </button>
            </div>

            <div className="mt-6 rounded-[28px] border border-[#E9E7F0] bg-white p-6 text-start">
              <p className="flex items-center gap-2 font-extrabold"><Download className="h-4 w-4 text-[#6C4CF1]" />{t("export.includes")}</p>
              <p className="mt-1 text-sm text-[#73738A]">{t("export.includesDesc")}</p>
              <div className="mt-4 grid gap-2 font-mono text-xs" dir="ltr">
                {["portfolio/index.html", "portfolio/styles.css", "portfolio/script.js", "portfolio/assets/", "portfolio/README.md"].map((f) => (
                  <div key={f} className="flex items-center gap-2 rounded-xl bg-[#FAFAFC] px-3 py-2"><span className="h-2 w-2 rounded-full bg-emerald-500" />{f}</div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="rounded-full bg-[#F1EFFD] px-3 py-1 text-[#6C4CF1]" dir="ltr">lang={project.portfolioLanguage} dir={project.portfolioLanguage === "ar" ? "rtl" : "ltr"}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1" dir="ltr">{project.templateId}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1" dir="ltr">UTF-8</span>
              </div>
            </div>

            <button onClick={async () => { await clearProject(); router.push("/"); }} className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E9E7F0] bg-white px-6 py-2.5 text-sm font-bold text-[#73738A] hover:text-rose-600"><RotateCcw className="h-4 w-4" />{t("export.again")}</button>
          </>
        )}
      </div>
    </main>
  );
}
