// Small red-dash eyebrow label used above section headings throughout the
// site. Mirrors static-site/src/style.css .kicker.
export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`mb-7 inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-wide text-primary ${className || ""}`}>
      <span className="h-0.5 w-[22px] shrink-0 bg-primary" />
      {children}
    </span>
  );
}
