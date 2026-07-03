import { NextResponse } from "next/server";
import { BackendAuthError } from "@/lib/backend/errors";
import { proxyBackendRequest } from "@/lib/backend/proxy";
import { logBackendOAuthRedirect } from "@/lib/backend/logger";

export async function GET(request: Request) {
  try {
    const response = await proxyBackendRequest("/api/channels/whatsapp/connect", {
      redirect: "manual",
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (location) {
        logBackendOAuthRedirect(location);
        return NextResponse.redirect(location);
      }
    }

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const message =
        body && typeof body === "object" && "message" in body
          ? String((body as { message: unknown }).message)
          : "Failed to start WhatsApp OAuth.";

      const fallback = new URL("/dashboard/channels", request.url);
      fallback.searchParams.set("error", message);
      return NextResponse.redirect(fallback);
    }

    return NextResponse.json(
      { error: "Backend did not return a Meta OAuth redirect." },
      { status: 502 },
    );
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.redirect(
        new URL("/sign-in?redirect_url=/dashboard/channels", request.url),
      );
    }

    const fallback = new URL("/dashboard/channels", request.url);
    fallback.searchParams.set(
      "error",
      err instanceof Error ? err.message : "WhatsApp OAuth failed.",
    );
    return NextResponse.redirect(fallback);
  }
}
