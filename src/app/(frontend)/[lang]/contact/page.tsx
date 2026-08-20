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
      <section className="pb-16">
        <div className="mx-auto grid max-w-container gap-10 px-6 md:grid-cols-[1.3fr_1fr]">
          <ContactForm labels={c.formLabels} lang={l} />
          <div className="space-y-6">
            {locations.map((loc) => (
              <div key={loc.name} className="rounded border border-gray-200 p-6">
                <h4 className="mb-1 text-lg font-bold">{loc.name}</h4>
                <strong>{loc.street}</strong>
                <br />
                {loc.zipCity}
                <br />
                Tel. {loc.phone}
              </div>
            ))}
            <div className="rounded border border-gray-200 p-6">
              <h4 className="mb-1 text-lg font-bold">E-Mail</h4>
              <a href={`mailto:${email}`} className="font-semibold text-primary">
                {email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
