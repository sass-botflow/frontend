import type {
  ConnectIntegrationResponse,
  DisconnectIntegrationBody,
  IntegrationsResponse,
  IntegrationPlatform,
} from "@/lib/integrations/types";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      typeof body.error === "string" ? body.error : "Request failed";
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export async function fetchIntegrations(): Promise<IntegrationsResponse> {
  const response = await fetch("/api/integrations", { cache: "no-store" });
  return parseJson<IntegrationsResponse>(response);
}

export async function connectIntegration(
  platform: IntegrationPlatform,
): Promise<ConnectIntegrationResponse> {
  const response = await fetch(`/api/integrations/${platform}/connect`, {
    method: "POST",
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
