"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ArrowRight, ArrowLeft, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t, isRTL } = useI18n();
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const links = [
    { href: "/#features", label: t("nav.features") },
    { href: "/#how", label: t("nav.how") },
    { href: "/templates", label: t("nav.templates") },
    { href: "/#examples", label: t("nav.examples") },
  ];

  if (pathname?.startsWith("/editor") || pathname?.startsWith("/preview")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E7F0]/80 bg-[#FAFAFC]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#6C4CF1] text-white shadow-lg shadow-[#6C4CF1]/30">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block text-[17px] font-800 font-extrabold tracking-tight text-[#171625]">Portify AI</span>
            <span className="block text-[11px] font-medium text-[#73738A]">{t("brand.tagline")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="text-sm font-medium text-[#4b4a63] transition hover:text-[#6C4CF1]">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-9 w-9 place-items-center rounded-xl border border-[#E9E7F0] bg-white text-[#4b4a63] transition hover:border-[#6C4CF1] hover:text-[#6C4CF1]"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <Link href="/upload" className="group inline-flex items-center gap-2 rounded-full bg-[#171625] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6C4CF1]">
            {t("nav.start")}
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 flip-rtl" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile theme toggle */}
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-9 w-9 place-items-center rounded-xl border border-[#E9E7F0] bg-white text-[#4b4a63] transition hover:border-[#6C4CF1] hover:text-[#6C4CF1]"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button className="rounded-xl border border-[#E9E7F0] bg-white p-2" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className={cn("overflow-hidden border-t border-[#E9E7F0] bg-white transition-all md:hidden", open ? "max-h-96" : "max-h-0 border-t-0")}>
        <div className="space-y-1 px-4 py-4">
          {links.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-[#FAFAFC]">
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <LanguageSwitcher />
            <Link href="/upload" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-[#171625] px-5 py-2.5 text-center text-sm font-semibold text-white">
              {t("nav.start")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
