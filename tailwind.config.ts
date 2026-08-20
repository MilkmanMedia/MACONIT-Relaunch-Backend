import type { Config } from "tailwindcss";

// Brand tokens confirmed from MACONIT_original.ai logo spec (see Relaunch-Konzept, Kapitel 5.2).
// Mirrors static-site/src/style.css 1:1 — that design was visually verified with
// Playwright screenshots; keep both in sync when adjusting the design system.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#CC071E", // Eras Bold ITC red — CMYK 15/100/100/0
          dark: "#A30518",
          light: "#FF5A68",
        },
        ink: "#1B1B1E",
        grey: {
          DEFAULT: "#58585A", // Eras Demi ITC grey — CMYK 0/0/0/80
          light: "#83838A",
        },
        bg: {
          alt: "#F6F5F8",
          deep: "#131316",
        },
      },
      borderRadius: {
        DEFAULT: "10px",
        lg: "14px",
      },
      fontFamily: {
        // Eras Bold/Demi ITC are commercial Monotype fonts and cannot be bundled here —
        // see README "Typografie" section for licensing options. System-ui stack is the
        // safe, dependency-free default until a licensed web font is added.
        sans: ["system-ui", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      },
      maxWidth: {
        container: "1180px",
      },
      boxShadow: {
        glow: "0 20px 44px -14px rgba(204, 7, 30, 0.28)",
        lift: "0 16px 36px -12px rgba(20, 20, 22, 0.18)",
      },
      keyframes: {
        meshSpin: { to: { transform: "rotate(360deg)" } },
        heroRise: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "none" },
        },
        ctaShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "mesh-slow": "meshSpin 46s linear infinite",
        "mesh-slower": "meshSpin 60s linear infinite reverse",
        "hero-rise": "heroRise .7s cubic-bezier(0.16,0.8,0.32,1) both",
        "cta-shift": "ctaShift 10s ease infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
