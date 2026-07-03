-- Migrate legacy WhatsApp credentials from Integration into Channel.
-- Safe to run on fresh databases (inserts zero rows when no connected WhatsApp integrations exist).

INSERT INTO "Channel" (
    "id",
    "workspaceId",
    "provider",
    "businessId",
    "wabaId",
    "phoneNumberId",
    "displayPhoneNumber",
    "businessName",
    "encryptedAccessToken",
    "status",
    "createdAt",
    "updatedAt"
)
SELECT
    "id",
    "userId",
    'whatsapp',
    COALESCE("refreshToken", ''),
    COALESCE("metaBusinessId", ''),
    "phoneNumberId",
    COALESCE("phoneNumber", "phoneNumberId"),
    "businessName",
    "accessToken",
    COALESCE("phoneStatus", 'UNKNOWN'),
    "createdAt",
    "updatedAt"
FROM "Integration"
WHERE "platform" = 'whatsapp'
  AND "isConnected" = 1
  AND "phoneNumberId" IS NOT NULL
  AND "accessToken" IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM "Channel" WHERE "Channel"."phoneNumberId" = "Integration"."phoneNumberId"
  );

UPDATE "Integration"
SET "accessToken" = NULL
WHERE "platform" = 'whatsapp'
  AND "accessToken" IS NOT NULL;
