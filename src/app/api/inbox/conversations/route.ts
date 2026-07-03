import { NextResponse } from "next/server";
import {
  BackendApiError,
  BackendAuthError,
  fetchBackendConversations,
  fetchBackendMessages,
} from "@/lib/backend/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId");
    const channelId = searchParams.get("channelId");

    if (conversationId) {
      const messages = await fetchBackendMessages(conversationId);
      return NextResponse.json({ messages });
    }

    const conversations = await fetchBackendConversations(channelId ?? undefined);
    return NextResponse.json({ conversations });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    if (err instanceof BackendApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to load inbox." }, { status: 500 });
  }
}
