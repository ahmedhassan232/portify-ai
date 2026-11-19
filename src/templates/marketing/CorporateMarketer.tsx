import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function CorporateMarketer({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const navy = design?.accentColor || "#0B2545";
  const radius = design?.borderRadius ?? 16;
  const card = "min-w-0 border border-slate-200/80 bg-white p-7 shadow-sm transition hover:shadow-md";

  const cardStyle = {
    borderRadius: `${radius}px`,
  };

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="about" className={card} style={cardStyle}>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: navy }} />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {L(lang, "Executive Summary & Brand Narrative", "الملخص التنفيذي والرؤية الاستراتيجية")}
          </h2>
        </div>
        <p className="mt-4 break-words text-lg leading-relaxed text-slate-700 sm:text-xl font-normal" dir="auto">
          {data.professionalSummary}
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className="space-y-4">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            // {L(lang, "Key Campaigns & Strategic Initiatives", "الحملات الاستراتيجية والمشاريع الرئيسية")}
          </h2>
          <span className="font-mono text-xs text-slate-400">({data.projects.length})</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {data.projects.map((project) => (
            <article key={project.id} className="flex min-w-0 flex-col overflow-hidden border border-slate-200 bg-white shadow-sm" style={cardStyle}>
              {project.image ? (
                <ProjectMedia src={project.image} alt={project.name} className="h-48 w-full object-cover border-b border-slate-100" />
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[11px] font-bold text-slate-400" dir="ltr">CASE STUDY</span>
                <h3 className="mt-1 break-words text-xl font-bold text-slate-900" dir="auto">{project.name}</h3>
                {project.description && (
                  <p className="mt-2.5 break-words text-sm leading-relaxed text-slate-600" dir="auto">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((t, idx) => (
                      <span key={`${t}-${idx}`} className="rounded bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700" dir="auto">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-5 flex flex-wrap gap-4 text-xs font-bold">
                  {project.projectUrl && (
                    <ExternalLink href={project.projectUrl} className="hover:underline" style={{ color: navy }}>
                      {L(lang, "View Campaign ↗", "عرض الحملة ↗")}
                    </ExternalLink>
                  )}
                  {project.githubUrl && (
                    <ExternalLink href={project.githubUrl} className="text-slate-500 hover:underline">
                      {L(lang, "Documentation ↗", "التوثيق ↗")}
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
        <div className="flex items-center gap-2 mb-6">
          <span className="h-2 w-2 rounded-full" style={{ background: navy }} />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {L(lang, "Leadership & Campaign History", "المسيرة المهنية وقيادة الحملات")}
          </h2>
        </div>
        <div className="space-y-8 divide-y divide-slate-100">
          {data.experience.map((item) => (
            <article key={item.id} className="min-w-0 pt-6 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="break-words text-lg font-bold text-slate-900" dir="auto">
                  {item.position} <span className="font-semibold text-slate-500">@ {item.company}</span>
                </h3>
                <span className="font-mono text-xs text-slate-400">{item.startDate} — {item.endDate}</span>
              </div>
              {item.location && <p className="mt-1 text-xs text-slate-400" dir="auto">{item.location}</p>}
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                {[...item.description, ...item.achievements].filter(Boolean).map((bullet, i) => (
                  <li key={i} dir="auto" className="break-words">
                    • {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section className="text-white p-8 shadow-lg" style={{ ...cardStyle, background: navy }}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-200">
          {L(lang, "Core Marketing Competencies", "الكفاءات والخبرات التسويقية")}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {data.skills.technical.length > 0 && (
            <div>
              <p className="font-mono text-xs text-blue-300">{L(lang, "Growth & Strategy", "النمو والاستراتيجية")}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {data.skills.technical.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div>
              <p className="font-mono text-xs text-blue-300">{L(lang, "MarTech & Analytics", "الأدوات والتحليلات")}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {data.skills.tools.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div>
              <p className="font-mono text-xs text-blue-300">{L(lang, "Leadership & Branding", "القيادة والعلامة التجارية")}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {data.skills.soft.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white" dir="auto">
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
      <section className={card} style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
          {L(lang, "Academic Background", "التعليم الأكاديمي")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.education.map((item) => (
            <div key={item.id} className="min-w-0 border-s-2 border-slate-200 ps-4">
              <h3 className="break-words font-bold text-slate-900" dir="auto">{item.degree}</h3>
              <p className="break-words text-sm text-slate-500" dir="auto">{item.institution}</p>
              <p className="mt-1 font-mono text-xs text-slate-400">{item.startDate} — {item.endDate}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section className={card} style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
          {L(lang, "Certifications & Industry Credentials", "الشهادات والاعتمادات المهنية")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.certifications.map((item) => (
            <div key={item.id} className="min-w-0 rounded-xl bg-slate-50 p-3.5">
              <p className="break-words font-semibold text-sm text-slate-900" dir="auto">
                {item.url ? <ExternalLink href={item.url} className="hover:underline">{item.name}</ExternalLink> : item.name}
              </p>
              <p className="mt-1 font-mono text-xs text-slate-500">{item.issuer}{item.date ? ` · ${item.date}` : ""}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section className={card} style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          {L(lang, "Languages", "اللغات")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="rounded-lg bg-slate-100 px-3 py-1 font-medium text-xs text-slate-700" dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section className={card} style={cardStyle}>
        <h2 className="text-xl font-bold text-slate-900" dir="auto">
          {L(lang, "Connect & Inquire", "تواصل")}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {L(lang, "Open for strategic marketing leadership, advisory, and enterprise consulting.", "متاح لأدوار القيادة التسويقية، الاستشارات الاستراتيجية، وتطوير الأعمال.")}
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
          {p.email && (
            <a href={`mailto:${p.email}`} className="break-all rounded-full bg-slate-900 px-5 py-2.5 text-xs text-white hover:bg-slate-800" dir="ltr">
              {p.email}
            </a>
          )}
          {p.phone && <span className="font-mono text-xs text-slate-600 self-center" dir="ltr">{p.phone}</span>}
          {p.website && <ExternalLink href={p.website} className="rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-700 hover:border-slate-500" dir="ltr">Website ↗</ExternalLink>}
          {p.linkedin && <ExternalLink href={p.linkedin} className="rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-700 hover:border-slate-500">LinkedIn ↗</ExternalLink>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className={`${card} text-sm`} headingClassName="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className={`${card} text-sm`} headingClassName="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3" />,
  };

  return (
    <div
      dir={dirOf(lang)}
      className="min-h-full bg-[#F5F8FC] text-slate-900"
      style={{
        fontFamily: design?.fontFamily || (lang === "ar" ? "'IBM Plex Sans Arabic',sans-serif" : "'Inter',sans-serif"),
      }}
    >
      {/* HEADER */}
      <header className="text-white shadow-md" style={{ background: navy }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {p.profileImage ? (
              <ProjectMedia src={p.profileImage} alt={p.fullName} className="h-24 w-24 rounded-2xl border-2 border-white/20 object-cover shadow-lg" />
            ) : (
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-white text-2xl font-extrabold shadow-lg" style={{ color: navy }}>
                {initials(p.fullName)}
              </div>
            )}
            <div className="min-w-0">
              <span className="font-mono text-xs uppercase tracking-widest text-blue-200">Corporate Marketing Portfolio</span>
              <h1 className="mt-1 break-words text-4xl font-extrabold tracking-tight sm:text-5xl" dir="auto">
                {p.fullName || "Marketing Executive"}
              </h1>
              <p className="mt-1.5 break-words text-base text-blue-100" dir="auto">
                {p.jobTitle || L(lang, "Chief Marketing Officer", "مدير تسويق تنفيذي")}
                {p.location && <span className="text-blue-300"> · {p.location}</span>}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {p.email && (
              <a href={`mailto:${p.email}`} className="rounded-full bg-white px-5 py-2.5 text-xs font-bold shadow hover:bg-slate-100" style={{ color: navy }}>
                {L(lang, "Contact Me", "تواصل معي")}
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
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-10 sm:px-10">
        {orderedSections(data).map((key) =>
          isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null
        )}
      </main>
    </div>
  );
}
