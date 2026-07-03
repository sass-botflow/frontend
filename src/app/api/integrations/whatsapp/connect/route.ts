import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Manual WhatsApp credentials are no longer supported. Use Connect WhatsApp Business (Meta OAuth).",
      oauthUrl: "/auth/meta",
    },
    { status: 410 },
  );
}
