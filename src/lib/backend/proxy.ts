import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/backend/config";
import { getBackendAuthHeaders } from "@/lib/backend/auth";
import { BackendApiError, BackendAuthError } from "@/lib/backend/errors";
import {
  authHeaderLogMeta,
  logBackendRequest,
  logBackendResponse,
} from "@/lib/backend/logger";

export async function proxyBackendRequest(
  path: string,
  init?: RequestInit & { redirect?: RequestRedirect },
): Promise<Response> {
  const headers = await getBackendAuthHeaders();
  const method = init?.method ?? "GET";

  logBackendRequest(method, path, authHeaderLogMeta(headers.Authorization));

  const response = await fetch(getBackendApiUrl(path), {
    ...init,
    headers: {
      ...headers,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  logBackendResponse(method, path, response.status);

  return response;
}

export async function proxyBackendJson(
  path: string,
  init?: RequestInit,
): Promise<NextResponse> {
  try {
    const response = await proxyBackendRequest(path, {
      ...init,
      redirect: "manual",
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      return NextResponse.json(
        {
          error: "Backend returned a redirect instead of JSON.",
          ...(location ? { redirect: location } : {}),
        },
        { status: 502 },
      );
    }

    const contentType = response.headers.get("content-type") ?? "";
    const body = await response.text();
    const trimmed = body.trimStart();
    const looksLikeJson =
      contentType.includes("application/json") ||
      trimmed.startsWith("{") ||
      trimmed.startsWith("[");

    if (!looksLikeJson) {
      return NextResponse.json(
        {
          error:
            "Backend returned a non-JSON response. Check API configuration.",
        },
        { status: 502 },
      );
    }

    return new NextResponse(body, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    if (err instanceof BackendApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Backend request failed." }, { status: 500 });
  }
}

export async function proxyBackendRedirect(path: string): Promise<NextResponse> {
  try {
    const response = await proxyBackendRequest(path, { redirect: "manual" });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (location) {
        return NextResponse.redirect(location);
      }
    }

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const message =
        body && typeof body === "object" && "message" in body
          ? String((body as { message: unknown }).message)
          : "Backend redirect failed.";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    return NextResponse.json({ error: "Backend did not return a redirect." }, { status: 502 });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    if (err instanceof BackendApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Backend redirect failed." }, { status: 500 });
  }
}
