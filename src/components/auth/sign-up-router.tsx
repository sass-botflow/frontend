"use client";

import { usePathname } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { EmailPasswordSignUp } from "@/components/auth/email-password-sign-up";
import { OAuthCallback } from "@/components/auth/oauth-callback";
import { AuthRedirectIfSignedIn } from "@/components/auth/auth-redirect-if-signed-in";
import { clerkAuthAppearance } from "@/lib/clerk-auth-appearance";

const SSO_PATHS = ["/sign-up/sso-callback"];

export function SignUpRouter() {
  const pathname = usePathname();

  if (SSO_PATHS.includes(pathname)) {
    return <OAuthCallback />;
  }

  const isMain = pathname === "/sign-up";

  return (
    <AuthRedirectIfSignedIn>
      {isMain ? (
        <EmailPasswordSignUp />
      ) : (
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/dashboard"
          appearance={clerkAuthAppearance}
        />
      )}
    </AuthRedirectIfSignedIn>
  );
}
