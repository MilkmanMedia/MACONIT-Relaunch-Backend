import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import type { SiteSetting } from "@/lib/types";

// Full-page takeover shown to visitors while an admin has enabled
// "maintenanceMode" on the SiteSettings global in the Payload admin panel.
// Deliberately outside the normal <Header>/<Footer> so there's no working
// navigation off this page while the site is locked. /admin itself lives in
// a separate route group and is never affected by this.
export function Maintenance({ dict, settings }: { dict: Dictionary; settings: SiteSetting | null }) {
  const message = settings?.maintenanceMessage?.trim() || dict.maintenance.defaultMessage;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-alt px-6 text-center">
      <Image
        src="/maconit-logo.png"
        alt="MACONIT – Management-, Process- & IT-Consulting"
        width={180}
        height={47}
        priority
        className="mb-10 h-9 w-auto"
      />
      <div className="mb-6 h-1 w-14 rounded-full bg-gradient-to-r from-primary to-primary-dark" />
      <h1 className="mb-4 text-3xl font-extrabold text-ink md:text-4xl">{dict.maintenance.title}</h1>
      <p className="max-w-md text-lg text-grey">{message}</p>
      {settings?.email && (
        <a
          href={`mailto:${settings.email}`}
          className="mt-8 rounded-full bg-gradient-to-br from-primary to-primary-dark px-6 py-3 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow"
        >
          {settings.email}
        </a>
      )}
    </div>
  );
}
