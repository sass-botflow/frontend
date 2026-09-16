import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInRouter } from "@/components/auth/sign-in-router";
import { getBetterAuthSession } from "@/lib/auth-server";

export const metadata = { title: "Sign in" };

export default async function SignInPage() {
  const { userId } = await auth({ treatPendingAsSignedOut: false });
  const session = await getBetterAuthSession();

  if (userId || session?.session) {
    redirect("/dashboard");
  }

  return <SignInRouter />;
}
