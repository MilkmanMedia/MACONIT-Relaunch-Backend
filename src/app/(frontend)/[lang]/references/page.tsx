import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { getCaseStudies } from "@/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = dictionaries[lang as Locale];
  return { title: `${dict.references.title} — MACONIT`, description: dict.references.intro };
}

export default async function ReferencesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const dict = dictionaries[l];
  const r = dict.references;
  const caseStudies = await getCaseStudies(l);

  return (
    <>
      <Hero eyebrow={l === "de" ? "Referenzen" : "References"} headline={r.title} sub={r.intro} />
      <section className="pb-16 pt-2">
        <div className="mx-auto max-w-container px-6">
          <div className="mb-[30px] border border-line bg-bg-alt p-6 text-[15px] text-grey">
            <strong className="text-ink">{r.noteTitle}:</strong> {r.noteText}
          </div>

          {caseStudies.length > 0 ? (
            <div className="border-t border-line">
              {caseStudies.map((c) => (
                <CaseStudyCard key={c.id} study={c} lang={l} />
              ))}
            </div>
          ) : (
            <p className="italic text-grey-light">
              {l === "de"
                ? "Noch keine freigegebenen Referenzen im CMS — siehe scripts/seed.ts, um Beispieldaten einzuspielen."
                : "No approved references in the CMS yet — see scripts/seed.ts to load example data."}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
