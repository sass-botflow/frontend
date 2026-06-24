import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";

const COOKIE_NAME = "botflow_locale";
const PUBLIC_PATHS = ["/pricing"];

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

function handleLocaleRedirect(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return null;
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

  return null;
}

export default clerkMiddleware(async (auth, request) => {
  const localeResponse = handleLocaleRedirect(request);
  if (localeResponse) {
    return localeResponse;
  }

  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/__clerk/:path*",
    "/(api|trpc)(.*)",
  ],
};
