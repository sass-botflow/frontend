export type WhatsAppPhoneVerificationStatus = "VERIFIED" | "PENDING" | "UNKNOWN";

export type WhatsAppConnectPhase =
  | "idle"
  | "connecting"
  | "retrieving_business"
  | "retrieving_phone"
  | "saving"
  | "connected"
  | "error";

export const WHATSAPP_CONNECT_PHASE_LABELS: Record<
  Exclude<WhatsAppConnectPhase, "idle" | "error">,
  string
> = {
  connecting: "Connecting...",
  retrieving_business: "Retrieving Business...",
  retrieving_phone: "Retrieving Phone Number...",
  saving: "Saving...",
  connected: "Connected",
};

export function mapMetaVerificationStatus(
  status?: string | null,
): WhatsAppPhoneVerificationStatus {
  if (!status) return "UNKNOWN";
  const normalized = status.toUpperCase();
  if (normalized === "VERIFIED") return "VERIFIED";
  if (normalized === "NOT_VERIFIED" || normalized === "EXPIRED") return "PENDING";
  return "PENDING";
}

export function formatPhoneVerificationStatus(
  status: WhatsAppPhoneVerificationStatus,
): "Verified" | "Pending" {
  return status === "VERIFIED" ? "Verified" : "Pending";
}
