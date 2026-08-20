import Link from "next/link";
import { HeroGlow } from "./HeroGlow";

export function Hero({
  eyebrow,
  headline,
  sub,
  ctaPrimary,
  ctaPrimaryHref,
  ctaSecondary,
  ctaSecondaryHref,
}: {
  eyebrow?: string;
  headline: string;
  sub: string;
  ctaPrimary?: string;
  ctaPrimaryHref?: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white to-bg-alt py-24">
      <span className="hero-mesh hero-mesh-1 animate-mesh-slow" aria-hidden="true" />
      <span className="hero-mesh hero-mesh-2 animate-mesh-slower" aria-hidden="true" />
      <HeroGlow />
      <div className="relative mx-auto max-w-container px-6">
        <div className="max-w-[780px]">
          {eyebrow && (
            <span className="animate-hero-rise mb-2.5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-primary [animation-delay:.02s]">
              <span className="h-0.5 w-4 rounded bg-primary" />
              {eyebrow}
            </span>
          )}
          <h1 className="animate-hero-rise text-4xl font-extrabold tracking-tight [animation-delay:.08s] sm:text-5xl">
            {headline}
          </h1>
          <p className="animate-hero-rise mt-4 max-w-[640px] text-lg text-grey [animation-delay:.16s]">{sub}</p>
          <div className="animate-hero-rise mt-7 flex flex-wrap gap-3.5 [animation-delay:.24s]">
            {ctaPrimary && (
              <Link
                href={ctaPrimaryHref || "#"}
                className="btn-shine rounded-full bg-gradient-to-br from-primary to-primary-dark px-6 py-3.5 font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-glow"
              >
                {ctaPrimary}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondaryHref || "#"}
                className="rounded-full border border-gray-200 px-6 py-3.5 font-bold transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                {ctaSecondary}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
