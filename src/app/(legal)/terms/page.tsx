import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalContactBlock,
  LegalPageShell,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { LEGAL_COMPANY } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "BotFlow Terms of Service — subscription terms, customer responsibilities, AI limitations, billing, refunds, and liability.",
  openGraph: {
    title: `Terms of Service · ${LEGAL_COMPANY.name}`,
    description:
      "Read the BotFlow Terms of Service governing use of our AI customer automation platform.",
    url: `${LEGAL_COMPANY.website}/terms`,
    siteName: LEGAL_COMPANY.name,
    type: "website",
  },
  alternates: {
    canonical: `${LEGAL_COMPANY.website}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <LegalPageShell
      title="Terms of Service"
      description="These terms govern your access to and use of the BotFlow platform, including subscriptions, channel integrations, and AI-powered automation."
    >
      <LegalSection title="1. Agreement to these terms">
        <p>
          These Terms of Service (&quot;Terms&quot;) constitute a binding agreement between you
          and BotFlow governing your use of the BotFlow website at{" "}
          <a href={LEGAL_COMPANY.website}>{LEGAL_COMPANY.website}</a>, applications, APIs, and
          related services (collectively, the &quot;Service&quot;). By creating an account, connecting
          a channel, or using the Service, you agree to these Terms and our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          If you use the Service on behalf of a company or other legal entity, you represent that
          you have authority to bind that entity, and &quot;you&quot; refers to that entity.
        </p>
      </LegalSection>

      <LegalSection title="2. Description of the Service">
        <p>
          BotFlow is a software-as-a-service platform that enables businesses to manage customer
          conversations, deploy AI-assisted replies, connect messaging channels such as WhatsApp,
          Instagram, and TikTok, organize leads, and automate customer communication workflows from
          a unified dashboard.
        </p>
        <p>
          Features may change over time. We may add, modify, or discontinue features with reasonable
          notice where practicable. Beta or preview features may be offered as-is and may be
          withdrawn at any time.
        </p>
      </LegalSection>

      <LegalSection title="3. Account registration and security">
        <p>
          You must provide accurate registration information and keep your account credentials
          secure. You are responsible for all activity under your account. Notify us immediately at{" "}
          <a href={`mailto:${LEGAL_COMPANY.email}`}>{LEGAL_COMPANY.email}</a> if you suspect
          unauthorized access.
        </p>
        <p>
          We may suspend or refuse registration where we reasonably believe information is false,
          incomplete, or associated with prior abuse.
        </p>
      </LegalSection>

      <LegalSection title="4. Subscription, payment, and billing">
        <p>
          Paid plans are billed on a recurring subscription basis unless otherwise stated at checkout.
          By subscribing, you authorize BotFlow and our payment processor, Stripe, to charge your
          payment method for applicable fees, taxes, and renewals until you cancel.
        </p>
        <p>
          <strong>Pricing.</strong> Current plan prices are displayed on our pricing page and in
          your billing dashboard. We may change prices for future billing periods with advance
          notice; changes apply on your next renewal unless you cancel before the change takes
          effect.
        </p>
        <p>
          <strong>Renewals.</strong> Subscriptions renew automatically at the end of each billing
          cycle unless canceled before the renewal date.
        </p>
        <p>
          <strong>Failed payments.</strong> If payment fails, we may retry charges, downgrade
          features, or suspend access until payment is resolved.
        </p>
        <p>
          <strong>Taxes.</strong> Fees are exclusive of applicable taxes unless stated otherwise.
          You are responsible for taxes associated with your purchase, excluding taxes based on
          BotFlow&apos;s net income.
        </p>
      </LegalSection>

      <LegalSection title="5. Customer responsibilities">
        <p>You agree that you will:</p>
        <ul>
          <li>Use the Service only for lawful business purposes;</li>
          <li>Comply with all applicable laws, including privacy, marketing, and consumer protection laws;</li>
          <li>Obtain all rights, notices, and consents needed to message your customers;</li>
          <li>Configure AI instructions and automations responsibly;</li>
          <li>Maintain valid credentials for connected channels and third-party platforms;</li>
          <li>Review automated messages where human oversight is required by law or your industry;</li>
          <li>Ensure your team members with account access are authorized and trained appropriately.</li>
        </ul>
        <p>
          You are solely responsible for the content of messages sent from your account, including
          AI-generated replies, offers, appointment confirmations, and support responses.
        </p>
      </LegalSection>

      <LegalSection title="6. Channel integrations and platform compliance">
        <p>
          Connecting WhatsApp, Instagram, TikTok, or other channels requires compliance with each
          platform&apos;s terms, commerce policies, messaging rules, and developer guidelines. You
          must only use official APIs and approved business accounts as required by those platforms.
        </p>
        <p>
          BotFlow is not responsible for account restrictions, message delivery failures, template
          rejections, or policy enforcement actions taken by Meta, TikTok, or other third-party
          providers. You acknowledge that platform APIs may change without notice and may affect
          Service functionality.
        </p>
      </LegalSection>

      <LegalSection title="7. AI-generated responses and limitations">
        <p>
          The Service uses artificial intelligence, including models provided by third parties such
          as OpenAI, to draft or send automated responses. AI output may be incorrect, incomplete,
          outdated, biased, or inappropriate for a given context.
        </p>
        <p>
          BotFlow does not guarantee the accuracy, legality, or suitability of AI-generated content.
          You are responsible for configuring guardrails, reviewing high-risk communications, and
          ensuring automated replies comply with your obligations to customers. The Service is not a
          substitute for professional legal, medical, financial, or emergency advice.
        </p>
        <p>
          We may apply usage limits, safety filters, and content restrictions to AI features to
          protect users and maintain platform integrity.
        </p>
      </LegalSection>

      <LegalSection title="8. Acceptable use and abuse policy">
        <p>You may not use the Service to:</p>
        <ul>
          <li>Send spam, unsolicited bulk messages, or deceptive communications;</li>
          <li>Harass, threaten, defraud, or abuse any person;</li>
          <li>Distribute malware, phishing content, or illegal material;</li>
          <li>Infringe intellectual property or privacy rights;</li>
          <li>Attempt to bypass security, rate limits, or access controls;</li>
          <li>Reverse engineer, scrape, or resell the Service except as expressly permitted;</li>
          <li>Use the Service in regulated industries without required safeguards and approvals;</li>
          <li>Impersonate BotFlow, another business, or a government authority.</li>
        </ul>
        <p>
          We may investigate suspected abuse and suspend or terminate accounts, remove content, or
          report activity to authorities where appropriate. Repeated or serious violations may
          result in permanent termination without refund.
        </p>
      </LegalSection>

      <LegalSection title="9. Intellectual property">
        <p>
          BotFlow and its licensors own all rights in the Service, including software, branding,
          documentation, and underlying technology. Subject to these Terms, we grant you a limited,
          non-exclusive, non-transferable, revocable license to use the Service for your internal
          business purposes during your subscription.
        </p>
        <p>
          You retain ownership of content you submit, including knowledge base materials and
          conversation data. You grant BotFlow a worldwide license to host, process, transmit, and
          display that content solely to provide and improve the Service, including AI features you
          enable.
        </p>
      </LegalSection>

      <LegalSection title="10. Confidentiality">
        <p>
          Each party may receive confidential information from the other. The receiving party will
          use reasonable care to protect such information and use it only for purposes related to the
          Service. Confidentiality obligations do not apply to information that is public, already
          known, independently developed, or lawfully obtained from a third party.
        </p>
      </LegalSection>

      <LegalSection title="11. Refund policy">
        <p>
          Subscription fees are generally non-refundable except where required by applicable law or
          explicitly stated otherwise at purchase.
        </p>
        <p>
          If you cancel a paid subscription, you retain access through the end of the current
          billing period. We do not provide prorated refunds for unused time in a billing cycle
          unless mandated by law.
        </p>
        <p>
          If you believe you were charged in error, contact{" "}
          <a href={`mailto:${LEGAL_COMPANY.email}?subject=Billing%20Dispute`}>
            {LEGAL_COMPANY.email}
          </a>{" "}
          within 14 days of the charge. We will review good-faith billing disputes promptly.
        </p>
      </LegalSection>

      <LegalSection title="12. Disclaimers">
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM EXTENT
          PERMITTED BY LAW, BOTFLOW DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR
          STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          NON-INFRINGEMENT, AND UNINTERRUPTED OR ERROR-FREE OPERATION.
        </p>
        <p>
          We do not warrant that the Service will meet your requirements, that AI outputs will be
          accurate, or that third-party platforms will remain available or policy-compliant.
        </p>
      </LegalSection>

      <LegalSection title="13. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, BOTFLOW AND ITS OFFICERS, DIRECTORS, EMPLOYEES,
          AND SUPPLIERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
          EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR
          BUSINESS INTERRUPTION, ARISING FROM OR RELATED TO THE SERVICE OR THESE TERMS, EVEN IF
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, BOTFLOW&apos;S TOTAL LIABILITY FOR ALL CLAIMS ARISING
          OUT OF OR RELATING TO THE SERVICE OR THESE TERMS IN ANY 12-MONTH PERIOD WILL NOT EXCEED
          THE GREATER OF (A) THE AMOUNTS YOU PAID TO BOTFLOW FOR THE SERVICE IN THAT PERIOD OR (B)
          ONE HUNDRED U.S. DOLLARS (USD $100).
        </p>
        <p>
          Some jurisdictions do not allow certain limitations, so some of the above may not apply
          to you.
        </p>
      </LegalSection>

      <LegalSection title="14. Indemnification">
        <p>
          You will defend, indemnify, and hold harmless BotFlow from claims, damages, losses, and
          expenses (including reasonable legal fees) arising from your use of the Service, your
          content, your customer communications, your violation of these Terms, or your violation of
          third-party rights or platform policies.
        </p>
      </LegalSection>

      <LegalSection title="15. Termination">
        <p>
          You may cancel your subscription or delete your account at any time through your billing
          settings or by following our{" "}
          <Link href="/data-deletion">Data Deletion instructions</Link>. We may suspend or terminate
          access immediately if you materially breach these Terms, create security risk, or engage
          in abusive behavior.
        </p>
        <p>
          Upon termination, your right to use the Service ends. Sections that by their nature should
          survive termination will survive, including payment obligations, intellectual property,
          disclaimers, limitation of liability, and indemnification.
        </p>
      </LegalSection>

      <LegalSection title="16. Governing law and disputes">
        <p>
          These Terms are governed by the laws applicable to BotFlow&apos;s place of establishment,
          without regard to conflict-of-law principles, except where mandatory consumer protection
          laws in your country provide otherwise.
        </p>
        <p>
          Before filing a formal claim, you agree to contact us at{" "}
          <a href={`mailto:${LEGAL_COMPANY.email}`}>{LEGAL_COMPANY.email}</a> and attempt to resolve
          the dispute informally within 30 days.
        </p>
      </LegalSection>

      <LegalSection title="17. Changes to these terms">
        <p>
          We may update these Terms from time to time. Material changes will be posted on this page
          with an updated effective date. Continued use after changes become effective constitutes
          acceptance where permitted by law. If you do not agree to updated Terms, you must stop
          using the Service and cancel your subscription.
        </p>
      </LegalSection>

      <LegalContactBlock subject="Terms of Service inquiry" />
    </LegalPageShell>
  );
}
