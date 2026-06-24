import { prisma } from "@/lib/prisma";

export async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true as const };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Database unavailable";
    console.error("[integrations] Database check failed:", message);
    return { ok: false as const, error: message };
  }
}
