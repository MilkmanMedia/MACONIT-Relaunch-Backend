import { getPayload } from "payload";
import config from "@payload-config";

// Cached Local API client for use inside Server Components — no HTTP
// round-trip, per the pattern recommended in Relaunch-Konzept Kapitel 6.1.
let cached: ReturnType<typeof getPayload> | null = null;

export function getPayloadClient() {
  if (!cached) {
    cached = getPayload({ config });
  }
  return cached;
}
