import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";

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
      <section className="py-16">
        <div className="mx-auto max-w-container px-6">
          <ServiceCards services={dict.services} lang={l} />

          <div className="mt-14 rounded-2xl bg-primary p-10 text-center text-white sm:p-14">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              {l === "de" ? "Nicht sicher, welche Leistung passt?" : "Not sure which service fits?"}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-red-100">
              {l === "de"
                ? "Sprechen Sie unverbindlich mit uns – wir finden gemeinsam den richtigen Ansatz."
                : "Talk to us, no obligation – together we'll find the right approach."}
            </p>
            <Link href={`/${l}/contact`} className="mt-6 inline-block rounded-full bg-white px-6 py-3.5 font-bold text-primary hover:bg-gray-100">
              {l === "de" ? "Kontakt aufnehmen" : "Get in touch"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
