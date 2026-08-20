import type { CaseStudy } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

export function CaseStudyCard({ study, lang }: { study: CaseStudy; lang: Locale }) {
  const buLabel =
    study.businessUnit === "bu1"
      ? lang === "de"
        ? "Versicherung & Finanzdienstleistung (BU1)"
        : "Insurance & Financial Services (BU1)"
      : lang === "de"
        ? "Media, Web, Mobile & Games (BU2)"
        : "Media, Web, Mobile & Games (BU2)";

  return (
    <article className="group relative overflow-hidden rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary to-primary-light transition-transform duration-300 group-hover:scale-x-100" />
      <span className="mb-1 block text-[13px] font-bold uppercase tracking-wide text-primary">
        {study.industry ? `${study.industry} · ${buLabel}` : buLabel}
        {study.partnerAgency ? ` · ${lang === "de" ? "über" : "via"} ${study.partnerAgency}` : ""}
      </span>
      <div className="text-lg font-extrabold">{study.client}</div>
      <dl className="mt-2">
        <dt className="mt-3 text-xs font-bold uppercase tracking-wide text-grey-light">
          {lang === "de" ? "Ausgangslage" : "Situation"}
        </dt>
        <dd className="mt-1">{study.situation}</dd>
        <dt className="mt-3 text-xs font-bold uppercase tracking-wide text-grey-light">
          {lang === "de" ? "Vorgehen" : "Approach"}
        </dt>
        <dd className="mt-1">{study.approach}</dd>
        <dt className="mt-3 text-xs font-bold uppercase tracking-wide text-grey-light">
          {lang === "de" ? "Ergebnis" : "Result"}
        </dt>
        <dd className="mt-1">{study.result}</dd>
      </dl>
    </article>
  );
}
