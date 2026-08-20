import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = dictionaries[lang as Locale];
  return { title: `${dict.legal.privacyTitle} — MACONIT` };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const dict = dictionaries[l];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[760px] px-6">
        <h1 className="text-3xl font-extrabold">{dict.legal.privacyTitle}</h1>
        <div className="mt-6 rounded border border-gray-200 bg-bg-alt p-4 text-sm">{dict.legal.privacyNote}</div>
      </div>
    </section>
  );
}
