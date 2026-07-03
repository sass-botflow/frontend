import { NextResponse } from "next/server";
import { proxyBackendJson } from "@/lib/backend/proxy";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  return proxyBackendJson(`/api/channels/${encodeURIComponent(id)}`);
}
