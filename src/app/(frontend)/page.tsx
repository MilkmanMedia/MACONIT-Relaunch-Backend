import type { Metadata } from "next";
import Image from "next/image";
import { RootRedirectTimer } from "@/components/RootRedirectTimer";

// The "/" root used to be a plain server-side redirect (src/middleware.ts,
// now removed) straight to "/de" — no page ever painted. This renders a
// brief branded moment instead, mirroring static-site/src/build.js's
// buildRootRedirect() "Musterschnitt" concept: the hero's diagonal pattern
// sweeps in, the logo fades up, a thin bar counts the ~1.15s down. The CSS
// animation (see the redirect-* keyframes in tailwind.config.ts) plays with
// or without JS; RootRedirectTimer does the actual client-side redirect once
// it settles, and the <meta httpEquiv="refresh"> below is the fallback for
// browsers with JS disabled.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function RootRedirectPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="1.6;url=/de" />
      <RootRedirectTimer />
      <div className="relative flex h-screen items-center justify-center overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="animate-redirect-sweep absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, rgba(20,20,26,.06) 0 1px, transparent 1px 26px)",
            WebkitMaskImage: "linear-gradient(to right, #000, #000)",
            maskImage: "linear-gradient(to right, #000, #000)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
        <Image
          src="/maconit-logo.png"
          alt="MACONIT"
          width={168}
          height={44}
          priority
          className="animate-redirect-logo-in relative h-auto w-[168px]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
          <div className="animate-redirect-fill h-full bg-primary" />
        </div>
        <noscript>
          <p className="absolute inset-x-0 bottom-6 text-center text-[13px] text-grey">
            Weiterleitung zu{" "}
            <a href="/de" className="underline">
              maconit.de/de
            </a>
          </p>
        </noscript>
      </div>
    </>
  );
}
