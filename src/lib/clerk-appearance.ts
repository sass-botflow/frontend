export const clerkAppearance = {
  variables: {
    colorPrimary: "#7C3AED",
    colorBackground: "var(--card)",
    colorInputBackground: "var(--background)",
    colorInputText: "var(--foreground)",
    borderRadius: "0.75rem",
  },
  elements: {
    card: "border border-border/60 bg-card shadow-xl",
    headerTitle: "text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton: "border-border/60 bg-background text-foreground",
    formButtonPrimary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-none",
    footerActionLink: "text-primary hover:text-primary/90",
    identityPreviewEditButton: "text-primary",
    formFieldInput:
      "border-border/60 bg-background text-foreground focus:ring-primary",
    dividerLine: "bg-border",
    dividerText: "text-muted-foreground",
    navbarButton: "text-foreground",
  },
};
