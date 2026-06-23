"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { IntegrationCard } from "@/components/settings/integration-card";
import { SettingsPageShell } from "@/components/settings/settings-page-shell";
import { SettingsSection } from "@/components/settings/settings-section";
import { Input } from "@/components/ui/input";
import {
  INTEGRATION_CATEGORIES,
  INTEGRATIONS,
  type IntegrationCategory,
} from "@/lib/integrations";
import { cn } from "@/lib/utils";

export default function AppStorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<IntegrationCategory | "all">("all");

  const filtered = INTEGRATIONS.filter((i) => {
    const matchesSearch =
      !search ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || i.category === category;
    return matchesSearch && matchesCategory;
  });

  const connectedCount = INTEGRATIONS.filter((i) => i.status === "connected").length;

  return (
    <SettingsPageShell
      title="App Store"
      description={`Browse and connect integrations to extend BotFlow. ${connectedCount} connected.`}
      wide
    >
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <CategoryPill
            active={category === "all"}
            onClick={() => setCategory("all")}
            label="All apps"
            count={INTEGRATIONS.length}
          />
          {INTEGRATION_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.id}
              active={category === cat.id}
              onClick={() => setCategory(cat.id)}
              label={cat.label}
              count={INTEGRATIONS.filter((i) => i.category === cat.id).length}
            />
          ))}
        </div>
      </div>

      <SettingsSection
        title={
          category === "all"
            ? "All integrations"
            : INTEGRATION_CATEGORIES.find((c) => c.id === category)?.label ?? "Integrations"
        }
      >
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/60 py-16 text-center">
            <p className="text-sm text-muted-foreground">No integrations match your search.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        )}
      </SettingsSection>
    </SettingsPageShell>
  );
}

function CategoryPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "border-primary bg-primary/10 font-medium text-primary"
          : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      {label}
      <span className="text-xs opacity-70">{count}</span>
    </button>
  );
}
