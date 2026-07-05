export type ApiFailureCategory =
  | "gateway_error"
  | "backend_unreachable"
  | "evolution_unreachable"
  | "cloudflare_gateway"
  | "network_timeout"
  | "unknown";

export interface ApiErrorDetails {
  category: ApiFailureCategory;
  userTitle: string;
  userMessage: string;
  httpStatus: number;
  requestUrl?: string;
  requestId?: string;
  backendUrl?: string;
  isHtmlResponse?: boolean;
}

export class ApiError extends Error {
  readonly details: ApiErrorDetails;

  constructor(details: ApiErrorDetails) {
    super(details.userMessage);
    this.name = "ApiError";
    this.details = details;
  }
}

const CATEGORY_TITLES: Record<ApiFailureCategory, string> = {
  gateway_error: "Gateway Error",
  backend_unreachable: "Backend Unreachable",
  evolution_unreachable: "Evolution API Unreachable",
  cloudflare_gateway: "Gateway Error",
  network_timeout: "Network Timeout",
  unknown: "Request Failed",
};

export function isHtmlResponse(contentType: string, text: string): boolean {
  const trimmed = text.trimStart();
  if (contentType.toLowerCase().includes("text/html")) return true;
  if (trimmed.startsWith("<!")) return true;
  if (/<html[\s>]/i.test(trimmed.slice(0, 800))) return true;
  return false;
}

function isCloudflareHtml(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("cloudflare") ||
    lower.includes("cf-ray") ||
    lower.includes("attention required") ||
    lower.includes("error code 502") ||
    lower.includes("bad gateway")
  );
}

function mentionsEvolution(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("evolution") ||
    lower.includes("evolutionstatus") ||
    lower.includes("evolutionresponse")
  );
}

function isNetworkFailure(message: string, status: number): boolean {
  if (status === 504 || status === 408) return true;
  const lower = message.toLowerCase();
  return (
    lower.includes("timeout") ||
    lower.includes("timed out") ||
    lower.includes("aborted") ||
    lower.includes("failed to fetch") ||
    lower.includes("networkerror") ||
    lower.includes("network error")
  );
}

export function classifyApiFailure(input: {
  status: number;
  contentType?: string;
  text?: string;
  message?: string;
  backendUrl?: string;
  requestUrl?: string;
  requestId?: string;
}): ApiErrorDetails {
  const {
    status,
    contentType = "",
    text = "",
    message = "",
    backendUrl,
    requestUrl,
    requestId,
  } = input;

  const html = Boolean(text && isHtmlResponse(contentType, text));
  const combined = `${message} ${backendUrl ?? ""}`.trim();

  let category: ApiFailureCategory = "unknown";

  if (isNetworkFailure(message, status) || isNetworkFailure(text, status)) {
    category = "network_timeout";
  } else if (html && isCloudflareHtml(text)) {
    category = "cloudflare_gateway";
  } else if (mentionsEvolution(combined) || mentionsEvolution(text)) {
    category = "evolution_unreachable";
  } else if (html || status === 502 || status === 503) {
    category = html ? "gateway_error" : status === 503 ? "backend_unreachable" : "gateway_error";
  } else if (status >= 500) {
    category = "backend_unreachable";
  } else if (status === 0) {
    category = "backend_unreachable";
  }

  const userTitle = CATEGORY_TITLES[category];
  const userMessage = buildUserMessage(category, status);

  return {
    category,
    userTitle,
    userMessage,
    httpStatus: status || 502,
    requestUrl,
    requestId,
    backendUrl,
    isHtmlResponse: html,
  };
}

function buildUserMessage(category: ApiFailureCategory, status: number): string {
  switch (category) {
    case "cloudflare_gateway":
      return "The Cloudflare gateway returned an error page instead of a response from our API. The backend may be down or restarting.";
    case "gateway_error":
      return "A gateway error occurred while reaching the server. Please try again in a moment.";
    case "backend_unreachable":
      return "We could not reach the BotFlow backend. Check that api.botflow.ink is running and try again.";
    case "evolution_unreachable":
      return "The WhatsApp Evolution API is unreachable or returned an error. Verify Evolution is deployed and configured on the backend.";
    case "network_timeout":
      return "The request timed out before the server responded. Check your connection and try again.";
    default:
      return status >= 500
        ? "Something went wrong on the server. Please try again."
        : "The request could not be completed. Please try again.";
  }
}

export function extractRequestId(response: Response): string | undefined {
  return (
    response.headers.get("cf-ray") ??
    response.headers.get("x-request-id") ??
    response.headers.get("x-correlation-id") ??
    undefined
  );
}

export function sanitizeErrorText(value: string): string {
  if (isHtmlResponse("", value)) {
    return "";
  }
  return value.replace(/\s+/g, " ").trim().slice(0, 240);
}

export function createApiErrorFromResponse(
  response: Response,
  options: {
    rawText?: string;
    message?: string;
    backendUrl?: string;
  } = {},
): ApiError {
  const contentType = response.headers.get("content-type") ?? "";
  const details = classifyApiFailure({
    status: response.status,
    contentType,
    text: options.rawText ?? "",
    message: options.message,
    backendUrl: options.backendUrl,
    requestUrl: response.url || undefined,
    requestId: extractRequestId(response),
  });

  return new ApiError(details);
}

export function toApiError(error: unknown, requestUrl?: string): ApiError {
  if (error instanceof ApiError) {
    if (requestUrl && !error.details.requestUrl) {
      return new ApiError({ ...error.details, requestUrl });
    }
    return error;
  }

  const message = error instanceof Error ? error.message : String(error);
  const statusMatch = message.match(/HTTP (\d{3})/);
  const status = statusMatch ? Number.parseInt(statusMatch[1]!, 10) : 502;

  const htmlInMessage = message.toLowerCase().includes("html response");

  const details = classifyApiFailure({
    status,
    message,
    text: htmlInMessage ? "<html>" : "",
    requestUrl,
  });

  return new ApiError(details);
}

export function getApiErrorMessage(error: unknown): string {
  return toApiError(error).details.userMessage;
}

export function getApiErrorTitle(error: unknown): string {
  return toApiError(error).details.userTitle;
}

export function isDevEnvironment(): boolean {
  return process.env.NODE_ENV === "development";
}
