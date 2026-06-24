"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

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
