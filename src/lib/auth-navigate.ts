import { autoVerifyUserEmail, bootstrapUserAccess } from "@/app/auth/actions";

/** Full page navigation — required for Clerk session cookies to persist. */
export function hardRedirect(path: string) {
  window.location.href = path;
}

export function clerkErrorMessage(
  error: { longMessage?: string; message?: string } | null | undefined,
  fallback: string,
) {
  return error?.longMessage ?? error?.message ?? fallback;
}

/** Verify email, ensure dashboard access, then hard-redirect (keeps session). */
export async function finishAuthAndRedirect(path: string) {
  await autoVerifyUserEmail();
  await bootstrapUserAccess();
  hardRedirect(path);
}
