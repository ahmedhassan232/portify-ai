import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function MinimalistDesigner({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const accent = design?.accentColor || "#171717";
  const radius = design?.borderRadius ?? 4;
  const divider = "border-t border-neutral-200 py-12";

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="about" className="py-12 border-b border-neutral-200">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
          {"// "}{L(lang, "Statement", "الرؤية")}
        </p>
        <p className="mt-4 max-w-3xl break-words text-2xl font-light leading-relaxed text-neutral-800 sm:text-3xl" dir="auto">
          {data.professionalSummary}
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className={divider}>
        <div className="flex items-baseline justify-between border-b border-neutral-900 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900">
            {L(lang, "Selected Works", "أعمال مختارة")}
          </h2>
          <span className="font-mono text-xs text-neutral-400">({data.projects.length})</span>
        </div>
        <div className="mt-8 space-y-12">
          {data.projects.map((project, idx) => (
            <article key={project.id} className="min-w-0 grid gap-6 border-b border-neutral-100 pb-12 last:border-0 last:pb-0 md:grid-cols-12 md:items-start">
              <div className="font-mono text-xs text-neutral-400 md:col-span-1">
                0{idx + 1}
              </div>
              <div className="md:col-span-6">
                {project.image ? (
                  <ProjectMedia
                    src={project.image}
                    alt={project.name}
                    className="aspect-[16/10] w-full bg-neutral-100 object-cover shadow-sm"
                    fallbackClassName="aspect-[16/10] w-full"
                  />
                ) : (
                  <div className="flex aspect-[16/10] w-full items-center justify-center bg-neutral-100 text-neutral-300 font-mono text-3xl font-light">
                    {project.name.slice(0, 1)}
                  </div>
                )}
              </div>
              <div className="flex flex-col md:col-span-5 md:ps-4">
                <h3 className="break-words text-2xl font-light tracking-tight text-neutral-900" dir="auto">
                  {project.name}
                </h3>
                {project.description && (
                  <p className="mt-3 break-words text-sm leading-relaxed text-neutral-600" dir="auto">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((t, i) => (
                      <span key={`${t}-${i}`} className="font-mono text-xs text-neutral-500" dir="auto">
                        /{t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold tracking-wider uppercase">
                  {project.projectUrl && (
                    <ExternalLink href={project.projectUrl} className="underline underline-offset-4 text-neutral-900 hover:text-neutral-500">
                      {L(lang, "View Project ↗", "عرض المشروع ↗")}
                    </ExternalLink>
                  )}
                  {project.githubUrl && (
                    <ExternalLink href={project.githubUrl} className="underline underline-offset-4 text-neutral-400 hover:text-neutral-900">
                      {L(lang, "Archive", "الأرشيف")}
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
      <section id="experience" className={divider}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 border-b border-neutral-900 pb-3">
          {L(lang, "Experience & Roles", "الخبرة والمسيرة")}
        </h2>
        <div className="mt-6 divide-y divide-neutral-100">
          {data.experience.map((item) => (
            <article key={item.id} className="min-w-0 py-6 first:pt-0 grid gap-4 md:grid-cols-12">
              <div className="md:col-span-4">
                <h3 className="break-words font-medium text-base text-neutral-900" dir="auto">
                  {item.position}
                </h3>
                <p className="break-words text-sm text-neutral-500" dir="auto">
                  {item.company}
                  {item.location && ` · ${item.location}`}
                </p>
                <p className="mt-1 font-mono text-xs text-neutral-400">
                  {item.startDate} — {item.endDate}
                </p>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-1.5 text-sm leading-relaxed text-neutral-600">
                  {[...item.description, ...item.achievements].filter(Boolean).map((bullet, i) => (
                    <li key={i} dir="auto" className="break-words">
                      — {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section id="skills" className={divider}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 border-b border-neutral-900 pb-3">
          {L(lang, "Disciplines & Toolset", "الخبرات والأدوات")}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {data.skills.technical.length > 0 && (
            <div>
              <p className="text-xs font-mono uppercase text-neutral-400">{L(lang, "Design Disciplines", "تخصصات التصميم")}</p>
              <ul className="mt-3 space-y-1 text-sm text-neutral-700">
                {data.skills.technical.map((s, idx) => (
                  <li key={`${s}-${idx}`} dir="auto" className="break-words">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div>
              <p className="text-xs font-mono uppercase text-neutral-400">{L(lang, "Software & Tools", "البرامج والأدوات")}</p>
              <ul className="mt-3 space-y-1 text-sm text-neutral-700">
                {data.skills.tools.map((s, idx) => (
                  <li key={`${s}-${idx}`} dir="auto" className="break-words">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div>
              <p className="text-xs font-mono uppercase text-neutral-400">{L(lang, "Methodologies", "المنهجيات")}</p>
              <ul className="mt-3 space-y-1 text-sm text-neutral-700">
                {data.skills.soft.map((s, idx) => (
                  <li key={`${s}-${idx}`} dir="auto" className="break-words">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    ) : null,

    education: data.education.length > 0 ? (
      <section id="education" className={divider}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 border-b border-neutral-900 pb-3">
          {L(lang, "Education", "التعليم")}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {data.education.map((item) => (
            <article key={item.id} className="min-w-0 text-sm">
              <h3 className="break-words font-medium text-neutral-900" dir="auto">{item.degree}</h3>
              <p className="break-words text-neutral-500" dir="auto">{item.institution}</p>
              <p className="mt-1 font-mono text-xs text-neutral-400">{item.startDate} — {item.endDate}</p>
              {item.description && <p className="mt-2 text-xs leading-relaxed text-neutral-600" dir="auto">{item.description}</p>}
            </article>
          ))}
        </div>
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section id="certifications" className={divider}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 border-b border-neutral-900 pb-3">
          {L(lang, "Credentials & Honors", "الشهادات والتكريمات")}
        </h2>
        <div className="mt-4 divide-y divide-neutral-100">
          {data.certifications.map((item) => (
            <div key={item.id} className="py-3 flex flex-wrap items-baseline justify-between text-sm">
              <span className="break-words font-medium text-neutral-800" dir="auto">
                {item.url ? <ExternalLink href={item.url} className="underline">{item.name}</ExternalLink> : item.name}
              </span>
              <span className="font-mono text-xs text-neutral-400">
                {item.issuer}{item.date ? ` · ${item.date}` : ""}
              </span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section id="languages" className={divider}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 border-b border-neutral-900 pb-3">
          {L(lang, "Languages", "اللغات")}
        </h2>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-700">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="font-mono text-xs" dir="auto">
              [{l}]
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section id="contact" className="border-t-2 border-neutral-900 py-14">
        <h2 className="text-3xl font-light text-neutral-900 sm:text-5xl" dir="auto">
          {L(lang, "Let’s start a conversation.", "لنتواصل معًا.")}
        </h2>
        <div className="mt-8 flex flex-wrap gap-6 text-sm">
          {p.email && (
            <a href={`mailto:${p.email}`} className="break-all font-medium underline underline-offset-4 text-neutral-900" dir="ltr">
              {p.email}
            </a>
          )}
          {p.website && (
            <ExternalLink href={p.website} className="break-all underline underline-offset-4 text-neutral-600 hover:text-neutral-900">
              Website ↗
            </ExternalLink>
          )}
          {p.linkedin && (
            <ExternalLink href={p.linkedin} className="underline underline-offset-4 text-neutral-600 hover:text-neutral-900">
              LinkedIn ↗
            </ExternalLink>
          )}
          {p.github && (
            <ExternalLink href={p.github} className="underline underline-offset-4 text-neutral-600 hover:text-neutral-900">
              GitHub ↗
            </ExternalLink>
          )}
          {p.phone && <span className="font-mono text-xs text-neutral-500" dir="ltr">{p.phone}</span>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className={`${divider} text-sm text-neutral-700`} headingClassName="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 mb-3" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className={`${divider} text-sm text-neutral-700`} headingClassName="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 mb-3" />,
  };

  return (
    <div
      dir={dirOf(lang)}
      className="min-h-full bg-[#FCFCFB] text-neutral-900"
      style={{
        fontFamily: design?.fontFamily || (lang === "ar" ? "'IBM Plex Sans Arabic',sans-serif" : "'Inter',Helvetica,sans-serif"),
      }}
    >
      <main className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        {/* HEADER */}
        <header className="border-b-2 border-neutral-900 pb-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3 text-xs uppercase tracking-[0.3em] text-neutral-400">
            <span>Portfolio</span>
            <span dir="auto">{p.location || "Worldwide"}</span>
          </div>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="break-words text-5xl font-light tracking-tight text-neutral-950 sm:text-7xl" dir="auto">
                {p.fullName || "Designer"}
              </h1>
              <p className="mt-4 break-words text-base uppercase tracking-[0.2em] text-neutral-600" dir="auto">
                {p.jobTitle || L(lang, "Designer & Art Director", "مصمم ومدير إبداعي")}
              </p>
            </div>
            {p.profileImage ? (
              <ProjectMedia
                src={p.profileImage}
                alt={p.fullName}
                className="h-20 w-20 rounded-full object-cover filter grayscale contrast-125 shadow-sm"
              />
            ) : (
              <div
                className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-neutral-900 text-xl font-light text-white shadow-sm"
                style={{ borderRadius: `${radius}px` }}
              >
                {initials(p.fullName)}
              </div>
            )}
          </div>
        </header>

        {/* ORDERED SLOTS */}
        {orderedSections(data).map((key) =>
          isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null
        )}
      </main>
    </div>
  );
}
