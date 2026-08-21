import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = dictionaries[lang as Locale];
  return { title: `${dict.contact.headline} — MACONIT`, description: dict.contact.sub };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const dict = dictionaries[l];
  const c = dict.contact;
  const settings = await getSiteSettings(l);
  const locations = settings?.locations ?? [];
  const email = settings?.email ?? "info@maconit.de";

  return (
    <>
      <Hero headline={c.headline} sub={c.sub} />
      <section className="pb-16 pt-0">
        <div className="mx-auto grid max-w-container gap-[60px] px-6 md:grid-cols-[1.2fr_1fr]">
          <ContactForm labels={c.formLabels} lang={l} />
          <div className="border-t border-line pt-10">
            {locations.map((loc) => (
              <div key={loc.name} className="mb-8">
                <h4 className="mb-2.5 text-[13px] uppercase tracking-wide text-grey-light">{loc.name}</h4>
                <strong className="text-base">{loc.street}</strong>
                <br />
                {loc.zipCity}
                <br />
                Tel. {loc.phone}
              </div>
            ))}
            <div>
              <h4 className="mb-2.5 text-[13px] uppercase tracking-wide text-grey-light">E-Mail</h4>
              <a href={`mailto:${email}`} className="border-b-2 border-primary pb-0.5 font-semibold">
                {email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
