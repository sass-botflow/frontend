import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const APP_VERSION = process.env.APP_VERSION ?? "dev";
const BUILD_TIME = process.env.BUILD_TIME ?? null;

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "botflow-frontend",
      version: APP_VERSION,
      buildTime: BUILD_TIME,
      persistence: "backend-api",
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
