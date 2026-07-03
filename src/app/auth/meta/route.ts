import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import { getMetaOAuthAuthorizeUrl } from "@/lib/meta/config";
import { createOAuthState } from "@/lib/meta/oauth-state";

export async function GET(request: Request) {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  try {
    const { searchParams } = new URL(request.url);
    const reconnect = searchParams.get("reconnect") === "1";
    const state = createOAuthState(authResult.userId, reconnect);
    const authorizeUrl = getMetaOAuthAuthorizeUrl(state);
    return NextResponse.redirect(authorizeUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Meta OAuth is not configured.";
    const redirectUrl = new URL("/dashboard/channels", request.url);
    redirectUrl.searchParams.set("error", message);
    return NextResponse.redirect(redirectUrl);
  }
}
