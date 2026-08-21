import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Self-hosted at build time via next/font — no runtime request to Google
// Fonts, unlike the static-site build's <link> tag. Matches that build's
// weight range (400–900).
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MACONIT Consulting GmbH",
  description: "Management-, Process- & IT-Consulting seit 2005.",
};

export default function FrontendRootLayout({ children }: { children: React.ReactNode }) {
  // lang is set correctly per-locale in (frontend)/[lang]/layout.tsx below;
  // "de" here is only the pre-hydration fallback for the very first paint.
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
