"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function Header({
  lang,
  dict,
  activeHref,
  altHref,
}: {
  lang: Locale;
  dict: Dictionary;
  activeHref?: string;
  altHref: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const contactHref = `/${lang}/contact`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/86 backdrop-blur transition-shadow ${
        scrolled ? "border-gray-200 shadow-[0_12px_30px_-22px_rgba(20,20,22,.35)]" : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-container items-center justify-between px-6 transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href={`/${lang}`} className="flex items-center" aria-label="MACONIT Home">
          <Image
            src="/maconit-logo.png"
            alt="MACONIT – Management-, Process- & IT-Consulting"
            width={160}
            height={42}
            priority
            className={`w-auto transition-[height] duration-300 ${scrolled ? "h-7" : "h-[34px]"}`}
          />
        </Link>

        <nav
          className={`fixed inset-x-0 top-[76px] z-40 flex h-[calc(100vh-76px)] flex-col gap-1 overflow-y-auto bg-white p-5 transition-transform duration-200 md:static md:h-auto md:flex-row md:items-center md:gap-0.5 md:bg-transparent md:p-0 md:transition-none ${
            open ? "translate-y-0" : "-translate-y-[120%] md:translate-y-0"
          }`}
        >
          {dict.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              className={`nav-link rounded-lg px-3.5 py-3 font-semibold text-ink hover:text-primary md:py-2.5 md:text-[15px] ${
                activeHref === item.href ? "text-primary" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href={altHref}
            className="rounded-full border border-gray-200 px-3.5 py-1.5 text-[13px] font-bold transition-colors hover:border-primary hover:text-primary"
          >
            {lang === "de" ? "EN" : "DE"}
          </Link>
          <Link
            href={contactHref}
            className="btn-shine hidden rounded-full bg-gradient-to-br from-primary to-primary-dark px-6 py-3 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow md:inline-block"
          >
            {lang === "de" ? "Erstgespräch vereinbaren" : "Book a call"}
          </Link>
          <button
            className="p-2 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="mb-1.5 block h-0.5 w-6 bg-ink" />
            <span className="mb-1.5 block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
          </button>
        </div>
      </div>
    </header>
  );
}
