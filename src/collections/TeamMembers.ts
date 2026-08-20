import type { CollectionConfig } from "payload";

// Maps to Kapitel 6.2 "TeamMembers" — powers the Über uns / About page team grid.
export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: { singular: "Team Member", plural: "Team Members" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "role", "location"] },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true, localized: true },
    { name: "bio", type: "textarea", localized: true },
    { name: "photo", type: "upload", relationTo: "media" },
    {
      name: "location",
      type: "select",
      options: [
        { label: "Puchheim", value: "puchheim" },
        { label: "München / Munich", value: "muenchen" },
        { label: "Budapest (Nearshoring)", value: "budapest" },
      ],
    },
    { name: "sortOrder", type: "number", defaultValue: 0 },
  ],
};
