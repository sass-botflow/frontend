import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  deriveInstanceName,
  fetchEvolutionInstance,
  isEvolutionConfigured,
  testEvolutionConnectivity,
} from "@/lib/whatsapp/evolution-server";

export async function GET() {
  const authState = await auth({ treatPendingAsSignedOut: false });
  const evolution = await testEvolutionConnectivity();

  let session: Record<string, unknown> | null = null;

  if (authState.userId && evolution.apiKeyValid) {
    const instanceName = deriveInstanceName(authState.userId);
    try {
      const instances = await fetchEvolutionInstance(instanceName);
      session = {
        instanceId: instanceName,
        found: Boolean(instances),
        connectionStatus: instances
          ? instances.connectionStatus ?? instances.status ?? null
          : null,
      };
    } catch (error) {
      session = {
        instanceId: instanceName,
        found: false,
        error: error instanceof Error ? error.message : "Could not fetch instance.",
      };
    }
  }

  return NextResponse.json({
    evolutionConfigured: isEvolutionConfigured(),
    clerkAuthenticated: Boolean(authState.userId),
    evolution,
    session,
    timestamp: new Date().toISOString(),
  });
}
