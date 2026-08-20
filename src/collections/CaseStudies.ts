import type { CollectionConfig } from "payload";

// Maps to Relaunch-Konzept Kapitel 6.2 "CaseStudies" content model and the
// Referenzen page (Kapitel 4.5 of the content brief). Seeded from the
// company profile via scripts/seed.ts — see the approvedForPublishing note
// below before going live.
export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case Study", plural: "Case Studies" },
  admin: {
    useAsTitle: "client",
    defaultColumns: ["client", "businessUnit", "approvedForPublishing"],
    description:
      "Referenzen für die Website. Bitte 'Freigabe zur Veröffentlichung' erst aktivieren, wenn Kunde bzw. Partneragentur zugestimmt hat (siehe Relaunch-Konzept Kapitel 4.5).",
  },
  access: {
    // Only expose approved case studies to the public frontend/API.
    read: ({ req: { user } }) => {
      if (user) return true;
      return { approvedForPublishing: { equals: true } };
    },
  },
  fields: [
    { name: "client", type: "text", required: true },
    {
      name: "businessUnit",
      type: "select",
      required: true,
      options: [
        { label: "BU1 – Versicherung & Finanzdienstleistung", value: "bu1" },
        { label: "BU2 – Media, Web, Mobile & Games", value: "bu2" },
      ],
    },
    { name: "industry", type: "text", localized: true, admin: { description: "z. B. „Versicherung“ / „Insurance“" } },
    { name: "partnerAgency", type: "text", admin: { description: "z. B. Sapient GmbH — leer lassen, falls Direktkunde." } },
    { name: "situation", type: "textarea", localized: true, label: "Ausgangslage / Situation" },
    { name: "approach", type: "textarea", localized: true, label: "Vorgehen / Approach" },
    { name: "result", type: "textarea", localized: true, label: "Ergebnis / Result" },
    { name: "logo", type: "upload", relationTo: "media", required: false },
    {
      name: "approvedForPublishing",
      type: "checkbox",
      defaultValue: false,
      label: "Freigabe zur Veröffentlichung erteilt",
    },
    { name: "sortOrder", type: "number", defaultValue: 0 },
  ],
};
