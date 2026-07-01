import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalContactBlock,
  LegalPageShell,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { LEGAL_COMPANY } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: "Data Deletion",
  description:
    "Request deletion of your BotFlow account, conversations, knowledge base, channel data, and associated personal information.",
  openGraph: {
    title: `Data Deletion · ${LEGAL_COMPANY.name}`,
    description:
      "Learn how to delete your BotFlow account and what data is removed from our systems.",
    url: `${LEGAL_COMPANY.website}/data-deletion`,
    siteName: LEGAL_COMPANY.name,
    type: "website",
  },
  alternates: {
    canonical: `${LEGAL_COMPANY.website}/data-deletion`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DataDeletionPage() {
  return (
    <LegalPageShell
      title="Data Deletion"
      description="This page explains how to request deletion of your BotFlow account and what happens to your conversations, knowledge base, channels, and related data."
    >
      <LegalSection title="1. Overview">
        <p>
          BotFlow respects your right to control your personal data. You may request deletion of your
          account and associated workspace data at any time. This page describes the deletion
          process, what information is removed, expected timelines, and limited exceptions required
          for legal, security, or billing compliance.
        </p>
        <p>
          For a broader explanation of how we handle personal information, see our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="2. How to request account deletion">
        <p>You can request deletion using any of the following methods:</p>
        <p>
          <strong>Option A — Email request (recommended)</strong>
          <br />
          Send an email to{" "}
          <a href={`mailto:${LEGAL_COMPANY.email}?subject=Account%20Deletion%20Request`}>
            {LEGAL_COMPANY.email}
          </a>{" "}
          from the email address associated with your BotFlow account. Include the subject line
          &quot;Account Deletion Request&quot; and confirm the business name on the account.
        </p>
        <p>
          <strong>Option B — In-app request</strong>
          <br />
          If you are signed in, go to{" "}
          <Link href="/dashboard/settings">Settings</Link> and use the account deletion option where
          available, or contact support through your dashboard help center.
        </p>
        <p>
          <strong>Option C — Channel disconnection before deletion</strong>
          <br />
          Before deleting your account, you may disconnect WhatsApp, Instagram, and TikTok from{" "}
          <Link href="/dashboard/channels">Channels</Link> to stop new message sync immediately.
          Account deletion will still remove stored channel credentials and conversation history from
          BotFlow.
        </p>
        <p>
          We may ask you to verify your identity before processing a deletion request to prevent
          unauthorized removal of an account.
        </p>
      </LegalSection>

      <LegalSection title="3. What data is deleted">
        <p>
          When your account deletion request is confirmed and processed, BotFlow deletes or
          anonymizes the following categories of data from active production systems, subject to the
          retention exceptions below:
        </p>
        <p>
          <strong>Account and profile data</strong>
          <br />
          Your name, email address, authentication identifiers, business profile, onboarding
          responses, team membership associations, notification preferences, and workspace settings.
        </p>
        <p>
          <strong>Conversations and inbox data</strong>
          <br />
          Message history, conversation threads, contact records created within BotFlow, labels,
          assignment metadata, and AI-generated drafts or replies stored in your workspace.
        </p>
        <p>
          <strong>Knowledge base</strong>
          <br />
          Uploaded files, FAQs, product catalogs, custom instructions, embeddings derived from your
          business content, and other training materials used by your AI assistant.
        </p>
        <p>
          <strong>Connected channels</strong>
          <br />
          WhatsApp, Instagram, TikTok, and other integration credentials, webhook configurations,
          phone number IDs, page IDs, access tokens, and channel connection records stored in
          BotFlow.
        </p>
        <p>
          <strong>Automation and AI configuration</strong>
          <br />
          Agent instructions, workflow rules, appointment settings, CRM records stored in your
          workspace, and analytics views tied to your account.
        </p>
        <p>
          <strong>Affiliate and referral records</strong>
          <br />
          If you participated in the BotFlow affiliate program, referral codes and dashboard records
          linked to your user account will be deleted or anonymized, except where financial records
          must be retained.
        </p>
      </LegalSection>

      <LegalSection title="4. Deletion timeline">
        <p>
          We aim to complete account deletion within <strong>30 days</strong> of verifying your
          request. In most cases, deletion from active systems occurs sooner.
        </p>
        <p>
          Encrypted backups containing your data may persist for up to <strong>90 days</strong> before
          being overwritten through our standard backup rotation cycle. During that period, backup
          copies are not used for product operations and remain access-restricted.
        </p>
        <p>
          You will receive a confirmation email once deletion from active systems is complete, unless
          we are unable to contact you at your account email address.
        </p>
      </LegalSection>

      <LegalSection title="5. Data we may retain">
        <p>
          Certain information may be retained after account deletion where we have a lawful reason to
          do so, including:
        </p>
        <ul>
          <li>
            <strong>Billing and tax records</strong> required by accounting, audit, or tax law,
            including Stripe transaction references and invoices;
          </li>
          <li>
            <strong>Security and abuse logs</strong> needed to detect fraud, enforce our Terms of
            Service, or investigate incidents;
          </li>
          <li>
            <strong>Legal hold data</strong> where retention is required by court order, regulator
            request, or pending dispute;
          </li>
          <li>
            <strong>Anonymized analytics</strong> that no longer identify you or your business.
          </li>
        </ul>
        <p>
          Retained data is limited to what is necessary for the specific purpose and is not used for
          marketing or unrelated product features.
        </p>
      </LegalSection>

      <LegalSection title="6. Third-party platform data">
        <p>
          Deleting your BotFlow account does not delete messages, media, or customer profiles stored
          by WhatsApp, Instagram, TikTok, Meta, or other third-party platforms. Those services
          maintain separate records under their own policies. You should manage or delete data
          directly with those providers if required.
        </p>
        <p>
          Disconnecting a channel before account deletion stops BotFlow from receiving new platform
          events but does not retroactively remove messages already delivered to your customers
          outside BotFlow.
        </p>
      </LegalSection>

      <LegalSection title="7. End-customer data requests">
        <p>
          If you are a customer of a business that uses BotFlow and want to exercise privacy rights
          regarding messages that business sent you, please contact that business directly. BotFlow
          processes end-customer conversation data as a processor on behalf of our business users
          and will assist account owners with lawful requests where appropriate.
        </p>
      </LegalSection>

      <LegalSection title="8. Questions and support">
        <p>
          If you have questions about data deletion, need help exporting data before closure, or
          want to confirm the status of a pending request, contact us at{" "}
          <a href={`mailto:${LEGAL_COMPANY.email}?subject=Data%20Deletion%20Support`}>
            {LEGAL_COMPANY.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalContactBlock subject="Data Deletion Request" />
    </LegalPageShell>
  );
}
