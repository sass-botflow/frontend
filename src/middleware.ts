import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";

const COOKIE_NAME = "botflow_locale";

const PUBLIC_PATHS = ["/pricing"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const savedLocale = request.cookies.get(COOKIE_NAME)?.value;
  const preferredLocale =
    savedLocale && isValidLocale(savedLocale) ? savedLocale : defaultLocale;

  const segment = pathname.split("/")[1];
  const hasLocalePrefix = segment && isValidLocale(segment);

  if (hasLocalePrefix) {
    const response = NextResponse.next();
    response.cookies.set(COOKIE_NAME, segment, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
    return response;
  }

  if (pathname === "/" || PUBLIC_PATHS.includes(pathname)) {
    const target =
      pathname === "/"
        ? `/${preferredLocale}`
        : `/${preferredLocale}${pathname}`;
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
