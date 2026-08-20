import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/queries";
import { RichText } from "@/components/RichText";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = await getPostBySlug(lang as Locale, slug);
  if (!post) return {};
  return { title: `${post.title} — MACONIT`, description: post.excerpt };
}

// Note: unlike the marketing pages, Insights posts are fully CMS-driven, so
// we cannot pre-enumerate slugs at build time without hitting the database —
// this route renders on demand (or at build time once Payload/Next can run
// with a real DATABASE_URI configured). No generateStaticParams here.

export default async function PostDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const post = await getPostBySlug(l, slug);
  if (!post) notFound();

  return (
    <article className="py-16">
      <div className="mx-auto max-w-[760px] px-6">
        {post.category && (
          <span className="mb-2 block text-[13px] font-bold uppercase tracking-wide text-primary">{post.category}</span>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight">{post.title}</h1>
        {post.publishedAt && (
          <p className="mt-2 text-sm text-grey-light">
            {new Date(post.publishedAt).toLocaleDateString(l === "de" ? "de-DE" : "en-GB")}
          </p>
        )}
        <div className="prose prose-neutral mt-8 max-w-none">
          <RichText content={post.body} />
        </div>
      </div>
    </article>
  );
}
