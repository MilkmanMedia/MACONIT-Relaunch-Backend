import type { Config } from "tailwindcss";

// Design tokens ported 1:1 from static-site/src/style.css (the "Claude
// Design" agency-style redesign, Aug 2026): bold Inter typography, thin
// hairline dividers, sharp 2px corners, flat brand-red accents, near-zero
// motion. Keep both files in sync when adjusting the design system — the
// static build is the one that gets visually verified with Playwright, this
// one is verified via Render build logs (no local npm registry access).
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#CC071E",
          dark: "#A30518",
        },
        ink: "#14141A",
        grey: {
          DEFAULT: "#58585A",
          light: "#8F8F92",
        },
        bg: {
          alt: "#FAFAF8",
          deep: "#14141A",
        },
        line: "#E2E0DC", // hairline dividers/borders — named to avoid clashing with Tailwind's border-* utilities
      },
      borderRadius: {
        DEFAULT: "2px",
        lg: "2px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Segoe UI", "Helvetica Neue", "Arial", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1320px",
      },
      boxShadow: {
        lift: "0 16px 28px -16px rgba(20, 20, 26, 0.2)",
        liftLg: "0 22px 40px -22px rgba(20, 20, 26, 0.28)",
        btn: "0 10px 24px -10px rgba(204, 7, 30, 0.45)",
        btnDark: "0 10px 24px -14px rgba(20, 20, 26, 0.3)",
      },
      keyframes: {
        heroRise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "hero-rise": "heroRise .6s cubic-bezier(0.16,0.8,0.32,1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
