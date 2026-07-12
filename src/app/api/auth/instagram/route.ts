import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  buildInstagramAuthorizationUrl,
  createInstagramOAuthState,
  getInstagramAppConfig,
} from "@/lib/integrations/instagram-oauth";
import { logBackendOAuthRedirect } from "@/lib/backend/logger";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const popup = searchParams.get("popup") === "1";

  const authState = await auth({ treatPendingAsSignedOut: false });
  if (!authState.userId) {
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://www.botflow.ink").replace(
      /\/$/,
      "",
    );
    return NextResponse.redirect(
      new URL(
        `/sign-in?redirect_url=${encodeURIComponent(`${appUrl}/api/auth/instagram${popup ? "?popup=1" : ""}`)}`,
        appUrl,
      ),
    );
  }

  const config = getInstagramAppConfig();
  if (!config) {
    return NextResponse.json(
      {
        error:
          "Instagram OAuth is not configured. Add INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET (from Meta → Instagram → Business login settings).",
      },
      { status: 503 },
    );
  }

  try {
    const state = createInstagramOAuthState(authState.userId, { popup });
    const authorizationUrl = buildInstagramAuthorizationUrl(state);
    logBackendOAuthRedirect(authorizationUrl);
    return NextResponse.redirect(authorizationUrl);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not start Instagram authorization.",
      },
      { status: 500 },
    );
  }
}
