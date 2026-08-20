"use client";

import { useEffect, useRef } from "react";

// Cursor-follow radial highlight behind the hero copy — desktop/fine-pointer
// only, disabled under prefers-reduced-motion. Mirrors static-site's
// .hero-glow behaviour (see app.js).
export function HeroGlow() {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    const hero = el?.closest("section");
    if (!el || !hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    hero.addEventListener("pointermove", onMove as EventListener);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove as EventListener);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <span ref={ref} className="hero-glow" aria-hidden="true" />;
}
