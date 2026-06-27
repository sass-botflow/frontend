import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import {
  getAffiliateDashboard,
  updateAffiliatePayoutEmail,
} from "@/lib/affiliate/service";

export async function GET() {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  try {
    const data = await getAffiliateDashboard(authResult.userId);
    return NextResponse.json(data);
  } catch (err) {
    console.error("[affiliate] GET failed:", err);
    const message = err instanceof Error ? err.message : "Failed to load affiliate data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  let body: { payoutEmail?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.payoutEmail) {
    return NextResponse.json({ error: "payoutEmail is required" }, { status: 400 });
  }

  try {
    const affiliate = await updateAffiliatePayoutEmail(
      authResult.userId,
      body.payoutEmail,
    );
    return NextResponse.json({ affiliate });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
