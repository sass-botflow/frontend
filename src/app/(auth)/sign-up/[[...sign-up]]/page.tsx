import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpRouter } from "@/components/auth/sign-up-router";

export const metadata = { title: "Create account" };

export default async function SignUpPage() {
  const { userId } = await auth({ treatPendingAsSignedOut: false });

  if (userId) {
    redirect("/dashboard");
  }

  return <SignUpRouter />;
}
