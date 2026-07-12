import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/backend/config";
import { getBackendAuthHeaders } from "@/lib/backend/auth";
import {
  exchangeInstagramCode,
  fetchInstagramProfile,
  verifyInstagramOAuthState,
} from "@/lib/integrations/instagram-oauth";

function channelsUrl(params?: Record<string, string>) {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "https://www.botflow.ink").replace(
    /\/$/,
    "",
  );
  const url = new URL("/dashboard/channels", base);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }
  return url;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const oauthError = searchParams.get("error_description") ?? searchParams.get("error");
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (oauthError) {
    return NextResponse.redirect(
      channelsUrl({ error: oauthError || "Instagram authorization was cancelled." }),
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      channelsUrl({ error: "Missing Instagram authorization response." }),
    );
  }

  try {
    const { userId: stateUserId } = verifyInstagramOAuthState(state);
    const authState = await auth({ treatPendingAsSignedOut: false });

    if (!authState.userId) {
      return NextResponse.redirect(channelsUrl({ error: "Please sign in and try again." }));
    }

    if (authState.userId !== stateUserId) {
      return NextResponse.redirect(
        channelsUrl({ error: "Instagram authorization session mismatch. Please try again." }),
      );
    }

    const { accessToken, instagramUserId } = await exchangeInstagramCode(code);
    const account = await fetchInstagramProfile(accessToken, instagramUserId);

    try {
      const headers = await getBackendAuthHeaders();
      const response = await fetch(getBackendApiUrl("/api/integrations/instagram/connect"), {
        method: "POST",
        headers,
        body: JSON.stringify({
          platform: "instagram",
          username: account.username,
          pageId: account.pageId,
          accessToken: account.accessToken,
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { message?: string; error?: string };
        const message =
          body.message ?? body.error ?? "Backend could not save Instagram connection.";
        return NextResponse.redirect(channelsUrl({ error: message }));
      }
    } catch {
      return NextResponse.redirect(
        channelsUrl({
          error:
            "Instagram authorized with Meta, but the API could not save the connection. Try again later.",
        }),
      );
    }

    return NextResponse.redirect(channelsUrl({ connected: "instagram", success: "1" }));
  } catch (error) {
    return NextResponse.redirect(
      channelsUrl({
        error:
          error instanceof Error
            ? error.message
            : "Instagram authorization failed. Please try again.",
      }),
    );
  }
}
