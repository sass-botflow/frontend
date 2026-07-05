export async function parseJsonResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();

  const looksLikeJson =
    contentType.includes("application/json") ||
    text.trimStart().startsWith("{") ||
    text.trimStart().startsWith("[");

  if (!looksLikeJson) {
    throw new Error(
      text.trimStart().startsWith("<!")
        ? "Server returned HTML instead of JSON. Check API configuration or try again."
        : `Unexpected server response (HTTP ${response.status}).`,
    );
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Invalid JSON response from server.");
  }
}
