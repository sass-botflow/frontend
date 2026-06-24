"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  type OnboardingData,
  validateOnboardingData,
} from "@/lib/onboarding";

export async function completeOnboarding(data: OnboardingData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to complete onboarding.");
  }

  const error = validateOnboardingData(data);
  if (error) {
    throw new Error(error);
  }

  const client = await clerkClient();

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      onboardingComplete: true,
      businessType: data.businessType,
      businessName: data.businessName.trim(),
      website: data.website.trim(),
      whatsapp: data.whatsapp.trim(),
    },
  });

  return { success: true };
}
