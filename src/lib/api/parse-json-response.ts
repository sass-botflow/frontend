import {
  ApiError,
  classifyApiFailure,
  createApiErrorFromResponse,
  extractRequestId,
  isHtmlResponse,
  sanitizeErrorText,
} from "@/lib/api/api-error";

interface ApiErrorBody {
  error?: string;
  message?: string;
  status?: number;
  backendUrl?: string;
  detail?: string;
  errorKind?: string;
}

function buildMessageFromBody(body: ApiErrorBody, status: number): string {
  const parts: string[] = [];

  if (body.error) parts.push(body.error);
  if (body.message && body.message !== body.error) parts.push(body.message);

  const detail = sanitizeErrorText(body.detail ?? "");
  if (detail) parts.push(detail);

  if (body.backendUrl) parts.push(body.backendUrl);

  if (parts.length === 0) {
    return `HTTP ${status}: request failed.`;
  }

  return parts.join(" | ");
}

export async function parseJsonResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();
  const requestId = extractRequestId(response);

  if (isHtmlResponse(contentType, text)) {
    const isWhatsAppRoute = (response.url || "").includes("/whatsapp/");
    throw createApiErrorFromResponse(response, {
      rawText: text,
      message:
        isWhatsAppRoute && response.status >= 500
          ? "WhatsApp service timed out. Wait a few seconds and try again."
          : "HTML gateway response",
    });
  }

  const trimmed = text.trimStart();
  const looksLikeJson =
    contentType.includes("application/json") ||
    trimmed.startsWith("{") ||
    trimmed.startsWith("[");

  if (!looksLikeJson) {
    const details = classifyApiFailure({
      status: response.status,
      contentType,
      text,
      requestUrl: response.url || undefined,
      requestId,
    });

    throw new ApiError(details);
  }

  let body: T & ApiErrorBody;
  try {
    body = JSON.parse(text) as T & ApiErrorBody;
  } catch {
    throw createApiErrorFromResponse(response, {
      rawText: text,
      message: "Invalid JSON response",
    });
  }

  if (!response.ok) {
    const rawMessage = buildMessageFromBody(body, response.status);
    const details = classifyApiFailure({
      status: body.status ?? response.status,
      message: rawMessage,
      backendUrl: body.backendUrl,
      requestUrl: response.url || undefined,
      requestId,
      text: body.errorKind === "html_response" ? "<html>" : "",
    });

    const backendError = sanitizeErrorText(body.error ?? body.message ?? "");
    const useBackendError =
      backendError.length > 0 &&
      !backendError.toLowerCase().includes("html response") &&
      !isHtmlResponse("", backendError);

    throw new ApiError({
      ...details,
      userMessage: useBackendError ? backendError : details.userMessage,
    });
  }

  return body as T;
}

export { ApiError, getApiErrorMessage, getApiErrorTitle, toApiError } from "@/lib/api/api-error";
