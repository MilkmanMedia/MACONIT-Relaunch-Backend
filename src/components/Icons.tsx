// Minimal inline icon set — mirrors static-site/src/icons.js. No external
// icon package required.
type IconProps = { className?: string };

export function ArchitectureIcon({ className }: IconProps) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 21V9l8-6 8 6v12" />
      <path d="M9 21v-7h6v7" />
      <path d="M4 12h16" />
    </svg>
  );
}

export function DevelopmentIcon({ className }: IconProps) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 9l-4 4 4 4" />
      <path d="M16 9l4 4-4 4" />
      <path d="M13 6l-2 12" />
    </svg>
  );
}

export function ManagementIcon({ className }: IconProps) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3v18h18" />
      <path d="M7 15l4-5 3 3 5-7" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export const serviceIcons = {
  architecture: ArchitectureIcon,
  development: DevelopmentIcon,
  management: ManagementIcon,
};
