import { Kicker } from "./Kicker";

// Section heading: a 340px kicker+heading column, with an optional intro
// paragraph below. Mirrors static-site/src/templates.js sectionHead().
export function SectionHead({
  kicker,
  title,
  text,
}: {
  kicker?: string;
  title: string;
  text?: string;
}) {
  // With a kicker, the eyebrow label reserves its own 340px column so the
  // heading lines up in a consistent editorial grid across sections that
  // have one. Without a kicker (e.g. "Vorgehen"/"FAQ" on service detail
  // pages), that reserved column would leave the heading indented for no
  // reason — so it renders flush-left instead, flush with the hero
  // headline and body copy above it.
  return (
    <div className="mb-14">
      {kicker ? (
        <div className="grid gap-x-[60px] gap-y-4 md:grid-cols-[340px_1fr]">
          <div>
            <Kicker className="mb-0">{kicker}</Kicker>
          </div>
          <h2 className="max-w-[760px] text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-tight">{title}</h2>
        </div>
      ) : (
        <h2 className="max-w-[760px] text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-tight">{title}</h2>
      )}
      {text && <p className="mt-4 max-w-[640px] text-[17px] text-grey">{text}</p>}
    </div>
  );
}
