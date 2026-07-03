import {
  getMetaAppId,
  getMetaAppSecret,
  META_GRAPH_VERSION,
} from "@/lib/meta/config";
import { mapMetaVerificationStatus } from "@/lib/meta/whatsapp-types";

interface GraphErrorBody {
  error?: { message?: string; type?: string; code?: number; error_subcode?: number };
}

async function graphFetch<T>(path: string, accessToken: string): Promise<T> {
  const url = path.startsWith("http")
    ? path
    : `https://graph.facebook.com/${META_GRAPH_VERSION}${path}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  const body = (await response.json()) as T & GraphErrorBody;
  if (!response.ok) {
    throw new Error(body.error?.message ?? `Meta API error (${response.status})`);
  }
  return body;
}

async function graphPost<T>(
  path: string,
  accessToken: string,
  payload?: Record<string, unknown>,
): Promise<T> {
  const url = path.startsWith("http")
    ? path
    : `https://graph.facebook.com/${META_GRAPH_VERSION}${path}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
    cache: "no-store",
  });

  const body = (await response.json()) as T & GraphErrorBody;
  if (!response.ok) {
    throw new Error(body.error?.message ?? `Meta API error (${response.status})`);
  }
  return body;
}

export async function exchangeEmbeddedSignupCode(code: string) {
  const params = new URLSearchParams({
    client_id: getMetaAppId(),
    client_secret: getMetaAppSecret(),
    code,
  });

  const response = await fetch(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/oauth/access_token?${params.toString()}`,
    { cache: "no-store" },
  );
  const body = (await response.json()) as {
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    error?: { message?: string };
  };

  if (!response.ok || !body.access_token) {
    throw new Error(body.error?.message ?? "Failed to exchange Embedded Signup code.");
  }

  return body.access_token;
}

export async function exchangeForLongLivedToken(shortLivedToken: string) {
  const params = new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: getMetaAppId(),
    client_secret: getMetaAppSecret(),
    fb_exchange_token: shortLivedToken,
  });

  const response = await fetch(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/oauth/access_token?${params.toString()}`,
    { cache: "no-store" },
  );
  const body = (await response.json()) as {
    access_token?: string;
    error?: { message?: string };
  };

  if (!response.ok || !body.access_token) {
    return shortLivedToken;
  }

  return body.access_token;
}

export interface WhatsAppPhoneDetails {
  id: string;
  displayPhoneNumber: string;
  verifiedName: string;
  verificationStatus: "VERIFIED" | "PENDING" | "UNKNOWN";
}

export async function fetchWhatsAppPhoneDetails(
  phoneNumberId: string,
  accessToken: string,
): Promise<WhatsAppPhoneDetails> {
  const phone = await graphFetch<{
    id: string;
    display_phone_number?: string;
    verified_name?: string;
    code_verification_status?: string;
  }>(
    `/${phoneNumberId}?fields=id,display_phone_number,verified_name,code_verification_status`,
    accessToken,
  );

  return {
    id: phone.id,
    displayPhoneNumber: phone.display_phone_number ?? phoneNumberId,
    verifiedName: phone.verified_name ?? "WhatsApp Business",
    verificationStatus: mapMetaVerificationStatus(phone.code_verification_status),
  };
}

export async function subscribeAppToWaba(wabaId: string, accessToken: string) {
  try {
    await graphPost<{ success: boolean }>(`/${wabaId}/subscribed_apps`, accessToken);
  } catch (err) {
    const message = err instanceof Error ? err.message.toLowerCase() : "";
    if (!message.includes("already") && !message.includes("subscribed")) {
      throw err;
    }
  }
}

function generateRegistrationPin() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function registerPhoneForCloudApi(
  phoneNumberId: string,
  accessToken: string,
) {
  try {
    await graphPost<{ success: boolean }>(`/${phoneNumberId}/register`, accessToken, {
      messaging_product: "whatsapp",
      pin: generateRegistrationPin(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message.toLowerCase() : "";
    if (
      !message.includes("already") &&
      !message.includes("registered") &&
      !message.includes("exists")
    ) {
      throw err;
    }
  }
}

export type EmbeddedSignupFinishEvent =
  | "FINISH"
  | "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING"
  | "FINISH_ONLY_WABA";

export async function onboardEmbeddedSignupCustomer(params: {
  code: string;
  wabaId: string;
  phoneNumberId: string;
  finishEvent: EmbeddedSignupFinishEvent;
}) {
  const shortToken = await exchangeEmbeddedSignupCode(params.code);
  const accessToken = await exchangeForLongLivedToken(shortToken);
  const phone = await fetchWhatsAppPhoneDetails(params.phoneNumberId, accessToken);

  await subscribeAppToWaba(params.wabaId, accessToken);

  if (params.finishEvent !== "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING") {
    await registerPhoneForCloudApi(params.phoneNumberId, accessToken);
  }

  return { accessToken, phone };
}
