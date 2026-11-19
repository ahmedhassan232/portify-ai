"use client";

import type { DesignSettings, PortfolioData } from "@/types/portfolio";
import { useState, type ReactNode } from "react";

export interface TemplateProps {
  data: PortfolioData;
  lang: "en" | "ar";
  design?: DesignSettings;
  preview?: boolean;
}

export function dirOf(lang: "en" | "ar") {
  return lang === "ar" ? "rtl" : "ltr";
}

export function initials(name: string): string {
  return (name || "P")
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function isVisible(data: PortfolioData, key: string): boolean {
  if (!data?.sectionVisibility) return true;
  return data.sectionVisibility[key] !== false;
}

export function orderedSections(data: PortfolioData): string[] {
  const baseOrder = data?.sectionOrder?.length
    ? data.sectionOrder
    : ["summary", "skills", "experience", "projects", "education", "certifications", "languages", "contact"];
  
  // Ensure "additional" and "custom" are included if not present in baseOrder
  const result = [...baseOrder];
  if (!result.includes("additional")) result.push("additional");
  if (!result.includes("custom")) result.push("custom");
  return result;
}

export const L = (lang: "en" | "ar", en: string, ar: string) => (lang === "ar" ? ar : en);

export function safeUrl(url?: string | null): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:" || parsed.protocol === "mailto:" || parsed.protocol === "tel:"
      ? parsed.href
      : "";
  } catch {
    if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return "";
  }
}

export function ExternalLink({
  href,
  children,
  className,
  label,
  dir,
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  label?: string;
  dir?: string;
  style?: React.CSSProperties;
}) {
  const url = safeUrl(href);
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
      dir={dir}
      style={style}
    >
      {children}
    </a>
  );
}

export function ProjectMedia({
  src,
  alt,
  className = "",
  fallbackText,
  fallbackClassName = "",
}: {
  src?: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  fallbackClassName?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const isDataUrl = typeof src === "string" && src.startsWith("data:image/");
  const validUrl = isDataUrl ? src : safeUrl(src);

  if (!validUrl || hasError) {
    if (!fallbackText) return null;
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 font-mono text-xl font-bold text-slate-400 ${fallbackClassName || className}`}
        aria-label={alt}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={validUrl}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

/** Renders data which used to be silently dropped by individual templates. */
export function SupplementalSections({
  data,
  lang,
  className = "",
  headingClassName = "",
  section,
}: {
  data: PortfolioData;
  lang: "en" | "ar";
  className?: string;
  headingClassName?: string;
  section?: "additional" | "custom";
}) {
  const additional = (data.additionalInformation || []).filter(Boolean);
  const custom = (data.customSections || []).filter(
    (sec) => sec.title?.trim() || sec.content?.trim()
  );

  const showAdditional = section !== "custom" && isVisible(data, "additional") && additional.length > 0;
  const showCustom = section !== "additional" && isVisible(data, "custom") && custom.length > 0;

  if (!showAdditional && !showCustom) return null;

  return (
    <section className={className} aria-label={L(lang, "Additional information", "معلومات إضافية")}>
      {showAdditional && (
        <div className="space-y-3">
          <h2 className={headingClassName}>{L(lang, "Additional information", "معلومات إضافية")}</h2>
          <ul className="space-y-2">
            {additional.map((item, index) => (
              <li key={`${item}-${index}`} dir="auto" className="break-words">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showCustom && (
        <div className="space-y-6">
          {custom.map((sec) => (
            <div key={sec.id} className="space-y-2">
              <h2 className={headingClassName} dir="auto">
                {sec.title}
              </h2>
              <p className="whitespace-pre-line break-words text-slate-600" dir="auto">
                {sec.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
