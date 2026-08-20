import type { GlobalConfig } from "payload";

// Maps to Kapitel 6.2 "Global Settings" — contact details shown in the
// footer and on the Kontakt/Contact page. Editable without a developer.
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: { read: () => true },
  fields: [
    {
      name: "maintenanceMode",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Wenn aktiviert, sehen Besucher der Website (nicht das Admin-Panel) statt der normalen Inhalte eine Wartungsseite. Zum Wiederherstellen der Website hier einfach wieder deaktivieren.",
      },
    },
    {
      name: "maintenanceMessage",
      type: "textarea",
      localized: true,
      admin: {
        description:
          "Optionaler Text auf der Wartungsseite. Bleibt das Feld leer, wird ein Standardtext angezeigt.",
        condition: (_, siblingData) => Boolean(siblingData?.maintenanceMode),
      },
    },
    {
      name: "locations",
      type: "array",
      minRows: 1,
      fields: [
        { name: "name", type: "text", required: true, localized: true },
        { name: "street", type: "text", required: true },
        { name: "zipCity", type: "text", required: true },
        { name: "phone", type: "text", required: true },
      ],
      defaultValue: [
        { name: "Puchheim", street: "Riedstr. 6", zipCity: "82178 Puchheim", phone: "+49 (0)89 72446904" },
        { name: "München", street: "Freibadstr. 30", zipCity: "81543 München", phone: "+49 (0)89 122219940" },
      ],
    },
    { name: "email", type: "text", defaultValue: "info@maconit.de" },
  ],
};
