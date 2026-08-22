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
        // "/" root redirect page (see src/app/(frontend)/page.tsx) — mirrors
        // static-site/src/build.js's buildRootRedirect() "Musterschnitt"
        // concept 1:1: the diagonal hero pattern sweeps in via a mask-size
        // reveal, the logo fades up, a thin bar counts the wait down.
        redirectSweep: {
          from: { "-webkit-mask-size": "0% 100%", "mask-size": "0% 100%" },
          to: { "-webkit-mask-size": "100% 100%", "mask-size": "100% 100%" },
        },
        redirectLogoIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "none" },
        },
        redirectFill: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        "hero-rise": "heroRise .6s cubic-bezier(0.16,0.8,0.32,1) both",
        "redirect-sweep": "redirectSweep 1s cubic-bezier(0.16,0.8,0.32,1) both",
        "redirect-logo-in": "redirectLogoIn .7s cubic-bezier(0.16,0.8,0.32,1) .5s both",
        "redirect-fill": "redirectFill 1.15s linear both",
      },
    },
  },
  plugins: [],
} satisfies Config;
