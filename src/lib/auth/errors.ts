export function getAuthErrorMessage(
  error: { message?: string; status?: number; code?: string } | null | undefined,
  fallback: string,
): string {
  if (!error) return fallback;

  if (error.status === 403) {
    return "Please verify your email address before signing in.";
  }

  return error.message?.trim() || fallback;
}
