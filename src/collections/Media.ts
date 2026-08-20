import type { CollectionConfig } from "payload";

// Backing collection for team photos, case-study client logos and insights
// cover images. Local disk storage by default — swap to S3/Vercel Blob for
// production (see README "Deployment").
export const Media: CollectionConfig = {
  slug: "media",
  admin: { useAsTitle: "alt" },
  access: { read: () => true },
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 800, height: 600, position: "centre" },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
    },
  ],
};
