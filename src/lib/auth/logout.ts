"use client";

import { authClient } from "@/lib/auth-client";

/** Signs out via Better Auth and redirects to marketing home. */
export async function logoutToMarketingHome(locale = "en") {
  await authClient.signOut();
  window.location.href = `/${locale}`;
}
