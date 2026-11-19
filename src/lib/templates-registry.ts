export interface TemplateMeta {
  id: string;
  nameEn: string;
  nameAr: string;
  category: "developer" | "designer" | "marketing" | "business" | "general";
  descriptionEn: string;
  descriptionAr: string;
  accent: string;
  bg: string;
  style: string;
  bestFor: string[];
}

export const TEMPLATES: TemplateMeta[] = [
  { id: "minimal-developer", nameEn: "Minimal Developer", nameAr: "مطوّر بسيط", category: "developer", descriptionEn: "Clean monospace-leaning layout with sharp focus on code, projects and GitHub.", descriptionAr: "تصميم نظيف يركّز على المشاريع والكود و GitHub.", accent: "#171625", bg: "#FFFFFF", style: "minimal", bestFor: ["software-developer", "frontend-developer", "backend-developer"] },
  { id: "modern-tech", nameEn: "Modern Tech", nameAr: "تقني حديث", category: "developer", descriptionEn: "Dark hero, gradient orbs, glassy cards — a bold startup-engineer look.", descriptionAr: "واجهة داكنة جريئة ببطاقات زجاجية لمهندسي الشركات الناشئة.", accent: "#6C4CF1", bg: "#0F0E1E", style: "dark", bestFor: ["software-developer", "fullstack-developer"] },
  { id: "creative-coder", nameEn: "Creative Coder", nameAr: "مبرمج مبدع", category: "developer", descriptionEn: "Playful terminal-inspired blocks, chunky borders and vivid lime accents.", descriptionAr: "مستوحى من الطرفية بحدود عريضة ولمسات لايم زاهية.", accent: "#4D7C0F", bg: "#FAFAF5", style: "playful", bestFor: ["frontend-developer", "fullstack-developer"] },
  { id: "creative-designer", nameEn: "Creative Designer", nameAr: "مصمم مبدع", category: "designer", descriptionEn: "Editorial oversized type, warm beige canvas and gallery-like projects.", descriptionAr: "طباعة ضخمة بأسلوب المجلات وقماش بيج دافئ.", accent: "#E85D3D", bg: "#FAF5EF", style: "editorial", bestFor: ["ui-ux-designer", "graphic-designer", "product-designer"] },
  { id: "minimalist-designer", nameEn: "Minimalist Designer", nameAr: "مصمم بسيط", category: "designer", descriptionEn: "Swiss grid, generous whitespace and quiet elegance for refined portfolios.", descriptionAr: "شبكة سويسرية ومساحات واسعة وأناقة هادئة.", accent: "#171625", bg: "#FFFFFF", style: "swiss", bestFor: ["product-designer", "ui-ux-designer"] },
  { id: "visual-showcase", nameEn: "Visual Showcase", nameAr: "عرض بصري", category: "designer", descriptionEn: "Masonry-style visual wall with bold color blocks for image-led work.", descriptionAr: "جدار بصري بأسلوب Masonry وكتل لونية جريئة.", accent: "#7C3AED", bg: "#131320", style: "gallery-dark", bestFor: ["graphic-designer", "content-creator"] },
  { id: "corporate-marketer", nameEn: "Corporate Marketer", nameAr: "مسوّق مؤسسي", category: "marketing", descriptionEn: "Navy corporate polish with KPI stat band and campaign timeline.", descriptionAr: "أناقة مؤسسية كحلية مع شريط مؤشرات وخط زمني للحملات.", accent: "#1E3A8A", bg: "#F8FAFC", style: "corporate", bestFor: ["digital-marketer", "business-professional"] },
  { id: "growth-specialist", nameEn: "Growth Specialist", nameAr: "أخصائي نمو", category: "marketing", descriptionEn: "Energetic emerald-on-ink growth aesthetic with metric cards.", descriptionAr: "جمالية نمو حيوية ببطاقات مقاييس.", accent: "#059669", bg: "#FFFFFF", style: "growth", bestFor: ["digital-marketer", "content-creator"] },
  { id: "personal-branding", nameEn: "Personal Branding", nameAr: "علامة شخصية", category: "marketing", descriptionEn: "Warm creator-first story layout with big portrait and voice-led copy.", descriptionAr: "تصميم دافئ يركّز على القصة والصورة الشخصية.", accent: "#C2410C", bg: "#FFFBEB", style: "creator", bestFor: ["content-creator", "digital-marketer"] },
  { id: "executive-portfolio", nameEn: "Executive Portfolio", nameAr: "ملف تنفيذي", category: "business", descriptionEn: "Serif luxury, charcoal & gold, boardroom-grade authority.", descriptionAr: "فخامة بخط Serif وألوان فحمية وذهبية.", accent: "#92400E", bg: "#1C1917", style: "luxury", bestFor: ["business-professional", "accountant", "engineer"] },
  { id: "professional-corporate", nameEn: "Professional Corporate", nameAr: "مؤسسي احترافي", category: "business", descriptionEn: "Crisp blue-grey structure with timeline experience and trust signals.", descriptionAr: "هيكل أزرق-رمادي واضح مع خبرات زمنية.", accent: "#2563EB", bg: "#FFFFFF", style: "structured", bestFor: ["accountant", "engineer", "business-professional"] },
  { id: "modern-business", nameEn: "Modern Business", nameAr: "أعمال حديث", category: "business", descriptionEn: "Soft purple SaaS-like polish with rounded cards and friendly stats.", descriptionAr: "لمسة SaaS بنفسجية ناعمة وبطاقات دائرية.", accent: "#6C4CF1", bg: "#FAFAFC", style: "saas", bestFor: ["business-professional", "student", "other"] },
];

export function templateById(id: string): TemplateMeta {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

export function templatesForProfession(professionId: string): TemplateMeta[] {
  const scored = TEMPLATES.map((t) => ({
    t,
    score: t.bestFor.includes(professionId) ? 2 : t.category === "general" ? 0 : 1,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.t);
}
