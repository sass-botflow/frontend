"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth/errors";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VerifyEmailForm() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const emailParam = searchParams.get("email") ?? "";
  const [email, setEmail] = useState(emailParam);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleResend(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const { error: resendError } = await authClient.sendVerificationEmail({
      email: email.trim(),
      callbackURL: `${window.location.origin}/verify-email?status=verified`,
    });

    setLoading(false);

    if (resendError) {
      setError(getAuthErrorMessage(resendError, t.auth.verifyEmail.resendError));
      return;
    }

    setMessage(t.auth.verifyEmail.resendSuccess);
  }

  if (status === "verified") {
    return (
      <div className="flex flex-col gap-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t.auth.verifyEmail.verifiedTitle}</h1>
        <p className="text-sm text-muted-foreground">{t.auth.verifyEmail.verifiedSubtitle}</p>
        <Button className="auth-clerk-primary h-11 w-full font-semibold" asChild>
          <Link href="/sign-in">{t.auth.signInButton}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t.auth.verifyEmail.title}</h1>
        <p className="text-sm text-muted-foreground">{t.auth.verifyEmail.subtitle}</p>
      </div>

      <form onSubmit={handleResend} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t.auth.email}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.auth.emailPlaceholder}
            required
            autoComplete="email"
            className="h-11"
          />
        </div>

        {message && <p className="text-sm text-emerald-600 dark:text-emerald-400">{message}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          className="auth-clerk-primary h-11 w-full font-semibold"
          disabled={loading}
        >
          {loading ? t.auth.verifyEmail.resending : t.auth.verifyEmail.resendButton}
        </Button>
      </form>

      <Button variant="outline" className="h-11 w-full" asChild>
        <Link href="/sign-in">{t.auth.signInButton}</Link>
      </Button>
    </div>
  );
}
