export const LEGAL_COMPANY = {
  name: "BotFlow",
  /** Canonical production URL (www is the live app host). */
  website: "https://www.botflow.ink",
  /** Apex domain — must route to the same EasyPanel service, then redirects to www. */
  websiteApex: "https://botflow.ink",
  email: "support@botflow.ink",
  lastUpdated: "July 1, 2026",
} as const;

export const LEGAL_PATHS = {
  privacy: "/privacy",
  terms: "/terms",
  dataDeletion: "/data-deletion",
} as const;
