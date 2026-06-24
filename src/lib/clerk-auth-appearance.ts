/** AdSkull-inspired neon auth theme for Clerk SignIn / SignUp. */
export const clerkAuthAppearance = {
  variables: {
    colorPrimary: "#39ff14",
    colorDanger: "#f87171",
    colorSuccess: "#39ff14",
    colorWarning: "#fbbf24",
    colorNeutral: "#6b7280",
    colorText: "#ffffff",
    colorTextSecondary: "#9ca3af",
    colorBackground: "#0a0a0a",
    colorInputBackground: "#111111",
    colorInputText: "#ffffff",
    borderRadius: "1rem",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    spacingUnit: "1rem",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "auth-clerk-card w-full bg-[#121212] border border-white/[0.08] rounded-2xl shadow-[0_0_80px_rgba(57,255,20,0.07)]",
    header: "gap-2",
    headerTitle:
      "text-white text-[1.65rem] font-bold tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.12)]",
    headerSubtitle: "text-[#9ca3af] text-sm",
    socialButtonsBlockButton:
      "bg-[#161616] border border-white/10 text-white hover:bg-[#1c1c1c] hover:border-[#39ff14]/35 transition-colors",
    socialButtonsBlockButtonText: "text-white font-medium",
    formButtonPrimary:
      "auth-clerk-primary bg-[#39ff14] text-black font-semibold hover:bg-[#45ff22] border-0 normal-case text-sm",
    formFieldInput:
      "bg-[#111111] border-white/10 text-white placeholder:text-gray-500 focus:border-[#39ff14]/70 focus:ring-2 focus:ring-[#39ff14]/15",
    formFieldLabel: "text-white text-sm font-medium",
    formFieldLabelRow: "items-center",
    footerActionLink: "text-[#39ff14] hover:text-[#5dff3f] font-medium",
    identityPreviewEditButton: "text-[#39ff14]",
    identityPreviewText: "text-white",
    dividerLine: "bg-white/10",
    dividerText: "text-gray-500 text-xs uppercase",
    formFieldInputShowPasswordButton: "text-gray-400 hover:text-white",
    footer: "hidden",
    footerAction: "hidden",
    navbar: "hidden",
    logoBox: "hidden",
    alertText: "text-sm",
    otpCodeFieldInput: "border-white/10 bg-[#111111] text-white",
    formResendCodeLink: "text-[#39ff14]",
    backLink: "text-[#39ff14] hover:text-[#5dff3f]",
    formFieldAction: "text-[#39ff14] hover:text-[#5dff3f] text-sm font-medium",
    alternativeMethodsBlockButton:
      "border-white/10 bg-[#161616] text-white hover:border-[#39ff14]/35",
    badge: "bg-[#39ff14]/10 text-[#39ff14] border-[#39ff14]/20",
  },
} as const;
