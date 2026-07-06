import { getBackendApiUrl, getConfiguredBackendApiUrl } from "@/lib/backend/config";

export type SetupCheckStatus = "ok" | "warning" | "error";

export interface SetupCheck {
  id: string;
  status: SetupCheckStatus;
  title: string;
  detail: string;
  fix?: string;
}

export interface SetupStatusReport {
  ready: boolean;
  checks: SetupCheck[];
  timestamp: string;
}

const EVOLUTION_PUBLIC_URL =
  process.env.NEXT_PUBLIC_EVOLUTION_API_URL ?? "https://evolution.api.botflow.ink";

interface BackendHealthPayload {
  buildCommit?: string;
  modules?: Record<string, boolean>;
  config?: {
    evolution?: boolean;
    database?: boolean;
  };
  evolutionConnectivity?: {
    reachable?: boolean;
    httpHealth?: { ok?: boolean; status?: number };
    suggestions?: string[];
  };
}

async function probeJson(
  url: string,
  init?: RequestInit,
): Promise<{ ok: boolean; status: number; data: unknown | null }> {
  try {
    const response = await fetch(url, {
      ...init,
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return { ok: response.ok, status: response.status, data: null };
    }

    const data = (await response.json()) as unknown;
    return { ok: response.ok, status: response.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

function readVersion(): string {
  return process.env.APP_VERSION ?? "dev";
}

export async function collectSetupStatus(): Promise<SetupStatusReport> {
  const checks: SetupCheck[] = [];
  const version = readVersion();

  if (version === "dev") {
    checks.push({
      id: "frontend_deploy",
      status: "warning",
      title: "Frontend not on latest build",
      detail: "Production is still serving version \"dev\" instead of a git commit hash.",
      fix: "EasyPanel → frontend → Source = GitHub (main) → Deploy, or run the Deploy now workflow with your EasyPanel webhook.",
    });
  } else {
    checks.push({
      id: "frontend_deploy",
      status: "ok",
      title: "Frontend build",
      detail: `Running build ${version.slice(0, 12)}.`,
    });
  }

  const configuredBackendUrl = getConfiguredBackendApiUrl();
  const resolvedBackendUrl = getBackendApiUrl();

  if (configuredBackendUrl !== resolvedBackendUrl && /botflow\.ink/i.test(configuredBackendUrl)) {
    checks.push({
      id: "api_url",
      status: "error",
      title: "API URL misconfigured",
      detail: `NEXT_PUBLIC_API_URL points to ${configuredBackendUrl} instead of api.botflow.ink.`,
      fix: "Set NEXT_PUBLIC_API_URL=https://api.botflow.ink and BACKEND_API_URL=https://api.botflow.ink in EasyPanel, then redeploy frontend.",
    });
  }

  const backendProbe = await probeJson(getBackendApiUrl("/health"));
  const backendHealth = backendProbe.data as BackendHealthPayload | null;

  if (!backendProbe.ok || !backendHealth) {
    checks.push({
      id: "backend",
      status: "error",
      title: "Backend unreachable",
      detail: `Could not reach ${resolvedBackendUrl}/health (HTTP ${backendProbe.status || "timeout"}).`,
      fix: "EasyPanel → backend service → check logs and redeploy from sass-botflow/backend main.",
    });
  } else {
    checks.push({
      id: "backend",
      status: "ok",
      title: "Backend API",
      detail: `api.botflow.ink is up (build ${backendHealth.buildCommit ?? "unknown"}).`,
    });

    if (!backendHealth.modules?.whatsapp) {
      checks.push({
        id: "backend_whatsapp",
        status: "warning",
        title: "Backend WhatsApp module outdated",
        detail: "Health check does not report the WhatsApp module — production may be on an old image.",
        fix: "Redeploy backend from sass-botflow/backend branch main (Dockerfile).",
      });
    } else {
      checks.push({
        id: "backend_whatsapp",
        status: "ok",
        title: "Backend WhatsApp module",
        detail: "WhatsApp routes are available on the API.",
      });
    }

    if (!backendHealth.config?.evolution) {
      checks.push({
        id: "backend_evolution_env",
        status: "error",
        title: "Evolution not configured on backend",
        detail: "EVOLUTION_API_URL or EVOLUTION_API_KEY is missing.",
        fix: "Set EVOLUTION_API_URL=http://evolution-api:8080 and EVOLUTION_API_KEY (same as Evolution AUTHENTICATION_API_KEY), then redeploy backend.",
      });
    } else {
      checks.push({
        id: "backend_evolution_env",
        status: "ok",
        title: "Backend Evolution config",
        detail: "EVOLUTION_API_URL and EVOLUTION_API_KEY are set.",
      });
    }

    const connectivity = backendHealth.evolutionConnectivity;
    if (connectivity) {
      const evolutionReachable =
        connectivity.reachable === true || connectivity.httpHealth?.ok === true;

      checks.push({
        id: "backend_evolution_network",
        status: evolutionReachable ? "ok" : "error",
        title: "Backend → Evolution network",
        detail: evolutionReachable
          ? "Backend can reach Evolution API internally."
          : (connectivity.suggestions?.[0] ??
            "Backend cannot reach Evolution API on the internal network."),
        fix: evolutionReachable
          ? undefined
          : "Deploy Evolution Compose in the same EasyPanel project and use EVOLUTION_API_URL=http://evolution-api:8080.",
      });
    }
  }

  const evolutionProbe = await probeJson(`${EVOLUTION_PUBLIC_URL.replace(/\/$/, "")}/health`);
  if (!evolutionProbe.ok) {
    checks.push({
      id: "evolution_public",
      status: "error",
      title: "Evolution API not running",
      detail: `${EVOLUTION_PUBLIC_URL} returned HTTP ${evolutionProbe.status || "timeout/SSL error"}.`,
      fix: "EasyPanel → Add Compose → sass-botflow/backend → deploy/evolution-api/docker-compose.yml → set SERVER_URL, AUTHENTICATION_API_KEY, DATABASE_CONNECTION_URI → Deploy.",
    });
  } else {
    checks.push({
      id: "evolution_public",
      status: "ok",
      title: "Evolution API",
      detail: `${EVOLUTION_PUBLIC_URL} is healthy.`,
    });
  }

  const ready = checks.every((check) => check.status === "ok");

  return {
    ready,
    checks,
    timestamp: new Date().toISOString(),
  };
}
