import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = dictionaries[lang as Locale];
  return {
    title: `${dict.servicesOverview.title} — MACONIT`,
    description: dict.servicesOverview.intro,
  };
}

export default async function ServicesOverviewPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const dict = dictionaries[l];

  return (
    <>
      <Hero eyebrow={l === "de" ? "Leistungen" : "Services"} headline={dict.servicesOverview.title} sub={dict.servicesOverview.intro} />
      <Reveal as="section" className="py-16">
        <div className="mx-auto max-w-container px-6">
          <ServiceCards services={dict.services} lang={l} />

          <div className="mt-14">
            <CtaBanner
              headline={l === "de" ? "Nicht sicher, welche Leistung passt?" : "Not sure which service fits?"}
              text={
                l === "de"
                  ? "Sprechen Sie unverbindlich mit uns – wir finden gemeinsam den richtigen Ansatz."
                  : "Talk to us, no obligation – together we'll find the right approach."
              }
              button={l === "de" ? "Kontakt aufnehmen" : "Get in touch"}
              href={`/${l}/contact`}
            />
          </div>
        </div>
      </Reveal>
    </>
  );
}
