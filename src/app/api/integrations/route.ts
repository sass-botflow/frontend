import { NextResponse } from "next/server";
import { proxyBackendJson } from "@/lib/backend/proxy";

export async function GET() {
  return proxyBackendJson("/api/integrations");
}
