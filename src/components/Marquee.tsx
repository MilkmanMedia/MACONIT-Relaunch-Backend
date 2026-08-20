// Infinite-scroll client-name strip — pure CSS animation, list duplicated
// once for a seamless loop. Pauses on hover (see .marquee-mask:hover in
// globals.css). Mirrors static-site's templates.js `marquee()` helper.
export function Marquee({ items }: { items: string[] }) {
  const doubled = items.concat(items);
  return (
    <div className="marquee-mask">
      <div className="marquee-track animate-marquee">
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="whitespace-nowrap rounded-full border border-gray-200 px-4 py-2 font-bold text-grey transition-colors hover:border-primary hover:text-primary"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
