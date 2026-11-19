import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function GrowthSpecialist({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const accent = design?.accentColor || "#10B981";
  const radius = design?.borderRadius ?? 24;

  const highlights = data.experience
    .flatMap((entry) => (entry.achievements.length > 0 ? entry.achievements : entry.description))
    .filter(Boolean)
    .slice(0, 3);

  const cardStyle = {
    borderRadius: `${radius}px`,
  };

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="about" className="rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-sm sm:p-8" style={cardStyle}>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
          // {L(lang, "Growth Strategy & Methodology", "استراتيجية النمو والمنهجية")}
        </p>
        <p className="mt-3 break-words text-lg leading-relaxed text-[#052e1b]/80 sm:text-xl font-normal" dir="auto">
          {data.professionalSummary}
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className="space-y-4">
        <div className="flex items-baseline justify-between px-1">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
            {L(lang, "Selected Case Studies & Experiments", "دراسات الحالة والتجارب المختارة")}
          </p>
          <span className="font-mono text-xs text-emerald-700">({data.projects.length})</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {data.projects.map((project) => (
            <article
              key={project.id}
              className="flex min-w-0 flex-col overflow-hidden border border-emerald-950/10 bg-white shadow-sm transition hover:shadow-md"
              style={cardStyle}
            >
              {project.image ? (
                <ProjectMedia src={project.image} alt={project.name} className="h-52 w-full object-cover border-b border-emerald-950/10" />
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[11px] font-bold text-emerald-700" dir="ltr">EXPERIMENT // CASE</span>
                <h3 className="mt-1 break-words text-xl font-extrabold text-[#052e1b]" dir="auto">{project.name}</h3>
                {project.description && (
                  <p className="mt-2.5 break-words text-sm leading-relaxed text-emerald-950/70" dir="auto">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((t, idx) => (
                      <span key={`${t}-${idx}`} className="rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs font-bold text-emerald-800" dir="auto">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-5 flex flex-wrap gap-4 text-sm font-bold text-emerald-800">
                  {project.projectUrl && <ExternalLink href={project.projectUrl}>↗ {L(lang, "View Case ↗", "عرض الحالة ↗")}</ExternalLink>}
                  {project.githubUrl && <ExternalLink href={project.githubUrl}>GitHub</ExternalLink>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    experience: data.experience.length > 0 ? (
      <section id="experience" className="space-y-4">
        <h2 className="px-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
          {L(lang, "Growth & Career Milestones", "المسيرة المهنية ومحطات النمو")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {data.experience.map((entry) => (
            <article key={entry.id} className="border border-emerald-950/10 bg-emerald-50/70 p-7 shadow-sm" style={cardStyle}>
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-emerald-800">
                <span>{entry.startDate}{entry.endDate && ` — ${entry.endDate}`}</span>
                {entry.location && <span dir="auto">{entry.location}</span>}
              </div>
              <h3 className="mt-2 break-words text-lg font-extrabold text-[#052e1b]" dir="auto">{entry.position}</h3>
              <p className="break-words text-sm font-semibold text-emerald-800" dir="auto">{entry.company}</p>
              {[...entry.description, ...entry.achievements].filter(Boolean).length > 0 && (
                <ul className="mt-3.5 space-y-2 text-sm leading-relaxed text-emerald-950/80">
                  {[...entry.description, ...entry.achievements].filter(Boolean).map((item, index) => (
                    <li key={`${item}-${index}`} dir="auto" className="break-words">
                      ▸ {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section id="skills" className="rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-sm sm:p-8" style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
          {L(lang, "Growth Marketing Toolkit & Competencies", "حزمة أدوات وكفاءات النمو")}
        </h2>
        <div className="mt-5 space-y-4">
          {data.skills.technical.length > 0 && (
            <div>
              <p className="font-mono text-xs text-emerald-700">{L(lang, "Acquisition & Performance", "الاستقطاب والأداء")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.technical.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-900" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div>
              <p className="font-mono text-xs text-emerald-700">{L(lang, "Experimentation & Analytics Stack", "أدوات التجربة والتحليل")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.tools.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full border border-emerald-300 bg-white px-3.5 py-1 font-mono text-xs font-bold text-emerald-800" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div>
              <p className="font-mono text-xs text-emerald-700">{L(lang, "Lifecycle & Strategy", "دورة الحياة والاستراتيجية")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.soft.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800" dir="auto">
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
      <section id="education" className="space-y-4">
        <h2 className="px-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
          {L(lang, "Education", "التعليم")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.education.map((item) => (
            <div key={item.id} className="border border-emerald-950/10 bg-white p-6 shadow-sm" style={cardStyle}>
              <h3 className="break-words font-extrabold text-[#052e1b]" dir="auto">{item.degree}</h3>
              <p className="break-words text-sm text-emerald-800" dir="auto">{item.institution}</p>
              <p className="mt-1 font-mono text-xs text-emerald-600">{item.startDate} — {item.endDate}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section id="certifications" className="border border-emerald-950/10 bg-white p-6 shadow-sm" style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800 mb-4">
          {L(lang, "Certifications & Specializations", "الشهادات والتخصصات")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.certifications.map((item) => (
            <div key={item.id} className="rounded-2xl bg-emerald-50/60 p-3.5">
              <p className="break-words font-bold text-sm text-[#052e1b]" dir="auto">
                {item.url ? <ExternalLink href={item.url} className="underline">{item.name}</ExternalLink> : item.name}
              </p>
              <p className="font-mono text-xs text-emerald-700">{item.issuer}{item.date ? ` · ${item.date}` : ""}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section id="languages" className="border border-emerald-950/10 bg-white p-6 shadow-sm" style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800 mb-3">
          {L(lang, "Languages", "اللغات")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-900" dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section
        id="contact"
        className="rounded-3xl bg-[#052e1b] p-8 sm:p-12 text-white shadow-xl"
        style={cardStyle}
      >
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
          {L(lang, "Growth Advisory & Engagements", "استشارات النمو والتعاون")}
        </p>
        <h2 className="mt-2 text-2xl font-black sm:text-4xl" dir="auto">
          {L(lang, "Ready to scale your product & business", "جاهز لتوسيع أثر منتجك ومضاعفة نمو أعمالك")}
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-bold">
          {p.email && (
            <a href={`mailto:${p.email}`} className="break-all rounded-full bg-emerald-400 px-6 py-3 text-sm text-[#052e1b] shadow-md hover:bg-emerald-300" dir="ltr">
              {p.email}
            </a>
          )}
          {p.website && <ExternalLink href={p.website} className="rounded-full border border-white/30 px-5 py-2.5 text-white hover:bg-white/10" dir="ltr">Website ↗</ExternalLink>}
          {p.linkedin && <ExternalLink href={p.linkedin} className="rounded-full border border-white/30 px-5 py-2.5 text-white hover:bg-white/10">LinkedIn ↗</ExternalLink>}
          {p.phone && <span className="font-mono text-xs text-emerald-200" dir="ltr">{p.phone}</span>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className="rounded-3xl border border-emerald-950/10 bg-white p-7 text-sm shadow-sm" headingClassName="font-extrabold text-base text-[#052e1b] mb-3" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className="rounded-3xl border border-emerald-950/10 bg-white p-7 text-sm shadow-sm" headingClassName="font-extrabold text-base text-[#052e1b] mb-3" />,
  };

  return (
    <div
      dir={dirOf(lang)}
      className="min-h-full bg-[#F7FBF8] text-[#052E1B]"
      style={{
        fontFamily: design?.fontFamily || (lang === "ar" ? "'IBM Plex Sans Arabic',sans-serif" : "'Inter',sans-serif"),
      }}
    >
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12 space-y-8">
        {/* HERO */}
        <header className="overflow-hidden rounded-[32px] bg-[#052E1B] p-8 sm:p-12 text-white shadow-xl" style={cardStyle}>
          <p className="inline-flex rounded-full bg-emerald-400/15 px-4 py-1 text-xs font-bold text-emerald-200">
            {L(lang, "Growth · Performance · Product-Led Scale", "النمو · الأداء · التوسع بقيادة المنتج")}
          </p>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {p.profileImage ? (
                <ProjectMedia src={p.profileImage} alt={p.fullName} className="h-24 w-24 rounded-2xl border-2 border-emerald-400/30 object-cover shadow-lg" />
              ) : (
                <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-emerald-400 text-3xl font-black text-[#052e1b] shadow-lg">
                  {initials(p.fullName)}
                </div>
              )}
              <div className="min-w-0">
                <h1 className="break-words text-4xl font-black tracking-tight sm:text-6xl text-white" dir="auto">
                  {p.fullName || "Growth Specialist"}
                </h1>
                <p className="mt-2 break-words text-lg text-emerald-200" dir="auto">
                  {p.jobTitle || L(lang, "Head of Growth", "مدير نمو")}
                  {p.location && ` · ${p.location}`}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {p.email && (
                <a href={`mailto:${p.email}`} className="rounded-full bg-emerald-400 px-5 py-2.5 text-xs font-bold text-[#052e1b] shadow hover:bg-emerald-300">
                  {L(lang, "Get in Touch", "تواصل معي")}
                </a>
              )}
              {p.website && (
                <ExternalLink href={p.website} className="rounded-full border border-white/25 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10">
                  {L(lang, "Website ↗", "الموقع ↗")}
                </ExternalLink>
              )}
            </div>
          </div>

          {/* REAL HIGHLIGHTS DERIVED FROM ACTUAL EXPERIENCE ONLY */}
          {highlights.length > 0 && (
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {highlights.map((item, index) => (
                <div key={`${item}-${index}`} className="rounded-2xl bg-white/[0.08] p-4 text-sm leading-relaxed text-emerald-50 backdrop-blur-sm" dir="auto">
                  <span className="font-mono text-xs text-emerald-300">#0{index + 1}</span>
                  <p className="mt-1 break-words">{item}</p>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* ORDERED SLOTS */}
        <div className="space-y-8">
          {orderedSections(data).map((key) =>
            isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null
          )}
        </div>
      </main>
    </div>
  );
}
