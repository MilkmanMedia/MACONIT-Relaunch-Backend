import type { CaseStudy } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

// One row in the references list. `businessUnit` stays on the CMS document
// for internal admin sorting/filtering only — it's deliberately not surfaced
// here (no "(BU1)"/"(BU2)" tag in the public UI, matching the static site).
export function CaseStudyCard({ study, lang }: { study: CaseStudy; lang: Locale }) {
  return (
    <article className="grid grid-cols-1 gap-5 border-b border-line py-12 transition-colors hover:bg-bg-alt md:grid-cols-[340px_1fr] md:gap-[60px]">
      <div>
        {study.industry && (
          <span className="mb-2 block text-[13px] font-bold uppercase tracking-wide text-primary">{study.industry}</span>
        )}
        <div className="text-[28px] font-extrabold tracking-tight">{study.client}</div>
      </div>
      <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <dt className="mb-2 text-xs font-bold uppercase tracking-wide text-grey-light">
            {lang === "de" ? "Ausgangslage" : "Situation"}
          </dt>
          <dd className="text-[15.5px] leading-relaxed text-grey">{study.situation}</dd>
        </div>
        <div>
          <dt className="mb-2 text-xs font-bold uppercase tracking-wide text-grey-light">
            {lang === "de" ? "Leistungen" : "Services"}
          </dt>
          <dd className="text-[15.5px] leading-relaxed text-grey">{study.approach}</dd>
        </div>
      </dl>
    </article>
  );
}
