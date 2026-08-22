"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Fires the client-side leg of the "/" → "/de" redirect once the page's
// entrance animation (see (frontend)/page.tsx) has settled. router.replace()
// so this stub never lands in browser history. A <meta httpEquiv="refresh">
// rendered on the page itself is the no-JS fallback, timed to arrive after
// this one so JS wins the race whenever it's available. Mirrors
// static-site/src/build.js's buildRootRedirect() timing exactly.
export function RootRedirectTimer() {
  const router = useRouter();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => router.replace("/de"), reduced ? 60 : 1150);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
