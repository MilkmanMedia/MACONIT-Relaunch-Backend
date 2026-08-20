import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MACONIT Consulting GmbH",
  description: "Management-, Process- & IT-Consulting seit 2005.",
};

export default function FrontendRootLayout({ children }: { children: React.ReactNode }) {
  // lang is set correctly per-locale in (frontend)/[lang]/layout.tsx below;
  // "de" here is only the pre-hydration fallback for the very first paint.
  return (
    <html lang="de">
      <body className="font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
