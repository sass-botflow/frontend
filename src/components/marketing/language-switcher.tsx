"use client";

import { Check, Globe } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  localeFlags,
  localeLabels,
  localeShort,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "default" | "compact";
  className?: string;
}

export function LanguageSwitcher({
  variant = "default",
  className,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={variant === "compact" ? "icon" : "sm"}
          className={cn(
            "gap-1.5 text-muted-foreground",
            variant === "compact" ? "h-8 w-8" : "h-8 px-2.5",
            className,
          )}
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
          {variant !== "compact" && (
            <span className="text-xs font-medium">{localeShort[locale]}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {locales.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLocale(code as Locale)}
            className="flex items-center justify-between gap-3"
          >
            <span className="flex items-center gap-2.5">
              <span className="text-base leading-none">{localeFlags[code]}</span>
              <span className="text-sm">{localeLabels[code]}</span>
            </span>
            {locale === code && <Check className="h-3.5 w-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
