import { NextResponse } from "next/server";
import {
  BackendApiError,
  BackendAuthError,
  refreshBackendChannel,
} from "@/lib/backend/client";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { channelId?: string };
    if (!body.channelId) {
      return NextResponse.json({ error: "channelId is required." }, { status: 400 });
    }

    const channel = await refreshBackendChannel(body.channelId);
    return NextResponse.json({ channel, message: "Channel refreshed." });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    if (err instanceof BackendApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to refresh channel." }, { status: 500 });
  }
}
