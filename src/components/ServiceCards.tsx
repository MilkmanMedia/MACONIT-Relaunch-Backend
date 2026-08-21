import Link from "next/link";
import { ArrowIcon } from "./Icons";
import type { ServiceContent } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";

export function ServiceCards({ services, lang }: { services: ServiceContent[]; lang: Locale }) {
  return (
    <div className="stagger-list border-t border-line">
      {services.map((s, i) => (
        <Link
          key={s.slug}
          href={`/${lang}/services/${s.slug}`}
          className="group grid grid-cols-1 items-center gap-2.5 border-b border-line py-10 text-ink transition-colors hover:bg-bg-alt md:grid-cols-[120px_1fr_340px_24px] md:gap-8"
        >
          <span className="text-base font-bold text-grey-light">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="text-[26px] font-extrabold tracking-tight">{s.title}</h3>
          <p className="text-[15px] text-grey">{s.short}</p>
          <span className="hidden text-[22px] text-primary transition-transform duration-200 ease-out group-hover:translate-x-1 md:inline-flex">
            <ArrowIcon />
          </span>
        </Link>
      ))}
    </div>
  );
}
