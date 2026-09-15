import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Fast liveness probe for Docker/EasyPanel — no backend or Evolution calls. */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "botflow-frontend",
      probe: "live",
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
