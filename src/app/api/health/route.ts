import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function readBuildFile(name: string): string | null {
  try {
    const value = readFileSync(join(process.cwd(), name), "utf8").trim();
    return value || null;
  } catch {
    return null;
  }
}

function getVersion(): string {
  const fromFile = readBuildFile("BUILD_VERSION.txt");
  if (fromFile) return fromFile;
  return process.env.APP_VERSION ?? "dev";
}

function getBuildTime(): string | null {
  return readBuildFile("BUILD_TIME.txt") ?? process.env.BUILD_TIME ?? null;
}

function getDeployHint(version: string): string | undefined {
  if (version !== "dev") return undefined;
  return "Deploy blocked: EasyPanel not pulling main. Admin: enable GitHub Source + Auto Deploy, or add EASYPANEL_DEPLOY_WEBHOOK secret. See github.com/sass-botflow/frontend/issues/48";
}

export async function GET() {
  const version = getVersion();
  return NextResponse.json(
    {
      status: "ok",
      service: "botflow-frontend",
      version,
      buildTime: getBuildTime(),
      persistence: "backend-api",
      deployHint: getDeployHint(version),
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
