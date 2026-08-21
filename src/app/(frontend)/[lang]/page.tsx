import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ServiceCards } from "@/components/ServiceCards";
import { SectionHead } from "@/components/SectionHead";
import { CtaBanner } from "@/components/CtaBanner";
import { LogoGrid } from "@/components/LogoGrid";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { getCaseStudies } from "@/lib/queries";

// The [lang] layout already sets `dynamic = "force-dynamic"`, but the build
// still categorized this exact route (the locale-prefix root, e.g. "/de")
// as a prerendered ("SSG") page while every sibling route (/de/about,
// /de/references, ...) came out dynamic — and only this route 500'd in
// production while the others served correctly. Forcing it explicitly here
// opts this one route out of static generation to rule that out.
export const dynamic = "force-dynamic";

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
        split
        eyebrow={l === "de" ? "IT-Beratung & Softwareentwicklung seit 2005" : "IT consulting & software development since 2005"}
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
          <SectionHead kicker={l === "de" ? "Leistungen" : "Services"} title={h.servicesHeadline} />
          <ServiceCards services={dict.services} lang={l} />
        </div>
      </Reveal>

      <Reveal as="section" className="bg-bg-alt py-16">
        <div className="mx-auto max-w-container px-6">
          <SectionHead kicker={l === "de" ? "Referenzen" : "References"} title={h.refHeadline} text={h.refIntro} />
          {caseStudies.length > 0 ? (
            <LogoGrid items={caseStudies.slice(0, 12).map((c) => c.client)} />
          ) : (
            <p className="text-sm italic text-grey-light">
              {l === "de"
                ? "Noch keine freigegebenen Referenzen im CMS — siehe scripts/seed.ts."
                : "No approved references in the CMS yet — see scripts/seed.ts."}
            </p>
          )}
          <Link
            href={`/${l}/references`}
            className="mt-8 inline-block border border-line px-7 py-4 text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
          >
            {l === "de" ? "Alle Referenzen ansehen" : "View all references"}
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" className="py-16">
        <div className="mx-auto max-w-container px-6">
          <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <Kicker>{l === "de" ? "Team" : "Team"}</Kicker>
              <h2 className="text-[clamp(28px,3.4vw,40px)] font-extrabold tracking-tight">{h.teamHeadline}</h2>
              <p className="mt-3 max-w-[480px] text-[17px] text-grey">{h.teamText}</p>
              <Link
                href={`/${l}/about`}
                className="mt-6 inline-block border border-line px-7 py-4 text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                {h.teamLink}
              </Link>
            </div>
            <div
              className="flex aspect-[4/3] items-center justify-center border border-line font-mono text-[11px] text-grey-light"
              style={{
                backgroundImage: "repeating-linear-gradient(135deg, #eeede9 0, #eeede9 10px, #e6e4df 10px, #e6e4df 20px)",
              }}
            >
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
