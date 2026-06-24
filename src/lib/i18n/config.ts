export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  ar: "🇲🇦",
};

export const localeShort: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "AR",
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(path: string, locale: Locale): string {
  if (
    path.startsWith("#") ||
    path.startsWith("http") ||
    path.startsWith("/dashboard") ||
    path.startsWith("/onboarding") ||
    path.startsWith("/sign-in") ||
    path.startsWith("/sign-up") ||
    path.startsWith("/login") ||
    path.startsWith("/register") ||
    path.startsWith("/api")
  ) {
    return path;
  }
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}
