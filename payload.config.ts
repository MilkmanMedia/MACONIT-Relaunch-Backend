import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { CaseStudies } from "./src/collections/CaseStudies";
import { TeamMembers } from "./src/collections/TeamMembers";
import { Testimonials } from "./src/collections/Testimonials";
import { Posts } from "./src/collections/Posts";
import { SiteSettings } from "./src/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// See Relaunch-Konzept Kapitel 6 for the full architecture rationale:
// Payload runs embedded in this Next.js app ("one repo, one deploy, one
// stack") rather than as a separate headless-CMS service.
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  editor: lexicalEditor({}),
  collections: [Users, Media, CaseStudies, TeamMembers, Testimonials, Posts],
  globals: [SiteSettings],
  // Bilingual DE/EN content per Kapitel 4 (content brief) and Kapitel 2 (Sitemap).
  localization: {
    locales: ["de", "en"],
    defaultLocale: "de",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
});
