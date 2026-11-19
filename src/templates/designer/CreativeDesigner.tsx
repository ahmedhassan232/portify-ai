import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function CreativeDesigner({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const accent = design?.accentColor || "#E85D3D";

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="about" className="my-10 border-b border-[#2A2118]/15 pb-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#A08B6D]">{L(lang, "Philosophy & Direction", "الفلسفة والتوجه")}</p>
        <p className="mt-4 max-w-3xl break-words text-xl font-medium leading-relaxed text-[#2A2118] sm:text-2xl" dir="auto">
          {data.professionalSummary}
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="work" className="my-10">
        <div className="flex items-baseline justify-between border-b border-[#2A2118] pb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#2A2118]">{L(lang, "Featured Works", "أعمال مختارة")}</h2>
          <span className="font-mono text-xs text-[#A08B6D]">01 — 0{data.projects.length}</span>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((pr, i) => (
            <article key={pr.id} className="group flex min-w-0 flex-col overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#2A2118]/10 transition hover:-translate-y-1 hover:shadow-xl" style={{ transform: i % 2 === 1 ? "translateY(12px)" : undefined }}>
              {pr.image ? (
                <ProjectMedia src={pr.image} alt={pr.name} className="h-56 w-full object-cover transition duration-300 group-hover:scale-105" />
              ) : (
                <div className="flex h-56 items-center justify-center p-6 text-center text-3xl font-black text-white" style={{ background: ["#E85D3D", "#2A2118", "#E9B44C"][i % 3] }} dir="auto">
                  {pr.name.slice(0, 1)}
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[11px] font-bold text-[#A08B6D]" dir="ltr">PROJ // 0{i + 1}</span>
                <h3 className="mt-1 break-words text-xl font-black text-[#2A2118]" dir="auto">{pr.name}</h3>
                {pr.description && <p className="mt-2 break-words text-sm leading-6 text-[#6B5D4D]" dir="auto">{pr.description}</p>}
                {pr.technologies.length > 0 && (
                  <p className="mt-4 break-words text-xs font-bold uppercase tracking-wider text-[#E85D3D]" dir="auto">
                    {pr.technologies.join(" — ")}
                  </p>
                )}
                <div className="mt-auto pt-5 flex flex-wrap gap-4 text-xs font-bold">
                  {pr.projectUrl && <ExternalLink href={pr.projectUrl} className="text-[#2A2118] underline underline-offset-4">{L(lang, "View Project ↗", "عرض المشروع ↗")}</ExternalLink>}
                  {pr.githubUrl && <ExternalLink href={pr.githubUrl} className="text-[#A08B6D] underline underline-offset-4">Source</ExternalLink>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    experience: data.experience.length > 0 ? (
      <section id="experience" className="my-10 rounded-[28px] bg-[#2A2118] p-8 text-[#FAF5EF] shadow-xl sm:p-12">
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#E9B44C]">{L(lang, "Career Trajectory", "المسيرة المهنية")}</h2>
        <div className="mt-8 space-y-8 divide-y divide-white/10">
          {data.experience.map((e) => (
            <article key={e.id} className="min-w-0 pt-6 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="break-words text-xl font-bold" dir="auto">
                  {e.position} <span className="text-[#E9B44C]">@ {e.company}</span>
                </h3>
                <span className="font-mono text-xs text-white/50">{e.startDate} — {e.endDate}</span>
              </div>
              {e.location && <p className="mt-1 text-xs text-white/60" dir="auto">{e.location}</p>}
              <ul className="mt-3 space-y-1.5 text-sm leading-6 text-white/75">
                {[...e.description, ...e.achievements].filter(Boolean).map((d, i) => (
                  <li key={i} dir="auto" className="break-words">✦ {d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section id="skills" className="my-10 rounded-[24px] border-2 border-[#2A2118] bg-white p-7 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#A08B6D]">{L(lang, "Disciplines & Tools", "التخصصات والأدوات")}</h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {[...data.skills.technical, ...data.skills.tools, ...data.skills.soft].map((s, idx) => (
            <span key={`${s}-${idx}`} className="break-words rounded-full border border-[#2A2118] px-4 py-1.5 text-xs font-bold text-[#2A2118]" dir="auto">
              {s}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    education: data.education.length > 0 ? (
      <section id="education" className="my-10 grid gap-4 sm:grid-cols-2">
        {data.education.map((e) => (
          <div key={e.id} className="min-w-0 rounded-[20px] bg-white p-6 shadow-sm ring-1 ring-[#2A2118]/10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E85D3D]">✦ Degree</span>
            <h3 className="mt-1 break-words font-black text-lg text-[#2A2118]" dir="auto">{e.degree}</h3>
            <p className="break-words text-sm text-[#6B5D4D]" dir="auto">{e.institution}</p>
            <p className="mt-2 font-mono text-xs text-[#A08B6D]">{e.startDate} — {e.endDate}</p>
          </div>
        ))}
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section id="certifications" className="my-8 rounded-[20px] bg-white p-6 shadow-sm ring-1 ring-[#2A2118]/10">
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#A08B6D]">{L(lang, "Credentials", "الاعتمادات")}</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {data.certifications.map((c) => (
            <span key={c.id} className="break-words text-sm font-semibold text-[#2A2118]" dir="auto">
              ✦ {c.url ? <ExternalLink href={c.url} className="underline">{c.name}</ExternalLink> : c.name} {c.issuer && <span className="text-[#6B5D4D]">({c.issuer})</span>}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section id="languages" className="my-8">
        <div className="flex flex-wrap gap-3 text-sm text-[#6B5D4D]">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="rounded-full bg-white px-4 py-1 font-medium shadow-sm ring-1 ring-[#2A2118]/10" dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section id="contact" className="my-10 rounded-[28px] p-8 text-white shadow-xl sm:p-12" style={{ background: accent }}>
        <h2 className="text-3xl font-black sm:text-4xl" dir="auto">{L(lang, "Let's create something extraordinary", "لنبتكر شيئًا استثنائيًا")}</h2>
        <p className="mt-2 text-sm text-white/80">{L(lang, "Available for select freelance, art direction, and design leadership opportunities.", "متاح لمشاريع مختارة، الإدارة الفنية، والقيادة التصميمية.")}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {p.email && <a href={`mailto:${p.email}`} className="break-all rounded-full bg-white px-6 py-3 text-sm font-bold text-[#2A2118] shadow hover:bg-[#FAF5EF]" dir="ltr">{p.email}</a>}
          {p.phone && <span className="font-mono text-sm text-white" dir="ltr">{p.phone}</span>}
          {p.website && <ExternalLink href={p.website} className="rounded-full border border-white/40 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10" dir="ltr">Website ↗</ExternalLink>}
          {p.linkedin && <ExternalLink href={p.linkedin} className="rounded-full border border-white/40 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10">LinkedIn</ExternalLink>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className="my-8 rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-[#2A2118]/10" headingClassName="text-sm font-bold uppercase tracking-widest text-[#A08B6D]" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className="my-8 rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-[#2A2118]/10" headingClassName="text-sm font-bold uppercase tracking-widest text-[#A08B6D]" />,
  };

  return (
    <div dir={dirOf(lang)} style={{ background: "#FAF5EF", color: "#2A2118", fontFamily: design?.fontFamily || (lang === "ar" ? "'Cairo',sans-serif" : "'Inter',Georgia,serif") }} className="min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <header className="border-b border-[#2A2118]/15 pb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#A08B6D]">
            <span>Portfolio — 2026</span>
            <span dir="auto">{p.location}</span>
          </div>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h1 className="break-words font-black tracking-tight leading-[0.95]" style={{ fontSize: "clamp(42px,8vw,96px)" }} dir="auto">
                {p.fullName || "Creative Director"}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full px-5 py-1.5 text-sm font-bold text-white shadow-sm" style={{ background: accent }} dir="auto">
                  {p.jobTitle}
                </span>
                {p.location && <span className="text-sm text-[#6B5D4D]" dir="auto">📍 {p.location}</span>}
              </div>
            </div>
            {p.profileImage ? (
              <ProjectMedia src={p.profileImage} alt={p.fullName} className="h-28 w-28 rounded-[24px] object-cover shadow-lg ring-2 ring-[#2A2118]/10" />
            ) : (
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-[24px] text-3xl font-black text-white shadow-lg" style={{ background: accent }}>
                {initials(p.fullName)}
              </div>
            )}
          </div>
        </header>

        <main>
          {orderedSections(data).map((key) => isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null)}
        </main>
      </div>
    </div>
  );
}
