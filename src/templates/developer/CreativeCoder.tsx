import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function CreativeCoder({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const accent = design?.accentColor || "#84cc16";

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="summary" className="my-6 rounded-2xl border-2 border-[#1A2E05] bg-white p-6 shadow-[5px_5px_0_#1A2E05]">
        <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#3F6212]">{"// 00. "}{L(lang, "about.md", "عني.md")}</h2>
        <p className="mt-3 break-words text-sm leading-7 text-[#1A2E05]" dir="auto">{data.professionalSummary}</p>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section id="skills" className="my-6 rounded-2xl border-2 border-[#1A2E05] bg-white p-6 shadow-[5px_5px_0_#1A2E05]">
        <h2 className="font-mono text-sm font-bold text-[#1A2E05]">{"<stack />"} — {L(lang, "Toolbox", "صندوق الأدوات")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[...data.skills.technical, ...data.skills.tools, ...data.skills.soft].map((s, idx) => (
            <span key={`${s}-${idx}`} className="break-words rounded-lg border-2 border-[#1A2E05] bg-lime-200 px-3 py-1 font-mono text-xs font-bold text-[#1A2E05]" dir="auto">
              {s}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className="my-6">
        <h2 className="font-mono text-sm font-bold text-[#1A2E05]">{"{ projects }"} — {data.projects.length} {L(lang, "shipped", "مشروع")}</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((pr, i) => (
            <article key={pr.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border-2 border-[#1A2E05] bg-white shadow-[5px_5px_0_#1A2E05]" style={{ background: i === 0 ? "#F7FEE7" : "#fff" }}>
              {pr.image ? (
                <ProjectMedia src={pr.image} alt={pr.name} className="h-44 w-full border-b-2 border-[#1A2E05] object-cover" />
              ) : (
                <div className="flex h-36 items-center justify-center border-b-2 border-[#1A2E05] bg-lime-100 font-mono text-2xl font-black text-[#1A2E05]">
                  &lt;/{pr.name.slice(0, 3)}&gt;
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <span className="font-mono text-[11px] text-[#3F6212]" dir="ltr">0{i + 1}.run()</span>
                <h3 className="mt-1 break-words font-black text-lg text-[#1A2E05]" dir="auto">{pr.name}</h3>
                {pr.description && <p className="mt-2 break-words text-sm text-[#3F6212]" dir="auto">{pr.description}</p>}
                {pr.technologies.length > 0 && (
                  <p className="mt-3 break-words font-mono text-[11px] text-[#1A2E05]" dir="ltr">[{pr.technologies.join(", ")}]</p>
                )}
                <div className="mt-auto pt-4 flex flex-wrap gap-3 font-mono text-xs font-bold">
                  {pr.projectUrl && <ExternalLink href={pr.projectUrl} className="underline text-[#1A2E05]">demo ↗</ExternalLink>}
                  {pr.githubUrl && <ExternalLink href={pr.githubUrl} className="underline text-[#1A2E05]">code ↗</ExternalLink>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    experience: data.experience.length > 0 ? (
      <section id="experience" className="my-6 rounded-2xl border-2 border-[#1A2E05] bg-[#1A2E05] p-6 text-white shadow-[6px_6px_0_#A3E635]">
        <h2 className="font-mono text-sm font-bold text-lime-300">$ career --log</h2>
        <div className="mt-5 space-y-6">
          {data.experience.map((e) => (
            <article key={e.id} className="min-w-0 border-s-2 border-lime-400 ps-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="break-words font-bold text-white" dir="auto">{e.position} @ {e.company}</h3>
                <span className="font-mono text-xs text-lime-300/70">{e.startDate} → {e.endDate}</span>
              </div>
              {e.location && <p className="text-xs text-white/50" dir="auto">{e.location}</p>}
              <ul className="mt-2 space-y-1.5 text-sm text-white/80">
                {[...e.description, ...e.achievements].filter(Boolean).map((d, i) => (
                  <li key={i} dir="auto" className="break-words">▸ {d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    education: data.education.length > 0 ? (
      <section id="education" className="my-6 grid gap-4 sm:grid-cols-2">
        {data.education.map((e) => (
          <div key={e.id} className="min-w-0 rounded-2xl border-2 border-dashed border-[#1A2E05] bg-white p-5 text-sm shadow-[4px_4px_0_#1A2E05]">
            <p className="font-mono text-xs font-bold text-lime-700">{"// degree"}</p>
            <p className="mt-1 break-words font-black text-[#1A2E05]" dir="auto">{e.degree}</p>
            <p className="break-words text-slate-600" dir="auto">{e.institution}</p>
            <p className="mt-2 font-mono text-xs text-slate-500">{e.startDate} — {e.endDate}</p>
          </div>
        ))}
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section id="certifications" className="my-6 rounded-2xl border-2 border-[#1A2E05] bg-white p-5 shadow-[4px_4px_0_#1A2E05]">
        <h2 className="font-mono text-sm font-bold text-[#1A2E05]">{"[ certifications ]"}</h2>
        <div className="mt-3 space-y-2">
          {data.certifications.map((c) => (
            <p key={c.id} className="break-words font-mono text-xs font-semibold text-[#1A2E05]" dir="auto">
              ✦ {c.url ? <ExternalLink href={c.url} className="underline">{c.name}</ExternalLink> : c.name} {c.issuer && <span className="text-slate-500">({c.issuer})</span>}
            </p>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section id="languages" className="my-6 rounded-2xl border-2 border-[#1A2E05] bg-white p-5 shadow-[4px_4px_0_#1A2E05]">
        <h2 className="font-mono text-sm font-bold text-[#1A2E05]">{"// languages"}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="rounded bg-lime-100 px-2.5 py-1 font-mono text-xs font-bold text-[#1A2E05]" dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section id="contact" className="my-6 rounded-2xl bg-lime-400 p-6 text-sm font-bold text-[#1A2E05] shadow-[6px_6px_0_#1A2E05]">
        <p className="font-black text-lg">{L(lang, "Open to freelance & full-time", "متاح للعمل الحر والدوام الكامل")}</p>
        <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs">
          {p.email && <a href={`mailto:${p.email}`} className="break-all underline" dir="ltr">{p.email}</a>}
          {p.phone && <span dir="ltr">{p.phone}</span>}
          {p.location && <span dir="auto">{p.location}</span>}
          {p.website && <ExternalLink href={p.website} className="underline" dir="ltr">site</ExternalLink>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className="my-6 rounded-2xl border-2 border-[#1A2E05] bg-white p-6 shadow-[5px_5px_0_#1A2E05]" headingClassName="font-mono text-sm font-bold text-[#1A2E05]" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className="my-6 rounded-2xl border-2 border-[#1A2E05] bg-white p-6 shadow-[5px_5px_0_#1A2E05]" headingClassName="font-mono text-sm font-bold text-[#1A2E05]" />,
  };

  return (
    <div dir={dirOf(lang)} className="min-h-full" style={{ background: "#FAFAF5", color: "#1A2E05", fontFamily: design?.fontFamily || (lang === "ar" ? "'IBM Plex Sans Arabic',sans-serif" : "'Inter',sans-serif") }}>
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <header className="overflow-hidden rounded-2xl border-2 border-[#1A2E05] bg-[#1A2E05] shadow-[6px_6px_0_#1A2E05]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-lime-400" />
            <span className="ms-3 font-mono text-xs text-white/60" dir="ltr">portify — {(p.fullName || "developer").toLowerCase().replace(/\s+/g, "-")}.sh</span>
          </div>
          <div className="grid gap-6 p-7 text-white md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="font-mono text-sm text-lime-300" dir="ltr">$ whoami --creative</p>
              <h1 className="mt-1 break-words text-3xl font-black tracking-tight sm:text-5xl" dir="auto">{p.fullName || "Creative Coder"}</h1>
              <p className="mt-2 inline-block rounded-lg px-3 py-1 font-mono text-sm font-bold text-[#1A2E05]" style={{ background: accent }} dir="auto">{p.jobTitle}</p>
              {p.location && <p className="mt-2 font-mono text-xs text-white/60" dir="auto">📍 {p.location}</p>}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
              {p.email && <a href={`mailto:${p.email}`} className="break-all rounded-xl bg-white px-5 py-2.5 text-center font-mono text-xs font-bold text-[#1A2E05]" dir="ltr">{p.email}</a>}
              <div className="flex gap-2">
                {p.github && <ExternalLink href={p.github} className="flex-1 rounded-xl border border-white/25 px-4 py-2.5 text-center font-mono text-xs font-bold text-white hover:bg-white/10">GitHub</ExternalLink>}
                {p.linkedin && <ExternalLink href={p.linkedin} className="flex-1 rounded-xl border border-white/25 px-4 py-2.5 text-center font-mono text-xs font-bold text-white hover:bg-white/10">LinkedIn</ExternalLink>}
              </div>
            </div>
          </div>
        </header>

        <main>
          {orderedSections(data).map((key) => isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null)}
        </main>
      </div>
    </div>
  );
}
