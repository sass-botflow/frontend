import { NextResponse } from "next/server";
import { checkDatabase } from "@/lib/integrations/db";

export const dynamic = "force-dynamic";

const APP_VERSION = process.env.APP_VERSION ?? "dev";
const BUILD_TIME = process.env.BUILD_TIME ?? null;

export async function GET() {
  const db = await checkDatabase();

  return NextResponse.json(
    {
      status: "ok",
      service: "botflow-frontend",
      version: APP_VERSION,
      buildTime: BUILD_TIME,
      database: db.ok ? "connected" : "error",
      databaseError: db.ok ? null : db.error,
      features: {
        premiumChannels: true,
        integrationsApi: true,
      },
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
