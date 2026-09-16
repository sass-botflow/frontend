import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";
import { getBetterAuthSession } from "@/lib/auth-server";

export const metadata = { title: "Verify email" };

export default async function VerifyEmailPage() {
  const { userId } = await auth({ treatPendingAsSignedOut: false });
  const session = await getBetterAuthSession();

  if (userId || session?.session) {
    redirect("/dashboard");
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
