import { NextResponse } from "next/server";
import {
  BackendApiError,
  BackendAuthError,
  startWhatsAppOAuthRedirectUrl,
} from "@/lib/backend/client";

export async function GET() {
  try {
    const redirectUrl = await startWhatsAppOAuthRedirectUrl();
    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.redirect(
        new URL("/sign-in?redirect_url=/dashboard/channels", process.env.NEXT_PUBLIC_APP_URL ?? "https://www.botflow.ink"),
      );
    }

    const message =
      err instanceof BackendApiError
        ? err.message
        : err instanceof Error
          ? err.message
          : "WhatsApp OAuth failed.";

    const fallback = new URL("/dashboard/channels", process.env.NEXT_PUBLIC_APP_URL ?? "https://www.botflow.ink");
    fallback.searchParams.set("error", message);
    return NextResponse.redirect(fallback);
  }
}
