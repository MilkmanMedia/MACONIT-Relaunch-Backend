import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import type { SiteSetting } from "@/lib/types";

export function Footer({
  lang,
  dict,
  settings,
}: {
  lang: Locale;
  dict: Dictionary;
  settings: SiteSetting | null;
}) {
  const locations = settings?.locations ?? [];
  const email = settings?.email ?? "info@maconit.de";

  return (
    <footer className="bg-bg-deep pb-8 pt-20 text-gray-300">
      <div className="mx-auto max-w-container px-6">
        <div className="grid gap-10 border-b border-[#333336] pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/maconit-logo.png"
              alt="MACONIT"
              width={120}
              height={32}
              className="mb-[18px] h-6 w-auto brightness-0 invert"
            />
            <p className="max-w-[280px] text-sm leading-relaxed text-grey-light">{dict.footer.tagline}</p>
          </div>
          <div>
            <h5 className="mb-4 text-xs uppercase tracking-wide text-white">{dict.footer.locationsTitle}</h5>
            {locations.map((loc) => (
              <div key={loc.name} className="mb-4 text-sm leading-relaxed">
                <strong className="text-white">{loc.name}</strong>
                <br />
                {loc.street}
                <br />
                {loc.zipCity}
                <br />
                Tel. {loc.phone}
              </div>
            ))}
          </div>
          <div>
            <h5 className="mb-4 text-xs uppercase tracking-wide text-white">
              {lang === "de" ? "Navigation" : "Navigation"}
            </h5>
            {dict.nav.map((item) => (
              <Link key={item.href} href={item.href} className="block py-1 text-sm transition-all hover:translate-x-[3px] hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <h5 className="mb-4 text-xs uppercase tracking-wide text-white">{dict.footer.linksTitle}</h5>
            {dict.footer.links.map((l) => (
              <Link key={l.href} href={l.href} className="block py-1 text-sm transition-all hover:translate-x-[3px] hover:text-white">
                {l.label}
              </Link>
            ))}
            <a href={`mailto:${email}`} className="block py-1 text-sm transition-all hover:translate-x-[3px] hover:text-white">
              {email}
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2.5 pt-6 text-[13px] text-[#6b6b6e]">
          <span>© {new Date().getFullYear()} MACONIT Consulting GmbH</span>
          <span>München · Puchheim · Budapest</span>
        </div>
      </div>
    </footer>
  );
}
