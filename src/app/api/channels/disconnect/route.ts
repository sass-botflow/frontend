import { proxyBackendJson } from "@/lib/backend/proxy";

export async function POST(request: Request) {
  const body = (await request.json()) as { channelId?: string };
  if (!body.channelId) {
    return Response.json({ error: "channelId is required." }, { status: 400 });
  }

  return proxyBackendJson(
    `/api/channels/${encodeURIComponent(body.channelId)}/disconnect`,
    { method: "POST" },
  );
}
