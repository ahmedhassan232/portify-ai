"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, UploadCloud, X, Loader2, ShieldCheck, ArrowRight, ArrowLeft, FileCheck } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { useToast } from "@/components/Toast";
import { StepNav } from "@/components/StepNav";
import { cn } from "@/lib/utils";

const MAX = 10 * 1024 * 1024;

export default function UploadPage() {
  const { t, isRTL } = useI18n();
  const { push } = useToast();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [chars, setChars] = useState(0);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  function validate(f: File): string | null {
    const okType = /\.pdf$/i.test(f.name) || /\.docx$/i.test(f.name) || f.type === "application/pdf" || f.type.includes("wordprocessingml");
    if (!okType) return t("upload.error.type");
    if (f.size > MAX) return t("upload.error.size");
    if (f.size === 0) return t("upload.error.empty");
    return null;
  }

  async function handleFile(f: File) {
    const err = validate(f);
    if (err) {
      push(err, "error");
      return;
    }
    setFile(f);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/parse-cv", { method: "POST", body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || t("upload.error.corrupt"));
      const text: string = j.text || "";
      setChars(text.length);
      try {
        window.localStorage.setItem("portify-cv-text", text);
        window.localStorage.setItem("portify-cv-name", f.name);
      } catch {}
      push(`${t("upload.extracted")} • ${(text.length).toLocaleString()} ${t("upload.chars")}`, "success");
    } catch (e) {
      push(e instanceof Error ? e.message : t("upload.error.corrupt"), "error");
      setFile(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="pb-20">
      <StepNav current="upload" />
      <div className="mx-auto mt-8 max-w-2xl px-4">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("upload.title")}</h1>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-7 text-[#73738A]">{t("upload.subtitle")}</p>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
          onClick={() => !file && inputRef.current?.click()}
          className={cn("mt-8 cursor-pointer rounded-[28px] border-2 border-dashed bg-white p-10 text-center transition", drag ? "border-[#6C4CF1] bg-[#F5F2FF]" : "border-[#E9E7F0] hover:border-[#6C4CF1]/50")}
        >
          <input ref={inputRef} type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
          {!file ? (
            <>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#F1EFFD] text-[#6C4CF1]"><UploadCloud className="h-8 w-8" /></span>
              <p className="mt-4 text-lg font-extrabold">{t("upload.drop")}</p>
              <p className="mt-1 text-sm text-[#73738A]">{t("upload.or")}</p>
              <span className="mt-4 inline-block rounded-full bg-[#171625] px-7 py-2.5 text-sm font-bold text-white">{t("upload.browse")}</span>
              <p className="mt-4 font-mono text-xs text-[#73738A]">{t("upload.formats")}</p>
            </>
          ) : (
            <div className="text-start" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 rounded-2xl border border-[#E9E7F0] bg-[#FAFAFC] p-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#6C4CF1]/10 text-[#6C4CF1]"><FileText className="h-6 w-6" /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold" dir="auto">{file.name}</p>
                  <p className="font-mono text-xs text-[#73738A]" dir="ltr">{(file.size / 1024).toFixed(1)} KB {chars > 0 && `• ${chars.toLocaleString()} chars`}</p>
                  {busy && <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#6C4CF1]"><Loader2 className="h-3.5 w-3.5 animate-spin" />{t("upload.parsing")}</p>}
                  {!busy && chars > 0 && <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-600"><FileCheck className="h-3.5 w-3.5" />{t("upload.extracted")}</p>}
                </div>
                <button onClick={() => { setFile(null); setChars(0); try { window.localStorage.removeItem("portify-cv-text"); } catch {} }} className="rounded-full border border-[#E9E7F0] bg-white p-2 text-xs hover:border-rose-300 hover:text-rose-600" aria-label={t("upload.remove")}><X className="h-4 w-4" /></button>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button onClick={() => inputRef.current?.click()} className="flex-1 rounded-full border border-[#E9E7F0] bg-white px-5 py-2.5 text-sm font-bold hover:border-[#6C4CF1]">{t("upload.another")}</button>
                <button disabled={busy || chars === 0} onClick={() => router.push("/profession")} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#6C4CF1] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#6C4CF1]/25 transition enabled:hover:bg-[#5a3fe0] disabled:opacity-40">{t("upload.continue")}<Arrow className="h-4 w-4 flip-rtl" /></button>
              </div>
            </div>
          )}
        </div>

        <p className="mx-auto mt-5 flex max-w-lg items-start gap-2 rounded-2xl border border-[#E9E7F0] bg-white p-4 text-xs leading-6 text-[#73738A]">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{t("upload.privacy")}
        </p>
        <p className="mt-3 text-center text-xs text-[#73738A]">{t("upload.change")}</p>
      </div>
    </main>
  );
}
