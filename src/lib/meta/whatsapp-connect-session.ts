import { getMetaAppId, getMetaEmbeddedSignupConfigId } from "@/lib/meta/config";
import { proxyBackendRequest } from "@/lib/backend/proxy";
import { BackendApiError } from "@/lib/backend/errors";
import type { WhatsAppEmbeddedSignupConnectResponse } from "@/lib/backend/types";

function parseOAuthRedirect(
  location: string,
): Pick<WhatsAppEmbeddedSignupConnectResponse, "appId" | "state"> | null {
  try {
    const url = new URL(location);
    const appId = url.searchParams.get("client_id");
    const state = url.searchParams.get("state");
    if (!appId || !state) return null;
    return { appId, state };
  } catch {
    return null;
  }
}

function readEmbeddedSignupConfig(): Pick<
  WhatsAppEmbeddedSignupConnectResponse,
  "appId" | "configId"
> {
  return {
    appId: getMetaAppId(),
    configId: getMetaEmbeddedSignupConfigId(),
  };
}

export async function resolveWhatsAppEmbeddedSignupConnectSession(): Promise<WhatsAppEmbeddedSignupConnectResponse> {
  const response = await proxyBackendRequest("/api/channels/whatsapp/connect", {
    redirect: "manual",
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (response.ok && contentType.includes("application/json")) {
    const body = (await response.json()) as Partial<WhatsAppEmbeddedSignupConnectResponse>;
    if (body.appId && body.configId && body.state) {
      return {
        appId: body.appId,
        configId: body.configId,
        state: body.state,
      };
    }
  }

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (location) {
      const redirectParams = parseOAuthRedirect(location);
      if (redirectParams) {
        try {
          const config = readEmbeddedSignupConfig();
          return {
            ...config,
            state: redirectParams.state,
            appId: redirectParams.appId || config.appId,
          };
        } catch (err) {
          throw new BackendApiError(
            err instanceof Error
              ? err.message
              : "Meta Embedded Signup is not configured on the frontend.",
            503,
          );
        }
      }
    }
  }

  if (!response.ok) {
    const body = contentType.includes("application/json")
      ? ((await response.json().catch(() => ({}))) as { message?: string; error?: string })
      : null;
    const message =
      body?.error ??
      body?.message ??
      "Backend could not start WhatsApp Embedded Signup.";
    throw new BackendApiError(message, response.status);
  }

  throw new BackendApiError(
    "Backend returned an unexpected response for WhatsApp connect.",
    502,
  );
}
