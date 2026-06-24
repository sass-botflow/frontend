"use client";

import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface AuthNavActionsProps {
  signInLabel: string;
  signUpLabel: string;
  dashboardLabel?: string;
  className?: string;
  layout?: "desktop" | "mobile";
}

export function AuthNavActions({
  signInLabel,
  signUpLabel,
  dashboardLabel = "Dashboard",
  className,
  layout = "desktop",
}: AuthNavActionsProps) {
  const isMobile = layout === "mobile";

  return (
    <div className={className}>
      <Show when="signed-out">
        <SignInButton mode="redirect" forceRedirectUrl="/dashboard/channels">
          <Button
            variant={isMobile ? "outline" : "ghost"}
            size="sm"
            className={isMobile ? "w-full" : "hidden sm:inline-flex"}
          >
            {signInLabel}
          </Button>
        </SignInButton>
        <SignUpButton mode="redirect" forceRedirectUrl="/dashboard/channels">
          <Button
            size="sm"
            className={isMobile ? "w-full" : "hidden sm:inline-flex"}
          >
            {signUpLabel}
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <div
          className={
            isMobile
              ? "flex w-full flex-col gap-2"
              : "hidden items-center gap-2 sm:flex"
          }
        >
          <Button
            variant={isMobile ? "outline" : "ghost"}
            size="sm"
            className={isMobile ? "w-full" : undefined}
            asChild
          >
            <Link href="/dashboard/channels">{dashboardLabel}</Link>
          </Button>
          <div className={isMobile ? "flex justify-center" : undefined}>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </div>
        </div>
      </Show>
    </div>
  );
}
