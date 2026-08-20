"use client";

import { useEffect, useRef, useState } from "react";

// Count-up number for the trust bar. Parses the leading digits of `value`
// (e.g. "30+" -> animates 0..30, then appends "+"); non-numeric values
// (there aren't any today, but just in case) render as-is. Mirrors
// static-site's app.js count-up behaviour.
export function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\d+)(.*)$/);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!match || reducedMotion) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2] || "";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const duration = 1100;
          let start: number | null = null;
          function step(ts: number) {
            if (start === null) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * target) + suffix);
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <div className="text-3xl font-extrabold text-white [font-variant-numeric:tabular-nums]">{display}</div>
      <div className="mt-0.5 text-[13px] text-gray-400">{label}</div>
    </div>
  );
}
