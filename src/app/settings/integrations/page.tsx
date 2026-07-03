import { Suspense } from "react";
import { IntegrationsOAuthCallback } from "./integrations-callback";

export const metadata = {
  title: "WhatsApp Connection",
  description: "Completing your WhatsApp Business connection.",
};

export default function IntegrationsOAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <IntegrationsOAuthCallback />
    </Suspense>
  );
}
