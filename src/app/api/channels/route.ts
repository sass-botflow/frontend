import { NextResponse } from "next/server";
import { BackendAuthError } from "@/lib/backend/errors";
import { proxyBackendRequest } from "@/lib/backend/proxy";

export async function GET() {
  try {
    const response = await proxyBackendRequest("/api/channels");
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        body && typeof body === "object" && "message" in body
          ? String((body as { message: unknown }).message)
          : "Failed to load channels.";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const channels = Array.isArray(body)
      ? body
      : ((body as { channels?: unknown[]; data?: unknown[] }).channels ??
        (body as { data?: unknown[] }).data ??
        []);

    return NextResponse.json({ channels });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load channels." }, { status: 500 });
  }
}
