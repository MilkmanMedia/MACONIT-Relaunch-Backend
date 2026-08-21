"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./Icons";
import type { Locale } from "@/lib/i18n";

// Appears once the user scrolls past the hero, scrolls smoothly back to the
// top on click. Mirrors static-site/src/app.js's back-to-top block. Needs
// an element with id="hero" somewhere on the page (see Hero.tsx) to compute
// the reveal threshold; falls back to a fraction of the viewport height if
// no hero is present.
export function BackToTop({ lang }: { lang: Locale }) {
  const [visible, setVisible] = useState(false);
  const thresholdRef = useRef<number | null>(null);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    thresholdRef.current = heroEl
      ? heroEl.getBoundingClientRect().bottom + window.scrollY
      : window.innerHeight * 0.6;

    const toggle = () => {
      setVisible(window.scrollY > (thresholdRef.current ?? Infinity));
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const handleClick = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={lang === "de" ? "Nach oben" : "Back to top"}
      className={`back-to-top ${visible ? "visible" : ""}`}
    >
      <span className="back-to-top-icon">
        <ArrowIcon />
      </span>
    </button>
  );
}
