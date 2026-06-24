"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { EmailPasswordSignUp } from "@/components/auth/email-password-sign-up";
import { OAuthCallback } from "@/components/auth/oauth-callback";
import { AuthRedirectIfSignedIn } from "@/components/auth/auth-redirect-if-signed-in";

const SSO_PATHS = ["/sign-up/sso-callback"];

function SignUpSubpathRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sign-up");
  }, [router]);

  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export function SignUpRouter() {
  const pathname = usePathname();

  if (SSO_PATHS.includes(pathname)) {
    return <OAuthCallback />;
  }

  if (pathname !== "/sign-up") {
    return (
      <AuthRedirectIfSignedIn>
        <SignUpSubpathRedirect />
      </AuthRedirectIfSignedIn>
    );
  }

  return (
    <AuthRedirectIfSignedIn>
      <EmailPasswordSignUp />
    </AuthRedirectIfSignedIn>
  );
}
