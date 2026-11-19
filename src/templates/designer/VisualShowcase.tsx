import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function VisualShowcase({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const accent = design?.accentColor || "#A855F7";
  const radius = design?.borderRadius ?? 24;

  const panel = "min-w-0 rounded-[24px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md";

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="about" className={`${panel} relative overflow-hidden`}>
        <div className="absolute top-0 end-0 h-40 w-40 rounded-full blur-3xl opacity-20" style={{ background: accent }} />
        <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
          // {L(lang, "Creative Vision", "الرؤية الإبداعية")}
        </h2>
        <p className="mt-4 max-w-4xl break-words text-lg leading-relaxed text-white/80 sm:text-2xl font-light" dir="auto">
          {data.professionalSummary}
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className="space-y-6">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
            // {L(lang, "Visual Archive & Projects", "أرشيف الأعمال والمشاريع")}
          </h2>
          <span className="font-mono text-xs text-fuchsia-300">({data.projects.length} {L(lang, "works", "عمل")})</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((project, idx) => (
            <article
              key={project.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] transition duration-300 hover:border-white/30 hover:shadow-2xl"
              style={{ borderRadius: `${radius}px` }}
            >
              {project.image ? (
                <div className="relative overflow-hidden aspect-[4/3] w-full bg-black/40">
                  <ProjectMedia
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B18] via-transparent to-transparent opacity-70" />
                </div>
              ) : (
                <div
                  className="flex aspect-[4/3] w-full items-center justify-center p-6 text-center text-4xl font-black text-white"
                  style={{
                    background: ["linear-gradient(135deg, #7C3AED, #EC4899)", "linear-gradient(135deg, #06B6D4, #3B82F6)", "linear-gradient(135deg, #F59E0B, #EF4444)"][idx % 3],
                  }}
                  dir="auto"
                >
                  {project.name.slice(0, 1)}
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40" dir="ltr">CASE // 0{idx + 1}</span>
                <h3 className="mt-1 break-words text-xl font-bold text-white" dir="auto">{project.name}</h3>
                {project.description && (
                  <p className="mt-2.5 break-words text-sm leading-relaxed text-white/65" dir="auto">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((t, i) => (
                      <span
                        key={`${t}-${i}`}
                        className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-white/80"
                        dir="auto"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-6 flex flex-wrap gap-4 text-xs font-bold">
                  {project.projectUrl && (
                    <ExternalLink href={project.projectUrl} className="text-fuchsia-300 hover:text-white underline underline-offset-4">
                      {L(lang, "View Project ↗", "عرض المشروع ↗")}
                    </ExternalLink>
                  )}
                  {project.githubUrl && (
                    <ExternalLink href={project.githubUrl} className="text-white/50 hover:text-white underline underline-offset-4">
                      {L(lang, "Source", "المصدر")}
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
      <section id="experience" className={panel}>
        <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
          // {L(lang, "Professional Experience", "الخبرة المهنية")}
        </h2>
        <div className="mt-6 space-y-6">
          {data.experience.map((item) => (
            <article key={item.id} className="min-w-0 border-s-2 border-fuchsia-500/40 ps-5 py-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="break-words text-lg font-bold text-white" dir="auto">
                  {item.position} <span className="font-normal text-fuchsia-300">@ {item.company}</span>
                </h3>
                <span className="font-mono text-xs text-white/40">{item.startDate} — {item.endDate}</span>
              </div>
              {item.location && <p className="text-xs text-white/50" dir="auto">{item.location}</p>}
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-white/70">
                {[...item.description, ...item.achievements].filter(Boolean).map((line, i) => (
                  <li key={i} dir="auto" className="break-words">
                    ▹ {line}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section id="skills" className={panel}>
        <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
          // {L(lang, "Design & Creative Toolkit", "أدوات التصميم والابتكار")}
        </h2>
        <div className="mt-6 space-y-4">
          {data.skills.technical.length > 0 && (
            <div>
              <p className="font-mono text-xs text-white/40">{L(lang, "Disciplines", "التخصصات")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.technical.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3.5 py-1 text-xs font-semibold text-fuchsia-200" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div>
              <p className="font-mono text-xs text-white/40">{L(lang, "Tools & Software", "البرامج والأدوات")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.tools.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs text-white/80" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div>
              <p className="font-mono text-xs text-white/40">{L(lang, "Creative Direction", "التوجيه الإبداعي")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.soft.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full border border-dashed border-white/15 px-3 py-1 text-xs text-white/60" dir="auto">
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
      <section id="education" className={panel}>
        <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
          // {L(lang, "Education", "التعليم")}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {data.education.map((item) => (
            <div key={item.id} className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="break-words font-bold text-white" dir="auto">{item.degree}</h3>
              <p className="break-words text-sm text-white/60" dir="auto">{item.institution}</p>
              <p className="mt-1 font-mono text-xs text-white/40">{item.startDate} — {item.endDate}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section id="certifications" className={panel}>
        <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
          // {L(lang, "Credentials & Honors", "الشهادات والتكريمات")}
        </h2>
        <div className="mt-4 space-y-2">
          {data.certifications.map((item) => (
            <p key={item.id} className="break-words text-sm text-white" dir="auto">
              ✦ {item.url ? <ExternalLink href={item.url} className="underline text-fuchsia-300">{item.name}</ExternalLink> : item.name}
              {item.issuer && <span className="text-white/50"> — {item.issuer}</span>}
            </p>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section id="languages" className={panel}>
        <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
          // {L(lang, "Languages", "اللغات")}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="rounded-full bg-white/10 px-3.5 py-1 text-xs text-white/80" dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section
        id="contact"
        className="relative overflow-hidden p-8 sm:p-12 text-white shadow-2xl"
        style={{
          borderRadius: `${radius}px`,
          background: `linear-gradient(135deg, ${accent}, #EC4899)`,
        }}
      >
        <p className="font-mono text-xs uppercase tracking-widest text-white/80">// {L(lang, "Commission & Collaboration", "الأعمال والتعاون")}</p>
        <h2 className="mt-2 text-3xl font-black sm:text-5xl" dir="auto">
          {L(lang, "Available for visionary design commissions", "متاح للمشاريع والتعاونات التصميمية الرائدة")}
        </h2>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
          {p.email && (
            <a href={`mailto:${p.email}`} className="break-all rounded-full bg-white px-6 py-3 font-bold text-black shadow-lg hover:bg-neutral-100" dir="ltr">
              {p.email}
            </a>
          )}
          {p.website && (
            <ExternalLink href={p.website} className="rounded-full border border-white/30 px-6 py-3 text-white hover:bg-white/10" dir="ltr">
              Website ↗
            </ExternalLink>
          )}
          {p.linkedin && (
            <ExternalLink href={p.linkedin} className="rounded-full border border-white/30 px-6 py-3 text-white hover:bg-white/10">
              LinkedIn
            </ExternalLink>
          )}
          {p.phone && <span className="font-mono text-xs text-white/80 self-center" dir="ltr">{p.phone}</span>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className={`${panel} text-sm text-white/70`} headingClassName="text-xs font-bold uppercase tracking-[0.28em] text-white/50 mb-3" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className={`${panel} text-sm text-white/70`} headingClassName="text-xs font-bold uppercase tracking-[0.28em] text-white/50 mb-3" />,
  };

  return (
    <div
      dir={dirOf(lang)}
      className="min-h-full bg-[#0D0B18] text-white"
      style={{
        fontFamily: design?.fontFamily || (lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif"),
      }}
    >
      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:px-10">
        {/* HEADER */}
        <header className="border-b border-white/10 pb-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400">
                ✦ {L(lang, "Visual Portfolio", "الملف البصري")}
              </span>
              <h1 className="mt-3 break-words text-5xl font-black tracking-tight sm:text-7xl text-white" dir="auto">
                {p.fullName || "Designer"}
              </h1>
              <p className="mt-3 break-words text-lg text-white/70" dir="auto">
                {p.jobTitle || L(lang, "Visual & UI/UX Designer", "مصمم بصري وواجهات مستخدم")}
                {p.location && <span className="text-white/40"> · {p.location}</span>}
              </p>
            </div>
            {p.profileImage ? (
              <ProjectMedia
                src={p.profileImage}
                alt={p.fullName}
                className="h-28 w-28 rounded-3xl object-cover shadow-2xl ring-2 ring-white/10"
              />
            ) : (
              <div
                className="grid h-28 w-28 shrink-0 place-items-center rounded-3xl text-3xl font-black text-white shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${accent}, #EC4899)` }}
              >
                {initials(p.fullName)}
              </div>
            )}
          </div>
        </header>

        {/* ORDERED SLOTS */}
        <main className="mt-10 space-y-8">
          {orderedSections(data).map((key) =>
            isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null
          )}
        </main>
      </div>
    </div>
  );
}
