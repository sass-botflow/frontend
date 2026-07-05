import { createHmac, randomBytes } from "crypto";
import { auth, clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/backend";
import { getBackendApiUrl } from "@/lib/backend/config";
import { BackendAuthError } from "@/lib/backend/errors";
import { logBackendRequest, logBackendResponse } from "@/lib/backend/logger";

interface BackendAuthRecord {
  userId: string;
  organizationId: string;
  email: string;
  password?: string;
}

interface RegisterResponse {
  user: { id: string; email: string; name: string };
  organization: { id: string; name: string; slug: string };
  token: string;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET ?? process.env.BACKEND_JWT_SECRET;
  if (!secret) {
    throw new BackendAuthError(
      "Server misconfiguration: JWT_SECRET is required to authenticate with the API.",
    );
  }
  return secret;
}

function base64Url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function signBackendJwt(payload: {
  sub: string;
  email: string;
  organizationId: string;
}): string {
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64Url(
    JSON.stringify({
      sub: payload.sub,
      email: payload.email,
      organizationId: payload.organizationId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    }),
  );
  const signature = base64Url(
    createHmac("sha256", getJwtSecret()).update(`${header}.${body}`).digest(),
  );
  return `${header}.${body}.${signature}`;
}

export function signWhatsAppEmbeddedSignupState(payload: {
  workspaceId: string;
  userId: string;
}): string {
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const body = base64Url(
    JSON.stringify({
      workspaceId: payload.workspaceId,
      userId: payload.userId,
      purpose: "whatsapp_embedded_signup",
      iat: now,
      exp: now + 900,
    }),
  );
  const signature = base64Url(
    createHmac("sha256", getJwtSecret()).update(`${header}.${body}`).digest(),
  );
  return `${header}.${body}.${signature}`;
}

function readBackendAuthRecord(user: User): BackendAuthRecord | null {
  const record = user.privateMetadata?.backendAuth;
  if (!record || typeof record !== "object") return null;

  const typed = record as Partial<BackendAuthRecord>;
  if (!typed.userId || !typed.organizationId || !typed.email) return null;

  return {
    userId: typed.userId,
    organizationId: typed.organizationId,
    email: typed.email,
    password: typed.password,
  };
}

function getPrimaryEmail(user: User): string {
  const email = user.emailAddresses.find(
    (entry) => entry.id === user.primaryEmailAddressId,
  )?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new BackendAuthError("Your account does not have an email address.");
  }

  return email;
}

function getDisplayName(user: User, email: string): string {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return fullName || email.split("@")[0] || "BotFlow User";
}

function getOrganizationName(user: User, displayName: string): string {
  const metadata = user.publicMetadata as { businessName?: string } | undefined;
  const businessName = metadata?.businessName?.trim();
  return businessName || `${displayName}'s Workspace`;
}

async function saveBackendAuthRecord(
  clerkUserId: string,
  record: BackendAuthRecord,
  existingPrivateMetadata: User["privateMetadata"] = {},
): Promise<void> {
  const client = await clerkClient();
  await client.users.updateUserMetadata(clerkUserId, {
    privateMetadata: {
      ...(existingPrivateMetadata ?? {}),
      backendAuth: record,
    },
  });
}

async function registerBackendUser(user: User): Promise<BackendAuthRecord> {
  const email = getPrimaryEmail(user);
  const name = getDisplayName(user, email);
  const organizationName = getOrganizationName(user, name);
  const password = randomBytes(24).toString("base64url");
  const path = "/api/auth/register";

  logBackendRequest("POST", path, { clerkUserId: user.id, action: "provision" });

  const response = await fetch(getBackendApiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      name,
      password,
      organizationName,
    }),
    cache: "no-store",
  });

  logBackendResponse("POST", path, response.status, { clerkUserId: user.id });

  if (response.status === 409) {
    const existing = readBackendAuthRecord(user);
    if (existing) return existing;

    throw new BackendAuthError(
      "This email already exists in BotFlow API. Link your account or contact support.",
    );
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { message?: string };
    throw new BackendAuthError(
      typeof body.message === "string"
        ? body.message
        : "Failed to provision your workspace in the API.",
    );
  }

  const body = (await response.json()) as RegisterResponse;
  const record: BackendAuthRecord = {
    userId: body.user.id,
    organizationId: body.organization.id,
    email: body.user.email,
    password,
  };

  await saveBackendAuthRecord(user.id, record, user.privateMetadata);
  return record;
}

async function tryClerkTemplateToken(
  getToken: (options?: { template?: string }) => Promise<string | null>,
): Promise<string | null> {
  const template =
    process.env.CLERK_BACKEND_JWT_TEMPLATE ?? process.env.CLERK_JWT_TEMPLATE;
  if (!template) return null;

  const token = await getToken({ template });
  if (!token) return null;

  logBackendRequest("GET", "/api/channels", {
    authSource: "clerk-template",
    template,
    hasAuthorization: true,
    authorizationScheme: "Bearer",
  });

  return token;
}

export async function resolveBackendAuthRecord(): Promise<BackendAuthRecord> {
  const { userId } = await auth({ treatPendingAsSignedOut: false });

  if (!userId) {
    throw new BackendAuthError();
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let record = readBackendAuthRecord(user);

  if (!record) {
    record = await registerBackendUser(user);
  }

  return record;
}

export async function resolveBackendBearerToken(): Promise<string> {
  const { userId, getToken } = await auth({ treatPendingAsSignedOut: false });

  if (!userId) {
    throw new BackendAuthError();
  }

  const templateToken = await tryClerkTemplateToken(getToken);
  if (templateToken) {
    return templateToken;
  }

  const record = await resolveBackendAuthRecord();
  return signBackendJwt({
    sub: record.userId,
    email: record.email,
    organizationId: record.organizationId,
  });
}
