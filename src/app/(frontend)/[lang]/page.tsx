import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ServiceCards } from "@/components/ServiceCards";
import { CtaBanner } from "@/components/CtaBanner";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { getCaseStudies } from "@/lib/queries";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const dict = dictionaries[l];
  const h = dict.home;
  const caseStudies = await getCaseStudies(l);

  return (
    <>
      <Hero
        headline={h.heroHeadline}
        sub={h.heroSub}
        ctaPrimary={h.ctaPrimary}
        ctaPrimaryHref={`/${l}/contact`}
        ctaSecondary={h.ctaSecondary}
        ctaSecondaryHref={`/${l}/references`}
      />
      <TrustBar stats={dict.trustStats} />

      <Reveal as="section" className="py-16">
        <div className="mx-auto max-w-container px-6">
          <h2 className="mb-8 text-3xl font-extrabold">{h.servicesHeadline}</h2>
          <ServiceCards services={dict.services} lang={l} />
        </div>
      </Reveal>

      <Reveal as="section" className="bg-bg-alt py-16">
        <div className="mx-auto max-w-container px-6">
          <span className="mb-2.5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-primary">
            <span className="h-0.5 w-4 rounded bg-primary" />
            {l === "de" ? "Referenzen" : "References"}
          </span>
          <h2 className="text-3xl font-extrabold">{h.refHeadline}</h2>
          <p className="mt-2 max-w-2xl text-lg text-grey">{h.refIntro}</p>
          <div className="mt-6">
            {caseStudies.length > 0 ? (
              <Marquee items={caseStudies.slice(0, 12).map((c) => c.client)} />
            ) : (
              <p className="text-sm italic text-grey-light">
                {l === "de"
                  ? "Noch keine freigegebenen Referenzen im CMS — siehe scripts/seed.ts."
                  : "No approved references in the CMS yet — see scripts/seed.ts."}
              </p>
            )}
          </div>
          <Link
            href={`/${l}/references`}
            className="mt-8 inline-block rounded-full border border-gray-200 px-6 py-3.5 font-bold transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
          >
            {l === "de" ? "Alle Referenzen ansehen" : "View all references"}
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" className="py-16">
        <div className="mx-auto max-w-container px-6">
          <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-3xl font-extrabold">{h.teamHeadline}</h2>
              <p className="mt-2 text-lg text-grey">{h.teamText}</p>
              <Link
                href={`/${l}/about`}
                className="mt-5 inline-block rounded-full border border-gray-200 px-6 py-3.5 font-bold transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                {h.teamLink}
              </Link>
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 text-grey-light">
              {l === "de" ? "Team-Foto" : "Team photo"}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="py-16">
        <div className="mx-auto max-w-container px-6">
          <CtaBanner headline={h.ctaFinalHeadline} text={h.ctaFinalText} button={h.ctaFinalButton} href={`/${l}/contact`} />
        </div>
      </Reveal>
    </>
  );
}
