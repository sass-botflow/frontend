-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "externalId" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "metaBusinessId" TEXT,
    "phoneNumberId" TEXT,
    "phoneNumber" TEXT,
    "phoneStatus" TEXT,
    "businessName" TEXT,
    "connectedAt" DATETIME,
    "isConnected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workspaceId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "wabaId" TEXT NOT NULL,
    "phoneNumberId" TEXT NOT NULL,
    "displayPhoneNumber" TEXT NOT NULL,
    "businessName" TEXT,
    "encryptedAccessToken" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Affiliate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "payoutEmail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "affiliateId" TEXT NOT NULL,
    "referredUserId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "planId" TEXT,
    "planName" TEXT,
    "monthlyValue" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Referral_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AffiliateEarning" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "affiliateId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'commission',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "period" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AffiliateEarning_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Integration_userId_idx" ON "Integration"("userId");

-- CreateIndex
CREATE INDEX "Integration_phoneNumberId_idx" ON "Integration"("phoneNumberId");

-- CreateIndex
CREATE UNIQUE INDEX "Integration_userId_platform_key" ON "Integration"("userId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_phoneNumberId_key" ON "Channel"("phoneNumberId");

-- CreateIndex
CREATE INDEX "Channel_workspaceId_idx" ON "Channel"("workspaceId");

-- CreateIndex
CREATE INDEX "Channel_provider_idx" ON "Channel"("provider");

-- CreateIndex
CREATE INDEX "Channel_phoneNumberId_idx" ON "Channel"("phoneNumberId");

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_userId_key" ON "Affiliate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_code_key" ON "Affiliate"("code");

-- CreateIndex
CREATE INDEX "Affiliate_code_idx" ON "Affiliate"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referredUserId_key" ON "Referral"("referredUserId");

-- CreateIndex
CREATE INDEX "Referral_affiliateId_idx" ON "Referral"("affiliateId");

-- CreateIndex
CREATE INDEX "Referral_status_idx" ON "Referral"("status");

-- CreateIndex
CREATE INDEX "AffiliateEarning_affiliateId_idx" ON "AffiliateEarning"("affiliateId");

-- CreateIndex
CREATE INDEX "AffiliateEarning_status_idx" ON "AffiliateEarning"("status");
