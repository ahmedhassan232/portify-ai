"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[#E9E7F0] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#6C4CF1] text-white"><Sparkles className="h-5 w-5" /></span>
              <span className="text-lg font-extrabold tracking-tight">Portify AI</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#73738A]">{t("brand.tagline")}</p>
            <p className="mt-4 flex max-w-sm items-start gap-2 rounded-2xl bg-[#FAFAFC] p-3 text-xs leading-relaxed text-[#73738A]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#6C4CF1]" />
              {t("footer.note")}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Portify</p>
            <div className="mt-3 grid gap-2 text-sm text-[#73738A]">
              <Link href="/#features" className="hover:text-[#6C4CF1]">{t("footer.features")}</Link>
              <Link href="/templates" className="hover:text-[#6C4CF1]">{t("footer.templates")}</Link>
              <Link href="/upload" className="hover:text-[#6C4CF1]">{t("nav.start")}</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">{t("footer.about")}</p>
            <div className="mt-3 grid gap-2 text-sm text-[#73738A]">
              <Link href="/#how" className="hover:text-[#6C4CF1]">{t("nav.how")}</Link>
              <Link href="/#examples" className="hover:text-[#6C4CF1]">{t("footer.about")}</Link>
              <Link href="/export" className="hover:text-[#6C4CF1]">{t("preview.export")}</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">{t("footer.contact")}</p>
            <div className="mt-3 grid gap-2 text-sm text-[#73738A]">
              <a href="mailto:hello@portify.ai" dir="ltr" className="hover:text-[#6C4CF1]">hello@portify.ai</a>
              <span>{t("footer.privacy")}</span>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#E9E7F0] pt-6 text-xs text-[#73738A] sm:flex-row">
          <span>{t("footer.rights")}</span>
          <span dir="ltr">Built for EN + AR • RTL-ready • ZIP export</span>
        </div>
      </div>
    </footer>
  );
}
