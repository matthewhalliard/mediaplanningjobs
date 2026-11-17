/**
 * GET /api/ad-consent — whether this visitor may be measured for advertising
 * (the Meta pixel). A Vercel Function: this site is a static Astro build with
 * no server adapter, so the route lives in the repo-root `api/` directory,
 * which Vercel deploys alongside the static output.
 *
 * Mirrors Halliard3's apps/web/lib/ad-consent.ts (and mediaplanningtool.com's
 * src/pages/api/ad-consent.ts):
 *
 * - Global Privacy Control (`Sec-GPC: 1`) is a legally binding opt-out of
 *   "sharing" in California and the states that copy it, and a pixel is sharing.
 * - The EEA, the UK and Switzerland need opt-in consent before a pixel loads.
 *   This site has no consent banner, so visitors there get no pixel.
 *
 * The page asks this route before it loads Meta's script; until it answers
 * "allowed", nothing is sent to Meta.
 */
const CONSENT_FIRST_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "IS", "LI", "NO",
  "GB", "CH",
]);

export function GET(request) {
  const gpc = request.headers.get("sec-gpc") === "1";
  const country = (request.headers.get("x-vercel-ip-country") ?? "").toUpperCase();
  // No country header (local development) is treated as outside those
  // countries, as Halliard3 does.
  const allowed = !gpc && !CONSENT_FIRST_COUNTRIES.has(country);
  return new Response(JSON.stringify({ allowed }), {
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store",
    },
  });
}
