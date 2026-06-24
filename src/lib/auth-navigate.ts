import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function navigateAfterAuth(
  router: AppRouterInstance,
  decorateUrl: (url: string) => string,
  path: string,
) {
  const destination = decorateUrl(path);

  if (destination.startsWith("http")) {
    window.location.assign(destination);
    return;
  }

  router.replace(destination);
}

export function clerkErrorMessage(
  error: { longMessage?: string; message?: string } | null | undefined,
  fallback: string,
) {
  return error?.longMessage ?? error?.message ?? fallback;
}
