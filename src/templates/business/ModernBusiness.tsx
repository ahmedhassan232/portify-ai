import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function ModernBusiness({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const accent = design?.accentColor || "#6C4CF1";
  const radius = design?.borderRadius ?? 24;

  const card = "min-w-0 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#E9E7F0] transition hover:shadow-md";

  const cardStyle = {
    borderRadius: `${radius}px`,
  };

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="about" className={card} style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#73738A]">
          // {L(lang, "Executive Overview & Value Proposition", "الملخص التنفيذي وعرض القيمة")}
        </h2>
        <p className="mt-3 break-words text-lg leading-relaxed text-[#171625]/85 sm:text-xl font-normal" dir="auto">
          {data.professionalSummary}
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className="space-y-4">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#73738A]">
            // {L(lang, "Business Projects & Client Engagements", "المشاريع وأعمال الاستشارات")}
          </h2>
          <span className="font-mono text-xs text-[#73738A]">({data.projects.length})</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {data.projects.map((project) => (
            <article key={project.id} className="flex min-w-0 flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#E9E7F0] shadow-sm transition hover:-translate-y-1 hover:shadow-xl" style={cardStyle}>
              {project.image ? (
                <ProjectMedia src={project.image} alt={project.name} className="h-44 w-full object-cover border-b border-[#E9E7F0]" />
              ) : (
                <div className="flex h-36 items-center justify-center text-2xl font-black text-white" style={{ background: accent }}>
                  {project.name.slice(0, 1)}
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="break-words font-extrabold text-lg text-[#171625]" dir="auto">{project.name}</h3>
                {project.description && (
                  <p className="mt-2 break-words text-sm leading-relaxed text-[#73738A]" dir="auto">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((t, idx) => (
                      <span key={`${t}-${idx}`} className="rounded-full bg-[#F1EFFD] px-2.5 py-0.5 text-[11px] font-bold" style={{ color: accent }} dir="auto">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-5 flex flex-wrap gap-3 text-xs font-bold">
                  {project.projectUrl && (
                    <ExternalLink href={project.projectUrl} className="hover:underline" style={{ color: accent }}>
                      {L(lang, "Case Study ↗", "عرض دراسة الحالة ↗")}
                    </ExternalLink>
                  )}
                  {project.githubUrl && (
                    <ExternalLink href={project.githubUrl} className="text-[#73738A] hover:underline">
                      Overview
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
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#73738A] mb-5">
          // {L(lang, "Professional Experience & Track Record", "الخبرة المهنية وسجل الإنجاز")}
        </h2>
        <div className="space-y-6 divide-y divide-[#E9E7F0]">
          {data.experience.map((e) => (
            <article key={e.id} className="min-w-0 pt-6 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="break-words font-bold text-base text-[#171625]" dir="auto">
                  {e.position} <span className="text-[#73738A] font-semibold">· {e.company}</span>
                </h3>
                <span className="font-mono text-xs text-[#73738A]">{e.startDate} — {e.endDate}</span>
              </div>
              {e.location && <p className="mt-1 text-xs text-[#73738A]" dir="auto">{e.location}</p>}
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-[#4b4a63]">
                {[...e.description, ...e.achievements].filter(Boolean).map((d, i) => (
                  <li key={i} dir="auto" className="break-words">
                    • {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section className="text-white p-8 shadow-xl" style={{ ...cardStyle, background: accent }}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/80">
          // {L(lang, "Expertise, Services & Tools", "الخبرات والخدمات والأدوات")}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {data.skills.technical.length > 0 && (
            <div>
              <p className="font-mono text-xs text-white/80">{L(lang, "Functional Expertise", "الخبرات التخصصية")}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {data.skills.technical.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white" dir="auto">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div>
              <p className="font-mono text-xs text-white/80">{L(lang, "Business Tools", "أدوات الأعمال")}</p>
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
              <p className="font-mono text-xs text-white/80">{L(lang, "Leadership", "القيادة والاستشارات")}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {data.skills.soft.map((s, idx) => (
                  <span key={`${s}-${idx}`} className="rounded-full border border-white/30 px-3 py-1 text-xs text-white" dir="auto">
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
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#73738A] mb-4">
          // {L(lang, "Education", "التعليم")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.education.map((e) => (
            <div key={e.id} className="min-w-0 border-s-2 border-slate-200 ps-4">
              <h3 className="break-words font-bold text-[#171625] text-sm" dir="auto">{e.degree}</h3>
              <p className="break-words text-sm text-[#73738A]" dir="auto">{e.institution}</p>
              <p className="mt-1 font-mono text-xs text-[#73738A]">{e.startDate} — {e.endDate}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section id="certifications" className={card} style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#73738A] mb-4">
          // {L(lang, "Certifications & Credentials", "الشهادات والاعتمادات")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.certifications.map((c) => (
            <div key={c.id} className="min-w-0 rounded-2xl bg-[#FAFAFC] p-3.5 border border-[#E9E7F0]">
              <p className="break-words font-semibold text-sm text-[#171625]" dir="auto">
                {c.url ? <ExternalLink href={c.url} className="underline" style={{ color: accent }}>{c.name}</ExternalLink> : c.name}
              </p>
              <p className="mt-1 font-mono text-xs text-[#73738A]">{c.issuer}{c.date ? ` · ${c.date}` : ""}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section id="languages" className={card} style={cardStyle}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#73738A] mb-3">
          // {L(lang, "Languages", "اللغات")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="rounded-lg bg-[#F1EFFD] px-3.5 py-1 text-xs font-bold" style={{ color: accent }} dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section id="contact" className={card} style={cardStyle}>
        <h2 className="text-xl font-bold text-[#171625]" dir="auto">
          {L(lang, "Get in Touch & Consult", "تواصل واستشر")}
        </h2>
        <p className="mt-1 text-sm text-[#73738A]">
          {L(lang, "Available for consulting engagements, business advisory, and partnership discussions.", "متاح لمشاريع الاستشارات، تقديم المشورة للأعمال، وفرص الشراكة.")}
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
          {p.email && (
            <a href={`mailto:${p.email}`} className="break-all rounded-full px-5 py-2.5 text-xs text-white shadow" style={{ background: accent }} dir="ltr">
              {p.email}
            </a>
          )}
          {p.phone && <span className="font-mono text-xs text-[#73738A] self-center" dir="ltr">{p.phone}</span>}
          {p.website && <ExternalLink href={p.website} className="rounded-full border border-[#E9E7F0] bg-[#FAFAFC] px-4 py-2 text-xs text-[#171625] hover:border-[#6C4CF1]" dir="ltr">Website ↗</ExternalLink>}
          {p.linkedin && <ExternalLink href={p.linkedin} className="rounded-full border border-[#E9E7F0] bg-[#FAFAFC] px-4 py-2 text-xs text-[#171625] hover:border-[#6C4CF1]">LinkedIn ↗</ExternalLink>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className={`${card} text-sm`} headingClassName="text-xs font-bold uppercase tracking-widest text-[#73738A] mb-3" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className={`${card} text-sm`} headingClassName="text-xs font-bold uppercase tracking-widest text-[#73738A] mb-3" />,
  };

  return (
    <div
      dir={dirOf(lang)}
      style={{
        background: "#FAFAFC",
        color: "#171625",
        fontFamily: design?.fontFamily || (lang === "ar" ? "'IBM Plex Sans Arabic',sans-serif" : "'Inter',sans-serif"),
      }}
      className="min-h-full"
    >
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        {/* HEADER */}
        <header className="rounded-[28px] bg-white p-8 shadow-[0_20px_60px_-20px_rgba(108,76,241,0.25)] ring-1 ring-[#E9E7F0] md:flex md:items-center md:gap-8" style={cardStyle}>
          {p.profileImage ? (
            <ProjectMedia src={p.profileImage} alt={p.fullName} className="h-28 w-28 rounded-[22px] object-cover ring-2 ring-[#E9E7F0]" />
          ) : (
            <div className="grid h-28 w-28 shrink-0 place-items-center rounded-[22px] text-3xl font-black text-white shadow-lg" style={{ background: accent }}>
              {initials(p.fullName)}
            </div>
          )}
          <div className="mt-4 flex-1 md:mt-0 min-w-0">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#73738A]">Modern Business Consultant</span>
            <h1 className="mt-1 break-words text-4xl font-extrabold tracking-tight text-[#171625]" dir="auto">
              {p.fullName || "Business Consultant"}
            </h1>
            <p className="mt-1 font-semibold text-base" style={{ color: accent }} dir="auto">
              {p.jobTitle || L(lang, "Business Advisor & Strategist", "مستشار أعمال واستراتيجي")}
            </p>
            <p className="mt-1 text-sm text-[#73738A]" dir="auto">
              {p.location}
              {p.email && <span className="ms-2 font-mono text-xs" dir="ltr">· {p.email}</span>}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
            {p.email && (
              <a href={`mailto:${p.email}`} className="rounded-full px-5 py-2.5 text-sm font-bold text-white shadow hover:opacity-90" style={{ background: accent }}>
                {L(lang, "Contact", "تواصل")}
              </a>
            )}
            {p.linkedin && (
              <ExternalLink href={p.linkedin} className="rounded-full bg-[#F1EFFD] px-5 py-2.5 text-sm font-bold" style={{ color: accent }}>
                LinkedIn
              </ExternalLink>
            )}
          </div>
        </header>

        {/* ORDERED SLOTS */}
        <main className="space-y-6">
          {orderedSections(data).map((key) =>
            isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null
          )}
        </main>
      </div>
    </div>
  );
}
