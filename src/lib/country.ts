// Visitor's country for form submissions, estimated in the browser from the device time zone
// (no third-party lookup). Falls back to the region in the browser language, then "Unknown".
import zones from "./timezones.json";

const ZONES = zones as Record<string, string>;   // IANA time zone -> ISO country code (from the tz database)

export function visitorCountry(): { country: string; timezone: string } {
  let timezone = "";
  try { timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? ""; } catch {}
  const names = typeof Intl.DisplayNames === "function" ? new Intl.DisplayNames(["en"], { type: "region" }) : null;
  const name = (code: string) => names?.of(code) ?? code;
  const code = ZONES[timezone];
  if (code) return { country: name(code), timezone };
  const region = /-([A-Z]{2})\b/.exec(typeof navigator === "undefined" ? "" : navigator.language)?.[1];
  return { country: region ? `${name(region)} (from browser language)` : "Unknown", timezone: timezone || "Unknown" };
}
