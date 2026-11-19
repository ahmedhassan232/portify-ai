import type { ReactNode } from "react";
import type { TemplateProps } from "../shared";
import { dirOf, ExternalLink, initials, isVisible, L, orderedSections, ProjectMedia, SupplementalSections } from "../shared";

export default function ExecutivePortfolio({ data, lang, design }: TemplateProps) {
  const p = data.personalInfo;
  const gold = design?.accentColor || "#D4AF37";
  const borderGold = "border border-[#D4AF37]/25 bg-white/[0.03] p-8";

  const section: Record<string, ReactNode> = {
    summary: data.professionalSummary ? (
      <section id="about" className="my-10 text-center">
        <div className="mx-auto h-px w-20" style={{ background: gold }} />
        <h2 className="mt-4 text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>
          {L(lang, "Executive Mandate & Vision", "الرؤية والقيادة التنفيذية")}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-[#F5F0E8]/85 sm:text-2xl" dir="auto">
          “{data.professionalSummary}”
        </p>
      </section>
    ) : null,

    projects: data.projects.length > 0 ? (
      <section id="projects" className="my-10 space-y-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>
            {L(lang, "Strategic Initiatives & Transformations", "المبادرات والتحولات الاستراتيجية")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {data.projects.map((pr) => (
            <article key={pr.id} className={borderGold}>
              {pr.image ? (
                <ProjectMedia src={pr.image} alt={pr.name} className="mb-5 h-48 w-full object-cover filter contrast-105" />
              ) : null}
              <span className="font-serif text-xs uppercase tracking-widest text-[#D4AF37]">✦ INITIATIVE</span>
              <h3 className="mt-1 break-words font-serif text-2xl text-[#F5F0E8]" dir="auto">{pr.name}</h3>
              {pr.description && <p className="mt-3 break-words font-serif text-sm leading-relaxed text-white/70" dir="auto">{pr.description}</p>}
              {pr.technologies.length > 0 && (
                <p className="mt-4 break-words text-xs tracking-wider text-[#D4AF37]/90" dir="auto">
                  {pr.technologies.join(" · ")}
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold">
                {pr.projectUrl && <ExternalLink href={pr.projectUrl} className="underline" style={{ color: gold }}>{L(lang, "Executive Brief ↗", "ملخص المبادرة ↗")}</ExternalLink>}
                {pr.githubUrl && <ExternalLink href={pr.githubUrl} className="text-white/50 underline">Source</ExternalLink>}
              </div>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    experience: data.experience.length > 0 ? (
      <section id="experience" className="my-12">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>
            {L(lang, "Leadership & Governance Trajectory", "المسيرة القيادية والحوكمة")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {data.experience.map((e) => (
            <article key={e.id} className={borderGold}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-serif text-xs tracking-wider" style={{ color: gold }}>{e.startDate} — {e.endDate}</span>
                {e.location && <span className="text-xs text-white/40" dir="auto">{e.location}</span>}
              </div>
              <h3 className="mt-3 break-words font-serif text-2xl text-[#F5F0E8]" dir="auto">{e.position}</h3>
              <p className="mt-1 break-words font-serif text-sm text-white/60" dir="auto">{e.company}</p>
              <ul className="mt-4 space-y-2 font-serif text-sm leading-relaxed text-white/70">
                {[...e.description, ...e.achievements].filter(Boolean).map((d, i) => (
                  <li key={i} dir="auto" className="break-words">
                    — {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ) : null,

    skills: (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length > 0) ? (
      <section id="skills" className="my-10">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>
            {L(lang, "Executive & Board Competencies", "الكفاءات والخبرات القيادية")}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {data.skills.technical.length > 0 && (
            <div className={borderGold}>
              <p className="font-serif text-xs uppercase tracking-widest text-[#D4AF37]">{L(lang, "Governance & Strategy", "الحوكمة والاستراتيجية")}</p>
              <ul className="mt-3 space-y-1.5 font-serif text-sm text-white/80">
                {data.skills.technical.map((s, idx) => (
                  <li key={`${s}-${idx}`} dir="auto" className="break-words">✦ {s}</li>
                ))}
              </ul>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div className={borderGold}>
              <p className="font-serif text-xs uppercase tracking-widest text-[#D4AF37]">{L(lang, "Capital & Transformation", "رأس المال والتحول")}</p>
              <ul className="mt-3 space-y-1.5 font-serif text-sm text-white/80">
                {data.skills.tools.map((s, idx) => (
                  <li key={`${s}-${idx}`} dir="auto" className="break-words">✦ {s}</li>
                ))}
              </ul>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div className={borderGold}>
              <p className="font-serif text-xs uppercase tracking-widest text-[#D4AF37]">{L(lang, "Leadership & Culture", "القيادة والثقافة")}</p>
              <ul className="mt-3 space-y-1.5 font-serif text-sm text-white/80">
                {data.skills.soft.map((s, idx) => (
                  <li key={`${s}-${idx}`} dir="auto" className="break-words">✦ {s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    ) : null,

    education: data.education.length > 0 ? (
      <section id="education" className="my-10">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>
            {L(lang, "Academic & Executive Credentials", "التعليم الأكاديمي والشهادات العليا")}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {data.education.map((e) => (
            <div key={e.id} className={borderGold}>
              <span className="text-[#D4AF37]">✦</span>
              <h3 className="mt-2 break-words font-serif text-xl text-[#F5F0E8]" dir="auto">{e.degree}</h3>
              <p className="mt-1 break-words font-serif text-sm text-white/60" dir="auto">{e.institution}</p>
              <p className="mt-2 font-mono text-xs text-white/40">{e.startDate} — {e.endDate}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: data.certifications.length > 0 ? (
      <section id="certifications" className="my-10">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>
            {L(lang, "Board Credentials & Fellowships", "الزمالات والاعتمادات القيادية")}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.certifications.map((c) => (
            <div key={c.id} className={borderGold}>
              <p className="break-words font-serif text-base text-[#F5F0E8]" dir="auto">
                {c.url ? <ExternalLink href={c.url} className="underline" style={{ color: gold }}>{c.name}</ExternalLink> : c.name}
              </p>
              <p className="mt-1 font-serif text-xs text-white/50">{c.issuer}{c.date ? ` · ${c.date}` : ""}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: data.languages.length > 0 ? (
      <section id="languages" className="my-10 text-center">
        <p className="text-xs uppercase tracking-[0.35em] mb-4" style={{ color: gold }}>
          {L(lang, "Languages", "اللغات")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {data.languages.map((l, idx) => (
            <span key={`${l}-${idx}`} className="border border-[#D4AF37]/30 px-5 py-1.5 font-serif text-sm text-white/80" dir="auto">
              {l}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    contact: (
      <section id="contact" className="my-12 p-10 text-center text-black" style={{ background: gold }}>
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-black/70">
          {L(lang, "Board Appointments & Strategic Advisory", "التعيينات واللجان الاستشارية")}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-light sm:text-4xl" dir="auto">
          {L(lang, "Available for Board, Advisory & C-Suite Inquiries", "متاح لمجالس الإدارة، الاستشارات الاستراتيجية، والقيادة العليا")}
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold">
          {p.email && (
            <a href={`mailto:${p.email}`} className="break-all bg-black px-6 py-3 text-white shadow hover:bg-neutral-800" dir="ltr">
              {p.email}
            </a>
          )}
          {p.website && <ExternalLink href={p.website} className="border border-black px-6 py-3 text-black hover:bg-black/10" dir="ltr">Website ↗</ExternalLink>}
          {p.linkedin && <ExternalLink href={p.linkedin} className="border border-black px-6 py-3 text-black hover:bg-black/10">LinkedIn ↗</ExternalLink>}
          {p.phone && <span className="font-mono text-xs text-black/80 self-center" dir="ltr">{p.phone}</span>}
        </div>
      </section>
    ),

    additional: <SupplementalSections data={data} lang={lang} section="additional" className={`${borderGold} my-8 font-serif text-sm text-white/70`} headingClassName="text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-3" />,
    custom: <SupplementalSections data={data} lang={lang} section="custom" className={`${borderGold} my-8 font-serif text-sm text-white/70`} headingClassName="text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-3" />,
  };

  return (
    <div
      dir={dirOf(lang)}
      className="min-h-full bg-[#181615] text-[#F5F0E8]"
      style={{
        fontFamily: design?.fontFamily || (lang === "ar" ? "'Cairo',serif" : "'Inter',Georgia,serif"),
      }}
    >
      <div className="mx-auto max-w-5xl px-8 py-16">
        {/* HEADER */}
        <header className="border-b border-[#D4AF37]/30 pb-12">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>
            <span>Executive Portfolio</span>
            <span dir="auto">{p.location || "International"}</span>
          </div>
          <div className="mt-12 text-center">
            {p.profileImage ? (
              <ProjectMedia src={p.profileImage} alt={p.fullName} className="mx-auto h-28 w-28 rounded-full border-2 border-[#D4AF37]/50 object-cover shadow-2xl filter grayscale contrast-125" />
            ) : (
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-[#D4AF37]/40 text-2xl font-serif text-[#D4AF37]">
                {initials(p.fullName)}
              </div>
            )}
            <h1 className="mt-6 break-words font-serif text-5xl font-light tracking-wide sm:text-7xl text-[#F5F0E8]" dir="auto">
              {p.fullName || "Executive Leader"}
            </h1>
            <p className="mt-4 break-words text-sm uppercase tracking-[0.35em]" style={{ color: gold }} dir="auto">
              {p.jobTitle || L(lang, "Chief Executive Officer & Board Director", "رئيس تنفيذي وعضو مجلس إدارة")}
            </p>
          </div>
        </header>

        {/* ORDERED SLOTS */}
        <main>
          {orderedSections(data).map((key) =>
            isVisible(data, key) && section[key] ? <div key={key}>{section[key]}</div> : null
          )}
        </main>
      </div>
    </div>
  );
}
