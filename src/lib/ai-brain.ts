import {
  Briefcase,
  Building2,
  Dumbbell,
  HeartPulse,
  Megaphone,
  MoreHorizontal,
  Scissors,
  ShoppingBag,
  Smile,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type BusinessTypeId =
  | "ecommerce"
  | "dental"
  | "medical"
  | "restaurant"
  | "real-estate"
  | "beauty"
  | "gym"
  | "coach"
  | "marketing"
  | "local"
  | "other";

export type AiGoalId =
  | "answer-questions"
  | "book-appointments"
  | "collect-leads"
  | "recommend-products"
  | "handle-support"
  | "qualify-leads"
  | "transfer-human";

export type KnowledgeSourceId =
  | "scan-website"
  | "upload-pdf"
  | "upload-documents"
  | "manual";

export interface BusinessType {
  id: BusinessTypeId;
  label: string;
  icon: LucideIcon;
  basePrompt: string;
}

export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: "ecommerce",
    label: "Ecommerce Store",
    icon: ShoppingBag,
    basePrompt:
      "You are a professional ecommerce sales assistant for {businessName}. Help customers discover products, answer shipping questions, explain return policies, recommend products, collect leads and increase conversions.",
  },
  {
    id: "dental",
    label: "Dental Clinic",
    icon: Smile,
    basePrompt:
      "You are a professional dental clinic assistant for {businessName}. Help patients book appointments, answer treatment questions, explain clinic services, provide opening hours and transfer urgent requests to staff.",
  },
  {
    id: "medical",
    label: "Medical Clinic",
    icon: HeartPulse,
    basePrompt:
      "You are a professional medical clinic assistant for {businessName}. Help patients schedule visits, answer general health service questions, explain clinic procedures, share opening hours and escalate urgent cases to staff.",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    icon: UtensilsCrossed,
    basePrompt:
      "You are a restaurant assistant for {businessName}. Help customers view menus, reserve tables, answer questions about dishes and dietary options, and provide business information.",
  },
  {
    id: "real-estate",
    label: "Real Estate Agency",
    icon: Building2,
    basePrompt:
      "You are a real estate assistant for {businessName}. Help clients find properties, answer listing questions, schedule viewings, qualify buyer and renter leads, and provide agency information.",
  },
  {
    id: "beauty",
    label: "Beauty Salon",
    icon: Scissors,
    basePrompt:
      "You are a beauty salon assistant for {businessName}. Help clients book appointments, answer questions about services and pricing, recommend treatments, and share salon hours and location.",
  },
  {
    id: "gym",
    label: "Gym / Fitness",
    icon: Dumbbell,
    basePrompt:
      "You are a fitness center assistant for {businessName}. Help members and prospects learn about memberships, class schedules, personal training, book tours, and answer facility questions.",
  },
  {
    id: "coach",
    label: "Coach / Consultant",
    icon: Briefcase,
    basePrompt:
      "You are a professional coaching assistant for {businessName}. Help prospects understand your programs, book discovery calls, answer questions about services, and qualify leads.",
  },
  {
    id: "marketing",
    label: "Marketing Agency",
    icon: Megaphone,
    basePrompt:
      "You are a marketing agency assistant for {businessName}. Help prospects understand your services, request proposals, answer questions about campaigns, and qualify leads for the sales team.",
  },
  {
    id: "local",
    label: "Local Business",
    icon: Store,
    basePrompt:
      "You are a helpful assistant for {businessName}. Answer customer questions, share business hours and location, help with bookings and requests, and provide friendly professional support.",
  },
  {
    id: "other",
    label: "Other",
    icon: MoreHorizontal,
    basePrompt:
      "You are a helpful business assistant for {businessName}. Answer customer questions professionally, provide accurate information about services, and help customers get what they need.",
  },
];

export const AI_GOALS: { id: AiGoalId; label: string; promptFragment: string }[] = [
  { id: "answer-questions", label: "Answer customer questions", promptFragment: "Answer customer questions clearly and accurately." },
  { id: "book-appointments", label: "Book appointments", promptFragment: "Help customers book appointments when they ask." },
  { id: "collect-leads", label: "Collect leads", promptFragment: "Collect contact details from interested prospects." },
  { id: "recommend-products", label: "Recommend products", promptFragment: "Recommend relevant products or services based on customer needs." },
  { id: "handle-support", label: "Handle support requests", promptFragment: "Handle support requests patiently and resolve common issues." },
  { id: "qualify-leads", label: "Qualify leads", promptFragment: "Ask qualifying questions to understand customer needs before handing off." },
  { id: "transfer-human", label: "Transfer to human when needed", promptFragment: "Transfer the conversation to a human team member when you cannot help or when the customer requests it." },
];

export const KNOWLEDGE_SOURCES: {
  id: KnowledgeSourceId;
  label: string;
  description: string;
}[] = [
  { id: "scan-website", label: "Scan my website", description: "We'll read your website and teach the AI automatically." },
  { id: "upload-pdf", label: "Upload PDF", description: "Upload menus, brochures, or price lists." },
  { id: "upload-documents", label: "Upload documents", description: "Upload DOCX, TXT or other business files." },
  { id: "manual", label: "I will write information manually", description: "Add details yourself later in settings." },
];

export const LANGUAGES = [
  "English",
  "French",
  "Arabic",
  "Spanish",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
];

export const COUNTRIES = [
  "Morocco",
  "France",
  "United States",
  "United Kingdom",
  "Canada",
  "UAE",
  "Saudi Arabia",
  "Germany",
  "Spain",
  "Other",
];

export interface WizardData {
  businessType: BusinessTypeId | null;
  businessName: string;
  websiteUrl: string;
  whatsappNumber: string;
  language: string;
  country: string;
  goals: AiGoalId[];
  knowledgeSource: KnowledgeSourceId | null;
}

export const DEFAULT_GOALS: AiGoalId[] = [
  "answer-questions",
  "book-appointments",
  "collect-leads",
  "transfer-human",
];

export function generateAiPrompt(data: WizardData): string {
  const type = BUSINESS_TYPES.find((t) => t.id === data.businessType);
  if (!type) return "";

  let prompt = type.basePrompt.replace(
    "{businessName}",
    data.businessName || "this business",
  );

  const goalFragments = AI_GOALS.filter((g) => data.goals.includes(g.id)).map(
    (g) => g.promptFragment,
  );

  if (goalFragments.length > 0) {
    prompt += " " + goalFragments.join(" ");
  }

  const context: string[] = [];
  if (data.websiteUrl) context.push(`Website: ${data.websiteUrl}`);
  if (data.whatsappNumber) context.push(`WhatsApp: ${data.whatsappNumber}`);
  if (data.language) context.push(`Reply in ${data.language}.`);
  if (data.country) context.push(`Business located in ${data.country}.`);

  if (context.length > 0) {
    prompt += ` Context: ${context.join(" ")}`;
  }

  prompt += " Always be friendly, concise, and professional.";

  return prompt;
}
