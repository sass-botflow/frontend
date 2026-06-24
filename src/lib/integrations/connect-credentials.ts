import type { IntegrationPlatform } from "@/lib/integrations/types";

export interface WhatsAppConnectInput {
  phoneNumber: string;
  phoneNumberId: string;
  accessToken: string;
}

export interface InstagramConnectInput {
  username: string;
  pageId: string;
  accessToken: string;
}

export interface TikTokConnectInput {
  username: string;
  businessId: string;
  accessToken: string;
}

export type ConnectCredentialsInput =
  | ({ platform: "whatsapp" } & WhatsAppConnectInput)
  | ({ platform: "instagram" } & InstagramConnectInput)
  | ({ platform: "tiktok" } & TikTokConnectInput);

export interface FieldConfig {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "password";
  hint?: string;
}

export const CONNECT_FIELDS: Record<IntegrationPlatform, FieldConfig[]> = {
  whatsapp: [
    {
      name: "phoneNumber",
      label: "WhatsApp Business phone number",
      placeholder: "+212 612 345 678",
      hint: "The number customers message on WhatsApp.",
    },
    {
      name: "phoneNumberId",
      label: "Phone Number ID",
      placeholder: "From Meta Developer Console",
      hint: "WhatsApp → API Setup → Phone number ID.",
    },
    {
      name: "accessToken",
      label: "Permanent access token",
      placeholder: "EAAxxxx...",
      type: "password",
      hint: "Meta permanent token with whatsapp_business_messaging.",
    },
  ],
  instagram: [
    {
      name: "username",
      label: "Instagram Business username",
      placeholder: "@yourbusiness",
      hint: "The @handle linked to your Instagram Business account.",
    },
    {
      name: "pageId",
      label: "Facebook Page ID",
      placeholder: "123456789012345",
      hint: "Meta Page ID connected to this Instagram account.",
    },
    {
      name: "accessToken",
      label: "Page access token",
      placeholder: "EAAxxxx...",
      type: "password",
      hint: "Long-lived token with instagram_manage_messages.",
    },
  ],
  tiktok: [
    {
      name: "username",
      label: "TikTok Business username",
      placeholder: "@yourbusiness",
      hint: "Your official TikTok Business profile.",
    },
    {
      name: "businessId",
      label: "TikTok Business / App ID",
      placeholder: "From TikTok Developer Portal",
      hint: "App ID from TikTok for Business developer settings.",
    },
    {
      name: "accessToken",
      label: "Access token",
      placeholder: "act.xxxx...",
      type: "password",
      hint: "OAuth access token with messaging permissions.",
    },
  ],
};

function normalizePhone(value: string) {
  const digits = value.replace(/[^\d+]/g, "");
  if (!digits.startsWith("+")) {
    throw new Error("Phone number must include country code, e.g. +212...");
  }
  if (digits.length < 10) {
    throw new Error("Enter a valid WhatsApp business phone number.");
  }
  return digits;
}

function normalizeUsername(value: string) {
  const trimmed = value.trim();
  const handle = trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
  if (!/^@[a-zA-Z0-9._]{2,30}$/.test(handle)) {
    throw new Error("Enter a valid username like @yourbusiness");
  }
  return handle;
}

function requireToken(value: string, label: string) {
  const trimmed = value.trim();
  if (trimmed.length < 12) {
    throw new Error(`${label} looks too short. Paste the full token.`);
  }
  return trimmed;
}

function requireId(value: string, label: string) {
  const trimmed = value.trim();
  if (trimmed.length < 3) {
    throw new Error(`${label} is required.`);
  }
  return trimmed;
}

export function validateConnectCredentials(
  input: Record<string, string> & { platform: IntegrationPlatform },
): ConnectCredentialsInput {
  switch (input.platform) {
    case "whatsapp":
      return {
        platform: "whatsapp",
        phoneNumber: normalizePhone(input.phoneNumber ?? ""),
        phoneNumberId: requireId(input.phoneNumberId ?? "", "Phone Number ID"),
        accessToken: requireToken(input.accessToken ?? "", "Access token"),
      };
    case "instagram":
      return {
        platform: "instagram",
        username: normalizeUsername(input.username ?? ""),
        pageId: requireId(input.pageId ?? "", "Facebook Page ID"),
        accessToken: requireToken(input.accessToken ?? "", "Access token"),
      };
    case "tiktok":
      return {
        platform: "tiktok",
        username: normalizeUsername(input.username ?? ""),
        businessId: requireId(input.businessId ?? "", "Business ID"),
        accessToken: requireToken(input.accessToken ?? "", "Access token"),
      };
  }
}

export function getDisplayName(credentials: ConnectCredentialsInput): string {
  if (credentials.platform === "whatsapp") {
    return credentials.phoneNumber;
  }
  return credentials.username;
}
