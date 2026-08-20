import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { TeamCard } from "@/components/TeamCard";
import { getTeamMembers, getSiteSettings } from "@/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = dictionaries[lang as Locale];
  return { title: `${dict.about.headline} — MACONIT`, description: dict.about.sub };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const dict = dictionaries[l];
  const a = dict.about;
  const [team, settings] = await Promise.all([getTeamMembers(l), getSiteSettings(l)]);
  const locations = settings?.locations ?? [];

  return (
    <>
      <Hero headline={a.headline} sub={a.sub} />

      <section className="py-16">
        <div className="mx-auto grid max-w-container gap-8 px-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xl font-bold">{a.historyTitle}</h3>
            <p className="text-grey">{a.history}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold">{a.nearshoreTitle}</h3>
            <p className="text-grey">{a.nearshore}</p>
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-16">
        <div className="mx-auto max-w-container px-6">
          <h2 className="mb-8 text-3xl font-extrabold">{a.teamTitle}</h2>
          {team.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {team.map((m) => (
                <TeamCard key={m.id} member={m} />
              ))}
            </div>
          ) : (
            <p className="italic text-grey-light">{a.teamNote}</p>
          )}
        </div>
      </section>

      {locations.length > 0 && (
        <section className="py-16">
          <div className="mx-auto grid max-w-container gap-8 px-6 md:grid-cols-2">
            {locations.map((loc) => (
              <div key={loc.name} className="rounded border border-gray-200 p-6">
                <h4 className="mb-1 text-lg font-bold">{loc.name}</h4>
                <p className="text-grey">
                  {loc.street}
                  <br />
                  {loc.zipCity}
                  <br />
                  Tel. {loc.phone}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
