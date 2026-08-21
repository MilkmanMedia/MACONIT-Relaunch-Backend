import { PinIcon } from "./Icons";

// Graphic upgrade over plain address text: a bordered card per location with
// an abstract diagonal-pattern banner and giant faint city-name typography
// (no real photography needed). Mirrors static-site/src/templates.js
// locationGrid().
const VARIANTS = [
  "bg-gradient-to-br from-ink to-[#2c2c35]",
  "bg-gradient-to-br from-primary to-[#7a0413]",
];

export function LocationGrid({
  locations,
}: {
  locations: { name: string; street: string; zipCity: string; phone: string }[];
}) {
  return (
    <div className="stagger-list grid gap-8 md:grid-cols-2">
      {locations.map((loc, i) => (
        <div
          key={loc.name}
          className="overflow-hidden border border-line transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-liftLg"
        >
          <div className={`location-visual group flex h-40 items-center justify-center overflow-hidden ${VARIANTS[i % VARIANTS.length]}`}>
            <span className="relative whitespace-nowrap text-[52px] font-extrabold uppercase tracking-tight text-white/[.16] transition-all duration-300 ease-out group-hover:scale-105 group-hover:text-white/[.26]">
              {loc.name}
            </span>
          </div>
          <div className="bg-bg-alt px-7 pb-7 pt-6">
            <span className="mb-2.5 flex items-center gap-2 text-[15px] font-extrabold">
              <PinIcon className="shrink-0 text-primary" />
              {loc.name}
            </span>
            <p className="text-[15px] leading-relaxed text-ink">
              {loc.street}
              <br />
              {loc.zipCity}
              <br />
              Tel. {loc.phone}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
