import { proxyWhatsAppSessionJson } from "@/lib/whatsapp/bff";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  return proxyWhatsAppSessionJson(
    id,
    "status",
    "Failed to load WhatsApp session status.",
  );
}
