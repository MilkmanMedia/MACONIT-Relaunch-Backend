import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

// "Start / Leistungen / <service>" trail shown above the hero on service
// detail pages, so visitors always know where they are. The last item is
// always rendered as plain text, even if it carries an href.
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[13px]">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span className="text-line">/</span>}
            {item.href && !isLast ? (
              <Link href={item.href} className="font-semibold text-grey transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-grey-light">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
