import type { DesignSettings, PortfolioData } from "@/types/portfolio";
import { templateById } from "./templates-registry";

function esc(s: string): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function ltr(s: string): string {
  return `<bdi dir="auto">${esc(s)}</bdi>`;
}

export function buildStandaloneHTML(data: PortfolioData, design: DesignSettings, templateId: string, lang: "en" | "ar"): string {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const meta = templateById(templateId);
  const accent = design.accentColor || meta.accent;
  const font = lang === "ar" ? "'IBM Plex Sans Arabic','Cairo',system-ui,sans-serif" : `'Inter',system-ui,-apple-system,sans-serif`;
  const p = data.personalInfo;
  const vis = (k: string) => data.sectionVisibility[k] !== false;
  const order = data.sectionOrder?.length ? data.sectionOrder : ["summary", "skills", "experience", "projects", "education", "certifications", "languages", "contact"];

  const t = {
    skills: lang === "ar" ? "المهارات" : "Skills",
    experience: lang === "ar" ? "الخبرات" : "Experience",
    projects: lang === "ar" ? "المشاريع" : "Projects",
    education: lang === "ar" ? "التعليم" : "Education",
    certs: lang === "ar" ? "الشهادات" : "Certifications",
    langs: lang === "ar" ? "اللغات" : "Languages",
    contact: lang === "ar" ? "تواصل" : "Contact",
    summary: lang === "ar" ? "نبذة" : "About",
    viewProject: lang === "ar" ? "عرض المشروع" : "View project",
    code: lang === "ar" ? "الكود" : "Code",
    present: lang === "ar" ? "الآن" : "Present",
    builtWith: lang === "ar" ? "صُنع باستخدام Portify AI" : "Built with Portify AI",
  };

  const initials = (p.fullName || "P").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const sectionHtml: Record<string, string> = {
    summary: vis("summary") && data.professionalSummary ? `<section id="about" class="card"><h2>${t.summary}</h2><p class="muted big">${ltrs(data.professionalSummary)}</p></section>` : "",
    skills: vis("skills") ? `<section id="skills" class="card"><h2>${t.skills}</h2><div class="chips">${[...data.skills.technical, ...data.skills.tools].map((s) => `<span class="chip">${ltrs(s)}</span>`).join("")}</div>${data.skills.soft.length ? `<p class="soft">${data.skills.soft.map((s) => ltrs(s)).join(" · ")}</p>` : ""}</section>` : "",
    experience: vis("experience") && data.experience.length ? `<section id="experience" class="card"><h2>${t.experience}</h2><div class="timeline">${data.experience.map((e) => `<div class="tl-item"><div class="tl-dot"></div><div><div class="row-between"><strong>${ltrs(e.position)}</strong><span class="pill">${esc(e.startDate)} — ${esc(e.endDate || t.present)}</span></div><div class="muted">${ltrs(e.company)}${e.location ? " · " + ltrs(e.location) : ""}</div><ul>${[...e.description, ...e.achievements].map((d) => `<li>${ltrs(d)}</li>`).join("")}</ul></div></div>`).join("")}</div></section>` : "",
    projects: vis("projects") && data.projects.length ? `<section id="projects"><h2 class="sec-title">${t.projects}</h2><div class="grid">${data.projects.map((pr) => `<article class="card proj"><div class="proj-top">${pr.image ? `<img src="${esc(pr.image)}" alt="${esc(pr.name)}"/>` : `<div class="proj-ph">${esc(pr.name.slice(0, 1).toUpperCase() || "P")}</div>`}<h3>${ltrs(pr.name)}</h3><p class="muted">${ltrs(pr.description)}</p><div class="chips sm">${pr.technologies.map((x) => `<span class="chip sm">${ltrs(x)}</span>`).join("")}</div><div class="links">${pr.projectUrl ? `<a href="${esc(pr.projectUrl)}" target="_blank" rel="noopener">${t.viewProject} →</a>` : ""}${pr.githubUrl ? `<a href="${esc(pr.githubUrl)}" target="_blank" rel="noopener">${t.code} ↗</a>` : ""}</div></div></article>`).join("")}</div></section>` : "",
    education: vis("education") && data.education.length ? `<section id="education" class="card"><h2>${t.education}</h2>${data.education.map((e) => `<div class="edu"><strong>${ltrs(e.degree)}</strong><div class="muted">${ltrs(e.institution)} · ${esc(e.startDate)} — ${esc(e.endDate)}</div>${e.description ? `<p class="muted">${ltrs(e.description)}</p>` : ""}</div>`).join("")}</section>` : "",
    certifications: vis("certifications") && data.certifications.length ? `<section id="certs" class="card"><h2>${t.certs}</h2><ul class="certs">${data.certifications.map((c) => `<li><strong>${ltrs(c.name)}</strong>${c.issuer ? ` <span class="muted">— ${ltrs(c.issuer)}</span>` : ""}</li>`).join("")}</ul></section>` : "",
    languages: vis("languages") && data.languages.length ? `<section id="languages" class="card"><h2>${t.langs}</h2><div class="chips">${data.languages.map((l) => `<span class="chip">${ltrs(l)}</span>`).join("")}</div></section>` : "",
    contact: vis("contact") ? `<section id="contact" class="card contact"><h2>${t.contact}</h2><div class="contact-grid">${p.email ? `<a href="mailto:${esc(p.email)}" dir="ltr">${esc(p.email)}</a>` : ""}${p.phone ? `<span dir="ltr">${esc(p.phone)}</span>` : ""}${p.location ? `<span>${ltrs(p.location)}</span>` : ""}${p.website ? `<a href="${esc(p.website)}" target="_blank" rel="noopener" dir="ltr">${esc(p.website)}</a>` : ""}${p.linkedin ? `<a href="${esc(p.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>` : ""}${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}</div></section>` : "",
  };

  function ltrs(s: string) {
    return ltr(s ?? "");
  }

  sectionHtml.additional = vis("additional") && data.additionalInformation.some(Boolean) ? `<section class="card"><h2>${lang === "ar" ? "معلومات إضافية" : "Additional information"}</h2><ul>${data.additionalInformation.filter(Boolean).map((item) => `<li>${ltrs(item)}</li>`).join("")}</ul></section>` : "";
  sectionHtml.custom = vis("custom") ? (data.customSections || []).filter((c) => c.title.trim() || c.content.trim()).map((c) => `<section class="card"><h2>${ltrs(c.title)}</h2><p class="muted big">${ltrs(c.content)}</p></section>`).join("") : "";
  const completeOrder = [...order, "additional", "custom"].filter((key, index, all) => all.indexOf(key) === index);
  const ordered = completeOrder.map((k) => sectionHtml[k] ?? "").join("\n");

  const profileImg = p.profileImage ? `<img class="avatar" src="${p.profileImage.startsWith("data:") ? p.profileImage : esc(p.profileImage)}" alt="${esc(p.fullName)}"/>` : `<div class="avatar ph">${esc(initials)}</div>`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(p.fullName || "Portfolio")} — ${esc(p.jobTitle || "")}</title>
<meta name="description" content="${esc((data.professionalSummary || "").slice(0, 160))}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="styles.css"/>
</head>
<body>
<header class="nav"><div class="nav-inner"><a class="brand" href="#top">${esc((p.fullName || "P").split(" ")[0] || "Portfolio")}<span>.</span></a><nav class="links"><a href="#about">${t.summary}</a><a href="#experience">${t.experience}</a><a href="#projects">${t.projects}</a><a href="#contact" class="btn">${t.contact}</a><button id="menuBtn" aria-label="menu">☰</button></nav></div><div id="mobileMenu" class="mobile"><a href="#about">${t.summary}</a><a href="#experience">${t.experience}</a><a href="#projects">${t.projects}</a><a href="#contact">${t.contact}</a></div></header>
<main id="top" class="wrap">
<section class="hero">
<div class="hero-text"><p class="kicker">${ltrs(p.location || "")}</p><h1>${ltrs(p.fullName || "Your Name")}</h1><p class="role">${ltrs(p.jobTitle || "")}</p><p class="muted big">${ltrs((data.professionalSummary || "").slice(0, 220))}</p><div class="cta"><a class="btn primary" href="#projects">${t.projects}</a><a class="btn ghost" href="#contact">${t.contact}</a></div></div>
<div class="hero-card">${profileImg}<div class="hero-meta">${p.email ? `<div dir="ltr" class="mono">${esc(p.email)}</div>` : ""}<div class="chips sm">${data.skills.technical.slice(0, 4).map((s) => `<span class="chip sm">${ltrs(s)}</span>`).join("")}</div></div></div>
</section>
${ordered}
<footer><p>${t.builtWith} — ${esc(p.fullName)}</p></footer>
</main>
<script src="script.js"></script>
</body>
</html>`;
}

export function buildStylesheet(design: DesignSettings, templateId: string, lang: "en" | "ar"): string {
  const meta = templateById(templateId);
  const accent = design.accentColor || meta.accent;
  const font = lang === "ar" ? "'IBM Plex Sans Arabic','Cairo',system-ui,sans-serif" : "'Inter',system-ui,sans-serif";
  const radius = design.borderRadius ?? 14;
  const dark = templateId === "modern-tech" || templateId === "visual-showcase" || templateId === "executive-portfolio";
  const bg = dark ? (templateById(templateId).bg) : (design.backgroundColor || "#FFFFFF");
  const fg = dark ? "#F4F3FF" : (design.textColor || "#171625");
  return `:root{--accent:${accent};--bg:${bg};--fg:${fg};--muted:${dark ? "#A9A8C0" : "#73738A"};--card:${dark ? "rgba(255,255,255,.06)" : "#fff"};--border:${dark ? "rgba(255,255,255,.12)" : "#E9E7F0"};--radius:${radius}px;--font:${font}}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:var(--font);background:var(--bg);color:var(--fg);line-height:1.7}
.wrap{max-width:1080px;margin:0 auto;padding:0 20px 60px}.nav{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}.nav-inner{max-width:1080px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between}.brand{font-weight:800;font-size:20px;color:var(--fg);text-decoration:none}.brand span{color:var(--accent)}.links{display:flex;gap:18px;align-items:center}.links a{color:var(--muted);text-decoration:none;font-size:14px}.links a.btn{color:#fff}.btn{display:inline-block;background:var(--accent);color:#fff !important;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px}.btn.ghost{background:transparent;color:var(--fg) !important;border:1px solid var(--border)}.hero{display:grid;grid-template-columns:1.2fr .8fr;gap:28px;padding:56px 0 28px;align-items:center}.hero h1{font-size:clamp(34px,5vw,58px);line-height:1.1;margin:8px 0}.role{color:var(--accent);font-weight:700;font-size:18px}.kicker{color:var(--muted);text-transform:uppercase;letter-spacing:.12em;font-size:12px}.muted{color:var(--muted)}.big{font-size:17px}.cta{display:flex;gap:12px;margin-top:18px}.hero-card{background:var(--card);border:1px solid var(--border);border-radius:calc(var(--radius) + 6px);padding:24px;text-align:center}.avatar{width:120px;height:120px;border-radius:50%;object-fit:cover;margin:0 auto;display:block}.avatar.ph{display:flex;align-items:center;justify-content:center;background:var(--accent);color:#fff;font-size:38px;font-weight:800}.hero-meta{margin-top:14px}.mono{font-family:ui-monospace,monospace;font-size:13px}.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:26px;margin:18px 0}.card h2{margin:0 0 14px;font-size:22px}.chips{display:flex;flex-wrap:wrap;gap:8px}.chip{background:color-mix(in srgb,var(--accent) 12%,transparent);border:1px solid color-mix(in srgb,var(--accent) 30%,transparent);padding:6px 12px;border-radius:999px;font-size:13px}.chip.sm{font-size:12px;padding:4px 10px}.timeline{display:grid;gap:18px}.tl-item{display:grid;grid-template-columns:16px 1fr;gap:12px}.tl-dot{width:12px;height:12px;border-radius:50%;background:var(--accent);margin-top:6px}.row-between{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}.pill{background:var(--card);border:1px solid var(--border);border-radius:999px;padding:2px 10px;font-size:12px;color:var(--muted)}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}.proj-ph{height:120px;border-radius:10px;background:linear-gradient(135deg,var(--accent),transparent);display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:800;color:#fff}.proj img{width:100%;height:160px;object-fit:cover;border-radius:10px}.sec-title{font-size:24px;margin:26px 0 12px}.links a{color:var(--accent);font-size:13px;margin-inline-end:12px}.contact-grid{display:grid;gap:8px}.contact-grid a{color:var(--accent)}.edu{padding:10px 0;border-top:1px dashed var(--border)}.edu:first-of-type{border-top:0}footer{text-align:center;color:var(--muted);padding:30px;font-size:13px}#menuBtn{display:none;background:none;border:1px solid var(--border);border-radius:8px;padding:6px 10px}.mobile{display:none;padding:10px 20px;border-top:1px solid var(--border)}.mobile.open{display:grid;gap:10px}.mobile a{color:var(--fg);text-decoration:none}@media(max-width:760px){.hero{grid-template-columns:1fr}.links a:not(.btn):not(#menuBtn){display:none}#menuBtn{display:inline-block}}`;
}

export function buildScriptJs(): string {
  return `document.getElementById('menuBtn')?.addEventListener('click',()=>{document.getElementById('mobileMenu')?.classList.toggle('open')});document.querySelectorAll('#mobileMenu a').forEach(a=>a.addEventListener('click',()=>document.getElementById('mobileMenu')?.classList.remove('open')));`;
}

export function buildReadme(name: string): string {
  return `# ${name} — Portfolio\n\nExported from Portify AI.\n\n## How to use\n- Open \`index.html\` in a browser, or\n- Upload this folder to Netlify / Vercel / GitHub Pages / any static host.\n\n## Files\n- index.html — your site\n- styles.css — styling (RTL-ready, UTF-8)\n- script.js — mobile menu + smooth scroll\n- assets/ — images (if any)\n\nNo build step. No API keys. Fully standalone.\n`;
}
