import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function MinimalDeveloper({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const accent = design?.accentColor || "#059669";
  const radius = design?.borderRadius ?? 12;

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="about" className="border-b border-slate-200 py-12 first:pt-6">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          01 // {L(lang, "About", "نبذة")}
        </h2>
        <p className="mt-4 max-w-3xl break-words text-lg leading-relaxed text-slate-700 sm:text-xl" dir="auto">
          {data.professionalSummary}
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className="border-b border-slate-200 py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            02 // {L(lang, "Selected Projects", "مشاريع مختارة")}
          </h2>
          <span className="font-mono text-xs text-slate-400">({data.projects.length})</span>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {data.projects.map((project) => (
            <article
              key={project.id}
              className="group flex min-w-0 flex-col overflow-hidden border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderRadius: `${radius}px` }}
            >
              {project.image ? (
                <ProjectMedia src={project.image} alt={project.name} className="h-44 w-full border-b border-slate-100 object-cover" />
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="break-words font-bold text-lg text-slate-900" dir="auto">{project.name}</h3>
                </div>
                {project.description && (
                  <p className="mt-2 break-words text-sm leading-relaxed text-slate-600" dir="auto">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={`${tech}-${idx}`}
                        className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600"
                        dir="auto"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-5 flex flex-wrap gap-4 text-xs font-bold">
                  {project.projectUrl && (
                    <ExternalLink href={project.projectUrl} className="hover:underline" style={{ color: accent }}>
                      {L(lang, "Live Demo ↗", "عرض حي ↗")}
                    </ExternalLink>
                  )}
                  {project.githubUrl && (
                    <ExternalLink href={project.githubUrl} className="text-slate-600 hover:text-black hover:underline">
                      {L(lang, "Source Code ↗", "الكود المصدري ↗")}
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
      <section id="experience" className="border-b border-slate-200 py-12">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          03 // {L(lang, "Experience", "الخبرات")}
        </h2>
        <div className="mt-6 divide-y divide-slate-100">
          {data.experience.map((item) => (
            <article key={item.id} className="min-w-0 py-6 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="break-words font-bold text-base text-slate-900" dir="auto">
                  {item.position} <span className="font-normal text-slate-500">@ {item.company}</span>
                </h3>
                <span className="font-mono text-xs text-slate-400">{item.startDate} — {item.endDate}</span>
              </div>
              {item.location && <p className="mt-1 text-xs text-slate-400" dir="auto">{item.location}</p>}
              <ul className="mt-3 list-disc space-y-1.5 ps-5 text-sm leading-relaxed text-slate-600">
                {[...item.description, ...item.achievements].filter(Boolean).map((line, index) => (
                  <li key={`${line}-${index}`} dir="auto" className="break-words">{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section id="skills" className="border-b border-slate-200 py-12">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          04 // {L(lang, "Technical Stack", "التقنيات")}
        </h2>
        <div className="mt-6 space-y-4">
          {data.skills.technical.length > 0 && (
            <div>
              <p className="font-mono text-xs text-slate-400">{L(lang, "// Core Technologies", "// التقنيات الأساسية")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.technical.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-800" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div>
              <p className="font-mono text-xs text-slate-400">{L(lang, "// Tools & Infrastructure", "// الأدوات والبنية")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.tools.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-md bg-slate-100 px-3 py-1 font-mono text-xs text-slate-600" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div>
              <p className="font-mono text-xs text-slate-400">{L(lang, "// Methodologies & Practices", "// الممارسات والمنهجيات")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.soft.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-md border border-dashed border-slate-200 px-3 py-1 font-mono text-xs text-slate-600" dir="auto">
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
      <section id="education" className="border-b border-slate-200 py-12">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          05 // {L(lang, "Education", "التعليم")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {data.education.map((item) => (
            <div key={item.id} className="min-w-0 border border-slate-200 p-5" style={{ borderRadius: `${radius}px` }}>
              <p className="break-words font-bold text-slate-900" dir="auto">{item.degree}</p>
              <p className="mt-1 break-words text-sm text-slate-500" dir="auto">{item.institution}</p>
              <p className="mt-2 font-mono text-xs text-slate-400">{item.startDate} — {item.endDate}</p>
              {item.description && <p className="mt-2 break-words text-xs text-slate-600" dir="auto">{item.description}</p>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section id="certifications" className="border-b border-slate-200 py-12">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          06 // {L(lang, "Certifications", "الشهادات")}
        </h2>
        <div className="mt-4 divide-y divide-slate-100">
          {data.certifications.map((item) => (
            <div key={item.id} className="py-3 flex flex-wrap items-baseline justify-between gap-2">
              <span className="break-words text-sm font-semibold text-slate-800" dir="auto">
                ✦ {item.url ? <ExternalLink href={item.url} className="hover:underline">{item.name}</ExternalLink> : item.name}
              </span>
              <span className="font-mono text-xs text-slate-500">
                {item.issuer}{item.date ? ` · ${item.date}` : ""}
              </span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section id="languages" className="border-b border-slate-200 py-12">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          07 // {L(lang, "Languages", "اللغات")}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="rounded border border-slate-200 px-3 py-1 font-mono text-xs text-slate-700" dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section id="contact" className="my-12 rounded-2xl bg-slate-950 p-8 text-white" style={{ borderRadius: `${Math.max(radius, 16)}px` }}>
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">{"// "}{L(lang, "Get in touch", "تواصل")}</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl" dir="auto">
          {L(lang, "Available for new engineering challenges", "متاح لمشاريع هندسية وتحديات تقنية جديدة")}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {p.email && <a href={`mailto:${p.email}`} className="break-all rounded-full bg-white px-5 py-2 font-mono text-xs font-bold text-slate-950 hover:bg-slate-200" dir="ltr">{p.email}</a>}
          {p.github && <ExternalLink href={p.github} className="rounded-full border border-white/20 px-5 py-2 font-mono text-xs font-semibold text-white hover:bg-white/10">GitHub ↗</ExternalLink>}
          {p.linkedin && <ExternalLink href={p.linkedin} className="rounded-full border border-white/20 px-5 py-2 font-mono text-xs font-semibold text-white hover:bg-white/10">LinkedIn ↗</ExternalLink>}
          {p.website && <ExternalLink href={p.website} className="break-all rounded-full border border-white/20 px-5 py-2 font-mono text-xs font-semibold text-white hover:bg-white/10">Website ↗</ExternalLink>}
          {p.phone && <span className="rounded-full border border-white/10 px-4 py-2 font-mono text-xs text-slate-300" dir="ltr">{p.phone}</span>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className="border-b border-slate-200 py-12 text-sm" headingClassName="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className="border-b border-slate-200 py-12 text-sm" headingClassName="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400" />,
  };

  return (
    <div
      dir={dirOf(lang)}
      className="min-h-full bg-white text-slate-900"
      style={{
        fontFamily: design?.fontFamily || (lang === "ar" ? "'IBM Plex Sans Arabic',sans-serif" : "'Inter',ui-monospace,monospace"),
      }}
    >
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <span className="font-mono text-sm font-bold tracking-tight text-slate-900" dir="ltr">
            ~/ {(p.fullName || "portfolio").toLowerCase().replace(/\s+/g, "-")}
          </span>
          <div className="flex items-center gap-3 font-mono text-xs text-slate-500">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span dir="auto">{p.location || L(lang, "Remote", "عن بُعد")}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* HERO */}
        <div className="border-b border-slate-200 pb-12">
          <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold" style={{ color: accent }}>
                ▸ {p.jobTitle || L(lang, "Software Engineer", "مهندس برمجيات")}
              </p>
              <h1 className="mt-2 break-words text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-950" dir="auto">
                {p.fullName || "Your Name"}
              </h1>
              {p.location && (
                <p className="mt-2 font-mono text-xs text-slate-500" dir="auto">
                  📍 {p.location}
                </p>
              )}
            </div>
            {p.profileImage ? (
              <ProjectMedia src={p.profileImage} alt={p.fullName} className="h-24 w-24 rounded-2xl object-cover shadow-sm ring-1 ring-slate-200" />
            ) : (
              <div
                className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl text-2xl font-bold text-white shadow-sm"
                style={{ background: accent }}
              >
                {initials(p.fullName)}
              </div>
            )}
          </div>
        </div>

        {/* ORDERED SECTIONS */}
        {orderedSections(data).map((key) =>
          isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null
        )}
      </main>
    </div>
  );
}
