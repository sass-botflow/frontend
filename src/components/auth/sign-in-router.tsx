"use client";

import { usePathname } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { EmailPasswordSignIn } from "@/components/auth/email-password-sign-in";
import { clerkAuthAppearance } from "@/lib/clerk-auth-appearance";

export function SignInRouter() {
  const pathname = usePathname();
  const isMain = pathname === "/sign-in";

  if (!isMain) {
    return (
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
        appearance={clerkAuthAppearance}
      />
    );
  }

  return <EmailPasswordSignIn />;
}
