import {
  getMetaAppId,
  getMetaAppSecret,
  getMetaOAuthRedirectUri,
  META_GRAPH_VERSION,
} from "@/lib/meta/config";

interface GraphErrorBody {
  error?: { message?: string; type?: string; code?: number };
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

export async function exchangeCodeForToken(code: string) {
  const params = new URLSearchParams({
    client_id: getMetaAppId(),
    client_secret: getMetaAppSecret(),
    redirect_uri: getMetaOAuthRedirectUri(),
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
    throw new Error(body.error?.message ?? "Failed to exchange OAuth code.");
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

export interface WhatsAppPhoneOption {
  wabaId: string;
  wabaName: string;
  businessId: string;
  businessName: string;
  phoneNumberId: string;
  phoneNumber: string;
  verifiedName: string;
}

interface BusinessNode {
  id: string;
  name: string;
  owned_whatsapp_business_accounts?: {
    data: Array<{ id: string; name?: string }>;
  };
}

export async function discoverWhatsAppPhoneOptions(
  accessToken: string,
): Promise<WhatsAppPhoneOption[]> {
  const businesses = await graphFetch<{ data: BusinessNode[] }>(
    `/me/businesses?fields=id,name,owned_whatsapp_business_accounts{id,name}`,
    accessToken,
  );

  const options: WhatsAppPhoneOption[] = [];

  for (const business of businesses.data ?? []) {
    const wabas = business.owned_whatsapp_business_accounts?.data ?? [];
    for (const waba of wabas) {
      const phones = await graphFetch<{
        data: Array<{
          id: string;
          display_phone_number?: string;
          verified_name?: string;
        }>;
      }>(`/${waba.id}/phone_numbers?fields=id,display_phone_number,verified_name`, accessToken);

      for (const phone of phones.data ?? []) {
        if (!phone.display_phone_number) continue;
        options.push({
          wabaId: waba.id,
          wabaName: waba.name ?? waba.id,
          businessId: business.id,
          businessName: business.name,
          phoneNumberId: phone.id,
          phoneNumber: phone.display_phone_number,
          verifiedName: phone.verified_name ?? business.name,
        });
      }
    }
  }

  return options;
}
