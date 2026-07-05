export function extractErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;

  const record = body as Record<string, unknown>;

  if (typeof record.error === "string") return record.error;

  if (typeof record.message === "string") return record.message;

  if (record.message && typeof record.message === "object") {
    const nested = record.message as Record<string, unknown>;
    if (typeof nested.message === "string") return nested.message;
  }

  return fallback;
}
