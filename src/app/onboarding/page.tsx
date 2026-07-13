import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { autoVerifyUserEmail } from "@/app/auth/actions";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { isOnboardingComplete, type UserOnboardingMetadata } from "@/lib/onboarding";

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await autoVerifyUserEmail();

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const metadata = user.publicMetadata as UserOnboardingMetadata;

  if (isOnboardingComplete(metadata)) {
    redirect("/dashboard");
  }

  return <OnboardingForm />;
}
