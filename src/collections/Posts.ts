import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

// Maps to Kapitel 6.2 "Insights/Posts" — the Insights section (Kapitel 4.7 /
// Kapitel 8 of the content brief). Ships with draft topic suggestions only;
// full articles are written by the team per the editorial cadence noted there.
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Insight", plural: "Insights" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "category", "publishedAt", "_status"] },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
  },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { description: "URL-Segment, z. B. it-architektur-20-jahre-systeme" } },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Architektur & Beratung", value: "architecture" },
        { label: "Softwareentwicklung", value: "development" },
        { label: "Projektmanagement & Nearshoring", value: "management" },
      ],
    },
    { name: "excerpt", type: "textarea", localized: true },
    { name: "body", type: "richText", editor: lexicalEditor({}), localized: true },
    { name: "author", type: "relationship", relationTo: "team-members", required: false },
    { name: "coverImage", type: "upload", relationTo: "media", required: false },
    { name: "publishedAt", type: "date" },
  ],
};
