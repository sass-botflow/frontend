import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/backend/config";
import { BackendAuthError } from "@/lib/backend/errors";
import {
  extractBackendErrorMessage,
  formatNonJsonBackendError,
  formatRedirectBackendError,
  jsonErrorPayload,
  readBackendResponse,
} from "@/lib/backend/read-backend-response";
import { proxyBackendRequest } from "@/lib/backend/proxy";

function whatsAppBackendPath(suffix = ""): string {
  return `/api/whatsapp/sessions${suffix}`;
}

export async function proxyWhatsAppBackend(
  pathSuffix: string,
  init?: RequestInit,
): Promise<{ response: Response; backendUrl: string }> {
  const path = whatsAppBackendPath(pathSuffix);
  const backendUrl = getBackendApiUrl(path);

  if (!backendUrl.startsWith("http://") && !backendUrl.startsWith("https://")) {
    throw new Error(`Invalid backend URL: ${backendUrl}`);
  }

  const response = await proxyBackendRequest(path, {
    ...init,
    redirect: "manual",
  });

  return { response, backendUrl };
}

export async function proxyWhatsAppJson(
  pathSuffix: string,
  init: RequestInit | undefined,
  fallbackError: string,
): Promise<NextResponse> {
  try {
    const { response, backendUrl } = await proxyWhatsAppBackend(pathSuffix, init);
    const parsed = await readBackendResponse(response);

    if (response.status >= 300 && response.status < 400) {
      const message = formatRedirectBackendError(
        backendUrl,
        response.status,
        response.headers.get("location"),
        fallbackError,
      );
      return NextResponse.json(
        jsonErrorPayload(message, response.status, backendUrl),
        { status: 502 },
      );
    }

    if (!parsed.isJson) {
      const message = formatNonJsonBackendError(
        backendUrl,
        parsed.status,
        parsed.rawText,
        fallbackError,
      );
      return NextResponse.json(
        jsonErrorPayload(message, parsed.status, backendUrl, parsed.rawText),
        { status: parsed.status >= 400 ? parsed.status : 502 },
      );
    }

    if (!response.ok) {
      const message = extractBackendErrorMessage(parsed.data, fallbackError);
      return NextResponse.json(
        jsonErrorPayload(message, parsed.status, backendUrl),
        { status: parsed.status },
      );
    }

    return NextResponse.json(parsed.data, { status: response.status });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message, status: 401 }, { status: 401 });
    }
    const message = err instanceof Error ? err.message : fallbackError;
    return NextResponse.json(
      jsonErrorPayload(message, 500, getBackendApiUrl(whatsAppBackendPath(pathSuffix))),
      { status: 500 },
    );
  }
}

export async function proxyWhatsAppSessionJson(
  sessionId: string,
  pathSuffix: string,
  fallbackError: string,
): Promise<NextResponse> {
  return proxyWhatsAppJson(
    `/${encodeURIComponent(sessionId)}/${pathSuffix}`,
    undefined,
    fallbackError,
  );
}
