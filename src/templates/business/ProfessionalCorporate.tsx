import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function ProfessionalCorporate({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const royalBlue = design?.accentColor || "#1E40AF";
  const radius = design?.borderRadius ?? 16;
  const card = "min-w-0 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md";

  const cardStyle = {
    borderRadius: `${radius}px`,
  };

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="about" className={card} style={cardStyle}>
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-900">
          <span className="h-3 w-1 rounded-full" style={{ background: royalBlue }} />
          {L(lang, "Professional Summary", "الملخص المهني")}
        </h2>
        <p className="mt-3 break-words text-base leading-relaxed text-slate-700 sm:text-lg" dir="auto">
          {data.professionalSummary}
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className="space-y-4">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-900">
            <span className="h-3 w-1 rounded-full" style={{ background: royalBlue }} />
            {L(lang, "Delivered Projects & Business Engagements", "المشاريع المنجزة وأعمال الشركات")}
          </h2>
          <span className="font-mono text-xs text-slate-400">({data.projects.length})</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {data.projects.map((project) => (
            <article key={project.id} className="flex min-w-0 flex-col overflow-hidden border border-slate-200 bg-white shadow-sm" style={cardStyle}>
              {project.image ? (
                <ProjectMedia src={project.image} alt={project.name} className="h-44 w-full object-cover border-b border-slate-100" />
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[10px] font-bold text-blue-700 uppercase tracking-wider" dir="ltr">BUSINESS DELIVERABLE</span>
                <h3 className="mt-1 break-words font-bold text-lg text-slate-900" dir="auto">{project.name}</h3>
                {project.description && (
                  <p className="mt-2 break-words text-sm leading-relaxed text-slate-600" dir="auto">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((t, idx) => (
                      <span key={`${t}-${idx}`} className="rounded bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700" dir="auto">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-5 flex flex-wrap gap-4 text-xs font-bold">
                  {project.projectUrl && (
                    <ExternalLink href={project.projectUrl} className="hover:underline" style={{ color: royalBlue }}>
                      {L(lang, "View Case ↗", "عرض المشروع ↗")}
                    </ExternalLink>
                  )}
                  {project.githubUrl && (
                    <ExternalLink href={project.githubUrl} className="text-slate-500 hover:underline">
                      {L(lang, "Overview", "نظرة عامة")}
                    </ExternalLink>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    experience: data.experience.length > 0 ? (
      <section id="experience" className={card} style={cardStyle}>
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-900 mb-6">
          <span className="h-3 w-1 rounded-full" style={{ background: royalBlue }} />
          {L(lang, "Employment History & Leadership", "التاريخ الوظيفي والمسيرة")}
        </h2>
        <div className="space-y-6 divide-y divide-slate-100">
          {data.experience.map((e) => (
            <article key={e.id} className="min-w-0 pt-6 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="break-words font-bold text-base text-slate-900" dir="auto">
                  {e.position} <span className="font-semibold text-slate-500">· {e.company}</span>
                </h3>
                <span className="rounded bg-blue-50 px-2.5 py-0.5 font-mono text-xs text-blue-800">{e.startDate} — {e.endDate}</span>
              </div>
              {e.location && <p className="mt-1 text-xs text-slate-400" dir="auto">{e.location}</p>}
              <ul className="mt-3 list-disc space-y-1.5 ps-5 text-sm leading-relaxed text-slate-600">
                {[...e.description, ...e.achievements].filter(Boolean).map((d, i) => (
                  <li key={i} dir="auto" className="break-words">{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section id="skills" className={card} style={cardStyle}>
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-900 mb-5">
          <span className="h-3 w-1 rounded-full" style={{ background: royalBlue }} />
          {L(lang, "Corporate Competencies & Skills", "الكفاءات والمهارات المؤسسية")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {data.skills.technical.length > 0 && (
            <div>
              <p className="font-mono text-xs text-slate-400 uppercase">{L(lang, "Core Disciplines", "التخصصات الرئيسية")}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {data.skills.technical.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-900" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div>
              <p className="font-mono text-xs text-slate-400 uppercase">{L(lang, "Enterprise Tools", "الأنظمة المؤسسية")}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {data.skills.tools.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div>
              <p className="font-mono text-xs text-slate-400 uppercase">{L(lang, "Management & Governance", "الإدارة والحوكمة")}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {data.skills.soft.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-lg border border-dashed border-slate-300 px-3 py-1 text-xs text-slate-600" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    ) : null,

    education: data.education.length > 0 ? (
      <section id="education" className={card} style={cardStyle}>
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-900 mb-4">
          <span className="h-3 w-1 rounded-full" style={{ background: royalBlue }} />
          {L(lang, "Education", "التعليم")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.education.map((e) => (
            <div key={e.id} className="min-w-0 border-s-2 border-slate-200 ps-4">
              <h3 className="break-words font-bold text-slate-900 text-sm" dir="auto">{e.degree}</h3>
              <p className="break-words text-sm text-slate-500" dir="auto">{e.institution}</p>
              <p className="mt-1 font-mono text-xs text-slate-400">{e.startDate} — {e.endDate}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section id="certifications" className={card} style={cardStyle}>
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-900 mb-4">
          <span className="h-3 w-1 rounded-full" style={{ background: royalBlue }} />
          {L(lang, "Professional Certifications", "الشهادات المهنية")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.certifications.map((c) => (
            <div key={c.id} className="min-w-0 rounded-xl bg-slate-50 p-3.5">
              <p className="break-words font-semibold text-sm text-slate-900" dir="auto">
                {c.url ? <ExternalLink href={c.url} className="underline text-blue-800">{c.name}</ExternalLink> : c.name}
              </p>
              <p className="mt-1 font-mono text-xs text-slate-500">{c.issuer}{c.date ? ` · ${c.date}` : ""}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section id="languages" className={card} style={cardStyle}>
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-900 mb-3">
          <span className="h-3 w-1 rounded-full" style={{ background: royalBlue }} />
          {L(lang, "Languages", "اللغات")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700" dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section id="contact" className="rounded-2xl border-2 border-blue-900/20 bg-blue-50/50 p-8 shadow-sm" style={cardStyle}>
        <h2 className="text-xl font-bold text-blue-900" dir="auto">
          {L(lang, "Professional Inquiries & Consulting", "التواصل والاستشارات المهنية")}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {L(lang, "Available for enterprise consulting, business transformation, and strategic roles.", "متاح لاستشارات الشركات، التحول المؤسسي، والأدوار الاستراتيجية.")}
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
          {p.email && (
            <a href={`mailto:${p.email}`} className="break-all rounded-full bg-blue-900 px-5 py-2.5 text-xs text-white hover:bg-blue-800" dir="ltr">
              {p.email}
            </a>
          )}
          {p.phone && <span className="font-mono text-xs text-slate-600 self-center" dir="ltr">{p.phone}</span>}
          {p.website && <ExternalLink href={p.website} className="rounded-full border border-blue-300 bg-white px-4 py-2 text-xs text-blue-900 hover:bg-blue-50" dir="ltr">Website ↗</ExternalLink>}
          {p.linkedin && <ExternalLink href={p.linkedin} className="rounded-full border border-blue-300 bg-white px-4 py-2 text-xs text-blue-900 hover:bg-blue-50">LinkedIn ↗</ExternalLink>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className={`${card} text-sm`} headingClassName="text-xs font-bold uppercase tracking-widest text-blue-900 mb-3" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className={`${card} text-sm`} headingClassName="text-xs font-bold uppercase tracking-widest text-blue-900 mb-3" />,
  };

  return (
    <div
      dir={dirOf(lang)}
      className="min-h-full bg-white text-slate-900"
      style={{
        fontFamily: design?.fontFamily || (lang === "ar" ? "'IBM Plex Sans Arabic',sans-serif" : "'Inter',sans-serif"),
      }}
    >
      {/* HEADER */}
      <header className="text-white shadow-md" style={{ background: `linear-gradient(135deg, ${royalBlue}, #1E3A8A)` }}>
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {p.profileImage ? (
              <ProjectMedia src={p.profileImage} alt={p.fullName} className="h-24 w-24 rounded-2xl border-2 border-white/20 object-cover shadow-lg" />
            ) : (
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-white text-2xl font-extrabold shadow-lg" style={{ color: royalBlue }}>
                {initials(p.fullName)}
              </div>
            )}
            <div className="min-w-0">
              <span className="font-mono text-xs uppercase tracking-widest text-blue-200">Corporate & Business Portfolio</span>
              <h1 className="mt-1 break-words text-4xl font-extrabold tracking-tight sm:text-5xl" dir="auto">
                {p.fullName || "Corporate Professional"}
              </h1>
              <p className="mt-1.5 break-words text-base text-blue-100" dir="auto">
                {p.jobTitle || L(lang, "Business Consultant & Management Executive", "مستشار أعمال وإداري تنفيذي")}
                {p.location && <span className="text-blue-300"> · {p.location}</span>}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {p.email && (
              <a href={`mailto:${p.email}`} className="rounded-full bg-white px-5 py-2.5 text-xs font-bold shadow hover:bg-slate-100" style={{ color: royalBlue }}>
                {L(lang, "Get in Touch", "تواصل معي")}
              </a>
            )}
            {p.linkedin && (
              <ExternalLink href={p.linkedin} className="rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10">
                LinkedIn ↗
              </ExternalLink>
            )}
          </div>
        </div>
      </header>

      {/* SECTIONS */}
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-10 sm:px-8">
        {orderedSections(data).map((key) =>
          isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null
        )}
      </main>
    </div>
  );
}
