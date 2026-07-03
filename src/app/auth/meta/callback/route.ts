import { NextResponse } from "next/server";
import {
  discoverWhatsAppPhoneOptions,
  exchangeCodeForToken,
  exchangeForLongLivedToken,
} from "@/lib/meta/graph-api";
import { verifyOAuthState } from "@/lib/meta/oauth-state";
import {
  completeWhatsAppOAuth,
  savePendingWhatsAppSelection,
} from "@/lib/meta/whatsapp-connection";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const oauthError = searchParams.get("error_description") ?? searchParams.get("error");

  const channelsUrl = new URL("/dashboard/channels", request.url);

  if (oauthError) {
    channelsUrl.searchParams.set("error", oauthError);
    return NextResponse.redirect(channelsUrl);
  }

  if (!code || !state) {
    channelsUrl.searchParams.set("error", "Meta authorization was cancelled.");
    return NextResponse.redirect(channelsUrl);
  }

  try {
    const { userId } = verifyOAuthState(state);
    const shortToken = await exchangeCodeForToken(code);
    const accessToken = await exchangeForLongLivedToken(shortToken);
    const options = await discoverWhatsAppPhoneOptions(accessToken);

    if (options.length === 0) {
      channelsUrl.searchParams.set(
        "error",
        "No WhatsApp Business phone numbers found. Link a number in Meta Business Suite first.",
      );
      return NextResponse.redirect(channelsUrl);
    }

    if (options.length === 1) {
      await completeWhatsAppOAuth(userId, options[0], accessToken);
      channelsUrl.searchParams.set("connected", "whatsapp");
      return NextResponse.redirect(channelsUrl);
    }

    await savePendingWhatsAppSelection(userId, accessToken, options);
    const selectUrl = new URL("/dashboard/channels/whatsapp/select", request.url);
    return NextResponse.redirect(selectUrl);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "WhatsApp connection failed.";
    channelsUrl.searchParams.set("error", message);
    return NextResponse.redirect(channelsUrl);
  }
}
