"use client";

import Link from "next/link";
import { Check, Upload, Briefcase, Cpu, LayoutTemplate, PenLine, Eye, Download } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "upload", href: "/upload", icon: Upload },
  { id: "profession", href: "/profession", icon: Briefcase },
  { id: "processing", href: "/processing", icon: Cpu },
  { id: "templates", href: "/templates", icon: LayoutTemplate },
  { id: "editor", href: "/editor", icon: PenLine },
  { id: "preview", href: "/preview", icon: Eye },
  { id: "export", href: "/export", icon: Download },
];

export function StepNav({ current }: { current: string }) {
  const { locale } = useI18n();
  const idx = STEPS.findIndex((s) => s.id === current);
  const labels: Record<string, { en: string; ar: string }> = {
    upload: { en: "Upload", ar: "رفع" },
    profession: { en: "Profession", ar: "المهنة" },
    processing: { en: "AI", ar: "الذكاء" },
    templates: { en: "Template", ar: "القالب" },
    editor: { en: "Edit", ar: "تحرير" },
    preview: { en: "Preview", ar: "معاينة" },
    export: { en: "Export", ar: "تصدير" },
  };
  return (
    <div className="mx-auto max-w-4xl px-4 pt-8">
      <ol className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {STEPS.map((s, i) => {
          const done = i < idx;
          const active = s.id === current;
          const Icon = done ? Check : s.icon;
          return (
            <li key={s.id} className="flex flex-1 items-center gap-1 last:flex-none">
              <Link href={s.href} className="flex flex-col items-center gap-1.5" aria-current={active ? "step" : undefined}>
                <span className={cn("grid h-9 w-9 place-items-center rounded-full border text-sm transition", done ? "border-[#6C4CF1] bg-[#6C4CF1] text-white" : active ? "border-[#6C4CF1] bg-white text-[#6C4CF1] shadow-lg shadow-[#6C4CF1]/20" : "border-[#E9E7F0] bg-white text-[#73738A]")}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className={cn("whitespace-nowrap text-[11px] font-semibold", active ? "text-[#6C4CF1]" : "text-[#73738A]")}>{locale === "ar" ? labels[s.id].ar : labels[s.id].en}</span>
              </Link>
              {i < STEPS.length - 1 && <span className={cn("mx-1 mb-5 h-px flex-1", i < idx ? "bg-[#6C4CF1]" : "bg-[#E9E7F0]")} />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
