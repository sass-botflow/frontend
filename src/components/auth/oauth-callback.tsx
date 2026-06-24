"use client";

import { useRouter } from "next/navigation";
import { HandleSSOCallback } from "@clerk/react";
import { autoVerifyUserEmail } from "@/app/auth/actions";

function navigate(router: ReturnType<typeof useRouter>, to: string) {
  if (to.startsWith("http")) {
    window.location.assign(to);
    return;
  }
  router.replace(to);
}

export function OAuthCallback() {
  const router = useRouter();

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 py-8">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">Connecting your Google account...</p>
      <HandleSSOCallback
        navigateToApp={async ({ session, decorateUrl }) => {
          await autoVerifyUserEmail();

          if (session?.currentTask) {
            navigate(router, decorateUrl(`/sign-in/${session.currentTask.key}`));
            return;
          }

          navigate(router, decorateUrl("/dashboard"));
        }}
        navigateToSignIn={() => router.replace("/sign-in")}
        navigateToSignUp={() => router.replace("/sign-up")}
      />
      <div id="clerk-captcha" />
    </div>
  );
}
