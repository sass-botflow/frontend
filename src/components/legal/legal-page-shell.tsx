import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { LEGAL_COMPANY } from "@/lib/legal/constants";
import { cn } from "@/lib/utils";

interface LegalPageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function LegalPageShell({
  title,
  description,
  children,
  className,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen">
      <MarketingNavbar />

      <div className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.16),transparent_65%)]" />
        <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16 lg:py-20">
          <Link
            href="/en"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to BotFlow
          </Link>

          <header className="mb-10 space-y-4 border-b border-border/60 pb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {LEGAL_COMPANY.name}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {LEGAL_COMPANY.lastUpdated}
            </p>
          </header>

          <article
            className={cn(
              "legal-prose space-y-10 text-[15px] leading-7 text-foreground/90 sm:text-base sm:leading-8",
              className,
            )}
          >
            {children}
          </article>
        </div>
      </div>

      <Footer />
    </div>
  );
}

interface LegalSectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-4 text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

interface LegalContactBlockProps {
  subject?: string;
}

export function LegalContactBlock({ subject }: LegalContactBlockProps) {
  const mailto = subject
    ? `mailto:${LEGAL_COMPANY.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${LEGAL_COMPANY.email}`;

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <p className="text-sm text-muted-foreground">
        Questions about this page? Contact us at{" "}
        <a href={mailto}>{LEGAL_COMPANY.email}</a> or visit{" "}
        <a href={LEGAL_COMPANY.website} target="_blank" rel="noopener noreferrer">
          {LEGAL_COMPANY.website.replace("https://", "")}
        </a>
        .
      </p>
    </div>
  );
}
