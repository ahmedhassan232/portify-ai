import type { PortfolioData } from "@/types/portfolio";
import { uid } from "@/types/portfolio";

export function demoPortfolio(lang: "en" | "ar", profession = "software-developer"): PortfolioData {
  if (lang === "ar") {
    return {
      personalInfo: {
        fullName: "سارة أحمد",
        jobTitle: profession.includes("design") || profession.includes("ui") ? "مصممة واجهات وتجربة استخدام" : profession.includes("market") ? "مسوّقة رقمية" : profession.includes("business") || profession.includes("account") ? "محترفة أعمال" : "مطوّرة برمجيات",
        email: "sara.ahmed@example.com",
        phone: "+966 55 123 4567",
        location: "الرياض، السعودية",
        profileImage: "",
        website: "https://saraahmed.dev",
        linkedin: "https://linkedin.com/in/saraahmed",
        github: "https://github.com/saraahmed",
      },
      professionalSummary: "محترفة شغوفة بخبرة تتجاوز 4 سنوات في بناء منتجات رقمية عالية الجودة. أجمع بين التفكير التحليلي والحس الإبداعي لتقديم حلول عملية تخدم المستخدمين وتحقق أهداف الأعمال. أبحث دائمًا عن تحديات جديدة للنمو وصنع أثر حقيقي.",
      skills: {
        technical: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"],
        soft: ["التواصل", "القيادة", "حل المشكلات", "العمل الجماعي"],
        tools: ["Figma", "Git", "Docker", "Vercel", "Notion"],
      },
      experience: [
        {
          id: uid("exp"),
          position: "مطوّرة واجهات أولى",
          company: "شركة تقنية",
          location: "الرياض",
          startDate: "2022",
          endDate: "الآن",
          description: ["قيادة تطوير منصة ويب تخدم أكثر من 50 ألف مستخدم", "تحسين الأداء بنسبة 40٪ عبر تقسيم الشيفرة والتحميل الكسول"],
          achievements: ["جائزة أفضل موظفة 2023", "إطلاق 3 منتجات رئيسية"],
        },
        {
          id: uid("exp"),
          position: "مطوّرة ويب",
          company: "وكالة رقمية",
          location: "جدة",
          startDate: "2020",
          endDate: "2022",
          description: ["بناء مواقع متجاوبة لعملاء متنوعين", "التعاون مع المصممين لتسليم تجارب سلسة"],
          achievements: ["تسليم 20+ مشروعًا في الموعد"],
        },
      ],
      projects: [
        { id: uid("prj"), name: "منصة حجوزات", description: "منصة حجز متكاملة مع دفع إلكتروني ولوحة تحكم.", technologies: ["Next.js", "Stripe", "Postgres"], projectUrl: "https://example.com", githubUrl: "https://github.com/saraahmed", image: "" },
        { id: uid("prj"), name: "تطبيق مهام", description: "تطبيق إنتاجية مع مزامنة فورية ووضع داكن.", technologies: ["React", "Firebase"], projectUrl: "", githubUrl: "", image: "" },
        { id: uid("prj"), name: "لوحة تحليلات", description: "لوحة مؤشرات تفاعلية للتجارة الإلكترونية.", technologies: ["TypeScript", "D3.js"], projectUrl: "", githubUrl: "", image: "" },
      ],
      education: [
        { id: uid("edu"), degree: "بكالوريوس علوم الحاسب", institution: "جامعة الملك سعود", startDate: "2016", endDate: "2020", description: "مشروع تخرج بامتياز في تطبيقات الويب." },
      ],
      certifications: [
        { id: uid("cert"), name: "AWS Certified Developer", issuer: "Amazon", date: "2023", url: "" },
        { id: uid("cert"), name: "Meta Frontend Professional", issuer: "Meta", date: "2022", url: "" },
      ],
      languages: ["العربية (اللغة الأم)", "الإنجليزية (احترافية)"],
      socialLinks: [
        { id: uid("s"), label: "LinkedIn", url: "https://linkedin.com/in/saraahmed" },
        { id: uid("s"), label: "GitHub", url: "https://github.com/saraahmed" },
      ],
      additionalInformation: [],
      sectionVisibility: { summary: true, skills: true, experience: true, projects: true, education: true, certifications: true, languages: true, contact: true },
      sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications", "languages", "contact"],
      customSections: [],
    };
  }
  return {
    personalInfo: {
      fullName: "Alex Morgan",
      jobTitle: "Senior Frontend Developer",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      profileImage: "",
      website: "https://alexmorgan.dev",
      linkedin: "https://linkedin.com/in/alexmorgan",
      github: "https://github.com/alexmorgan",
    },
    professionalSummary: "Frontend developer with 5+ years building fast, accessible web products. I turn ambiguous ideas into polished interfaces used by hundreds of thousands of people. Obsessed with performance, design systems, and delightful details.",
    skills: {
      technical: ["TypeScript", "React", "Next.js", "Node.js", "GraphQL"],
      soft: ["Communication", "Mentorship", "Problem solving", "Ownership"],
      tools: ["Figma", "Git", "Docker", "Vercel", "Playwright"],
    },
    experience: [
      {
        id: uid("exp"),
        position: "Senior Frontend Developer",
        company: "TechFlow Inc.",
        location: "San Francisco",
        startDate: "2021",
        endDate: "Present",
        description: ["Lead frontend for a SaaS platform serving 200k+ users", "Cut LCP by 45% via code-splitting and edge rendering"],
        achievements: ["Shipped design system adopted by 4 teams", "Mentored 5 engineers"],
      },
      {
        id: uid("exp"),
        position: "Frontend Developer",
        company: "Pixel Studio",
        location: "Remote",
        startDate: "2019",
        endDate: "2021",
        description: ["Built responsive marketing sites and dashboards", "Partnered with designers on motion and accessibility"],
        achievements: ["Delivered 25+ projects on time"],
      },
    ],
    projects: [
      { id: uid("prj"), name: "Booking Platform", description: "Full-stack booking flow with payments and admin dashboard.", technologies: ["Next.js", "Stripe", "Postgres"], projectUrl: "https://example.com", githubUrl: "https://github.com/alexmorgan", image: "" },
      { id: uid("prj"), name: "Task App", description: "Realtime productivity app with offline mode and dark theme.", technologies: ["React", "Firebase"], projectUrl: "", githubUrl: "", image: "" },
      { id: uid("prj"), name: "Analytics Dashboard", description: "Interactive KPI dashboards for e-commerce teams.", technologies: ["TypeScript", "D3.js"], projectUrl: "", githubUrl: "", image: "" },
    ],
    education: [
      { id: uid("edu"), degree: "B.S. Computer Science", institution: "State University", startDate: "2015", endDate: "2019", description: "Graduated with honors. Capstone in web accessibility." },
    ],
    certifications: [
      { id: uid("cert"), name: "AWS Certified Developer", issuer: "Amazon", date: "2023", url: "" },
      { id: uid("cert"), name: "Meta Frontend Professional", issuer: "Meta", date: "2022", url: "" },
    ],
    languages: ["English (Native)", "Spanish (Intermediate)"],
    socialLinks: [
      { id: uid("s"), label: "LinkedIn", url: "https://linkedin.com/in/alexmorgan" },
      { id: uid("s"), label: "GitHub", url: "https://github.com/alexmorgan" },
    ],
    additionalInformation: [],
    sectionVisibility: { summary: true, skills: true, experience: true, projects: true, education: true, certifications: true, languages: true, contact: true },
    sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications", "languages", "contact"],
    customSections: [],
  };
}

export function cvTextToDemoData(cvText: string, lang: "en" | "ar"): PortfolioData {
  const base = demoPortfolio(lang);
  const lines = cvText.split("\n").map((l) => l.trim()).filter(Boolean);
  const email = cvText.match(/[\w.+-]+@[\w-]+\.[\w.]+/)?.[0] ?? "";
  const phone = cvText.match(/(\+?\d[\d\s\-()]{7,}\d)/)?.[0] ?? "";
  const linked = cvText.match(/linkedin\.com\/[^\s)]+/i)?.[0] ?? "";
  const gith = cvText.match(/github\.com\/[^\s)]+/i)?.[0] ?? "";
  // naive name: first non-empty short line
  const nameGuess = lines.find((l) => l.length > 2 && l.length < 48 && !l.includes("@") && !/\d{4}/.test(l)) ?? "";
  if (nameGuess) base.personalInfo.fullName = nameGuess.slice(0, 60);
  if (email) base.personalInfo.email = email;
  if (phone) base.personalInfo.phone = phone.slice(0, 30);
  if (linked) base.personalInfo.linkedin = linked.startsWith("http") ? linked : `https://${linked}`;
  if (gith) base.personalInfo.github = gith.startsWith("http") ? gith : `https://${gith}`;
  // summary: first 2-3 sentences-ish
  const summaryGuess = lines.slice(1, 6).join(" ").slice(0, 500);
  if (summaryGuess.length > 80) {
    base.professionalSummary = summaryGuess;
  }
  return base;
}
