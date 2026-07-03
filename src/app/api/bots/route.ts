import { NextResponse } from "next/server";
import {
  BackendApiError,
  BackendAuthError,
  fetchBackendBots,
  updateBackendBot,
} from "@/lib/backend/client";

export async function GET() {
  try {
    const bots = await fetchBackendBots();
    return NextResponse.json({ bots });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    if (err instanceof BackendApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to load workflows." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      botId?: string;
      channelId?: string | null;
      name?: string;
    };

    if (!body.botId) {
      return NextResponse.json({ error: "botId is required." }, { status: 400 });
    }

    const bot = await updateBackendBot(body.botId, {
      channelId: body.channelId,
      name: body.name,
    });

    return NextResponse.json({ bot });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    if (err instanceof BackendApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to update workflow." }, { status: 500 });
  }
}
