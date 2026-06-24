import type { BusinessTypeId } from "@/lib/ai-brain";

export interface OnboardingData {
  businessType: BusinessTypeId;
  businessName: string;
  website: string;
  whatsapp: string;
}

export interface UserOnboardingMetadata {
  onboardingComplete?: boolean;
  businessType?: BusinessTypeId;
  businessName?: string;
  website?: string;
  whatsapp?: string;
}

export function isOnboardingComplete(
  metadata: UserOnboardingMetadata | null | undefined,
): boolean {
  return metadata?.onboardingComplete === true;
}

export function validateOnboardingData(data: OnboardingData): string | null {
  if (!data.businessType) {
    return "Please select a business type.";
  }
  if (!data.businessName.trim()) {
    return "Business name is required.";
  }
  if (data.website.trim() && !/^https?:\/\/.+/i.test(data.website.trim())) {
    return "Website must start with http:// or https://";
  }
  if (!data.whatsapp.trim()) {
    return "WhatsApp number is required.";
  }
  return null;
}
