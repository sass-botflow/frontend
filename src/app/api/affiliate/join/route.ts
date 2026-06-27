import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import { joinAffiliateProgram } from "@/lib/affiliate/service";

export async function POST() {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  try {
    const affiliate = await joinAffiliateProgram(authResult.userId);
    return NextResponse.json({
      affiliate,
      message: "Welcome to the BotFlow Affiliate Program",
    });
  } catch (err) {
    console.error("[affiliate] join failed:", err);
    const message = err instanceof Error ? err.message : "Failed to join program";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
