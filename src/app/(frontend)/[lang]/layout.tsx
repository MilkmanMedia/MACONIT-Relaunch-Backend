import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Maintenance } from "@/components/Maintenance";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { getSiteSettings } from "@/lib/queries";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Content is served from Payload/Postgres and can change at any time via the
// admin panel, so these routes render per-request rather than being baked in
// at build time (which would also fail on a fresh DB with no schema yet).
export const dynamic = "force-dynamic";

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

  // Admin-controlled kill switch (SiteSettings > "maintenanceMode" in
  // /admin). Only locks the public (frontend) route group — /admin and /api
  // stay reachable so the setting can always be switched back off.
  if (settings?.maintenanceMode) {
    return <Maintenance dict={dict} settings={settings} />;
  }

  return (
    <>
      <ScrollProgress />
      <Header lang={lang as Locale} dict={dict} altHref={`/${altLang}`} />
      <main>{children}</main>
      <Footer lang={lang as Locale} dict={dict} settings={settings} />
      <BackToTop lang={lang as Locale} />
    </>
  );
}
