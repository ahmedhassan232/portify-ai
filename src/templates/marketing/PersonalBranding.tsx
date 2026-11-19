import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function PersonalBranding({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const accent = design?.accentColor || "#C2410C";
  const radius = design?.borderRadius ?? 24;

  const cardStyle = {
    borderRadius: `${radius}px`,
  };

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="about" className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-orange-900/10" style={cardStyle}>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C2410C]">
          // {L(lang, "Personal Narrative & Mission", "الرؤية والرسالة")}
        </p>
        <p className="mt-4 break-words text-xl italic leading-relaxed text-[#78350F] sm:text-2xl font-serif" dir="auto">
          “{data.professionalSummary}”
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className="space-y-4">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C2410C]">
            // {L(lang, "Featured Endeavors & Highlights", "أبرز الأعمال والمشاريع")}
          </h2>
          <span className="font-mono text-xs text-[#92400E]">({data.projects.length})</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {data.projects.map((project) => (
            <article key={project.id} className="flex min-w-0 flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-orange-900/10" style={cardStyle}>
              {project.image ? (
                <ProjectMedia src={project.image} alt={project.name} className="h-48 w-full object-cover border-b border-orange-100" />
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[11px] font-bold text-[#C2410C]" dir="ltr">FEATURED INITIATIVE</span>
                <h3 className="mt-1 break-words font-black text-xl text-[#431407]" dir="auto">{project.name}</h3>
                {project.description && (
                  <p className="mt-2.5 break-words text-sm leading-relaxed text-[#78350F]" dir="auto">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((t, idx) => (
                      <span key={`${t}-${idx}`} className="rounded-full bg-orange-50 px-3 py-1 font-mono text-xs font-bold text-[#C2410C]" dir="auto">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-5 flex flex-wrap gap-4 text-xs font-bold">
                  {project.projectUrl && <ExternalLink href={project.projectUrl} className="text-[#C2410C] underline underline-offset-4">{L(lang, "Explore ↗", "استكشف ↗")}</ExternalLink>}
                  {project.githubUrl && <ExternalLink href={project.githubUrl} className="text-[#78350F] underline underline-offset-4">Source</ExternalLink>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    experience: data.experience.length > 0 ? (
      <section id="experience" className="rounded-3xl bg-[#431407] p-8 sm:p-10 text-white shadow-xl" style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
          // {L(lang, "Leadership Journey & Career Story", "المسيرة القيادية وقصة المسار")}
        </h2>
        <div className="mt-8 space-y-8 divide-y divide-white/10">
          {data.experience.map((item) => (
            <article key={item.id} className="min-w-0 pt-6 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="break-words font-black text-xl text-amber-100" dir="auto">
                  {item.position} <span className="text-white/60 font-medium">@ {item.company}</span>
                </h3>
                <span className="font-mono text-xs text-white/50">{item.startDate} — {item.endDate}</span>
              </div>
              {item.location && <p className="mt-1 text-xs text-white/60" dir="auto">{item.location}</p>}
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/80">
                {[...item.description, ...item.achievements].filter(Boolean).map((bullet, i) => (
                  <li key={i} dir="auto" className="break-words">
                    ✦ {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section id="skills" className="rounded-3xl border-2 border-[#C2410C]/30 bg-white p-8 shadow-sm" style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C2410C]">
          // {L(lang, "Areas of Expertise & Core Capabilities", "مجالات الخبرة والكفاءات الأساسية")}
        </h2>
        <div className="mt-6 space-y-5">
          {data.skills.technical.length > 0 && (
            <div>
              <p className="font-mono text-xs font-bold text-[#92400E]">{L(lang, "Domain Expertise", "الخبرات التخصصية")}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {data.skills.technical.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold text-[#431407]" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div>
              <p className="font-mono text-xs font-bold text-[#92400E]">{L(lang, "Platforms & Tools", "المنصات والأدوات")}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {data.skills.tools.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full border border-orange-200 bg-white px-3.5 py-1 text-xs font-semibold text-[#78350F]" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div>
              <p className="font-mono text-xs font-bold text-[#92400E]">{L(lang, "Speaking & Advisory", "التحدث والاستشارات")}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {data.skills.soft.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full border border-dashed border-[#C2410C]/40 px-3.5 py-1 text-xs text-[#78350F]" dir="auto">
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
        <h2 className="px-1 text-xs font-bold uppercase tracking-[0.25em] text-[#C2410C]">
          // {L(lang, "Education", "التعليم")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.education.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-orange-900/10" style={cardStyle}>
              <h3 className="break-words font-black text-lg text-[#431407]" dir="auto">{item.degree}</h3>
              <p className="break-words text-sm text-[#92400E]" dir="auto">{item.institution}</p>
              <p className="mt-1 font-mono text-xs text-orange-600">{item.startDate} — {item.endDate}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section id="certifications" className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-orange-900/10" style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C2410C] mb-3">
          // {L(lang, "Credentials & Certifications", "الشهادات والاعتمادات")}
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {data.certifications.map((item) => (
            <p key={item.id} className="break-words text-sm font-semibold text-[#431407]" dir="auto">
              ✦ {item.url ? <ExternalLink href={item.url} className="underline">{item.name}</ExternalLink> : item.name}
              {item.issuer && <span className="text-[#92400E]"> ({item.issuer})</span>}
            </p>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section id="languages" className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-orange-900/10" style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C2410C] mb-3">
          // {L(lang, "Languages", "اللغات")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold text-[#431407]" dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section
        id="contact"
        className="rounded-3xl bg-[#431407] p-8 sm:p-12 text-center text-white shadow-xl"
        style={cardStyle}
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
          {L(lang, "Advisory · Keynotes · Engagements", "الاستشارات · المحاضرات · التعاون")}
        </p>
        <h2 className="mt-3 text-3xl font-black sm:text-4xl" dir="auto">
          {L(lang, "Let’s start an inspiring conversation", "لنتواصل معًا ونبدأ حديثًا ملهمًا")}
        </h2>
        <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-sm">
          {p.email && (
            <a href={`mailto:${p.email}`} className="break-all rounded-full bg-white px-6 py-3 font-bold text-[#431407] shadow hover:bg-amber-50" dir="ltr">
              {p.email}
            </a>
          )}
          {p.website && <ExternalLink href={p.website} className="rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10" dir="ltr">Website ↗</ExternalLink>}
          {p.linkedin && <ExternalLink href={p.linkedin} className="rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10">LinkedIn ↗</ExternalLink>}
          {p.phone && <span className="font-mono text-xs text-amber-200" dir="ltr">{p.phone}</span>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className="rounded-3xl bg-white p-7 text-sm shadow-sm ring-1 ring-orange-900/10" headingClassName="font-black text-base text-[#431407] mb-3" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className="rounded-3xl bg-white p-7 text-sm shadow-sm ring-1 ring-orange-900/10" headingClassName="font-black text-base text-[#431407] mb-3" />,
  };

  return (
    <div
      dir={dirOf(lang)}
      className="min-h-full bg-[#FFFBEB] text-[#431407]"
      style={{
        fontFamily: design?.fontFamily || (lang === "ar" ? "'Cairo',sans-serif" : "'Inter',Georgia,serif"),
      }}
    >
      <main className="mx-auto max-w-4xl px-6 py-14 space-y-8">
        {/* HERO */}
        <header className="text-center">
          <div className="relative mx-auto inline-block">
            {p.profileImage ? (
              <ProjectMedia
                src={p.profileImage}
                alt={p.fullName}
                className="mx-auto h-32 w-32 rounded-full border-4 border-white object-cover shadow-2xl ring-2 ring-orange-900/10"
              />
            ) : (
              <div
                className="mx-auto grid h-32 w-32 place-items-center rounded-full text-4xl font-black text-white shadow-2xl"
                style={{ background: accent }}
              >
                {initials(p.fullName)}
              </div>
            )}
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-[#C2410C]">
            {L(lang, "Personal Brand & Consulting", "العلامة الشخصية والاستشارات")}
          </p>
          <h1 className="mt-2 break-words text-4xl font-black tracking-tight sm:text-6xl text-[#431407]" dir="auto">
            {p.fullName || "Consultant"}
          </h1>
          <p className="mt-2 text-lg font-medium text-[#92400E]" dir="auto">
            {p.jobTitle}
            {p.location && ` · ${p.location}`}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-bold">
            {p.email && (
              <a href={`mailto:${p.email}`} className="rounded-full bg-[#431407] px-6 py-2.5 text-white shadow hover:bg-[#5c1d0b]" dir="ltr">
                {L(lang, "Say Hello", "قل مرحبًا")}
              </a>
            )}
            {p.website && (
              <ExternalLink href={p.website} className="rounded-full border border-[#431407]/20 bg-white px-5 py-2.5 text-[#431407] hover:bg-orange-50" dir="ltr">
                Website ↗
              </ExternalLink>
            )}
            {p.linkedin && (
              <ExternalLink href={p.linkedin} className="rounded-full border border-[#431407]/20 bg-white px-5 py-2.5 text-[#431407] hover:bg-orange-50">
                LinkedIn ↗
              </ExternalLink>
            )}
          </div>
        </header>

        {/* ORDERED SECTIONS */}
        <div className="space-y-8">
          {orderedSections(data).map((key) =>
            isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null
          )}
        </div>
      </main>
    </div>
  );
}
