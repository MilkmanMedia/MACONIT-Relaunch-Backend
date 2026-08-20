import type { CollectionConfig } from "payload";

// Maps to Kapitel 6.2 "Testimonials" — reusable client quotes, optionally
// linked to a CaseStudy, for use on service pages and the references page.
export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "author" },
  access: { read: () => true },
  fields: [
    { name: "quote", type: "textarea", required: true, localized: true },
    { name: "author", type: "text", required: true },
    { name: "role", type: "text", localized: true },
    { name: "company", type: "text" },
    { name: "relatedCaseStudy", type: "relationship", relationTo: "case-studies", required: false },
  ],
};
