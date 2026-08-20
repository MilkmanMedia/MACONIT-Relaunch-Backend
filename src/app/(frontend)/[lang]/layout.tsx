import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteSettings } from "@/lib/queries";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = dictionaries[lang as Locale];
  const settings = await getSiteSettings(lang as Locale);
  const altLang: Locale = lang === "de" ? "en" : "de";

  return (
    <>
      <Header lang={lang as Locale} dict={dict} altHref={`/${altLang}`} />
      <main>{children}</main>
      <Footer lang={lang as Locale} dict={dict} settings={settings} />
    </>
  );
}
