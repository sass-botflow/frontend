import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import {
  disconnectPlatform,
  isIntegrationPlatform,
} from "@/lib/integrations/service";

export async function POST(request: Request) {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  let body: { platform?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const platform = body.platform;
  if (!platform || !isIntegrationPlatform(platform)) {
    return NextResponse.json(
      { error: "platform must be whatsapp, instagram, or tiktok" },
      { status: 400 },
    );
  }

  const integration = await disconnectPlatform(authResult.userId, platform);

  return NextResponse.json({
    integration,
    message: `${platform} disconnected`,
  });
}
