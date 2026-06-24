import { arSA, enUS, frFR } from "@clerk/localizations";
import type { Locale } from "@/lib/i18n/config";

const clerkLocalizations = {
  en: enUS,
  fr: frFR,
  ar: arSA,
} as const;

export function getClerkLocalization(locale: Locale) {
  return clerkLocalizations[locale] ?? enUS;
}
