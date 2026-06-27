import type {
  AffiliateDashboardResponse,
  JoinAffiliateResponse,
  UpdateAffiliateBody,
} from "@/lib/affiliate/types";
import type { AffiliateRecord } from "@/lib/affiliate/types";

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!response.ok) {
    try {
      const body = JSON.parse(text) as { error?: string };
      const message =
        typeof body.error === "string" ? body.error : `Request failed (${response.status})`;
      throw new Error(message);
    } catch (err) {
      if (err instanceof Error && err.message !== text) {
        throw err;
      }
      throw new Error(`Request failed (${response.status})`);
    }
  }
  return JSON.parse(text) as T;
}

export async function fetchAffiliateDashboard(): Promise<AffiliateDashboardResponse> {
  const response = await fetch("/api/affiliate", { cache: "no-store" });
  return parseJson<AffiliateDashboardResponse>(response);
}

export async function joinAffiliateProgram(): Promise<JoinAffiliateResponse> {
  const response = await fetch("/api/affiliate/join", { method: "POST" });
  return parseJson<JoinAffiliateResponse>(response);
}

export async function updateAffiliate(
  body: UpdateAffiliateBody,
): Promise<{ affiliate: AffiliateRecord }> {
  const response = await fetch("/api/affiliate", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson<{ affiliate: AffiliateRecord }>(response);
}
