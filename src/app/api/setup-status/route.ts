import { NextResponse } from "next/server";
import { collectSetupStatus } from "@/lib/setup/status";

export const dynamic = "force-dynamic";

export async function GET() {
  const report = await collectSetupStatus();
  return NextResponse.json(report, { status: report.ready ? 200 : 503 });
}
