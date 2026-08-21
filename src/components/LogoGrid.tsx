// Static bordered grid of client names — replaces the old infinite-scroll
// Marquee. Mirrors static-site/src/templates.js logoGrid().
export function LogoGrid({ items }: { items: string[] }) {
  return (
    <div className="stagger-list grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
      {items.map((label, i) => (
        <div
          key={`${label}-${i}`}
          className="relative bg-bg-alt p-8 text-[22px] font-extrabold tracking-tight transition-transform duration-200 ease-out hover:z-10 hover:-translate-y-[3px] hover:shadow-lift"
        >
          {label}
        </div>
      ))}
    </div>
  );
}
