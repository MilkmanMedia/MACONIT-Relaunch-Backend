// Hand-written stand-ins for the collection/global shapes defined in
// src/collections and src/globals. Once `npm install` has run, replace
// these with the real generated types:
//
//   npm run generate:types
//
// which writes payload-types.ts at the project root (per payload.config.ts
// `typescript.outputFile`) with exact types for every field, including
// localization and relationship shapes. Import from "../../payload-types"
// afterwards instead of this file.

export type MediaDoc = {
  id: string;
  url?: string;
  alt: string;
  width?: number;
  height?: number;
};

export type CaseStudy = {
  id: string;
  client: string;
  businessUnit: "bu1" | "bu2";
  industry?: string;
  partnerAgency?: string;
  situation?: string;
  approach?: string;
  result?: string;
  logo?: MediaDoc | string | null;
  approvedForPublishing: boolean;
  sortOrder?: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: MediaDoc | string | null;
  location?: "puchheim" | "muenchen" | "budapest";
  sortOrder?: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  relatedCaseStudy?: CaseStudy | string | null;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  category?: "architecture" | "development" | "management";
  excerpt?: string;
  body?: unknown;
  author?: TeamMember | string | null;
  coverImage?: MediaDoc | string | null;
  publishedAt?: string;
  _status?: "draft" | "published";
};

export type SiteSetting = {
  locations: { name: string; street: string; zipCity: string; phone: string }[];
  email: string;
};
