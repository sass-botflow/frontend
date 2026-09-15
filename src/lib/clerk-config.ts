const PLACEHOLDER_KEY = "pk_build_placeholder";

export function getClerkPublishableKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
  if (!key || key === PLACEHOLDER_KEY) {
    return undefined;
  }
  return key;
}

/** Provider key: runtime EasyPanel env wins; build uses placeholder so SSG succeeds. */
export function getClerkPublishableKeyForProvider(): string | undefined {
  const runtime = getClerkPublishableKey();
  if (runtime) {
    return runtime;
  }
  // Never mount Clerk with placeholder at runtime — causes 500 on every page.
  if (process.env.DOCKER_BUILD === "1" || process.env.CI === "1") {
    return PLACEHOLDER_KEY;
  }
  return undefined;
}

export function isClerkConfigured(): boolean {
  const secret = process.env.CLERK_SECRET_KEY?.trim();
  return Boolean(secret && getClerkPublishableKey());
}
