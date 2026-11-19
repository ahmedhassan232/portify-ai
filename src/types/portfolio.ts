export type Locale = "en" | "ar";
export type PortfolioLanguage = "en" | "ar";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  achievements: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  projectUrl: string;
  githubUrl: string;
  image: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: Skills;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  languages: string[];
  socialLinks: { id: string; label: string; url: string }[];
  additionalInformation: string[];
  sectionVisibility: Record<string, boolean>;
  sectionOrder: string[];
  customSections: { id: string; title: string; content: string }[];
}

export interface DesignSettings {
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  mutedColor: string;
  fontFamily: string;
  borderRadius: number;
  spacing: "compact" | "comfortable" | "spacious";
  darkMode: boolean;
}

export interface PortifyProject {
  cvText: string;
  cvFileName: string;
  profession: string;
  suggestedProfession?: string;
  portfolioLanguage: PortfolioLanguage;
  templateId: string;
  data: PortfolioData;
  design: DesignSettings;
  updatedAt: number;
}

export type SectionKey =
  | "summary"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "certifications"
  | "languages"
  | "contact"
  | "additional"
  | "custom";

export const ALL_SECTIONS: SectionKey[] = [
  "summary",
  "skills",
  "experience",
  "projects",
  "education",
  "certifications",
  "languages",
  "contact",
  "additional",
  "custom",
];

export function emptyPortfolio(): PortfolioData {
  return {
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      profileImage: "",
      website: "",
      linkedin: "",
      github: "",
    },
    professionalSummary: "",
    skills: { technical: [], soft: [], tools: [] },
    experience: [],
    projects: [],
    education: [],
    certifications: [],
    languages: [],
    socialLinks: [],
    additionalInformation: [],
    sectionVisibility: {
      summary: true,
      skills: true,
      experience: true,
      projects: true,
      education: true,
      certifications: true,
      languages: true,
      contact: true,
      additional: true,
      custom: true,
    },
    sectionOrder: [...ALL_SECTIONS],
    customSections: [],
  };
}

export function uid(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;
}
