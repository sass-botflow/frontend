import type { Locale } from "./config";

export type Dictionary = typeof en;

export const en = {
  nav: {
    howItWorks: "How it works",
    features: "Features",
    channels: "Channels",
    faq: "FAQ",
    pricing: "Pricing",
    signIn: "Sign in",
    startFree: "Start free",
  },
  auth: {
    tagline: "AI Customer Automation Platform",
    signInTab: "Sign In",
    signUpTab: "Create an account",
    copyright: "© 2026 BotFlow. All rights reserved.",
    signInTitle: "Welcome back",
    signInSubtitle: "Sign in to your account",
    signUpTitle: "Create your account",
    signUpSubtitle: "Start your 14-day free trial",
    email: "Email",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    fullName: "Full name",
    fullNamePlaceholder: "Jane Doe",
    forgotPassword: "Forgot password?",
    signInButton: "Sign In",
    signUpButton: "Create account",
    signingIn: "Signing in...",
    creatingAccount: "Creating account...",
    or: "or",
    continueGoogle: "Continue with Google",
    connectingGoogle: "Connecting to Google...",
    termsPrefix: "By continuing, you agree to our",
    terms: "Terms",
    termsAnd: "and",
    privacy: "Privacy Policy",
    signInError: "Invalid email or password. Please try again.",
    signUpError: "Could not create account. Please try again.",
    googleError: "Google sign-in failed. Please try again.",
  },
  hero: {
    badge: "Trusted by 500+ businesses worldwide",
    title: "Your AI customer assistant for",
    titleHighlight: "WhatsApp, Instagram & TikTok",
    subtitle:
      "Connect your channels, teach the AI about your business, and let it reply to customers 24/7. Set up in 5 minutes — no coding, no flow builders.",
    ctaPrimary: "Start free — 14-day trial",
    ctaSecondary: "See how it works",
    trust1: "No credit card required",
    trust2: "Cancel anytime",
    trust3: "Official WhatsApp API",
    floatNewMessage: "New message",
    floatAiReplied: "AI replied in 2s",
    floatBrainActive: "AI Brain active",
    floatAccuracy: "98% accuracy",
  },
  stats: {
    messages: "Messages handled",
    businesses: "Active businesses",
    saved: "Saved per week",
    satisfaction: "Customer satisfaction",
    repliesToday: "AI replies today",
    activeNow: "Active users now",
    channelsConnected: "Channels connected",
  },
  howItWorks: {
    label: "How BotFlow Works",
    title: "Connect. Teach. Automate. Scale.",
    subtitle:
      "One workflow from channel connection to 24/7 customer automation across WhatsApp, Instagram, and TikTok.",
    steps: [
      {
        title: "Connect",
        description: "Link WhatsApp, Instagram, or TikTok in under 30 seconds.",
        link: "Connect channels",
      },
      {
        title: "Teach",
        description: "Tell the AI about your business — name, services, hours, and FAQs.",
        link: "Set up AI Brain",
      },
      {
        title: "Automate",
        description: "AI replies to every message instantly, in any language.",
        link: "Open inbox",
      },
      {
        title: "Scale",
        description: "Hand off to humans when needed. Track everything in one place.",
        link: "See dashboard",
      },
    ],
  },
  product: {
    title: "Automate. Reply. Scale.",
    subtitle: "Everything you need to run customer communication on autopilot.",
    tabs: {
      inbox: "Unified Inbox",
      brain: "AI Brain",
      channels: "Channels",
      team: "Team",
    },
    inbox: {
      title: "All conversations in one place",
      description:
        "WhatsApp, Instagram, and TikTok messages flow into a single inbox. See AI replies, jump in anytime, and never miss a lead.",
      highlights: ["Real-time sync", "AI + human handoff", "Conversation history"],
    },
    brain: {
      title: "Teach AI about your business in 5 minutes",
      description:
        "A guided wizard helps you set business type, goals, and knowledge. No prompts to write — BotFlow generates everything for you.",
      highlights: ["5-step wizard", "PDF & website training", "Multi-language"],
    },
    channels: {
      title: "Connect every channel your customers use",
      description:
        "Official WhatsApp Business API, Instagram DMs, and TikTok messages — all managed from one dashboard.",
      highlights: ["One-click connect", "Branded channel logos", "Status monitoring"],
    },
    team: {
      title: "Collaborate with your whole team",
      description:
        "Invite team members, assign roles, and let anyone reply when the AI needs a human touch.",
      highlights: ["Role permissions", "Activity logs", "Shared inbox"],
    },
    connected: "Connected",
    inProgress: "In progress",
    wizardSteps: ["Business type", "Goals", "Knowledge", "Generate AI"],
    inboxPreviews: [
      "AI: Our clinic is open Mon-Sat 9am-6pm",
      "AI: Yes, we deliver to Casablanca!",
      "AI: The price is 299 MAD with free shipping.",
    ],
    roles: { owner: "Owner", admin: "Admin", member: "Member" },
  },
  channels: {
    title: "Works where your customers are",
    subtitle: "WhatsApp, Instagram, TikTok — one inbox, one AI, zero missed messages.",
    officialApi: "Official API",
  },
  scale: {
    title: "Customer automation at scale",
    subtitle: "Businesses and agencies running their full customer communication on BotFlow.",
    metrics: {
      businesses: "Active businesses",
      messages: "Messages automated",
      countries: "Countries served",
      saved: "Saved weekly per team",
    },
    securityLabel: "Enterprise-grade security & compliance",
    security: [
      { title: "99.9% uptime", description: "Enterprise-grade reliability" },
      { title: "Encrypted data", description: "End-to-end message security" },
      { title: "24/7 monitoring", description: "Always-on infrastructure" },
      { title: "Instant setup", description: "Live in under 5 minutes" },
    ],
  },
  testimonials: {
    title: "Trusted by businesses worldwide",
    subtitle: "See how teams automate customer communication with BotFlow.",
    rating: "4.9/5 from 500+ businesses",
    items: [
      {
        quote:
          "We went from missing 40% of WhatsApp leads to booking 3x more appointments. BotFlow paid for itself in week one. The AI handles Arabic and French perfectly.",
        author: "Dr. Amira K.",
        role: "Dental Clinic Owner",
        metric: "3x more bookings",
      },
      {
        quote:
          "Before BotFlow, we spent hours replying to Instagram DMs manually. Now the AI answers product questions, collects leads, and we only jump in for complex orders.",
        author: "James L.",
        role: "E-commerce Founder",
        metric: "15+ hrs saved/week",
      },
      {
        quote:
          "Managing customer messages across WhatsApp and TikTok used to be chaos. BotFlow unified everything. Our response time went from hours to seconds.",
        author: "Sofia M.",
        role: "Restaurant Owner",
        metric: "Response in < 3 sec",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about BotFlow.",
    items: [
      {
        q: "What channels does BotFlow support?",
        a: "BotFlow supports WhatsApp Business, Instagram DMs, and TikTok messages. All channels connect to a single unified inbox with one AI assistant.",
      },
      {
        q: "How long does setup take?",
        a: "Most businesses are live in under 5 minutes. Connect a channel, complete the AI Brain wizard, and your AI starts replying immediately.",
      },
      {
        q: "Do I need to write AI prompts?",
        a: "No. BotFlow's 5-step AI Brain wizard asks about your business type, goals, and knowledge sources — then generates optimized instructions automatically.",
      },
      {
        q: "Can my team jump in when needed?",
        a: "Yes. BotFlow supports human handoff — the AI transfers conversations to your team when it detects complex requests or specific keywords.",
      },
      {
        q: "What languages does the AI support?",
        a: "BotFlow AI auto-detects and replies in English, French, Arabic, Spanish, and more. You choose which languages to enable in settings.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes. Start with a 14-day free trial — no credit card required. Cancel anytime from your billing settings.",
      },
      {
        q: "Is BotFlow safe with my WhatsApp account?",
        a: "Yes. We use the official WhatsApp Business API with OAuth authentication. You can disconnect at any time from your settings.",
      },
      {
        q: "How much does BotFlow cost?",
        a: "Plans start at $49/month for Starter (1 channel, 500 conversations). Professional is $99/month with all 3 channels. See our pricing page for details.",
      },
    ],
  },
  cta: {
    label: "500+ Businesses Trust BotFlow",
    title: "Ready to automate your customer replies?",
    subtitle:
      "Join hundreds of businesses letting BotFlow handle WhatsApp, Instagram, and TikTok messages 24/7.",
    button: "Get Started for Free",
    trust1: "No card required",
    trust2: "99.9% uptime",
    trust3: "Built for all businesses",
  },
  pricing: {
    title: "Simple pricing",
    subtitle: "No hidden fees. Cancel anytime.",
    perMonth: "/mo",
    startTrial: "Start free trial",
    popular: "Popular",
    currentPlan: "Current plan",
    switch: "Switch",
  },
  footer: {
    tagline:
      "AI customer automation for WhatsApp, Instagram, and TikTok. Built for businesses that want to reply faster without hiring more staff.",
    product: "Product",
    company: "Company",
    support: "Support",
    helpCenter: "Help Center",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    rights: "All rights reserved.",
  },
  preview: {
    inbox: "Inbox",
    conversations: "conversations",
    needAttention: "need attention",
    aiHandling: "AI handling 94% of conversations automatically",
    sampleMessages: [
      { name: "Fatima B.", preview: "Hi, I want to know the prices for...", time: "2m" },
      { name: "Youssef M.", preview: "Do you ship to Casablanca?", time: "8m" },
      { name: "Lina K.", preview: "Thanks! The AI answered perfectly.", time: "1h" },
    ],
  },
  onboarding: {
    welcome: "Welcome to BotFlow",
    title: "Set up your business",
    subtitle: "Tell us about your business so we can personalize your AI assistant.",
    businessType: "Business type",
    businessName: "Business name",
    businessNamePlaceholder: "Acme Dental Clinic",
    website: "Website",
    websiteOptional: "(optional)",
    websitePlaceholder: "https://yourbusiness.com",
    whatsapp: "WhatsApp number",
    whatsappPlaceholder: "+212 6XX XXX XXX",
    whatsappHint: "We'll use this to connect your WhatsApp bot later.",
    continue: "Continue to dashboard",
    saving: "Saving...",
    selectType: "Please select a business type.",
  },
};

export const fr: Dictionary = {
  nav: {
    howItWorks: "Comment ça marche",
    features: "Fonctionnalités",
    channels: "Canaux",
    faq: "FAQ",
    pricing: "Tarifs",
    signIn: "Connexion",
    startFree: "Essai gratuit",
  },
  auth: {
    tagline: "Plateforme d'automatisation client IA",
    signInTab: "Connexion",
    signUpTab: "Créer un compte",
    copyright: "© 2026 BotFlow. Tous droits réservés.",
    signInTitle: "Bon retour",
    signInSubtitle: "Connectez-vous à votre compte",
    signUpTitle: "Créez votre compte",
    signUpSubtitle: "Essai gratuit de 14 jours",
    email: "E-mail",
    emailPlaceholder: "vous@exemple.com",
    password: "Mot de passe",
    passwordPlaceholder: "••••••••",
    fullName: "Nom complet",
    fullNamePlaceholder: "Marie Dupont",
    forgotPassword: "Mot de passe oublié ?",
    signInButton: "Se connecter",
    signUpButton: "Créer un compte",
    signingIn: "Connexion...",
    creatingAccount: "Création...",
    or: "ou",
    continueGoogle: "Continuer avec Google",
    connectingGoogle: "Connexion à Google...",
    termsPrefix: "En continuant, vous acceptez nos",
    terms: "Conditions",
    termsAnd: "et notre",
    privacy: "Politique de confidentialité",
    signInError: "E-mail ou mot de passe incorrect.",
    signUpError: "Impossible de créer le compte.",
    googleError: "Connexion Google échouée.",
  },
  hero: {
    badge: "Approuvé par plus de 500 entreprises",
    title: "Votre assistant client IA pour",
    titleHighlight: "WhatsApp, Instagram & TikTok",
    subtitle:
      "Connectez vos canaux, formez l'IA sur votre activité et laissez-la répondre à vos clients 24h/24. Configuration en 5 minutes — sans code, sans flow builder.",
    ctaPrimary: "Essai gratuit — 14 jours",
    ctaSecondary: "Voir comment ça marche",
    trust1: "Sans carte bancaire",
    trust2: "Annulation à tout moment",
    trust3: "API WhatsApp officielle",
    floatNewMessage: "Nouveau message",
    floatAiReplied: "IA a répondu en 2s",
    floatBrainActive: "AI Brain actif",
    floatAccuracy: "98% de précision",
  },
  stats: {
    messages: "Messages traités",
    businesses: "Entreprises actives",
    saved: "Économisées par semaine",
    satisfaction: "Satisfaction client",
    repliesToday: "Réponses IA aujourd'hui",
    activeNow: "Utilisateurs actifs",
    channelsConnected: "Canaux connectés",
  },
  howItWorks: {
    label: "Comment BotFlow fonctionne",
    title: "Connecter. Former. Automatiser. Grandir.",
    subtitle:
      "Un seul workflow de la connexion des canaux à l'automatisation 24h/24 sur WhatsApp, Instagram et TikTok.",
    steps: [
      {
        title: "Connecter",
        description: "Liez WhatsApp, Instagram ou TikTok en moins de 30 secondes.",
        link: "Connecter les canaux",
      },
      {
        title: "Former",
        description: "Présentez votre activité à l'IA — nom, services, horaires et FAQ.",
        link: "Configurer AI Brain",
      },
      {
        title: "Automatiser",
        description: "L'IA répond à chaque message instantanément, dans toute langue.",
        link: "Ouvrir la boîte de réception",
      },
      {
        title: "Grandir",
        description: "Transférez à un humain si besoin. Suivez tout depuis un seul endroit.",
        link: "Voir le tableau de bord",
      },
    ],
  },
  product: {
    title: "Automatiser. Répondre. Grandir.",
    subtitle: "Tout ce dont vous avez besoin pour gérer la communication client en autopilote.",
    tabs: {
      inbox: "Boîte unifiée",
      brain: "AI Brain",
      channels: "Canaux",
      team: "Équipe",
    },
    inbox: {
      title: "Toutes les conversations au même endroit",
      description:
        "WhatsApp, Instagram et TikTok convergent vers une seule boîte de réception. Voyez les réponses IA, intervenez à tout moment.",
      highlights: ["Sync en temps réel", "IA + transfert humain", "Historique des conversations"],
    },
    brain: {
      title: "Formez l'IA sur votre activité en 5 minutes",
      description:
        "Un assistant guidé configure le type d'activité, les objectifs et les connaissances. BotFlow génère tout automatiquement.",
      highlights: ["Assistant en 5 étapes", "PDF & site web", "Multilingue"],
    },
    channels: {
      title: "Connectez tous les canaux de vos clients",
      description:
        "API WhatsApp Business officielle, DMs Instagram et messages TikTok — tout depuis un seul tableau de bord.",
      highlights: ["Connexion en un clic", "Logos de marque", "Suivi du statut"],
    },
    team: {
      title: "Collaborez avec toute votre équipe",
      description:
        "Invitez des membres, attribuez des rôles et laissez quelqu'un répondre quand l'IA a besoin d'un humain.",
      highlights: ["Permissions par rôle", "Journal d'activité", "Boîte partagée"],
    },
    connected: "Connecté",
    inProgress: "En cours",
    wizardSteps: ["Type d'activité", "Objectifs", "Connaissances", "Générer l'IA"],
    inboxPreviews: [
      "IA : Notre clinique est ouverte lun-sam 9h-18h",
      "IA : Oui, nous livrons à Casablanca !",
      "IA : Le prix est de 299 MAD avec livraison gratuite.",
    ],
    roles: { owner: "Propriétaire", admin: "Admin", member: "Membre" },
  },
  channels: {
    title: "Là où vos clients sont",
    subtitle: "WhatsApp, Instagram, TikTok — une boîte, une IA, zéro message manqué.",
    officialApi: "API officielle",
  },
  scale: {
    title: "L'automatisation client à grande échelle",
    subtitle: "Entreprises et agences qui gèrent toute leur communication client sur BotFlow.",
    metrics: {
      businesses: "Entreprises actives",
      messages: "Messages automatisés",
      countries: "Pays desservis",
      saved: "Économisées par équipe/semaine",
    },
    securityLabel: "Sécurité et conformité entreprise",
    security: [
      { title: "99,9% de disponibilité", description: "Fiabilité entreprise" },
      { title: "Données chiffrées", description: "Sécurité des messages" },
      { title: "Surveillance 24/7", description: "Infrastructure toujours active" },
      { title: "Configuration instantanée", description: "En ligne en 5 minutes" },
    ],
  },
  testimonials: {
    title: "Approuvé par des entreprises du monde entier",
    subtitle: "Découvrez comment les équipes automatisent leur communication avec BotFlow.",
    rating: "4,9/5 de plus de 500 entreprises",
    items: [
      {
        quote:
          "Nous passions de 40% de leads WhatsApp manqués à 3x plus de rendez-vous. BotFlow s'est rentabilisé dès la première semaine. L'IA gère parfaitement l'arabe et le français.",
        author: "Dr. Amira K.",
        role: "Propriétaire de clinique dentaire",
        metric: "3x plus de RDV",
      },
      {
        quote:
          "Avant BotFlow, nous passions des heures sur les DMs Instagram. Maintenant l'IA répond aux questions produits et collecte les leads automatiquement.",
        author: "James L.",
        role: "Fondateur e-commerce",
        metric: "15+ h économisées/sem",
      },
      {
        quote:
          "Gérer WhatsApp et TikTok était le chaos. BotFlow a tout unifié. Notre temps de réponse est passé de heures à secondes.",
        author: "Sofia M.",
        role: "Propriétaire de restaurant",
        metric: "Réponse en < 3 sec",
      },
    ],
  },
  faq: {
    title: "Questions fréquentes",
    subtitle: "Tout ce que vous devez savoir sur BotFlow.",
    items: [
      {
        q: "Quels canaux BotFlow supporte-t-il ?",
        a: "BotFlow supporte WhatsApp Business, les DMs Instagram et les messages TikTok. Tous les canaux se connectent à une boîte de réception unifiée.",
      },
      {
        q: "Combien de temps prend la configuration ?",
        a: "La plupart des entreprises sont opérationnelles en moins de 5 minutes. Connectez un canal, complétez l'assistant AI Brain, et l'IA commence à répondre.",
      },
      {
        q: "Dois-je écrire des prompts IA ?",
        a: "Non. L'assistant AI Brain en 5 étapes pose des questions sur votre activité et génère les instructions automatiquement.",
      },
      {
        q: "Mon équipe peut-elle intervenir ?",
        a: "Oui. BotFlow supporte le transfert humain quand l'IA détecte des demandes complexes ou des mots-clés spécifiques.",
      },
      {
        q: "Quelles langues l'IA supporte-t-elle ?",
        a: "L'IA détecte et répond en anglais, français, arabe, espagnol et plus. Vous choisissez les langues dans les paramètres.",
      },
      {
        q: "Y a-t-il un essai gratuit ?",
        a: "Oui. Essai gratuit de 14 jours — sans carte bancaire. Annulez à tout moment.",
      },
      {
        q: "BotFlow est-il sûr pour mon compte WhatsApp ?",
        a: "Oui. Nous utilisons l'API WhatsApp Business officielle avec OAuth. Vous pouvez déconnecter à tout moment.",
      },
      {
        q: "Combien coûte BotFlow ?",
        a: "À partir de 49$/mois pour Starter. Professional à 99$/mois avec les 3 canaux. Voir la page tarifs.",
      },
    ],
  },
  cta: {
    label: "Plus de 500 entreprises font confiance à BotFlow",
    title: "Prêt à automatiser vos réponses clients ?",
    subtitle:
      "Rejoignez des centaines d'entreprises qui laissent BotFlow gérer WhatsApp, Instagram et TikTok 24h/24.",
    button: "Commencer gratuitement",
    trust1: "Sans carte",
    trust2: "99,9% de disponibilité",
    trust3: "Pour toutes les entreprises",
  },
  pricing: {
    title: "Tarifs simples",
    subtitle: "Pas de frais cachés. Annulation à tout moment.",
    perMonth: "/mois",
    startTrial: "Essai gratuit",
    popular: "Populaire",
    currentPlan: "Plan actuel",
    switch: "Changer",
  },
  footer: {
    tagline:
      "Automatisation client IA pour WhatsApp, Instagram et TikTok. Pour les entreprises qui veulent répondre plus vite sans embaucher.",
    product: "Produit",
    company: "Entreprise",
    support: "Support",
    helpCenter: "Centre d'aide",
    contact: "Contact",
    privacy: "Confidentialité",
    terms: "Conditions",
    rights: "Tous droits réservés.",
  },
  preview: {
    inbox: "Boîte de réception",
    conversations: "conversations",
    needAttention: "nécessitent attention",
    aiHandling: "L'IA gère 94% des conversations automatiquement",
    sampleMessages: [
      { name: "Fatima B.", preview: "Bonjour, je veux connaître les prix...", time: "2m" },
      { name: "Youssef M.", preview: "Vous livrez à Casablanca ?", time: "8m" },
      { name: "Lina K.", preview: "Merci ! L'IA a parfaitement répondu.", time: "1h" },
    ],
  },
  onboarding: {
    welcome: "Bienvenue sur BotFlow",
    title: "Configurez votre entreprise",
    subtitle: "Parlez-nous de votre activité pour personnaliser votre assistant IA.",
    businessType: "Type d'activité",
    businessName: "Nom de l'entreprise",
    businessNamePlaceholder: "Clinique Dentaire Acme",
    website: "Site web",
    websiteOptional: "(optionnel)",
    websitePlaceholder: "https://votreentreprise.com",
    whatsapp: "Numéro WhatsApp",
    whatsappPlaceholder: "+212 6XX XXX XXX",
    whatsappHint: "Nous l'utiliserons pour connecter votre bot WhatsApp plus tard.",
    continue: "Continuer vers le tableau de bord",
    saving: "Enregistrement...",
    selectType: "Veuillez sélectionner un type d'activité.",
  },
};

export const ar: Dictionary = {
  nav: {
    howItWorks: "كيف يعمل",
    features: "الميزات",
    channels: "القنوات",
    faq: "الأسئلة الشائعة",
    pricing: "الأسعار",
    signIn: "تسجيل الدخول",
    startFree: "ابدأ مجاناً",
  },
  auth: {
    tagline: "منصة أتمتة العملاء بالذكاء الاصطناعي",
    signInTab: "تسجيل الدخول",
    signUpTab: "إنشاء حساب",
    copyright: "© 2026 BotFlow. جميع الحقوق محفوظة.",
    signInTitle: "مرحباً بعودتك",
    signInSubtitle: "سجّل الدخول إلى حسابك",
    signUpTitle: "أنشئ حسابك",
    signUpSubtitle: "ابدأ تجربتك المجانية لمدة 14 يوماً",
    email: "البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    password: "كلمة المرور",
    passwordPlaceholder: "••••••••",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "محمد العلوي",
    forgotPassword: "نسيت كلمة المرور؟",
    signInButton: "تسجيل الدخول",
    signUpButton: "إنشاء حساب",
    signingIn: "جارٍ تسجيل الدخول...",
    creatingAccount: "جارٍ إنشاء الحساب...",
    or: "أو",
    continueGoogle: "المتابعة عبر Google",
    connectingGoogle: "جارٍ الاتصال بـ Google...",
    termsPrefix: "بالمتابعة، أنت توافق على",
    terms: "الشروط",
    termsAnd: "و",
    privacy: "سياسة الخصوصية",
    signInError: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    signUpError: "تعذّر إنشاء الحساب.",
    googleError: "فشل تسجيل الدخول عبر Google.",
  },
  hero: {
    badge: "موثوق به من أكثر من 500 شركة حول العالم",
    title: "مساعدك الذكي للعملاء على",
    titleHighlight: "واتساب وإنستغرام وتيك توك",
    subtitle:
      "اربط قنواتك، ودرّب الذكاء الاصطناعي على نشاطك التجاري، واتركه يرد على عملائك على مدار الساعة. الإعداد في 5 دقائق — بدون برمجة وبدون تعقيد.",
    ctaPrimary: "ابدأ مجاناً — تجربة لمدة 14 يوماً",
    ctaSecondary: "اطّلع على آلية العمل",
    trust1: "بدون بطاقة بنكية",
    trust2: "إلغاء في أي وقت",
    trust3: "واجهة برمجة واتساب الرسمية",
    floatNewMessage: "رسالة جديدة",
    floatAiReplied: "ردّ الذكاء الاصطناعي خلال ثانيتين",
    floatBrainActive: "العقل الاصطناعي نشط",
    floatAccuracy: "دقة 98%",
  },
  stats: {
    messages: "رسائل تمت معالجتها",
    businesses: "شركات نشطة",
    saved: "ساعات موفَّرة أسبوعياً",
    satisfaction: "رضا العملاء",
    repliesToday: "ردود الذكاء الاصطناعي اليوم",
    activeNow: "مستخدمون نشطون حالياً",
    channelsConnected: "قنوات متصلة",
  },
  howItWorks: {
    label: "كيف يعمل BotFlow",
    title: "اربط. درّب. أتمت. توسَّع.",
    subtitle:
      "مسار واحد من ربط القنوات إلى أتمتة التواصل مع العملاء على مدار الساعة عبر واتساب وإنستغرام وتيك توك.",
    steps: [
      {
        title: "الربط",
        description: "اربط واتساب أو إنستغرام أو تيك توك في أقل من 30 ثانية.",
        link: "ربط القنوات",
      },
      {
        title: "التدريب",
        description: "عرِّف الذكاء الاصطناعي على نشاطك — الاسم والخدمات وساعات العمل والأسئلة الشائعة.",
        link: "إعداد العقل الاصطناعي",
      },
      {
        title: "الأتمتة",
        description: "يرد الذكاء الاصطناعي على كل رسالة فوراً وبأي لغة.",
        link: "فتح صندوق الوارد",
      },
      {
        title: "التوسع",
        description: "حوِّل المحادثة إلى فريقك عند الحاجة. تتبَّع كل شيء من مكان واحد.",
        link: "عرض لوحة التحكم",
      },
    ],
  },
  product: {
    title: "أتمت. ردّ. توسَّع.",
    subtitle: "كل ما تحتاجه لإدارة تواصل العملاء تلقائياً.",
    tabs: {
      inbox: "صندوق وارد موحَّد",
      brain: "العقل الاصطناعي",
      channels: "القنوات",
      team: "الفريق",
    },
    inbox: {
      title: "جميع المحادثات في مكان واحد",
      description:
        "تتجمّع رسائل واتساب وإنستغرام وتيك توك في صندوق وارد واحد. اطّلع على ردود الذكاء الاصطناعي وتدخَّل في أي وقت.",
      highlights: ["مزامنة فورية", "ذكاء اصطناعي مع تحويل بشري", "سجل المحادثات"],
    },
    brain: {
      title: "درِّب الذكاء الاصطناعي على نشاطك في 5 دقائق",
      description:
        "معالج موجَّه يحدد نوع النشاط والأهداف ومصادر المعرفة. يولِّد BotFlow كل شيء تلقائياً.",
      highlights: ["معالج من 5 خطوات", "ملفات PDF وموقع إلكتروني", "متعدد اللغات"],
    },
    channels: {
      title: "اربط جميع القنوات التي يستخدمها عملاؤك",
      description:
        "واجهة برمجة واتساب للأعمال الرسمية، ورسائل إنستغرام وتيك توك — كلها من لوحة تحكم واحدة.",
      highlights: ["ربط بنقرة واحدة", "شعارات العلامة التجارية", "مراقبة الحالة"],
    },
    team: {
      title: "تعاون مع فريقك بالكامل",
      description:
        "ادعُ أعضاء الفريق، وحدِّد الأدوار، واترك أي شخص يرد عندما يحتاج الذكاء الاصطناعي إلى تدخل بشري.",
      highlights: ["صلاحيات حسب الدور", "سجل النشاط", "صندوق وارد مشترك"],
    },
    connected: "متصل",
    inProgress: "قيد التنفيذ",
    wizardSteps: ["نوع النشاط", "الأهداف", "المعرفة", "توليد الذكاء الاصطناعي"],
    inboxPreviews: [
      "الذكاء الاصطناعي: عيادتنا مفتوحة من الاثنين إلى السبت من 9 صباحاً إلى 6 مساءً",
      "الذكاء الاصطناعي: نعم، نوصِّل إلى الدار البيضاء!",
      "الذكاء الاصطناعي: السعر 299 درهماً مع توصيل مجاني.",
    ],
    roles: { owner: "المالك", admin: "مدير", member: "عضو" },
  },
  channels: {
    title: "حيث يتواجد عملاؤك",
    subtitle: "واتساب وإنستغرام وتيك توك — صندوق واحد وذكاء اصطناعي واحد ودون رسائل ضائعة.",
    officialApi: "واجهة برمجة رسمية",
  },
  scale: {
    title: "أتمتة التواصل مع العملاء على نطاق واسع",
    subtitle: "شركات ووكالات تدير تواصلها الكامل مع العملاء عبر BotFlow.",
    metrics: {
      businesses: "شركات نشطة",
      messages: "رسائل مؤتمتة",
      countries: "دول مخدومة",
      saved: "ساعات موفَّرة أسبوعياً للفريق",
    },
    securityLabel: "أمان وامتثال على مستوى المؤسسات",
    security: [
      { title: "99.9% وقت التشغيل", description: "موثوقية على مستوى المؤسسات" },
      { title: "بيانات مشفَّرة", description: "أمان الرسائل من طرف إلى طرف" },
      { title: "مراقبة على مدار الساعة", description: "بنية تحتية دائمة التشغيل" },
      { title: "إعداد فوري", description: "جاهز للعمل في أقل من 5 دقائق" },
    ],
  },
  testimonials: {
    title: "موثوق به من شركات حول العالم",
    subtitle: "اطّلع على كيفية أتمتة الفرق لتواصلها مع العملاء عبر BotFlow.",
    rating: "4.9/5 من أكثر من 500 شركة",
    items: [
      {
        quote:
          "انتقلنا من فقدان 40% من عملاء واتساب إلى حجز مواعيد أكثر بثلاثة أضعاف. استرد BotFlow تكلفته منذ الأسبوع الأول. يرد الذكاء الاصطناعي بالعربية والفرنسية بإتقان.",
        author: "د. أميرة ك.",
        role: "مالكة عيادة أسنان",
        metric: "مواعيد أكثر بثلاثة أضعاف",
      },
      {
        quote:
          "قبل BotFlow، كنا نقضي ساعات في الرد على رسائل إنستغرام يدوياً. اليوم يجيب الذكاء الاصطناعي على أسئلة المنتجات ويجمع العملاء المحتملين تلقائياً.",
        author: "جيمس ل.",
        role: "مؤسس متجر إلكتروني",
        metric: "أكثر من 15 ساعة موفَّرة أسبوعياً",
      },
      {
        quote:
          "كانت إدارة رسائل واتساب وتيك توك فوضى عارمة. وحَّد BotFlow كل شيء. أصبح وقت الاستجابة بالثواني بدلاً من الساعات.",
        author: "صوفيا م.",
        role: "مالكة مطعم",
        metric: "رد خلال أقل من 3 ثوانٍ",
      },
    ],
  },
  faq: {
    title: "الأسئلة الشائعة",
    subtitle: "كل ما تحتاج معرفته عن BotFlow.",
    items: [
      {
        q: "ما القنوات التي يدعمها BotFlow؟",
        a: "يدعم BotFlow واتساب للأعمال ورسائل إنستغرام وتيك توك. تتصل جميع القنوات بصندوق وارد موحَّد مع مساعد ذكاء اصطناعي واحد.",
      },
      {
        q: "كم يستغرق الإعداد؟",
        a: "تصبح معظم الشركات جاهزة في أقل من 5 دقائق. اربط قناة، وأكمل معالج العقل الاصطناعي، ويبدأ الذكاء الاصطناعي بالرد فوراً.",
      },
      {
        q: "هل أحتاج إلى كتابة توجيهات للذكاء الاصطناعي؟",
        a: "لا. يطرح معالج العقل الاصطناعي من 5 خطوات أسئلة عن نشاطك وأهدافك ومصادر المعرفة، ثم يولِّد التعليمات المثلى تلقائياً.",
      },
      {
        q: "هل يمكن لفريقي التدخل عند الحاجة؟",
        a: "نعم. يدعم BotFlow التحويل إلى فريقك عند اكتشاف طلبات معقدة أو كلمات مفتاحية محددة.",
      },
      {
        q: "ما اللغات التي يدعمها الذكاء الاصطناعي؟",
        a: "يكتشف الذكاء الاصطناعي لغة العميل ويرد بالإنجليزية والفرنسية والعربية والإسبانية وغيرها. يمكنك اختيار اللغات المفعَّلة من الإعدادات.",
      },
      {
        q: "هل توجد تجربة مجانية؟",
        a: "نعم. ابدأ بتجربة مجانية لمدة 14 يوماً — بدون بطاقة بنكية. يمكنك الإلغاء في أي وقت من إعدادات الفوترة.",
      },
      {
        q: "هل BotFlow آمن لحساب واتساب الخاص بي؟",
        a: "نعم. نستخدم واجهة برمجة واتساب للأعمال الرسمية مع مصادقة OAuth. يمكنك قطع الاتصال في أي وقت من الإعدادات.",
      },
      {
        q: "كم تكلفة BotFlow؟",
        a: "تبدأ الخطط من 49 دولاراً شهرياً للخطة الأساسية (قناة واحدة و500 محادثة). الخطة الاحترافية بـ 99 دولاراً شهرياً مع القنوات الثلاث. راجع صفحة الأسعار للتفاصيل.",
      },
    ],
  },
  cta: {
    label: "أكثر من 500 شركة تثق في BotFlow",
    title: "هل أنت مستعد لأتمتة ردودك على العملاء؟",
    subtitle:
      "انضم إلى مئات الشركات التي تترك BotFlow يدير رسائل واتساب وإنستغرام وتيك توك على مدار الساعة.",
    button: "ابدأ مجاناً",
    trust1: "بدون بطاقة بنكية",
    trust2: "99.9% وقت التشغيل",
    trust3: "مناسب لجميع الشركات",
  },
  pricing: {
    title: "أسعار بسيطة وواضحة",
    subtitle: "بدون رسوم خفية. يمكنك الإلغاء في أي وقت.",
    perMonth: "/شهر",
    startTrial: "تجربة مجانية",
    popular: "الأكثر شعبية",
    currentPlan: "الخطة الحالية",
    switch: "تغيير الخطة",
  },
  footer: {
    tagline:
      "أتمتة التواصل مع العملاء بالذكاء الاصطناعي عبر واتساب وإنستغرام وتيك توك. للشركات التي تريد الرد بسرعة أكبر دون الحاجة إلى توظيف المزيد من الموظفين.",
    product: "المنتج",
    company: "الشركة",
    support: "الدعم",
    helpCenter: "مركز المساعدة",
    contact: "اتصل بنا",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    rights: "جميع الحقوق محفوظة.",
  },
  preview: {
    inbox: "صندوق الوارد",
    conversations: "محادثات",
    needAttention: "تحتاج إلى اهتمام",
    aiHandling: "الذكاء الاصطناعي يدير 94% من المحادثات تلقائياً",
    sampleMessages: [
      { name: "فاطمة ب.", preview: "مرحباً، أريد معرفة الأسعار...", time: "2 د" },
      { name: "يوسف م.", preview: "هل توصّلون إلى الدار البيضاء؟", time: "8 د" },
      { name: "لينا ك.", preview: "شكراً! أجاب الذكاء الاصطناعي بشكل ممتاز.", time: "1 س" },
    ],
  },
  onboarding: {
    welcome: "مرحباً بك في BotFlow",
    title: "إعداد نشاطك التجاري",
    subtitle: "أخبرنا عن نشاطك التجاري لنخصص مساعدك الذكي.",
    businessType: "نوع النشاط",
    businessName: "اسم النشاط التجاري",
    businessNamePlaceholder: "عيادة الأسنان أكمي",
    website: "الموقع الإلكتروني",
    websiteOptional: "(اختياري)",
    websitePlaceholder: "https://yourbusiness.com",
    whatsapp: "رقم واتساب",
    whatsappPlaceholder: "+212 6XX XXX XXX",
    whatsappHint: "سنستخدمه لربط بوت واتساب لاحقاً.",
    continue: "المتابعة إلى لوحة التحكم",
    saving: "جارٍ الحفظ...",
    selectType: "يرجى اختيار نوع النشاط.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fr, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
