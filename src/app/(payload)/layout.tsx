import config from "@payload-config";
import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import { importMap } from "./admin/importMap";

type Args = { children: React.ReactNode };

// Mounts the Payload admin panel at /admin. Kept as a separate route group
// from (frontend) so the marketing site and CMS admin don't share layouts.
const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap}>
    {children}
  </RootLayout>
);

export default Layout;
