import { collapseWhitespace } from "@/lib/backend/read-backend-response";

interface ApiErrorBody {
  error?: string;
  message?: string;
  status?: number;
  backendUrl?: string;
  detail?: string;
}

function formatHtmlPreview(text: string): string {
  return collapseWhitespace(text).slice(0, 240);
}

export async function parseJsonResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();

  const trimmed = text.trimStart();
  const looksLikeJson =
    contentType.includes("application/json") ||
    trimmed.startsWith("{") ||
    trimmed.startsWith("[");

  if (!looksLikeJson) {
    const preview = formatHtmlPreview(text);
    throw new Error(
      trimmed.startsWith("<!")
        ? `HTTP ${response.status}: HTML response instead of JSON${preview ? ` — ${preview}` : ""}`
        : `HTTP ${response.status}: unexpected response${preview ? ` — ${preview}` : ""}`,
    );
  }

  let body: T & ApiErrorBody;
  try {
    body = JSON.parse(text) as T & ApiErrorBody;
  } catch {
    throw new Error(`HTTP ${response.status}: invalid JSON response.`);
  }

  if (!response.ok) {
    const message =
      body.error ??
      body.message ??
      `HTTP ${response.status}: request failed.`;
    const parts = [message];
    if (body.status && body.status !== response.status) {
      parts.push(`status ${body.status}`);
    }
    if (body.backendUrl) {
      parts.push(`backend ${body.backendUrl}`);
    }
    if (body.detail) {
      parts.push(formatHtmlPreview(body.detail));
    }
    throw new Error(parts.join(" | "));
  }

  return body as T;
}
