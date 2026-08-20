"use client";

import { useEffect, useRef, useState } from "react";

// Scroll-reveal wrapper — fades + slides content in once it enters the
// viewport. Mirrors static-site's [data-reveal] behaviour (see
// app.js/style.css there). Respects prefers-reduced-motion by rendering
// visible immediately (see the CSS override in globals.css too, which
// covers the no-JS/no-hydration flash case).
export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // @ts-expect-error — dynamic tag with a shared ref is intentionally loose here.
    <Tag ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className || ""}`}>
      {children}
    </Tag>
  );
}
