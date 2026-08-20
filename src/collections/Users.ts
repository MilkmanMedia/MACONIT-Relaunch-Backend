import type { CollectionConfig } from "payload";

// Required by Payload for admin-panel authentication (editors who maintain
// CaseStudies / TeamMembers / Posts / Testimonials from Kapitel 6.2).
export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email" },
  auth: true,
  access: {
    // Keep the admin panel closed to the public — only logged-in editors.
    read: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
