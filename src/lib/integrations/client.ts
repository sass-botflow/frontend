import type {
  ConnectIntegrationResponse,
  DisconnectIntegrationBody,
  IntegrationsResponse,
  IntegrationPlatform,
} from "@/lib/integrations/types";
import type { ConnectCredentialsInput } from "@/lib/integrations/connect-credentials";

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!response.ok) {
    try {
      const body = JSON.parse(text) as { error?: string };
      const message =
        typeof body.error === "string" ? body.error : `Request failed (${response.status})`;
      throw new Error(message);
    } catch (err) {
      if (err instanceof Error && err.message !== text) {
        throw err;
      }
      throw new Error(`Request failed (${response.status})`);
    }
  }
  return JSON.parse(text) as T;
}

export async function fetchIntegrations(): Promise<IntegrationsResponse> {
  const response = await fetch("/api/integrations", { cache: "no-store" });
  return parseJson<IntegrationsResponse>(response);
}

export async function connectIntegration(
  credentials: ConnectCredentialsInput,
): Promise<ConnectIntegrationResponse> {
  const { platform, ...body } = credentials;
  const response = await fetch(`/api/integrations/${platform}/connect`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson<ConnectIntegrationResponse>(response);
}

export async function disconnectIntegration(
  platform: IntegrationPlatform,
): Promise<ConnectIntegrationResponse> {
  const body: DisconnectIntegrationBody = { platform };
  const response = await fetch("/api/integrations/disconnect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson<ConnectIntegrationResponse>(response);
}
