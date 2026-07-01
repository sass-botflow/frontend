import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalContactBlock,
  LegalPageShell,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { LEGAL_COMPANY } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how BotFlow collects, uses, stores, and protects your data across WhatsApp, Instagram, TikTok, OpenAI, and Stripe.",
  openGraph: {
    title: `Privacy Policy · ${LEGAL_COMPANY.name}`,
    description:
      "BotFlow privacy policy — customer data, channel integrations, AI processing, billing, cookies, and GDPR rights.",
    url: `${LEGAL_COMPANY.website}/privacy`,
    siteName: LEGAL_COMPANY.name,
    type: "website",
  },
  alternates: {
    canonical: `${LEGAL_COMPANY.website}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      description="This policy explains what information BotFlow collects, how we use it when you connect customer channels, and the choices you have over your data."
    >
      <LegalSection title="1. Introduction">
        <p>
          BotFlow (&quot;BotFlow,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides a
          software-as-a-service platform that helps businesses automate customer conversations
          across messaging channels using artificial intelligence. This Privacy Policy describes
          how we collect, use, disclose, and safeguard personal information when you visit{" "}
          <a href={LEGAL_COMPANY.website}>{LEGAL_COMPANY.website}</a>, create an account, connect
          messaging channels, or otherwise use our services (collectively, the &quot;Service&quot;).
        </p>
        <p>
          By using the Service, you acknowledge that you have read this Privacy Policy. If you do
          not agree with our practices, please do not use the Service.
        </p>
      </LegalSection>

      <LegalSection title="2. Who we are">
        <p>
          <strong>Data controller:</strong> BotFlow
          <br />
          <strong>Website:</strong>{" "}
          <a href={LEGAL_COMPANY.website}>{LEGAL_COMPANY.website}</a>
          <br />
          <strong>Contact:</strong>{" "}
          <a href={`mailto:${LEGAL_COMPANY.email}`}>{LEGAL_COMPANY.email}</a>
        </p>
        <p>
          BotFlow is the entity responsible for determining how personal data is processed in
          connection with the Service, except where we process data solely on your instructions as
          a processor on behalf of your business.
        </p>
      </LegalSection>

      <LegalSection title="3. Information we collect">
        <p>We collect information in the following categories:</p>
        <p>
          <strong>Account and profile information.</strong> When you register, we collect your
          name, email address, authentication identifiers provided by our identity provider,
          business name, industry, timezone, language preferences, and onboarding details you
          submit during setup.
        </p>
        <p>
          <strong>Customer conversation data.</strong> When you use BotFlow, we process messages,
          contact names, phone numbers, social handles, conversation metadata, timestamps, channel
          identifiers, and related content that flows through your connected channels.
        </p>
        <p>
          <strong>Knowledge base content.</strong> Documents, FAQs, product information, pricing
          details, business hours, and other materials you upload or enter to train and inform
          your AI assistant.
        </p>
        <p>
          <strong>Channel integration credentials.</strong> API tokens, page IDs, phone number
          IDs, business account identifiers, and related configuration required to connect
          WhatsApp, Instagram, TikTok, and other supported platforms.
        </p>
        <p>
          <strong>Billing information.</strong> Subscription plan, payment status, invoice
          history, and limited billing metadata. Full payment card details are processed by
          Stripe and are not stored on BotFlow servers.
        </p>
        <p>
          <strong>Usage and technical data.</strong> Log data, device and browser information, IP
          address, pages viewed, feature usage, error reports, performance metrics, and cookies
          or similar technologies as described below.
        </p>
        <p>
          <strong>Support communications.</strong> Information you provide when contacting
          support, including email content and attachments.
        </p>
      </LegalSection>

      <LegalSection title="4. How we use your information">
        <p>We use personal information to:</p>
        <ul>
          <li>Provide, operate, maintain, and improve the Service;</li>
          <li>Authenticate users and secure accounts;</li>
          <li>Route, store, and display customer conversations in your inbox;</li>
          <li>Generate AI-assisted replies based on your knowledge base and settings;</li>
          <li>Connect and maintain third-party messaging channel integrations;</li>
          <li>Process subscriptions, invoices, and affiliate or referral programs where applicable;</li>
          <li>Send service-related notices, security alerts, and product updates;</li>
          <li>Monitor abuse, enforce our Terms of Service, and protect the platform;</li>
          <li>Comply with legal obligations and respond to lawful requests.</li>
        </ul>
        <p>
          Where required by applicable law, we rely on legal bases such as contract performance,
          legitimate interests in operating and securing the Service, compliance with legal
          obligations, and your consent where consent is required.
        </p>
      </LegalSection>

      <LegalSection title="5. WhatsApp, Instagram, and TikTok integrations">
        <p>
          When you connect WhatsApp Business, Instagram Business, or TikTok Business to BotFlow,
          you authorize us to access and process data from those platforms on your behalf so we
          can deliver inbox, automation, and AI reply features.
        </p>
        <p>This may include:</p>
        <ul>
          <li>Incoming and outgoing messages and media metadata;</li>
          <li>Customer profile identifiers, usernames, and phone numbers made available by the platform;</li>
          <li>Webhook events, delivery status, and conversation threading data;</li>
          <li>Business account, page, and phone number identifiers required for API access.</li>
        </ul>
        <p>
          You are responsible for ensuring that you have a lawful basis to collect and process
          customer data from these channels, including providing any required notices and obtaining
          consents from your customers. BotFlow acts as a processor for customer conversation data
          you control through your account, and as a controller for account, billing, and platform
          security data.
        </p>
        <p>
          Your use of Meta and TikTok products remains subject to their respective platform terms,
          developer policies, and messaging rules. Disconnecting a channel in BotFlow stops new
          data sync from that channel, subject to our retention practices below.
        </p>
      </LegalSection>

      <LegalSection title="6. OpenAI and AI processing">
        <p>
          BotFlow uses artificial intelligence, including services provided by OpenAI, to generate
          suggested or automated responses, summarize conversations, and assist with knowledge
          retrieval. When AI features are used, relevant portions of conversation content and
          knowledge base context may be transmitted to AI providers for processing.
        </p>
        <p>
          We configure AI processing to operate the Service only. We do not sell your conversation
          content to AI providers. OpenAI and similar subprocessors process data according to their
          own terms and data processing arrangements. AI outputs may be inaccurate or incomplete,
          and you remain responsible for reviewing automated communications sent to your customers
          where required by law or your policies.
        </p>
        <p>
          You can reduce or disable certain AI features in your account settings where available.
          Disabling AI features limits automated reply capabilities but does not necessarily delete
          previously processed data until retention periods expire or you request deletion.
        </p>
      </LegalSection>

      <LegalSection title="7. Stripe billing">
        <p>
          Paid subscriptions are processed through Stripe, Inc. When you subscribe, Stripe collects
          payment method details, billing address where applicable, and transaction information
          directly. BotFlow receives subscription status, customer ID references, invoice metadata,
          and payment outcome information needed to activate and maintain your plan.
        </p>
        <p>
          We do not store full credit or debit card numbers on our infrastructure. Stripe&apos;s
          handling of payment data is governed by Stripe&apos;s privacy policy and security
          standards. If you update billing details or cancel a subscription, changes are reflected
          through Stripe and our billing records accordingly.
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies and similar technologies">
        <p>
          We use cookies, local storage, and similar technologies to keep you signed in, remember
          preferences such as theme and language, protect against fraud, measure product usage, and
          improve performance.
        </p>
        <p>Examples include:</p>
        <ul>
          <li>
            <strong>Essential cookies</strong> required for authentication, session management,
            and security;
          </li>
          <li>
            <strong>Preference cookies</strong> that store language, locale, and interface settings;
          </li>
          <li>
            <strong>Analytics cookies</strong> that help us understand how the Service is used, where
            enabled.
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling essential cookies may
          prevent parts of the Service from functioning. Where required by law, we will present
          cookie choices or consent mechanisms.
        </p>
      </LegalSection>

      <LegalSection title="9. How we share information">
        <p>We may share personal information with:</p>
        <ul>
          <li>
            <strong>Service providers and subprocessors</strong> that help us host infrastructure,
            provide authentication, process payments, deliver AI capabilities, send email, and
            operate customer support;
          </li>
          <li>
            <strong>Messaging and social platforms</strong> when needed to send or receive messages
            through integrations you enable;
          </li>
          <li>
            <strong>Professional advisers</strong> such as lawyers, accountants, or insurers where
            reasonably necessary;
          </li>
          <li>
            <strong>Authorities</strong> when required by law, court order, or to protect rights,
            safety, and security;
          </li>
          <li>
            <strong>Business transfers</strong> in connection with a merger, acquisition, financing,
            or sale of assets, subject to appropriate safeguards.
          </li>
        </ul>
        <p>We do not sell personal information.</p>
      </LegalSection>

      <LegalSection title="10. International data transfers">
        <p>
          BotFlow may process and store information in countries other than where you are located,
          including countries that may not provide the same level of data protection as your
          jurisdiction. Where required, we implement appropriate safeguards such as standard
          contractual clauses or equivalent mechanisms for cross-border transfers.
        </p>
      </LegalSection>

      <LegalSection title="11. Data retention">
        <p>
          We retain personal information only for as long as necessary to provide the Service,
          fulfill the purposes described in this policy, comply with legal obligations, resolve
          disputes, and enforce agreements.
        </p>
        <p>Typical retention practices include:</p>
        <ul>
          <li>
            <strong>Account data</strong> retained while your account is active and for a limited
            period after closure for backup, billing, and legal purposes;
          </li>
          <li>
            <strong>Conversation data</strong> retained according to your plan features and account
            settings until deleted by you or upon account termination, subject to backup cycles;
          </li>
          <li>
            <strong>Billing records</strong> retained as required by tax, accounting, and payment
            regulations;
          </li>
          <li>
            <strong>Security logs</strong> retained for a limited period to detect abuse and
            investigate incidents.
          </li>
        </ul>
        <p>
          When data is no longer needed, we delete or anonymize it using commercially reasonable
          methods. Residual copies may persist in encrypted backups for a limited time before
          automatic purging.
        </p>
      </LegalSection>

      <LegalSection title="12. Your rights under GDPR and similar laws">
        <p>
          If you are located in the European Economic Area, United Kingdom, Switzerland, or another
          jurisdiction with comparable privacy laws, you may have the following rights, subject to
          legal exceptions:
        </p>
        <ul>
          <li>
            <strong>Access</strong> — request confirmation of whether we process your personal data
            and receive a copy;
          </li>
          <li>
            <strong>Rectification</strong> — request correction of inaccurate or incomplete data;
          </li>
          <li>
            <strong>Erasure</strong> — request deletion of personal data in certain circumstances;
          </li>
          <li>
            <strong>Restriction</strong> — request limited processing in certain circumstances;
          </li>
          <li>
            <strong>Portability</strong> — receive personal data you provided in a structured,
            commonly used format where applicable;
          </li>
          <li>
            <strong>Objection</strong> — object to processing based on legitimate interests or for
            direct marketing;
          </li>
          <li>
            <strong>Withdraw consent</strong> — where processing is based on consent, without
            affecting prior lawful processing;
          </li>
          <li>
            <strong>Complaint</strong> — lodge a complaint with your local supervisory authority.
          </li>
        </ul>
        <p>
          To exercise these rights, contact{" "}
          <a href={`mailto:${LEGAL_COMPANY.email}`}>{LEGAL_COMPANY.email}</a>. We may need to verify
          your identity before responding. If you are an end customer of a BotFlow business user,
          please contact that business directly for requests relating to messages they received from
          you; we may redirect such requests to the account owner where appropriate.
        </p>
      </LegalSection>

      <LegalSection title="13. Account and data deletion">
        <p>
          You may delete your BotFlow account or request deletion of personal data by following the
          instructions on our{" "}
          <Link href="/data-deletion">Data Deletion page</Link> or by emailing{" "}
          <a href={`mailto:${LEGAL_COMPANY.email}?subject=Account%20Deletion%20Request`}>
            {LEGAL_COMPANY.email}
          </a>
          . Account deletion initiates removal of account profile data, connected channel
          configurations, conversation history, knowledge base materials, and related workspace
          content from active systems, subject to the retention limits described above.
        </p>
        <p>
          Deleting your account does not automatically delete messages previously delivered to your
          customers on third-party platforms; those platforms maintain their own records under their
          policies.
        </p>
      </LegalSection>

      <LegalSection title="14. Security">
        <p>
          We implement administrative, technical, and organizational measures designed to protect
          personal information, including encryption in transit, access controls, isolated
          production environments, and monitoring for unauthorized activity. No method of
          transmission or storage is completely secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="15. Children&apos;s privacy">
        <p>
          The Service is intended for businesses and is not directed to children under 16. We do not
          knowingly collect personal information from children. If you believe a child has provided
          us personal information, contact us and we will take appropriate steps to delete it.
        </p>
      </LegalSection>

      <LegalSection title="16. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. If we make material changes, we will
          post the updated policy on this page and update the &quot;Last updated&quot; date. Continued
          use of the Service after changes become effective constitutes acceptance of the revised
          policy where permitted by law.
        </p>
      </LegalSection>

      <LegalContactBlock subject="Privacy Policy inquiry" />
    </LegalPageShell>
  );
}
