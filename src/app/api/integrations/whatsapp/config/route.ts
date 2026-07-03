import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import { getMetaEmbeddedSignupPublicConfig } from "@/lib/meta/config";

export async function GET() {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  try {
    return NextResponse.json(getMetaEmbeddedSignupPublicConfig());
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Meta Embedded Signup is not configured.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
