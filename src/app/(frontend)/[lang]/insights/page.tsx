import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
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
      <section className="py-16">
        <div className="mx-auto max-w-container px-6">
          <div className="mb-8 rounded border border-gray-200 bg-bg-alt p-4 text-sm">
            <strong>{i.noteTitle}:</strong> {i.noteText}
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  href={`/${l}/insights/${p.slug}`}
                  className="block rounded border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {p.category && (
                    <span className="mb-1 block text-[13px] font-bold uppercase tracking-wide text-primary">{p.category}</span>
                  )}
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  {p.excerpt && <p className="mt-2 text-grey">{p.excerpt}</p>}
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {i.topics.map((t) => (
                <div key={t} className="rounded border border-gray-200 p-6">
                  <span className="mb-1 block text-[13px] font-bold uppercase tracking-wide text-primary">
                    {l === "de" ? "Themenvorschlag" : "Topic idea"}
                  </span>
                  <h4 className="text-lg font-bold">{t}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
