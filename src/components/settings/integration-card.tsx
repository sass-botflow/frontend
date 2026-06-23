"use client";

import { CheckCircle2, Clock, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IntegrationLogo } from "@/components/settings/integration-logo";
import type { Integration } from "@/lib/integrations";
import { cn } from "@/lib/utils";

interface IntegrationCardProps {
  integration: Integration;
  onConnect?: (id: string) => void;
}

export function IntegrationCard({ integration, onConnect }: IntegrationCardProps) {
  const isConnected = integration.status === "connected";
  const isComingSoon = integration.status === "coming-soon";

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-border hover:shadow-md",
        isConnected && "border-emerald-500/30 bg-emerald-500/[0.02]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <IntegrationLogo
          id={integration.id}
          name={integration.name}
          color={integration.color}
          initials={integration.initials}
        />
        <StatusBadge status={integration.status} />
      </div>

      <div className="mt-4 flex-1">
        <h3 className="font-semibold tracking-tight">{integration.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {integration.description}
        </p>
      </div>

      <div className="mt-5">
        <Button
          variant={isConnected ? "outline" : "default"}
          size="sm"
          className="w-full"
          disabled={isComingSoon}
          onClick={() => onConnect?.(integration.id)}
        >
          {isComingSoon ? (
            <>
              <Clock className="h-3.5 w-3.5" />
              Coming soon
            </>
          ) : isConnected ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              Connected
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" />
              Connect
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Integration["status"] }) {
  if (status === "connected") {
    return (
      <Badge variant="success" className="gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Connected
      </Badge>
    );
  }
  if (status === "coming-soon") {
    return <Badge variant="secondary">Coming soon</Badge>;
  }
  return <Badge variant="outline">Available</Badge>;
}
