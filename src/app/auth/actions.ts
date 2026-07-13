"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  isOnboardingComplete,
  type UserOnboardingMetadata,
} from "@/lib/onboarding";

/** Marks the signed-in user's primary email as verified (no inbox check). */
export async function autoVerifyUserEmail() {
  const { userId } = await auth();

  if (!userId) {
    return { success: false as const };
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const emailId = user.primaryEmailAddressId;

  if (!emailId) {
    return { success: false as const };
  }

  const email = user.emailAddresses.find((item) => item.id === emailId);

  if (email?.verification?.status === "verified") {
    return { success: true as const, alreadyVerified: true as const };
  }

  await client.emailAddresses.updateEmailAddress(emailId, {
    verified: true,
  });

  return { success: true as const };
}

/**
 * Ensures signed-in users can reach the dashboard without getting stuck
 * on onboarding or email verification gates.
 */
export async function bootstrapUserAccess() {
  const { userId } = await auth();

  if (!userId) {
    return { success: false as const };
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const metadata = user.publicMetadata as UserOnboardingMetadata;

  if (isOnboardingComplete(metadata)) {
    return { success: true as const, alreadyReady: true as const };
  }

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    user.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "My Business";

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      onboardingComplete: true,
      businessType: metadata.businessType ?? "ecommerce",
      businessName: metadata.businessName ?? displayName,
      website: metadata.website ?? "",
      whatsapp: metadata.whatsapp ?? "",
    },
  });

  return { success: true as const };
}
