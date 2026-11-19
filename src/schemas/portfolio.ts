import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().default(""),
  jobTitle: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  location: z.string().default(""),
  profileImage: z.string().default(""),
  website: z.string().default(""),
  linkedin: z.string().default(""),
  github: z.string().default(""),
});

export const experienceSchema = z.object({
  position: z.string().default(""),
  company: z.string().default(""),
  location: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  description: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
});

export const projectSchema = z.object({
  name: z.string().default(""),
  description: z.string().default(""),
  technologies: z.array(z.string()).default([]),
  projectUrl: z.string().default(""),
  githubUrl: z.string().default(""),
});

export const educationSchema = z.object({
  degree: z.string().default(""),
  institution: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  description: z.string().default(""),
});

export const certificationSchema = z.union([
  z.object({ name: z.string(), issuer: z.string().optional().default(""), date: z.string().optional().default(""), url: z.string().optional().default("") }),
  z.string().transform((s) => ({ name: s, issuer: "", date: "", url: "" })),
]);

export const cvAnalysisSchema = z.object({
  personalInfo: personalInfoSchema,
  professionalSummary: z.string().default(""),
  skills: z.object({
    technical: z.array(z.string()).default([]),
    soft: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
  }),
  experience: z.array(experienceSchema).default([]),
  projects: z.array(projectSchema).default([]),
  education: z.array(educationSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
  languages: z.array(z.string()).default([]),
  socialLinks: z.array(z.object({ label: z.string().default(""), url: z.string().default("") })).default([]),
  additionalInformation: z.array(z.string()).default([]),
  suggestedProfession: z.string().optional().default(""),
  confidence: z.number().optional().default(0.7),
});

export type CvAnalysis = z.infer<typeof cvAnalysisSchema>;

export const analyzeRequestSchema = z.object({
  cvText: z.string().min(20, "CV text too short").max(60000, "CV text too long"),
  profession: z.string().max(80).optional().default(""),
  portfolioLanguage: z.enum(["en", "ar"]).optional().default("en"),
});

export const generateRequestSchema = z.object({
  cvText: z.string().max(60000).optional().default(""),
  baseData: z.unknown().optional(),
  profession: z.string().max(80).default("Software Developer"),
  portfolioLanguage: z.enum(["en", "ar"]).default("en"),
  templateId: z.string().max(80).optional().default("minimal-developer"),
});
