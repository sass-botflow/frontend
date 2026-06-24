import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import { connectPlatform } from "@/lib/integrations/service";

export async function POST() {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  const integration = await connectPlatform(authResult.userId, "tiktok");

  return NextResponse.json({
    integration,
    message: "TikTok Business connected",
  });
}
