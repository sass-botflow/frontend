import { headers } from "next/headers";
import { BETTER_AUTH_BASE_PATH } from "@/lib/auth/constants";
import { getBackendApiUrl } from "@/lib/backend/config";

export type BetterAuthSessionPayload = {
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    token: string;
  };
  user: {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    image?: string | null;
  };
};

export type BetterAuthAppMe = {
  session: BetterAuthSessionPayload;
  botflowUser: {
    id: string;
    email: string | null;
    username: string;
    name: string;
    avatarUrl: string | null;
    emailVerified: boolean;
  } | null;
  organization: {
    id: string;
    name: string;
    slug: string;
    subscription?: {
      status: string;
      plan: string;
      currentPeriodEnd: string | null;
    } | null;
  } | null;
};

async function forwardCookieHeader(): Promise<string> {
  const headerStore = await headers();
  return headerStore.get("cookie") ?? "";
}

export async function getBetterAuthSession(): Promise<BetterAuthSessionPayload | null> {
  const cookie = await forwardCookieHeader();
  if (!cookie) return null;

  const response = await fetch(getBackendApiUrl(`${BETTER_AUTH_BASE_PATH}/get-session`), {
    method: "GET",
    headers: { cookie },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const data = (await response.json()) as BetterAuthSessionPayload | null;
  return data?.session ? data : null;
}

export async function getBetterAuthAppMe(): Promise<BetterAuthAppMe | null> {
  const cookie = await forwardCookieHeader();
  if (!cookie) return null;

  const response = await fetch(getBackendApiUrl(`${BETTER_AUTH_BASE_PATH}/app/me`), {
    method: "GET",
    headers: { cookie },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const data = (await response.json()) as BetterAuthAppMe;
  return data?.session ? data : null;
}
