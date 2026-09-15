import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { isClerkConfigured } from "@/lib/clerk-config";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import { LEGAL_PATHS } from "@/lib/legal/constants";
import {
  isOnboardingComplete,
  type UserOnboardingMetadata,
} from "@/lib/onboarding";

const COOKIE_NAME = "botflow_locale";
const PUBLIC_PATHS = ["/pricing"];

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/settings(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);
const isAuthRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",
  "/login(.*)",
  "/register(.*)",
]);

const APEX_HOSTS = new Set(["botflow.ink", "botflow.ink:3000", "botflow.ink:443"]);

function redirectApexToWww(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  if (!APEX_HOSTS.has(host)) {
    return null;
  }

  const destination = new URL(request.url);
  destination.protocol = "https:";
  destination.host = "www.botflow.ink";
  return NextResponse.redirect(destination, 308);
}

function handleLocaleRedirect(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/onboarding") ||
    pathname === LEGAL_PATHS.privacy ||
    pathname === LEGAL_PATHS.terms ||
    pathname === LEGAL_PATHS.dataDeletion ||
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

function isOAuthCallbackPath(pathname: string) {
  return (
    pathname === "/sso-callback" ||
    pathname === "/sign-in/sso-callback" ||
    pathname === "/sign-up/sso-callback"
  );
}

function isHealthProbe(pathname: string) {
  return pathname === "/api/health/live" || pathname === "/api/health";
}

function routeNeedsClerk(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return (
    isProtectedRoute(request) ||
    isOnboardingRoute(request) ||
    isAuthRoute(request) ||
    pathname.startsWith("/__clerk")
  );
}

const runClerkMiddleware = clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;

  const { userId } = await auth({ treatPendingAsSignedOut: false });

  if (userId && isAuthRoute(request) && !isOAuthCallbackPath(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

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

  if (isProtectedRoute(request) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
});

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  if (isHealthProbe(pathname)) {
    return NextResponse.next();
  }

  const apexRedirect = redirectApexToWww(request);
  if (apexRedirect) {
    return apexRedirect;
  }

  const localeResponse = handleLocaleRedirect(request);
  if (localeResponse) {
    return localeResponse;
  }

  if (!routeNeedsClerk(request)) {
    return NextResponse.next();
  }

  if (!isClerkConfigured()) {
    if (isProtectedRoute(request) || isOnboardingRoute(request)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  return runClerkMiddleware(request, event);
}

export const config = {
  matcher: [
    "/((?!_next|api/health|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/__clerk/:path*",
  ],
};
