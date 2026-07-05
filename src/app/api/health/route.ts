import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import { getBackendApiUrl, getConfiguredBackendApiUrl } from "@/lib/backend/config";

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
  const configuredBackendUrl = getConfiguredBackendApiUrl();
  const resolvedBackendUrl = getBackendApiUrl();

  let backendHealth: Record<string, unknown> | null = null;
  let backendReachable = false;

  try {
    const response = await fetch(getBackendApiUrl("/health"), {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    backendReachable = response.ok;
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      backendHealth = (await response.json()) as Record<string, unknown>;
    }
  } catch {
    backendReachable = false;
  }

  const misconfiguredApiUrl =
    configuredBackendUrl !== resolvedBackendUrl &&
    /botflow\.ink/i.test(configuredBackendUrl);

  return NextResponse.json(
    {
      status: "ok",
      service: "botflow-frontend",
      version,
      buildTime: getBuildTime(),
      persistence: "backend-api",
      backend: {
        configuredUrl: configuredBackendUrl,
        resolvedUrl: resolvedBackendUrl,
        reachable: backendReachable,
        misconfiguredApiUrl,
        evolution: backendHealth?.config
          ? (backendHealth.config as Record<string, unknown>).evolution ?? null
          : null,
      },
      deployHint: getDeployHint(version),
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
