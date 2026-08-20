import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale } from "@/lib/i18n";

// Redirects the bare "/" to the default locale ("/de"). Payload's own
// /admin and /api routes live outside the [lang] segment, so they're
// explicitly excluded via the matcher below rather than via a runtime check.
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
}

export const config = {
  matcher: "/",
};
