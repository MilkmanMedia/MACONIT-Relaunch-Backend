import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { TeamCard } from "@/components/TeamCard";
import { LocationGrid } from "@/components/LocationGrid";
import { SectionHead } from "@/components/SectionHead";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
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

      <Reveal as="section" className="bg-bg-alt py-16">
        <div className="mx-auto max-w-container px-6">
          <Kicker>{a.teamTitle}</Kicker>
          {team.length > 0 ? (
            <div className="stagger-list grid gap-px border border-line bg-line sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {team.map((m) => (
                <TeamCard key={m.id} member={m} />
              ))}
            </div>
          ) : (
            <p className="italic text-grey-light">{a.teamNote}</p>
          )}
        </div>
      </Reveal>

      {locations.length > 0 && (
        <Reveal as="section" className="py-16">
          <div className="mx-auto max-w-container px-6">
            <SectionHead kicker={l === "de" ? "Standorte" : "Locations"} title={l === "de" ? "Vor Ort und persönlich" : "On the ground, in person"} />
            <LocationGrid locations={locations} />
          </div>
        </Reveal>
      )}
    </>
  );
}
