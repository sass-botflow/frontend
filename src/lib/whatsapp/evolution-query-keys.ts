export const whatsappQueryKeys = {
  all: ["whatsapp"] as const,
  channels: () => [...whatsappQueryKeys.all, "channels"] as const,
  qr: (instanceId: string) =>
    [...whatsappQueryKeys.all, "qr", instanceId] as const,
  status: (instanceId: string) =>
    [...whatsappQueryKeys.all, "status", instanceId] as const,
};
