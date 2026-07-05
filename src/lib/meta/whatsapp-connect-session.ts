import { getMetaAppId, getMetaEmbeddedSignupConfigId } from "@/lib/meta/config";
import { BackendApiError } from "@/lib/backend/errors";
import {
  resolveBackendAuthRecord,
  signWhatsAppEmbeddedSignupState,
} from "@/lib/backend/token-bridge";
import type { WhatsAppEmbeddedSignupConnectResponse } from "@/lib/backend/types";

function readEmbeddedSignupConfig(): Pick<
  WhatsAppEmbeddedSignupConnectResponse,
  "appId" | "configId"
> {
  try {
    return {
      appId: getMetaAppId(),
      configId: getMetaEmbeddedSignupConfigId(),
    };
  } catch (err) {
    throw new BackendApiError(
      err instanceof Error
        ? `${err.message} Add NEXT_PUBLIC_META_APP_ID and NEXT_PUBLIC_META_EMBEDDED_SIGNUP_CONFIG_ID in EasyPanel frontend Environment, then redeploy.`
        : "Meta Embedded Signup is not configured on the frontend.",
      503,
    );
  }
}

export async function resolveWhatsAppEmbeddedSignupConnectSession(): Promise<WhatsAppEmbeddedSignupConnectResponse> {
  const config = readEmbeddedSignupConfig();
  const record = await resolveBackendAuthRecord();

  return {
    ...config,
    state: signWhatsAppEmbeddedSignupState({
      workspaceId: record.organizationId,
      userId: record.userId,
    }),
  };
}
