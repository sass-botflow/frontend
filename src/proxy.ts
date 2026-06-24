import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import {
  isOnboardingComplete,
  type UserOnboardingMetadata,
} from "@/lib/onboarding";

const COOKIE_NAME = "botflow_locale";
const PUBLIC_PATHS = ["/pricing"];

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);
const isAuthRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",
  "/login(.*)",
  "/register(.*)",
]);

function handleLocaleRedirect(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/onboarding") ||
    isAuthRoute(request) ||
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

async function getUserOnboardingMetadata(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.publicMetadata as UserOnboardingMetadata;
}

export default clerkMiddleware(async (auth, request) => {
  const localeResponse = handleLocaleRedirect(request);
  if (localeResponse) {
    return localeResponse;
  }

  const { userId } = await auth();

  if (isOnboardingRoute(request)) {
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const metadata = await getUserOnboardingMetadata(userId);
    if (isOnboardingComplete(metadata)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  if (isProtectedRoute(request)) {
    await auth.protect({ unauthenticatedUrl: "/sign-in" });

    if (userId) {
      const metadata = await getUserOnboardingMetadata(userId);
      if (!isOnboardingComplete(metadata)) {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/__clerk/:path*",
    "/(api|trpc)(.*)",
  ],
};
