import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const APP_VERSION = process.env.APP_VERSION ?? "dev";
const BUILD_TIME = process.env.BUILD_TIME ?? null;

function getDeployHint(version: string): string | undefined {
  if (version !== "dev") return undefined;
  return "EasyPanel: switch Source to GitHub (sass-botflow/frontend, Dockerfile). GHCR image is private — Docker Image deploy will fail.";
}

export async function GET() {
  const version = APP_VERSION;
  return NextResponse.json(
    {
      status: "ok",
      service: "botflow-frontend",
      version,
      buildTime: BUILD_TIME,
      persistence: "backend-api",
      deployHint: getDeployHint(version),
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
