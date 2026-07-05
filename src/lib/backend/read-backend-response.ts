import { extractErrorMessage } from "@/lib/backend/extract-error-message";
import {
  classifyApiFailure,
  isHtmlResponse,
  sanitizeErrorText,
} from "@/lib/api/api-error";

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
  const classified = classifyApiFailure({
    status,
    text: rawText,
    backendUrl,
    message: fallback,
  });

  if (isHtmlResponse("", rawText)) {
    return classified.userMessage;
  }

  const snippet = sanitizeErrorText(rawText);
  if (!snippet) {
    return `${classified.userMessage} (HTTP ${status})`;
  }

  return `${classified.userMessage} (HTTP ${status})`;
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
  rawText?: string,
) {
  const html = rawText ? isHtmlResponse("", rawText) : false;
  const safeMessage = html ? classifyApiFailure({ status, text: rawText, backendUrl }).userMessage : message;

  return {
    error: sanitizeErrorText(safeMessage) || message,
    status,
    backendUrl,
    ...(html ? { errorKind: "html_response" as const } : {}),
  };
}

export function extractBackendErrorMessage(
  data: unknown,
  fallback: string,
): string {
  const extracted = extractErrorMessage(data, fallback);

  if (isHtmlResponse("", extracted)) {
    return classifyApiFailure({
      status: 502,
      text: extracted,
      message: fallback,
    }).userMessage;
  }

  return sanitizeErrorText(extracted) || fallback;
}
