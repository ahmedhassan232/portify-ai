"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Undo2, Redo2, Eye, Download, RotateCcw, Plus, Trash2, ChevronUp, ChevronDown, EyeOff, Eye as EyeIcon, Upload, Check, Menu } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { useToast } from "@/components/Toast";
import { TemplateRenderer } from "@/components/TemplateRenderer";
import { clearProject, defaultDesign, exportJson, loadProject, parseImportedJson, saveProject, type StoredProject } from "@/lib/storage";
import { demoPortfolio } from "@/lib/demo-data";
import { uid, type DesignSettings, type PortfolioData } from "@/types/portfolio";
import { orderedSections } from "@/templates/shared";
import { fileToBase64, downloadBlob, cn } from "@/lib/utils";

type Tab = "content" | "design";

const ACCENTS = ["#6C4CF1", "#171625", "#2563EB", "#059669", "#E85D3D", "#C2410C", "#92400E", "#0F2A5C", "#7C3AED", "#BE123C"];

export default function EditorPage() {
  const { t, locale } = useI18n();
  const { push } = useToast();
  const router = useRouter();
  const [project, setProject] = useState<StoredProject | null>(null);
  const [tab, setTab] = useState<Tab>("content");
  const [section, setSection] = useState("personal");
  const [past, setPast] = useState<StoredProject[]>([]);
  const [future, setFuture] = useState<StoredProject[]>([]);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const filePic = useRef<HTMLInputElement>(null);
  const fileJson = useRef<HTMLInputElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      const p = await loadProject();
      if (!p) {
        const lang = (window.localStorage.getItem("portify-portfolio-lang") === "ar" ? "ar" : "en") as "en" | "ar";
        const data = demoPortfolio(lang);
        const fresh: StoredProject = { cvText: "", cvFileName: "", profession: window.localStorage.getItem("portify-profession") || "software-developer", portfolioLanguage: lang, templateId: window.localStorage.getItem("portify-template") || "modern-business", data, design: defaultDesign(), updatedAt: Date.now() };
        setProject(fresh);
      } else setProject(p);
    })();
  }, []);

  const data: PortfolioData | null = project?.data ?? null;
  const outLang: "en" | "ar" = project?.portfolioLanguage || (locale as "en" | "ar") || "en";

  const commit = useCallback((next: StoredProject, record = true) => {
    setProject((cur) => {
      if (cur && record) {
        setPast((p) => [...p.slice(-49), cur]);
        setFuture([]);
      }
      return next;
    });
    setSaving(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await saveProject(next);
      setSavedAt(Date.now());
      setSaving(false);
    }, 600);
  }, []);

  const upd = useCallback((fn: (d: PortfolioData) => PortfolioData, d?: Partial<StoredProject>) => {
    if (!project) return;
    commit({ ...project, ...d, data: fn(project.data) });
  }, [project, commit]);

  function undo() {
    if (!past.length || !project) return;
    const prev = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [project, ...f]);
    setProject(prev);
    saveProject(prev);
    setSavedAt(Date.now());
  }
  function redo() {
    if (!future.length || !project) return;
    const [next, ...rest] = future;
    setPast((p) => [...p, project]);
    setFuture(rest);
    setProject(next);
    saveProject(next);
    setSavedAt(Date.now());
  }

  const sections = useMemo(() => [
    { id: "personal", label: t("editor.personal") },
    { id: "summary", label: t("editor.summary") },
    { id: "skills", label: t("editor.skills") },
    { id: "experience", label: t("editor.experience") },
    { id: "projects", label: t("editor.projects") },
    { id: "education", label: t("editor.education") },
    { id: "certifications", label: t("editor.certifications") },
    { id: "languages", label: t("editor.languages") },
    { id: "social", label: t("editor.social") },
    { id: "custom", label: t("editor.custom") },
  ], [t]);

  if (!project || !data) return <main className="grid min-h-[60vh] place-items-center"><p className="animate-pulse text-sm text-[#73738A]">{t("common.loading")}</p></main>;

  const design: DesignSettings = project.design;

  async function onPic(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { push("Please choose an image", "error"); return; }
    const b64 = await fileToBase64(f);
    upd((d) => ({ ...d, personalInfo: { ...d.personalInfo, profileImage: b64 } }));
    push(locale === "ar" ? "تم تحديث الصورة" : "Photo updated", "success");
    e.target.value = "";
  }

  async function onImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await f.text();
    const parsed = parseImportedJson(text);
    if (!parsed) { push("Invalid backup file", "error"); return; }
    commit(parsed);
    push(locale === "ar" ? "تم الاستيراد" : "Imported", "success");
    e.target.value = "";
  }

  function moveSection(key: string, dirn: 1 | -1) {
    upd((d) => {
      const order = [...orderedSections(d)];
      const i = order.indexOf(key);
      const j = i + dirn;
      if (i < 0 || j < 0 || j >= order.length) return d;
      [order[i], order[j]] = [order[j], order[i]];
      return { ...d, sectionOrder: order };
    });
  }

  const inputCls = "w-full rounded-xl border border-[#E9E7F0] bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[#6C4CF1] focus:ring-2 focus:ring-[#6C4CF1]/15";
  const labelCls = "mb-1 block text-xs font-bold uppercase tracking-wider text-[#73738A]";

  return (
    <main className="flex h-[calc(100vh-64px)] flex-col overflow-hidden bg-[#FAFAFC]">
      {/* toolbar */}
      <div className="flex items-center gap-2 border-b border-[#E9E7F0] bg-white px-3 py-2.5 sm:px-5">
        <button className="rounded-xl border border-[#E9E7F0] p-2 lg:hidden" onClick={() => setShowMobilePanel(!showMobilePanel)} aria-label="panel"><Menu className="h-4 w-4" /></button>
        <div className="hidden items-center gap-2 sm:flex">
          <button onClick={undo} disabled={!past.length} className="rounded-xl border border-[#E9E7F0] p-2 transition enabled:hover:border-[#6C4CF1] disabled:opacity-35" title={t("editor.undo")}><Undo2 className="h-4 w-4" /></button>
          <button onClick={redo} disabled={!future.length} className="rounded-xl border border-[#E9E7F0] p-2 transition enabled:hover:border-[#6C4CF1] disabled:opacity-35" title={t("editor.redo")}><Redo2 className="h-4 w-4" /></button>
        </div>
        <p className="ms-2 hidden items-center gap-1.5 text-xs font-medium text-[#73738A] md:flex">
          {saving ? <><span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />{t("editor.saving")}</> : <><Check className="h-3.5 w-3.5 text-emerald-600" />{t("editor.saved")}</>}
        </p>
        <div className="ms-auto flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full bg-slate-100 p-1 sm:flex">
            {(["content", "design"] as Tab[]).map((x) => <button key={x} onClick={() => setTab(x)} className={cn("rounded-full px-4 py-1.5 text-xs font-bold", tab === x ? "bg-white shadow" : "text-[#73738A]")}>{t(x === "content" ? "editor.content" : "editor.design")}</button>)}
          </div>
          <button onClick={() => setConfirmReset(true)} className="rounded-full border border-[#E9E7F0] px-4 py-2 text-xs font-bold text-[#73738A] hover:border-rose-300 hover:text-rose-600"><span className="hidden sm:inline">{t("editor.reset")}</span><RotateCcw className="h-4 w-4 sm:hidden" /></button>
          <button onClick={() => router.push("/preview")} className="inline-flex items-center gap-1.5 rounded-full border border-[#E9E7F0] bg-white px-4 py-2 text-xs font-bold hover:border-[#6C4CF1]"><Eye className="h-4 w-4" />{t("editor.previewBtn")}</button>
          <button onClick={() => router.push("/export")} className="inline-flex items-center gap-1.5 rounded-full bg-[#6C4CF1] px-5 py-2 text-xs font-bold text-white shadow-lg shadow-[#6C4CF1]/25 hover:bg-[#5a3fe0]"><Download className="h-4 w-4" />{t("editor.export")}</button>
        </div>
      </div>

      <div className="grid flex-1 overflow-hidden lg:grid-cols-[320px_1fr_280px]">
        {/* LEFT */}
        <aside className={cn("overflow-y-auto border-e border-[#E9E7F0] bg-white", showMobilePanel ? "fixed inset-x-0 top-[112px] bottom-0 z-40 block" : "hidden lg:block")}>
          <div className="p-4">
            <div className="mb-3 flex items-center gap-1 rounded-full bg-slate-100 p-1 sm:hidden">
              {(["content", "design"] as Tab[]).map((x) => <button key={x} onClick={() => setTab(x)} className={cn("flex-1 rounded-full px-3 py-1.5 text-xs font-bold", tab === x ? "bg-white shadow" : "text-[#73738A]")}>{t(x === "content" ? "editor.content" : "editor.design")}</button>)}
            </div>
            {tab === "content" ? (
              <>
                <div className="grid gap-1">
                  {sections.map((s) => (
                    <button key={s.id} onClick={() => { setSection(s.id); setShowMobilePanel(false); }} className={cn("rounded-xl px-3.5 py-2.5 text-start text-sm font-semibold transition", section === s.id ? "bg-[#171625] text-white" : "hover:bg-slate-100")}>{s.label}</button>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-[#FAFAFC] p-3">
                  <p className="px-1 text-xs font-bold text-[#73738A]">{t("editor.sections")} — visibility & order</p>
                  {orderedSections(data).map((k) => (
                    <div key={k} className="mt-1.5 flex items-center gap-1.5 rounded-xl border border-[#E9E7F0] bg-white px-2.5 py-1.5">
                      <span className="flex-1 truncate text-xs font-bold">{k}</span>
                      <button onClick={() => moveSection(k, -1)} className="p-1 hover:text-[#6C4CF1]" aria-label="up"><ChevronUp className="h-3.5 w-3.5" /></button>
                      <button onClick={() => moveSection(k, 1)} className="p-1 hover:text-[#6C4CF1]" aria-label="down"><ChevronDown className="h-3.5 w-3.5" /></button>
                      <button onClick={() => upd((d) => ({ ...d, sectionVisibility: { ...d.sectionVisibility, [k]: !(d.sectionVisibility[k] !== false) } }))} className="p-1" aria-label="toggle">{data.sectionVisibility[k] !== false ? <EyeIcon className="h-3.5 w-3.5 text-emerald-600" /> : <EyeOff className="h-3.5 w-3.5 text-slate-400" />}</button>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button onClick={() => downloadBlob(new Blob([exportJson(project)], { type: "application/json" }), "portify-backup.json")} className="rounded-xl border border-[#E9E7F0] px-3 py-2 text-xs font-bold hover:border-[#6C4CF1]">{t("editor.exportJson")}</button>
                  <button onClick={() => fileJson.current?.click()} className="rounded-xl border border-[#E9E7F0] px-3 py-2 text-xs font-bold hover:border-[#6C4CF1]">{t("editor.import")}</button>
                  <input ref={fileJson} type="file" accept="application/json" className="hidden" onChange={onImport} />
                </div>
                <button onClick={async () => { await clearProject(); push(locale === "ar" ? "تم مسح المشروع" : "Project cleared", "info"); router.push("/upload"); }} className="mt-2 w-full rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50">Clear local project</button>
              </>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className={labelCls}>Accent</p>
                  <div className="flex flex-wrap gap-2">{ACCENTS.map((c) => <button key={c} onClick={() => upd((d) => d, { design: { ...design, accentColor: c } })} className={cn("h-9 w-9 rounded-full ring-offset-2", design.accentColor === c && "ring-2 ring-[#171625]")} style={{ background: c }} aria-label={c} />)}</div>
                </div>
                <div>
                  <p className={labelCls}>Portfolio language</p>
                  <div className="grid grid-cols-2 gap-2">{(["en", "ar"] as const).map((l) => <button key={l} onClick={() => commit({ ...project, portfolioLanguage: l })} className={cn("rounded-xl border px-3 py-2 text-xs font-bold", outLang === l ? "border-[#6C4CF1] bg-[#F5F2FF]" : "border-[#E9E7F0]")}>{l === "en" ? "English" : "العربية"}</button>)}</div>
                </div>
                <div>
                  <p className={labelCls}>Corners — {design.borderRadius}px</p>
                  <input type="range" min={0} max={28} value={design.borderRadius} onChange={(e) => upd((d) => d, { design: { ...design, borderRadius: Number(e.target.value) } })} className="w-full accent-[#6C4CF1]" />
                </div>
                <div>
                  <p className={labelCls}>Template</p>
                  <button onClick={() => router.push("/templates")} className="w-full rounded-xl border border-[#E9E7F0] px-3 py-2.5 text-start text-sm font-bold hover:border-[#6C4CF1]">{project.templateId} — change →</button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER form (on mobile below) — Actually second column is form? Spec says left sections, center preview, right design. We merge left+form: show editing form in middle on desktop? Simplify: LEFT = nav+form combined above? Let's render FORM as middle column on xl, else inside left. To keep 3-panel: */}
        <div className="hidden overflow-y-auto p-5 lg:block xl:hidden">
          <FormBody section={section} data={data} upd={upd} inputCls={inputCls} labelCls={labelCls} t={t} locale={locale} push={push} filePic={filePic} onPic={onPic} />
        </div>

        {/* CENTER preview */}
        <div className="relative overflow-y-auto bg-[#ECEAF3] p-3 sm:p-6">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[24px] bg-white shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center gap-1.5 border-b border-slate-100 bg-white px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ms-3 hidden rounded-full bg-slate-100 px-3 py-0.5 font-mono text-[10px] text-slate-500 sm:block" dir="ltr">{(data.personalInfo.fullName || "portfolio").toLowerCase().replace(/\s+/g, "")}.site — {project.templateId}</span>
              <span className="ms-auto rounded-full bg-[#F1EFFD] px-2.5 py-0.5 text-[10px] font-bold text-[#6C4CF1]">{outLang.toUpperCase()} • {project.templateId}</span>
            </div>
            <TemplateRenderer templateId={project.templateId} data={data} lang={outLang} design={design} />
          </div>
          {/* form below preview on small screens */}
          <div className="mx-auto mt-4 max-w-3xl rounded-[24px] bg-white p-5 lg:hidden">
            <FormBody section={section} data={data} upd={upd} inputCls={inputCls} labelCls={labelCls} t={t} locale={locale} push={push} filePic={filePic} onPic={onPic} />
          </div>
        </div>

        {/* RIGHT: form on xl, design hint otherwise */}
        <aside className="hidden overflow-y-auto border-s border-[#E9E7F0] bg-white p-4 xl:block">
          <FormBody section={section} data={data} upd={upd} inputCls={inputCls} labelCls={labelCls} t={t} locale={locale} push={push} filePic={filePic} onPic={onPic} />
        </aside>
      </div>

      <input ref={filePic} type="file" accept="image/*" className="hidden" onChange={onPic} />

      {confirmReset && (
        <div className="fixed inset-0 z-[95] grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center">
            <p className="font-extrabold">{t("editor.resetConfirm")}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={() => setConfirmReset(false)} className="rounded-full border border-[#E9E7F0] px-4 py-2 text-sm font-bold">{t("common.cancel")}</button>
              <button onClick={async () => { const fresh = demoPortfolio(outLang); if (project) commit({ ...project, data: fresh }); setConfirmReset(false); push("Reset", "info"); }} className="rounded-full bg-rose-600 px-4 py-2 text-sm font-bold text-white">{t("common.confirm")}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function FormBody({ section, data, upd, inputCls, labelCls, t, locale, push, filePic, onPic }: {
  section: string; data: PortfolioData; upd: (fn: (d: PortfolioData) => PortfolioData) => void;
  inputCls: string; labelCls: string; t: (k: string) => string; locale: string;
  push: (m: string, k?: "success" | "error" | "info") => void;
  filePic: React.RefObject<HTMLInputElement | null>; onPic: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const setPI = (k: string, v: string) => upd((d) => ({ ...d, personalInfo: { ...d.personalInfo, [k]: v } }));
  if (section === "personal") {
    const pi = data.personalInfo;
    return (
      <div className="space-y-3">
        <h3 className="font-extrabold">{t("editor.personal")}</h3>
        <div className="flex items-center gap-3">
          {/* Using standard img for local data-URL/blob preview compatibility */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {pi.profileImage ? <img src={pi.profileImage} className="h-14 w-14 rounded-2xl object-cover" alt={pi.fullName || "Profile"} /> : <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F1EFFD] font-black text-[#6C4CF1]">{(pi.fullName || "P")[0]}</div>}
          <button onClick={() => filePic.current?.click()} className="inline-flex items-center gap-1.5 rounded-full border border-[#E9E7F0] px-4 py-2 text-xs font-bold hover:border-[#6C4CF1]"><Upload className="h-3.5 w-3.5" />Photo</button>
        </div>
        {([["fullName", "Full name"], ["jobTitle", "Job title"], ["email", "Email"], ["phone", "Phone"], ["location", "Location"], ["website", "Website"], ["linkedin", "LinkedIn"], ["github", "GitHub"]] as const).map(([k, l]) => (
          <div key={k}><label className={labelCls}>{l}</label><input dir={k === "email" || k === "phone" || k === "website" ? "ltr" : "auto"} className={inputCls} value={pi[k] || ""} onChange={(e) => setPI(k, e.target.value)} /></div>
        ))}
      </div>
    );
  }
  if (section === "summary") {
    return <div className="space-y-3"><h3 className="font-extrabold">{t("editor.summary")}</h3><label className={labelCls}>Summary</label><textarea dir="auto" rows={8} className={inputCls} value={data.professionalSummary} onChange={(e) => upd((d) => ({ ...d, professionalSummary: e.target.value }))} /></div>;
  }
  if (section === "skills") {
    return (
      <div className="space-y-4">
        <h3 className="font-extrabold">{t("editor.skills")}</h3>
        {(["technical", "soft", "tools"] as const).map((k) => (
          <SkillEdit key={k} title={k} values={data.skills[k]} onChange={(v) => upd((d) => ({ ...d, skills: { ...d.skills, [k]: v } }))} inputCls={inputCls} labelCls={labelCls} t={t} />
        ))}
      </div>
    );
  }
  if (section === "experience") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between"><h3 className="font-extrabold">{t("editor.experience")}</h3><button onClick={() => upd((d) => ({ ...d, experience: [...d.experience, { id: uid("exp"), position: "", company: "", location: "", startDate: "", endDate: "", description: [""], achievements: [] }] }))} className="inline-flex items-center gap-1 rounded-full bg-[#171625] px-3 py-1.5 text-xs font-bold text-white"><Plus className="h-3.5 w-3.5" />Add</button></div>
        {data.experience.map((e, idx) => (
          <div key={e.id} className="rounded-2xl border border-[#E9E7F0] p-3.5">
            <div className="flex items-center justify-between"><p className="text-xs font-black text-[#6C4CF1]">#{idx + 1}</p><button onClick={() => upd((d) => ({ ...d, experience: d.experience.filter((x) => x.id !== e.id) }))} className="text-rose-500"><Trash2 className="h-4 w-4" /></button></div>
            <div className="mt-2 grid gap-2">
              <input placeholder="Position" dir="auto" className={inputCls} value={e.position} onChange={(ev) => upd((d) => ({ ...d, experience: d.experience.map((x) => x.id === e.id ? { ...x, position: ev.target.value } : x) }))} />
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Company" dir="auto" className={inputCls} value={e.company} onChange={(ev) => upd((d) => ({ ...d, experience: d.experience.map((x) => x.id === e.id ? { ...x, company: ev.target.value } : x) }))} />
                <input placeholder="Location" dir="auto" className={inputCls} value={e.location} onChange={(ev) => upd((d) => ({ ...d, experience: d.experience.map((x) => x.id === e.id ? { ...x, location: ev.target.value } : x) }))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Start" className={inputCls} value={e.startDate} onChange={(ev) => upd((d) => ({ ...d, experience: d.experience.map((x) => x.id === e.id ? { ...x, startDate: ev.target.value } : x) }))} />
                <input placeholder="End" className={inputCls} value={e.endDate} onChange={(ev) => upd((d) => ({ ...d, experience: d.experience.map((x) => x.id === e.id ? { ...x, endDate: ev.target.value } : x) }))} />
              </div>
              <label className={labelCls}>Bullets (one per line)</label>
              <textarea dir="auto" rows={3} className={inputCls} value={e.description.join("\n")} onChange={(ev) => upd((d) => ({ ...d, experience: d.experience.map((x) => x.id === e.id ? { ...x, description: ev.target.value.split("\n") } : x) }))} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (section === "projects") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between"><h3 className="font-extrabold">{t("editor.projects")}</h3><button onClick={() => upd((d) => ({ ...d, projects: [...d.projects, { id: uid("prj"), name: "", description: "", technologies: [], projectUrl: "", githubUrl: "", image: "" }] }))} className="inline-flex items-center gap-1 rounded-full bg-[#171625] px-3 py-1.5 text-xs font-bold text-white"><Plus className="h-3.5 w-3.5" />Add</button></div>
        {data.projects.map((p, idx) => (
          <div key={p.id} className="rounded-2xl border border-[#E9E7F0] p-3.5">
            <div className="flex items-center justify-between"><p className="text-xs font-black text-[#6C4CF1]">#{idx + 1}</p><button onClick={() => upd((d) => ({ ...d, projects: d.projects.filter((x) => x.id !== p.id) }))} className="text-rose-500"><Trash2 className="h-4 w-4" /></button></div>
            <div className="mt-2 grid gap-2">
              <input placeholder="Project name" dir="auto" className={inputCls} value={p.name} onChange={(e) => upd((d) => ({ ...d, projects: d.projects.map((x) => x.id === p.id ? { ...x, name: e.target.value } : x) }))} />
              <textarea placeholder="Description" dir="auto" rows={2} className={inputCls} value={p.description} onChange={(e) => upd((d) => ({ ...d, projects: d.projects.map((x) => x.id === p.id ? { ...x, description: e.target.value } : x) }))} />
              <input placeholder="Tech (comma separated)" dir="auto" className={inputCls} value={p.technologies.join(", ")} onChange={(e) => upd((d) => ({ ...d, projects: d.projects.map((x) => x.id === p.id ? { ...x, technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } : x) }))} />
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Live URL" dir="ltr" className={inputCls} value={p.projectUrl} onChange={(e) => upd((d) => ({ ...d, projects: d.projects.map((x) => x.id === p.id ? { ...x, projectUrl: e.target.value } : x) }))} />
                <input placeholder="GitHub URL" dir="ltr" className={inputCls} value={p.githubUrl} onChange={(e) => upd((d) => ({ ...d, projects: d.projects.map((x) => x.id === p.id ? { ...x, githubUrl: e.target.value } : x) }))} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (section === "education") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between"><h3 className="font-extrabold">{t("editor.education")}</h3><button onClick={() => upd((d) => ({ ...d, education: [...d.education, { id: uid("edu"), degree: "", institution: "", startDate: "", endDate: "", description: "" }] }))} className="inline-flex items-center gap-1 rounded-full bg-[#171625] px-3 py-1.5 text-xs font-bold text-white"><Plus className="h-3.5 w-3.5" />Add</button></div>
        {data.education.map((e) => (
          <div key={e.id} className="grid gap-2 rounded-2xl border border-[#E9E7F0] p-3.5">
            <input placeholder="Degree" dir="auto" className={inputCls} value={e.degree} onChange={(e2) => upd((d) => ({ ...d, education: d.education.map((x) => x.id === e.id ? { ...x, degree: e2.target.value } : x) }))} />
            <input placeholder="Institution" dir="auto" className={inputCls} value={e.institution} onChange={(e2) => upd((d) => ({ ...d, education: d.education.map((x) => x.id === e.id ? { ...x, institution: e2.target.value } : x) }))} />
            <div className="grid grid-cols-2 gap-2"><input placeholder="Start" className={inputCls} value={e.startDate} onChange={(e2) => upd((d) => ({ ...d, education: d.education.map((x) => x.id === e.id ? { ...x, startDate: e2.target.value } : x) }))} /><input placeholder="End" className={inputCls} value={e.endDate} onChange={(e2) => upd((d) => ({ ...d, education: d.education.map((x) => x.id === e.id ? { ...x, endDate: e2.target.value } : x) }))} /></div>
            <button onClick={() => upd((d) => ({ ...d, education: d.education.filter((x) => x.id !== e.id) }))} className="justify-self-start text-xs font-bold text-rose-600">Delete</button>
          </div>
        ))}
      </div>
    );
  }
  if (section === "certifications") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between"><h3 className="font-extrabold">{t("editor.certifications")}</h3><button onClick={() => upd((d) => ({ ...d, certifications: [...d.certifications, { id: uid("cert"), name: "", issuer: "", date: "", url: "" }] }))} className="inline-flex items-center gap-1 rounded-full bg-[#171625] px-3 py-1.5 text-xs font-bold text-white"><Plus className="h-3.5 w-3.5" />Add</button></div>
        {data.certifications.map((c) => (
          <div key={c.id} className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-2xl border border-[#E9E7F0] p-3">
            <div className="grid gap-2"><input placeholder="Certificate name" dir="auto" className={inputCls} value={c.name} onChange={(e) => upd((d) => ({ ...d, certifications: d.certifications.map((x) => x.id === c.id ? { ...x, name: e.target.value } : x) }))} /><input placeholder="Issuer" dir="auto" className={inputCls} value={c.issuer} onChange={(e) => upd((d) => ({ ...d, certifications: d.certifications.map((x) => x.id === c.id ? { ...x, issuer: e.target.value } : x) }))} /></div>
            <button onClick={() => upd((d) => ({ ...d, certifications: d.certifications.filter((x) => x.id !== c.id) }))} className="text-rose-500"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    );
  }
  if (section === "languages") {
    return (
      <div className="space-y-3"><h3 className="font-extrabold">{t("editor.languages")}</h3>
        <SkillEdit title="languages" values={data.languages} onChange={(v) => upd((d) => ({ ...d, languages: v }))} inputCls={inputCls} labelCls={labelCls} t={t} />
      </div>
    );
  }
  if (section === "social") {
    return (
      <div className="space-y-3">
        <h3 className="font-extrabold">{t("editor.social")}</h3>
        {data.socialLinks.map((s) => (
          <div key={s.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <input className={inputCls} value={s.label} onChange={(e) => upd((d) => ({ ...d, socialLinks: d.socialLinks.map((x) => x.id === s.id ? { ...x, label: e.target.value } : x) }))} placeholder="Label" />
            <input className={inputCls} dir="ltr" value={s.url} onChange={(e) => upd((d) => ({ ...d, socialLinks: d.socialLinks.map((x) => x.id === s.id ? { ...x, url: e.target.value } : x) }))} placeholder="https://" />
            <button onClick={() => upd((d) => ({ ...d, socialLinks: d.socialLinks.filter((x) => x.id !== s.id) }))} className="text-rose-500"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        <button onClick={() => upd((d) => ({ ...d, socialLinks: [...d.socialLinks, { id: uid("s"), label: "", url: "" }] }))} className="rounded-full border border-[#E9E7F0] px-4 py-2 text-xs font-bold">+ Add link</button>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between"><h3 className="font-extrabold">{t("editor.custom")}</h3><button onClick={() => upd((d) => ({ ...d, customSections: [...d.customSections, { id: uid("c"), title: "", content: "" }] }))} className="inline-flex items-center gap-1 rounded-full bg-[#171625] px-3 py-1.5 text-xs font-bold text-white"><Plus className="h-3.5 w-3.5" />{t("editor.addSection")}</button></div>
      {data.customSections.map((c) => (
        <div key={c.id} className="grid gap-2 rounded-2xl border border-[#E9E7F0] p-3.5">
          <input placeholder="Title" dir="auto" className={inputCls} value={c.title} onChange={(e) => upd((d) => ({ ...d, customSections: d.customSections.map((x) => x.id === c.id ? { ...x, title: e.target.value } : x) }))} />
          <textarea placeholder="Content" dir="auto" rows={3} className={inputCls} value={c.content} onChange={(e) => upd((d) => ({ ...d, customSections: d.customSections.map((x) => x.id === c.id ? { ...x, content: e.target.value } : x) }))} />
          <button onClick={() => upd((d) => ({ ...d, customSections: d.customSections.filter((x) => x.id !== c.id) }))} className="justify-self-start text-xs font-bold text-rose-600">Delete</button>
        </div>
      ))}
      {data.customSections.length === 0 && <p className="text-xs text-[#73738A]">No custom sections yet.</p>}
    </div>
  );
}

function SkillEdit({ title, values, onChange, inputCls, labelCls, t }: { title: string; values: string[]; onChange: (v: string[]) => void; inputCls: string; labelCls: string; t: (k: string) => string }) {
  const [draft, setDraft] = useState("");
  return (
    <div>
      <p className={labelCls}>{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {values.map((s, i) => (
          <span key={`${s}-${i}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#F1EFFD] px-3 py-1 text-xs font-bold text-[#4b2fd6]"><span dir="auto">{s}</span><button onClick={() => onChange(values.filter((_, j) => j !== i))} className="hover:text-rose-600">×</button></span>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input dir="auto" className={inputCls} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { onChange([...values, draft.trim()]); setDraft(""); } }} placeholder={t("editor.addSkill")} />
        <button onClick={() => { if (draft.trim()) { onChange([...values, draft.trim()]); setDraft(""); } }} className="shrink-0 rounded-xl bg-[#171625] px-4 text-xs font-bold text-white"><Plus className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
