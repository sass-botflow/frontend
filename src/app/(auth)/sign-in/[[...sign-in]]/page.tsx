import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInRouter } from "@/components/auth/sign-in-router";

export const metadata = { title: "Sign in" };

export default async function SignInPage() {
  const { userId } = await auth({ treatPendingAsSignedOut: false });

  if (userId) {
    redirect("/dashboard");
  }

  return <SignInRouter />;
}
