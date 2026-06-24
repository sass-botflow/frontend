"use client";

import { usePathname } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { EmailPasswordSignIn } from "@/components/auth/email-password-sign-in";
import { OAuthCallback } from "@/components/auth/oauth-callback";
import { AuthRedirectIfSignedIn } from "@/components/auth/auth-redirect-if-signed-in";
import { clerkAuthAppearance } from "@/lib/clerk-auth-appearance";

const SSO_PATHS = ["/sign-in/sso-callback"];

export function SignInRouter() {
  const pathname = usePathname();

  if (SSO_PATHS.includes(pathname)) {
    return <OAuthCallback />;
  }

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

  return (
    <AuthRedirectIfSignedIn>
      <EmailPasswordSignIn />
    </AuthRedirectIfSignedIn>
  );
}
