import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { getBetterAuthSession } from "@/lib/auth-server";

export const metadata = { title: "Forgot password" };

export default async function ForgotPasswordPage() {
  const { userId } = await auth({ treatPendingAsSignedOut: false });
  const session = await getBetterAuthSession();

  if (userId || session?.session) {
    redirect("/dashboard");
  }

  return <ForgotPasswordForm />;
}
