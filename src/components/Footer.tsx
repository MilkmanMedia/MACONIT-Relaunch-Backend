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
    <footer className="mt-10 bg-bg-deep py-14 text-gray-300">
      <div className="mx-auto max-w-container px-6">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/maconit-logo.png"
              alt="MACONIT"
              width={120}
              height={32}
              className="mb-3.5 brightness-0 invert"
            />
            <p>{dict.footer.tagline}</p>
          </div>
          <div>
            <h5 className="mb-3.5 text-sm uppercase tracking-wide text-white">{dict.footer.locationsTitle}</h5>
            {locations.map((loc) => (
              <div key={loc.name} className="mb-4">
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
            <h5 className="mb-3.5 text-sm uppercase tracking-wide text-white">{dict.footer.linksTitle}</h5>
            {dict.footer.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block py-1 transition-all hover:translate-x-0.5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <a href={`mailto:${email}`} className="block py-1 hover:text-white">
              {email}
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-2.5 border-t border-gray-700 pt-5 text-[13px] text-gray-400">
          <span>© {new Date().getFullYear()} MACONIT Consulting GmbH</span>
          <span>{lang === "de" ? "Relaunch — Payload CMS + Next.js" : "Relaunch — Payload CMS + Next.js"}</span>
        </div>
      </div>
    </footer>
  );
}
