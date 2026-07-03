import { NextResponse } from "next/server";
import {
  BackendApiError,
  BackendAuthError,
  fetchBackendChannels,
} from "@/lib/backend/client";

export async function GET() {
  try {
    const channels = await fetchBackendChannels();
    return NextResponse.json({ channels });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    if (err instanceof BackendApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to load channels." }, { status: 500 });
  }
}
