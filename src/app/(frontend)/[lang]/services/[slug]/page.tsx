import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { ArrowIcon } from "@/components/Icons";

export function generateStaticParams() {
  return locales.flatMap((lang) => dictionaries[lang].services.map((s) => ({ lang, slug: s.slug })));
}

function findService(lang: Locale, slug: string) {
  return dictionaries[lang].services.find((s) => s.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const service = findService(lang as Locale, slug);
  if (!service) return {};
  return {
    title: `${service.title} — MACONIT`,
    description: service.hero.subheadline,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const dict = dictionaries[l];
  const service = findService(l, slug);
  if (!service) notFound();

  return (
    <>
      <Hero
        eyebrow={l === "de" ? "Leistung" : "Service"}
        headline={service.hero.headline}
        sub={service.hero.subheadline}
        ctaPrimary={service.hero.cta}
        ctaPrimaryHref={`/${l}/contact`}
      />

      <section className="py-16">
        <div className="mx-auto max-w-container px-6">
          <h2 className="mb-8 text-3xl font-extrabold">{l === "de" ? "Leistungen im Detail" : "Services in detail"}</h2>
          <ul className="grid max-w-[760px] gap-3.5">
            {service.items.map((item) => (
              <li key={item} className="relative pl-6">
                <span className="absolute left-0 font-extrabold text-primary">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-bg-alt py-16">
        <div className="mx-auto max-w-container px-6">
          <h2 className="mb-8 text-3xl font-extrabold">{l === "de" ? "Vorgehen" : "Our approach"}</h2>
          <Timeline steps={service.process} />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-container px-6">
          <div className="max-w-[760px] rounded border border-gray-200 p-6">
            <span className="mb-1 block text-[13px] font-bold uppercase tracking-wide text-primary">
              {l === "de" ? "Referenz" : "Reference"}
            </span>
            <p className="mt-2.5 text-base">{service.referenceClient}</p>
            <Link href={`/${l}/references`} className="mt-3 inline-flex items-center gap-1.5 font-bold text-primary">
              {l === "de" ? "Referenz ansehen" : "View reference"} <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-16">
        <div className="mx-auto max-w-container px-6">
          <h2 className="mb-8 text-3xl font-extrabold">FAQ</h2>
          <div className="max-w-[760px]">
            <Faq items={service.faq} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-container px-6">
          <CtaBanner
            headline={l === "de" ? "Bereit zu starten?" : "Ready to get started?"}
            text={service.hero.subheadline}
            button={service.hero.cta}
            href={`/${l}/contact`}
          />
        </div>
      </section>
    </>
  );
}
