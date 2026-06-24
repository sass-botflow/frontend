"use client";

import { usePathname } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { EmailPasswordSignUp } from "@/components/auth/email-password-sign-up";
import { clerkAuthAppearance } from "@/lib/clerk-auth-appearance";

export function SignUpRouter() {
  const pathname = usePathname();
  const isMain = pathname === "/sign-up";

  if (!isMain) {
    return (
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/onboarding"
        appearance={clerkAuthAppearance}
      />
    );
  }

  return <EmailPasswordSignUp />;
}
