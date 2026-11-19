"use client";

import type { DesignSettings, PortfolioData } from "@/types/portfolio";
import MinimalDeveloper from "@/templates/developer/MinimalDeveloper";
import ModernTech from "@/templates/developer/ModernTech";
import CreativeCoder from "@/templates/developer/CreativeCoder";
import CreativeDesigner from "@/templates/designer/CreativeDesigner";
import MinimalistDesigner from "@/templates/designer/MinimalistDesigner";
import VisualShowcase from "@/templates/designer/VisualShowcase";
import CorporateMarketer from "@/templates/marketing/CorporateMarketer";
import GrowthSpecialist from "@/templates/marketing/GrowthSpecialist";
import PersonalBranding from "@/templates/marketing/PersonalBranding";
import ExecutivePortfolio from "@/templates/business/ExecutivePortfolio";
import ProfessionalCorporate from "@/templates/business/ProfessionalCorporate";
import ModernBusiness from "@/templates/business/ModernBusiness";

export function TemplateRenderer({ templateId, data, lang, design }: { templateId: string; data: PortfolioData; lang: "en" | "ar"; design?: DesignSettings }) {
  const props = { data, lang, design };
  let portfolio;
  switch (templateId) {
    case "minimal-developer": portfolio = <MinimalDeveloper {...props} />; break;
    case "modern-tech": portfolio = <ModernTech {...props} />; break;
    case "creative-coder": portfolio = <CreativeCoder {...props} />; break;
    case "creative-designer": portfolio = <CreativeDesigner {...props} />; break;
    case "minimalist-designer": portfolio = <MinimalistDesigner {...props} />; break;
    case "visual-showcase": portfolio = <VisualShowcase {...props} />; break;
    case "corporate-marketer": portfolio = <CorporateMarketer {...props} />; break;
    case "growth-specialist": portfolio = <GrowthSpecialist {...props} />; break;
    case "personal-branding": portfolio = <PersonalBranding {...props} />; break;
    case "executive-portfolio": portfolio = <ExecutivePortfolio {...props} />; break;
    case "professional-corporate": portfolio = <ProfessionalCorporate {...props} />; break;
    case "modern-business": portfolio = <ModernBusiness {...props} />; break;
    default: portfolio = <MinimalDeveloper {...props} />;
  }
  return portfolio;
}
