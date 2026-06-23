"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  defaultLocale,
  isValidLocale,
  localizedPath,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";

const COOKIE_NAME = "botflow_locale";

interface LocaleContextValue {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  dir: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readCookie(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  const value = match?.[1];
  return value && isValidLocale(value) ? value : null;
}

function writeCookie(locale: Locale) {
  document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=31536000;samesite=lax`;
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const pathLocale = useMemo(() => {
    const segment = pathname.split("/")[1];
    return segment && isValidLocale(segment) ? segment : null;
  }, [pathname]);

  const [locale, setLocaleState] = useState<Locale>(
    initialLocale ?? pathLocale ?? defaultLocale,
  );

  useEffect(() => {
    if (pathLocale) {
      setLocaleState(pathLocale);
      writeCookie(pathLocale);
    } else {
      const saved = readCookie();
      if (saved) setLocaleState(saved);
    }
  }, [pathLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      writeCookie(newLocale);
      setLocaleState(newLocale);

      if (pathLocale) {
        const segments = pathname.split("/");
        segments[1] = newLocale;
        router.push(segments.join("/") || `/${newLocale}`);
      } else {
        router.refresh();
      }
    },
    [pathLocale, pathname, router],
  );

  const dictionary = getDictionary(locale);
  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  const value = useMemo(
    () => ({
      locale,
      dictionary,
      setLocale,
      t: dictionary,
      dir,
    }),
    [locale, dictionary, setLocale, dir],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return {
      locale: defaultLocale as Locale,
      dictionary: getDictionary(defaultLocale),
      t: getDictionary(defaultLocale),
      setLocale: () => {},
      dir: "ltr" as const,
    };
  }
  return ctx;
}

export function useLocalizedPath() {
  const { locale } = useLocale();
  return (path: string) => localizedPath(path, locale);
}
