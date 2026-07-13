import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureAuthReady } from "@/app/auth/actions";

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await ensureAuthReady();
  redirect("/dashboard");
}
