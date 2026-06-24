import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import { checkDatabase } from "@/lib/integrations/db";
import { getIntegrationsForUser } from "@/lib/integrations/service";

export async function GET() {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  const db = await checkDatabase();
  if (!db.ok) {
    return NextResponse.json(
      {
        error:
          "Database not ready. Add DATABASE_URL=file:/app/data/botflow.db on the server, then redeploy.",
      },
      { status: 503 },
    );
  }

  try {
    const integrations = await getIntegrationsForUser(authResult.userId);
    const connectedCount = integrations.filter((item) => item.isConnected).length;

    return NextResponse.json({
      integrations,
      connectedCount,
      totalCount: integrations.length,
    });
  } catch (err) {
    console.error("[integrations] GET failed:", err);
    return NextResponse.json(
      { error: "Failed to load channels. Please try again." },
      { status: 500 },
    );
  }
}
