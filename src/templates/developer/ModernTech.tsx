import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function ModernTech({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const accent = design?.accentColor || "#8B5CF6";
  const radius = design?.borderRadius ?? 20;

  const cardStyle = {
    borderRadius: `${radius}px`,
  };

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section
        id="about"
        className="relative overflow-hidden border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-2xl"
        style={cardStyle}
      >
        <div className="absolute top-0 end-0 h-32 w-32 rounded-full blur-2xl opacity-20" style={{ background: accent }} />
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          {"// "}{L(lang, "Executive Summary", "الملخص التنفيذي")}
        </h2>
        <p className="mt-4 max-w-4xl break-words text-lg leading-relaxed text-white/85 sm:text-xl font-light" dir="auto">
          {data.professionalSummary}
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className="space-y-4">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
            {"// "}{L(lang, "Engineered Systems & Projects", "الأنظمة والمشاريع البرمجية")}
          </h2>
          <span className="font-mono text-xs text-white/40">({data.projects.length} {L(lang, "builds", "مشروع")})</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {data.projects.map((project, index) => (
            <article
              key={project.id}
              className="group flex min-w-0 flex-col overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] transition duration-300 hover:border-white/25 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
              style={cardStyle}
            >
              {project.image ? (
                <div className="relative overflow-hidden">
                  <ProjectMedia
                    src={project.image}
                    alt={project.name}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D1D] via-transparent to-transparent opacity-80" />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between font-mono text-xs text-white/40">
                  <span>SYS // 0{index + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                </div>
                <h3 className="mt-2 break-words text-xl font-bold tracking-tight text-white" dir="auto">
                  {project.name}
                </h3>
                {project.description && (
                  <p className="mt-2.5 break-words text-sm leading-relaxed text-white/65" dir="auto">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={`${tech}-${i}`}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/70"
                        dir="auto"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-6 flex flex-wrap gap-4 text-xs font-bold">
                  {project.projectUrl && (
                    <ExternalLink
                      href={project.projectUrl}
                      className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-white transition hover:opacity-90"
                      style={{ background: accent }}
                    >
                      {L(lang, "Live Deployment ↗", "المنظومة الحية ↗")}
                    </ExternalLink>
                  )}
                  {project.githubUrl && (
                    <ExternalLink
                      href={project.githubUrl}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/80 transition hover:bg-white/10"
                    >
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
      <section id="experience" className="space-y-4">
        <h2 className="px-1 text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          {"// "}{L(lang, "Engineering History", "التاريخ الوظيفي والخبرات")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {data.experience.map((item) => (
            <article
              key={item.id}
              className="border border-white/10 bg-white/[0.035] p-7 backdrop-blur-md transition hover:border-white/20"
              style={cardStyle}
            >
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-white/45">
                <span>{item.startDate} — {item.endDate}</span>
                {item.location && <span dir="auto">{item.location}</span>}
              </div>
              <h3 className="mt-3 break-words text-lg font-bold text-white" dir="auto">
                {item.position}
              </h3>
              <p className="mt-1 break-words text-sm font-semibold" style={{ color: accent }} dir="auto">
                {item.company}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/70">
                {[...item.description, ...item.achievements].filter(Boolean).map((line, index) => (
                  <li key={`${line}-${index}`} className="break-words" dir="auto">
                    <span style={{ color: accent }}>▹</span> {line}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section
        id="skills"
        className="border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl"
        style={cardStyle}
      >
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          {"// "}{L(lang, "Technical Matrix & Stack", "المصفوفة التقنية")}
        </h2>
        <div className="mt-6 space-y-5">
          {data.skills.technical.length > 0 && (
            <div>
              <p className="font-mono text-xs text-white/40">{L(lang, "Architecture & Languages", "اللغات والمعمارية")}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {data.skills.technical.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/90"
                    dir="auto"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div>
              <p className="font-mono text-xs text-white/40">{L(lang, "Infrastructure, Cloud & Tooling", "البنية السحابية والأدوات")}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {data.skills.tools.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-white/70"
                    dir="auto"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div>
              <p className="font-mono text-xs text-white/40">{L(lang, "Practices & Leadership", "الممارسات والقيادة")}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {data.skills.soft.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-dashed border-white/10 px-3.5 py-1.5 font-mono text-xs text-white/60"
                    dir="auto"
                  >
                    {skill}
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
        <h2 className="px-1 text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          {"// "}{L(lang, "Academic Background", "التعليم الأكاديمي")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {data.education.map((item) => (
            <article
              key={item.id}
              className="border border-white/10 bg-white/[0.035] p-6 backdrop-blur"
              style={cardStyle}
            >
              <p className="font-mono text-xs text-white/40">{item.startDate} — {item.endDate}</p>
              <h3 className="mt-2 break-words text-lg font-bold text-white" dir="auto">
                {item.degree}
              </h3>
              <p className="mt-1 break-words text-sm text-white/60" dir="auto">{item.institution}</p>
              {item.description && (
                <p className="mt-3 break-words text-xs leading-relaxed text-white/70" dir="auto">
                  {item.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section
        id="certifications"
        className="border border-white/10 bg-white/[0.035] p-7 backdrop-blur"
        style={cardStyle}
      >
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          {"// "}{L(lang, "Verified Credentials & Certifications", "الشهادات والاعتمادات")}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {data.certifications.map((item) => (
            <div key={item.id} className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="break-words font-semibold text-sm text-white" dir="auto">
                {item.url ? (
                  <ExternalLink href={item.url} className="hover:underline">
                    {item.name} ↗
                  </ExternalLink>
                ) : (
                  item.name
                )}
              </p>
              <p className="mt-1 break-words font-mono text-xs text-white/50" dir="auto">
                {item.issuer}{item.date ? ` · ${item.date}` : ""}
              </p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section
        id="languages"
        className="border border-white/10 bg-white/[0.035] p-6 backdrop-blur"
        style={cardStyle}
      >
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          {"// "}{L(lang, "Languages", "اللغات")}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/80" dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section
        id="contact"
        className="relative overflow-hidden p-8 sm:p-10 text-white shadow-2xl"
        style={{
          ...cardStyle,
          background: `linear-gradient(135deg, ${accent}, #06B6D4)`,
        }}
      >
        <div className="relative z-10">
          <p className="font-mono text-xs uppercase tracking-widest text-white/80">{"// "}{L(lang, "Connect & Build", "تواصل")}</p>
          <h2 className="mt-2 text-2xl font-black sm:text-4xl" dir="auto">
            {L(lang, "Let’s build mission-critical technology together", "لنبنِ حلولاً برمجية وتقنية عالية الأثر")}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs">
            {p.email && (
              <a
                href={`mailto:${p.email}`}
                className="break-all rounded-full bg-black/30 backdrop-blur-md px-5 py-2.5 font-bold text-white hover:bg-black/50"
                dir="ltr"
              >
                {p.email}
              </a>
            )}
            {p.github && (
              <ExternalLink
                href={p.github}
                className="rounded-full bg-black/20 backdrop-blur-md px-5 py-2.5 font-bold text-white hover:bg-black/40"
              >
                GitHub ↗
              </ExternalLink>
            )}
            {p.linkedin && (
              <ExternalLink
                href={p.linkedin}
                className="rounded-full bg-black/20 backdrop-blur-md px-5 py-2.5 font-bold text-white hover:bg-black/40"
              >
                LinkedIn ↗
              </ExternalLink>
            )}
            {p.website && (
              <ExternalLink
                href={p.website}
                className="break-all rounded-full bg-black/20 backdrop-blur-md px-5 py-2.5 font-bold text-white hover:bg-black/40"
              >
                Website ↗
              </ExternalLink>
            )}
            {p.phone && (
              <span className="rounded-full bg-black/20 px-4 py-2.5 text-white/80" dir="ltr">
                {p.phone}
              </span>
            )}
          </div>
        </div>
      </section>
    ),

    additional: (
      <SupplementalSections
        data={data}
        lang={lang}
        section="additional"
        className="border border-white/10 bg-white/[0.035] p-7 backdrop-blur text-sm text-white/80"
        headingClassName="text-xs font-bold uppercase tracking-[0.25em] text-white/50"
      />
    ),
    custom: (
      <SupplementalSections
        data={data}
        lang={lang}
        section="custom"
        className="border border-white/10 bg-white/[0.035] p-7 backdrop-blur text-sm text-white/80"
        headingClassName="text-xs font-bold uppercase tracking-[0.25em] text-white/50"
      />
    ),
  };

  return (
    <div
      dir={dirOf(lang)}
      className="min-h-full overflow-hidden bg-[#090D1D] text-white"
      style={{
        fontFamily: design?.fontFamily || (lang === "ar" ? "'IBM Plex Sans Arabic',sans-serif" : "'Inter',sans-serif"),
      }}
    >
      {/* AMBIENT GLOW */}
      <div className="relative">
        <div
          className="pointer-events-none absolute -top-32 start-1/4 h-96 w-96 rounded-full blur-[120px] opacity-30"
          style={{ background: accent }}
        />
        <div className="pointer-events-none absolute top-40 end-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />

        {/* HERO */}
        <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-16 sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/80 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>{L(lang, "Available for high-impact engineering roles", "متاح لأدوار هندسية وتقنية رائدة")}</span>
          </div>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="shrink-0">
                {p.profileImage ? (
                  <ProjectMedia
                    src={p.profileImage}
                    alt={p.fullName}
                    className="h-28 w-28 rounded-3xl border border-white/20 object-cover shadow-2xl"
                  />
                ) : (
                  <div
                    className="grid h-28 w-28 place-items-center rounded-3xl text-3xl font-extrabold shadow-2xl"
                    style={{ background: `linear-gradient(135deg, ${accent}, #06B6D4)` }}
                  >
                    {initials(p.fullName)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h1 className="break-words text-4xl font-extrabold tracking-tight sm:text-6xl text-white" dir="auto">
                  {p.fullName || "Your Name"}
                </h1>
                <p className="mt-2 break-words text-lg text-white/70" dir="auto">
                  {p.jobTitle || L(lang, "Lead Software Architect", "مهندس برمجيات رئيسي")}
                  {p.location && <span className="text-white/40"> · {p.location}</span>}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {p.email && (
                <a
                  href={`mailto:${p.email}`}
                  className="rounded-full px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:opacity-90"
                  style={{ background: accent }}
                >
                  {L(lang, "Get in Touch", "تواصل معي")}
                </a>
              )}
              {p.github && (
                <ExternalLink
                  href={p.github}
                  className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10"
                >
                  GitHub ↗
                </ExternalLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      <main className="mx-auto max-w-6xl space-y-6 px-6 pb-20 sm:px-8">
        {orderedSections(data).map((key) =>
          isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null
        )}
      </main>
    </div>
  );
}
