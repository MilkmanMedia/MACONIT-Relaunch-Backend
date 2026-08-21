import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { SectionHead } from "@/components/SectionHead";
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
        breadcrumb={[
          { label: l === "de" ? "Start" : "Home", href: `/${l}/` },
          { label: l === "de" ? "Leistungen" : "Services", href: `/${l}/services` },
          { label: service.title },
        ]}
      />

      <section className="py-16">
        <div className="mx-auto max-w-container px-6">
          <h2 className="mb-8 text-[clamp(26px,3vw,38px)] font-extrabold tracking-tight">
            {l === "de" ? "Leistungen im Detail" : "Services in detail"}
          </h2>
          <ul className="max-w-[760px] text-[15px] leading-relaxed text-ink">
            {service.items.map((item) => (
              <li key={item} className="border-t border-line py-2.5 last:border-b">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-bg-alt py-16">
        <div className="mx-auto max-w-container px-6">
          <SectionHead title={l === "de" ? "Vorgehen" : "Our approach"} />
          <Timeline steps={service.process} />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-container px-6">
          <div className="max-w-[760px]">
            <h2 className="mb-8 text-[clamp(26px,3vw,38px)] font-extrabold tracking-tight">
              {l === "de" ? "Referenz" : "Reference"}
            </h2>
            <p className="mb-5 text-[15px] leading-relaxed text-grey">{service.referenceClient}</p>
            <Link
              href={`/${l}/references`}
              className="group inline-flex items-center gap-2 text-[15px] font-bold text-ink"
            >
              {l === "de" ? "Referenz ansehen" : "View reference"}
              <span className="text-primary transition-transform duration-200 ease-out group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-16">
        <div className="mx-auto max-w-container px-6">
          <SectionHead title="FAQ" />
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
