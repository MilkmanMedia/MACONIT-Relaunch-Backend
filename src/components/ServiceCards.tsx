import Link from "next/link";
import { serviceIcons, ArrowIcon } from "./Icons";
import type { ServiceContent } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";

export function ServiceCards({ services, lang }: { services: ServiceContent[]; lang: Locale }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {services.map((s) => {
        const Icon = serviceIcons[s.icon];
        return (
          <div
            key={s.slug}
            className="group flex flex-col gap-3 rounded-lg border border-gray-200 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-glow"
          >
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-red-100 text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
              <Icon />
            </div>
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="text-[15.5px] text-grey">{s.short}</p>
            <Link href={`/${lang}/services/${s.slug}`} className="mt-auto flex items-center gap-1.5 font-bold text-primary">
              {lang === "de" ? "Mehr erfahren" : "Learn more"}
              <span className="inline-flex transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
