import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Manual WhatsApp credentials are no longer supported. Use Connect WhatsApp Business (Meta Embedded Signup).",
    },
    { status: 410 },
  );
}
