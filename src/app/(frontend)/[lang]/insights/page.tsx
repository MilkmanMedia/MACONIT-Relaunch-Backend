import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { getPosts } from "@/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = dictionaries[lang as Locale];
  return { title: `${dict.insights.title} — MACONIT`, description: dict.insights.intro };
}

export default async function InsightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const dict = dictionaries[l];
  const i = dict.insights;
  const posts = await getPosts(l);

  return (
    <>
      <Hero eyebrow="Insights" headline={i.title} sub={i.intro} />
      <Reveal as="section" className="pb-16 pt-2">
        <div className="mx-auto max-w-container px-6">
          <div className="mb-[30px] border border-line bg-bg-alt p-6 text-[15px] text-grey">
            <strong className="text-ink">{i.noteTitle}:</strong> {i.noteText}
          </div>

          {posts.length > 0 ? (
            <div className="stagger-list border-t border-line">
              {posts.map((p, idx) => (
                <Link
                  key={p.id}
                  href={`/${l}/insights/${p.slug}`}
                  className="group grid grid-cols-1 items-center gap-1.5 border-b border-line py-9 text-ink transition-colors hover:bg-bg-alt md:grid-cols-[120px_1fr_24px] md:gap-8"
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-grey-light">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    {p.category && (
                      <span className="mb-1.5 block text-[12.5px] font-bold uppercase tracking-wide text-primary">{p.category}</span>
                    )}
                    <h4 className="text-xl font-bold tracking-tight">{p.title}</h4>
                    {p.excerpt && <p className="mt-1 text-[15px] text-grey">{p.excerpt}</p>}
                  </div>
                  <span className="hidden -translate-x-1.5 text-xl text-primary opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:inline-flex">
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="stagger-list border-t border-line">
              {i.topics.map((t) => (
                <div key={t} className="border-b border-line py-9">
                  <span className="mb-1.5 block text-[12.5px] font-bold uppercase tracking-wide text-primary">
                    {l === "de" ? "Themenvorschlag" : "Topic idea"}
                  </span>
                  <h4 className="text-xl font-bold tracking-tight">{t}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </>
  );
}
