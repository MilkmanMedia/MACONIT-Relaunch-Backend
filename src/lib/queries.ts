import { getPayloadClient } from "./payload";
import type { Locale } from "./i18n";
import type { CaseStudy, TeamMember, Post, SiteSetting } from "./types";

// Thin wrappers around the Payload Local API (see Kapitel 6.1 — no HTTP
// round-trip, called directly from Server Components).

export async function getCaseStudies(locale: Locale): Promise<CaseStudy[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "case-studies",
    locale,
    where: { approvedForPublishing: { equals: true } },
    sort: "sortOrder",
    limit: 50,
  });
  return result.docs as unknown as CaseStudy[];
}

export async function getTeamMembers(locale: Locale): Promise<TeamMember[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "team-members",
    locale,
    sort: "sortOrder",
    limit: 50,
  });
  return result.docs as unknown as TeamMember[];
}

export async function getPosts(locale: Locale): Promise<Post[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    locale,
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 20,
  });
  return result.docs as unknown as Post[];
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<Post | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    locale,
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
  });
  return (result.docs[0] as unknown as Post) ?? null;
}

export async function getSiteSettings(locale: Locale): Promise<SiteSetting | null> {
  const payload = await getPayloadClient();
  try {
    const settings = await payload.findGlobal({ slug: "site-settings", locale });
    return settings as unknown as SiteSetting;
  } catch {
    return null;
  }
}
