import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import { getIntegrationsForUser } from "@/lib/integrations/service";

export async function GET() {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  const integrations = await getIntegrationsForUser(authResult.userId);
  const connectedCount = integrations.filter((item) => item.isConnected).length;

  return NextResponse.json({
    integrations,
    connectedCount,
    totalCount: integrations.length,
  });
}
