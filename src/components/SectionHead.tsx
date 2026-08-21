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
  return (
    <div className="mb-14">
      <div className="grid gap-x-[60px] gap-y-4 md:grid-cols-[340px_1fr]">
        <div>{kicker ? <Kicker className="mb-0">{kicker}</Kicker> : <span />}</div>
        <h2 className="max-w-[760px] text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-tight">{title}</h2>
      </div>
      {text && <p className="mt-4 max-w-[640px] text-[17px] text-grey">{text}</p>}
    </div>
  );
}
