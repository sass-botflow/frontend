"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchIntegrations, disconnectIntegration } from "@/lib/integrations/client";
import {
  mapInstagramIntegration,
  type InstagramChannel,
} from "@/lib/integrations/instagram-types";

export const instagramQueryKeys = {
  all: ["instagram"] as const,
  integration: () => [...instagramQueryKeys.all, "integration"] as const,
};

export function useInstagramIntegration() {
  return useQuery({
    queryKey: instagramQueryKeys.integration(),
    queryFn: async (): Promise<InstagramChannel | null> => {
      const data = await fetchIntegrations();
      const record = data.integrations.find((item) => item.platform === "instagram");
      return mapInstagramIntegration(record);
    },
  });
}

export function useInstagramDisconnect() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => disconnectIntegration("instagram"),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: instagramQueryKeys.integration() });
    },
  });
}
