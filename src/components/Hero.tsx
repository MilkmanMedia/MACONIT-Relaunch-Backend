import Link from "next/link";
import { Kicker } from "./Kicker";
import { HeroPattern } from "./HeroPattern";
import type { BreadcrumbItem } from "./Breadcrumb";
import { Breadcrumb } from "./Breadcrumb";

export function Hero({
  eyebrow,
  headline,
  sub,
  ctaPrimary,
  ctaPrimaryHref,
  ctaSecondary,
  ctaSecondaryHref,
  split,
  breadcrumb,
}: {
  eyebrow?: string;
  headline: string;
  sub: string;
  ctaPrimary?: string;
  ctaPrimaryHref?: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
  /** Home-page variant: bigger headline, then a bordered row with copy + CTAs. */
  split?: boolean;
  /** Service detail pages: "Start / Leistungen / <service>" trail. */
  breadcrumb?: BreadcrumbItem[];
}) {
  const ctas = (ctaPrimary || ctaSecondary) && (
    <div className="flex flex-wrap gap-3.5">
      {ctaPrimary && (
        <Link
          href={ctaPrimaryHref || "#"}
          className="bg-primary px-7 py-4 text-sm font-bold tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-btn"
        >
          {ctaPrimary}
        </Link>
      )}
      {ctaSecondary && (
        <Link
          href={ctaSecondaryHref || "#"}
          className="border-[1.5px] border-ink px-7 py-4 text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-white"
        >
          {ctaSecondary}
        </Link>
      )}
    </div>
  );

  if (split) {
    return (
      <section id="hero" className="relative overflow-hidden pb-[100px] pt-[120px]">
        <HeroPattern />
        <div className="mx-auto max-w-container px-6">
          <div className="max-w-[1100px]">
            {breadcrumb && (
              <div className="animate-hero-rise">
                <Breadcrumb items={breadcrumb} />
              </div>
            )}
            {eyebrow && (
              <div className="animate-hero-rise [animation-delay:.06s]">
                <Kicker>{eyebrow}</Kicker>
              </div>
            )}
            <h1 className="animate-hero-rise mb-10 text-[clamp(44px,7.5vw,104px)] font-extrabold leading-[1.02] tracking-tight [animation-delay:.12s]">
              {headline}
            </h1>
            <div className="animate-hero-rise grid grid-cols-1 items-end gap-[60px] border-t border-line pt-8 [animation-delay:.2s] md:grid-cols-[1fr_420px]">
              <p className="max-w-[640px] text-[19px] leading-relaxed text-grey">{sub}</p>
              {ctas}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-[100px]">
      <HeroPattern />
      <div className="mx-auto max-w-container px-6">
        <div className="max-w-[900px]">
          {breadcrumb && (
            <div className="animate-hero-rise">
              <Breadcrumb items={breadcrumb} />
            </div>
          )}
          {eyebrow && (
            <div className="animate-hero-rise [animation-delay:.06s]">
              <Kicker>{eyebrow}</Kicker>
            </div>
          )}
          <h1 className="animate-hero-rise mb-7 text-[clamp(38px,6vw,72px)] font-extrabold leading-[1.05] tracking-tight [animation-delay:.12s]">
            {headline}
          </h1>
          <p className="animate-hero-rise max-w-[680px] text-lg text-grey [animation-delay:.2s]">{sub}</p>
          {ctas && <div className="animate-hero-rise mt-7 [animation-delay:.2s]">{ctas}</div>}
        </div>
      </div>
    </section>
  );
}
