export interface ProfessionDef {
  id: string;
  en: string;
  ar: string;
  descriptionEn: string;
  descriptionAr: string;
  keywords: string[];
  templateCategory: "developer" | "designer" | "marketing" | "business" | "general";
}

export const PROFESSIONS: ProfessionDef[] = [
  { id: "software-developer", en: "Software Developer", ar: "مطوّر برمجيات", descriptionEn: "Apps, systems & clean code", descriptionAr: "تطبيقات وأنظمة وكود نظيف", keywords: ["software", "developer", "engineer", "برمجيات"], templateCategory: "developer" },
  { id: "frontend-developer", en: "Frontend Developer", ar: "مطوّر واجهات أمامية", descriptionEn: "Interfaces, React & UX", descriptionAr: "واجهات و React وتجربة استخدام", keywords: ["frontend", "react", "front-end", "واجهات"], templateCategory: "developer" },
  { id: "backend-developer", en: "Backend Developer", ar: "مطوّر خلفية", descriptionEn: "APIs, databases & scale", descriptionAr: "واجهات برمجية وقواعد بيانات", keywords: ["backend", "api", "node", "خلفية"], templateCategory: "developer" },
  { id: "fullstack-developer", en: "Full Stack Developer", ar: "مطوّر متكامل", descriptionEn: "End-to-end web products", descriptionAr: "منتجات ويب متكاملة", keywords: ["full", "stack", "fullstack", "متكامل"], templateCategory: "developer" },
  { id: "ui-ux-designer", en: "UI/UX Designer", ar: "مصمم واجهات وتجربة استخدام", descriptionEn: "Research, flows & interfaces", descriptionAr: "أبحاث وتدفقات وواجهات", keywords: ["ui", "ux", "design", "figma", "تصميم"], templateCategory: "designer" },
  { id: "graphic-designer", en: "Graphic Designer", ar: "مصمم جرافيك", descriptionEn: "Brand, print & visual identity", descriptionAr: "هوية بصرية ومطبوعات", keywords: ["graphic", "brand", "illustrator", "جرافيك"], templateCategory: "designer" },
  { id: "product-designer", en: "Product Designer", ar: "مصمم منتجات", descriptionEn: "Product thinking & systems", descriptionAr: "تفكير منتجات وأنظمة تصميم", keywords: ["product", "designer", "منتج"], templateCategory: "designer" },
  { id: "digital-marketer", en: "Digital Marketer", ar: "مسوّق رقمي", descriptionEn: "SEO, ads & growth", descriptionAr: "تحسين محركات وإعلانات ونمو", keywords: ["market", "seo", "ads", "تسويق"], templateCategory: "marketing" },
  { id: "content-creator", en: "Content Creator", ar: "صانع محتوى", descriptionEn: "Stories, video & audience", descriptionAr: "قصص وفيديو وجمهور", keywords: ["content", "creator", "video", "محتوى"], templateCategory: "marketing" },
  { id: "business-professional", en: "Business Professional", ar: "محترف أعمال", descriptionEn: "Strategy, ops & leadership", descriptionAr: "استراتيجية وقيادة", keywords: ["business", "manager", "أعمال"], templateCategory: "business" },
  { id: "accountant", en: "Accountant", ar: "محاسب", descriptionEn: "Finance, audit & reporting", descriptionAr: "مالية وتدقيق وتقارير", keywords: ["account", "finance", "audit", "محاسب"], templateCategory: "business" },
  { id: "engineer", en: "Engineer", ar: "مهندس", descriptionEn: "Systems, projects & precision", descriptionAr: "أنظمة ومشاريع ودقة", keywords: ["engineer", "civil", "mechanical", "مهندس"], templateCategory: "business" },
  { id: "student", en: "Student / Fresh Graduate", ar: "طالب / خريج جديد", descriptionEn: "Potential, projects & energy", descriptionAr: "طموح ومشاريع وحماس", keywords: ["student", "graduate", "intern", "طالب"], templateCategory: "general" },
  { id: "other", en: "Other", ar: "أخرى", descriptionEn: "Any profession welcome", descriptionAr: "أي مهنة مرحب بها", keywords: [], templateCategory: "general" },
];

export function suggestProfession(cvText: string): string {
  const t = cvText.toLowerCase();
  let best = "other";
  let bestScore = 0;
  for (const p of PROFESSIONS) {
    let score = 0;
    for (const k of p.keywords) {
      if (k && t.includes(k.toLowerCase())) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = p.id;
    }
  }
  return best;
}

export function professionLabel(id: string, locale: "en" | "ar"): string {
  const p = PROFESSIONS.find((x) => x.id === id);
  if (!p) return id;
  return locale === "ar" ? p.ar : p.en;
}
