import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  isEvolutionConfigured,
  testEvolutionConnectivity,
} from "@/lib/whatsapp/evolution-server";

export async function GET() {
  const authState = await auth({ treatPendingAsSignedOut: false });

  return NextResponse.json({
    evolutionConfigured: isEvolutionConfigured(),
    clerkAuthenticated: Boolean(authState.userId),
    evolution: await testEvolutionConnectivity(),
    timestamp: new Date().toISOString(),
  });
}
