import { NextResponse } from "next/server";
import { BackendAuthError } from "@/lib/backend/errors";
import { proxyBackendJson, proxyBackendRequest } from "@/lib/backend/proxy";
import { isEvolutionConfigured } from "@/lib/whatsapp/evolution-server";

export function shouldUseEvolutionFallback(response: Response): boolean {
  return (
    isEvolutionConfigured() &&
    (response.status === 404 || response.status === 502 || response.status === 503)
  );
}

export async function proxyBackendJsonWithEvolutionFallback<T>(
  backendPath: string,
  init: RequestInit | undefined,
  fallback: () => Promise<T>,
): Promise<NextResponse> {
  try {
    const response = await proxyBackendRequest(backendPath, {
      ...init,
      redirect: "manual",
    });

    if (!shouldUseEvolutionFallback(response)) {
      const body = await response.text();
      return new NextResponse(body, {
        status: response.status,
        headers: {
          "Content-Type": response.headers.get("content-type") ?? "application/json",
        },
      });
    }
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (!isEvolutionConfigured()) {
      return NextResponse.json(
        {
          error:
            "WhatsApp backend is unavailable. Set EVOLUTION_API_URL and EVOLUTION_API_KEY on the frontend server, or redeploy the backend.",
        },
        { status: 503 },
      );
    }
  }

  try {
    const result = await fallback();
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const message =
      error instanceof Error ? error.message : "WhatsApp request failed.";
    return NextResponse.json(
      { error: message, message },
      { status: 502 },
    );
  }
}

export async function proxyBackendChannelsWithEvolutionFallback(): Promise<NextResponse> {
  try {
    const response = await proxyBackendRequest("/api/channels");

    if (!shouldUseEvolutionFallback(response)) {
      return proxyBackendJson("/api/channels");
    }
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (!isEvolutionConfigured()) {
      return NextResponse.json({ channels: [] });
    }
  }

  const { evolutionListChannels } = await import(
    "@/lib/whatsapp/evolution-bff-service"
  );

  try {
    const result = await evolutionListChannels();
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ channels: [] });
  }
}
