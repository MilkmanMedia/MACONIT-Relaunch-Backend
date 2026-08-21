"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function Header({
  lang,
  dict,
  altHref,
}: {
  lang: Locale;
  dict: Dictionary;
  altHref: string;
}) {
  const [open, setOpen] = useState(false);
  const contactHref = `/${lang}/contact`;

  // Active nav item is derived from the current route rather than passed in
  // per-page — a detail route (e.g. a service or insights slug) still
  // highlights its parent section via the startsWith() prefix check.
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  // Desktop-only sliding underline that tracks the active nav link (mobile
  // gets a full-width border-bottom per link instead, see the nav className
  // below, so no indicator is rendered there). Measured via DOM offsets
  // rather than kept in React state per-link, since it needs to react to
  // both route changes and resizes/font-load reflows.
  const navRef = useRef<HTMLElement | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      const active = nav?.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
      if (!nav || !active) {
        setIndicator(null);
        return;
      }
      setIndicator({ left: active.offsetLeft, width: active.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-[76px] max-w-container items-center justify-between px-6">
        <Link href={`/${lang}`} className="flex items-center" aria-label="MACONIT Home">
          <Image
            src="/maconit-logo.png"
            alt="MACONIT – Management-, Process- & IT-Consulting"
            width={160}
            height={42}
            priority
            className="h-[26px] w-auto"
          />
        </Link>

        <nav
          ref={navRef}
          className={`fixed inset-x-0 top-[76px] z-40 flex h-[calc(100vh-76px)] flex-col items-stretch gap-0 overflow-y-auto bg-white p-5 transition-transform duration-300 ease-out md:relative md:h-auto md:translate-y-0 md:flex-row md:items-center md:gap-0.5 md:bg-transparent md:p-0 md:transition-none ${
            open ? "translate-y-0" : "-translate-y-[120%]"
          }`}
        >
          {dict.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`nav-link border-b border-line px-3.5 py-4 text-[15px] font-bold uppercase tracking-wide text-grey transition-colors hover:text-primary md:border-b-0 md:py-2.5 md:text-[13px] md:tracking-[.05em] ${
                isActive(item.href) ? "text-primary" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          {indicator && (
            <span
              className="pointer-events-none absolute bottom-[6px] hidden h-0.5 bg-primary transition-[left,width] duration-300 ease-out md:block"
              style={{ left: indicator.left + 14, width: Math.max(indicator.width - 28, 0) }}
              aria-hidden="true"
            />
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link href={altHref} className="text-xs font-bold text-grey transition-colors hover:text-primary">
            {lang === "de" ? "EN" : "DE"}
          </Link>
          <Link
            href={contactHref}
            className="hidden bg-primary px-6 py-3 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-btn md:inline-block"
          >
            {lang === "de" ? "Erstgespräch vereinbaren" : "Book a call"}
          </Link>
          <button
            className="p-2 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="mb-1.5 block h-0.5 w-[22px] bg-ink" />
            <span className="mb-1.5 block h-0.5 w-[22px] bg-ink" />
            <span className="block h-0.5 w-[22px] bg-ink" />
          </button>
        </div>
      </div>
    </header>
  );
}
