import { extractErrorMessage } from "@/lib/backend/extract-error-message";

export interface BackendResponseBody {
  status: number;
  contentType: string;
  rawText: string;
  isJson: boolean;
  data: unknown;
}

export function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export async function readBackendResponse(
  response: Response,
): Promise<BackendResponseBody> {
  const contentType = response.headers.get("content-type") ?? "";
  const rawText = await response.text();
  const trimmed = rawText.trimStart();
  const looksLikeJson =
    contentType.includes("application/json") ||
    trimmed.startsWith("{") ||
    trimmed.startsWith("[");

  if (!looksLikeJson || !trimmed) {
    return {
      status: response.status,
      contentType,
      rawText,
      isJson: false,
      data: null,
    };
  }

  try {
    return {
      status: response.status,
      contentType,
      rawText,
      isJson: true,
      data: JSON.parse(rawText) as unknown,
    };
  } catch {
    return {
      status: response.status,
      contentType,
      rawText,
      isJson: false,
      data: null,
    };
  }
}

export function formatNonJsonBackendError(
  backendUrl: string,
  status: number,
  rawText: string,
  fallback: string,
): string {
  const snippet = collapseWhitespace(rawText).slice(0, 240);
  if (!snippet) {
    return `${fallback} (HTTP ${status} from ${backendUrl})`;
  }
  if (snippet.startsWith("<!")) {
    return `${fallback} (HTTP ${status} from ${backendUrl}): HTML response — ${snippet}`;
  }
  return `${fallback} (HTTP ${status} from ${backendUrl}): ${snippet}`;
}

export function formatRedirectBackendError(
  backendUrl: string,
  status: number,
  location: string | null,
  fallback: string,
): string {
  return `${fallback} (HTTP ${status} redirect from ${backendUrl})${
    location ? `: ${location}` : ""
  }`;
}

export function jsonErrorPayload(
  message: string,
  status: number,
  backendUrl: string,
  detail?: string,
) {
  return {
    error: message,
    status,
    backendUrl,
    ...(detail ? { detail: detail.slice(0, 500) } : {}),
  };
}

export function extractBackendErrorMessage(
  data: unknown,
  fallback: string,
): string {
  return extractErrorMessage(data, fallback);
}
