"use client";

import { useEffect, useRef } from "react";

// Faint diagonal-line pattern behind the home hero copy (desktop only —
// hidden below 860px via CSS, see globals.css). Fades in on mount, then
// drifts a few pixels on scroll; both are skipped under reduced motion.
//
// IMPORTANT: the CSS keyframe (globals.css `.hero-pattern` / `@keyframes
// heroPatternFade`) animates `opacity` ONLY. `transform` is left exclusively
// under JS control here, from the very first scroll event onward. This
// mirrors a fix applied to the static-site build after a real bug there:
// combining a `both`-fill-mode entrance animation and a JS-driven inline
// `transform` on the SAME property causes the animation's final keyframe
// value to win the cascade indefinitely (at animation-level priority),
// silently swallowing any transform JS sets afterwards — even long after
// the animation has visually finished. Never reintroduce `transform` into
// the `heroPatternFade` keyframe.
export function HeroPattern() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.08, 40);
        el.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={ref} className="hero-pattern" aria-hidden="true" />;
}
