"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth/errors";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const { error: resetError } = await authClient.requestPasswordReset({
      email: email.trim(),
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (resetError) {
      setError(getAuthErrorMessage(resetError, t.auth.forgotPasswordPage.error));
      return;
    }

    setSuccess(true);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t.auth.forgotPasswordPage.title}</h1>
        <p className="text-sm text-muted-foreground">{t.auth.forgotPasswordPage.subtitle}</p>
      </div>

      {success ? (
        <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
          {t.auth.forgotPasswordPage.success}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            className="auth-clerk-primary h-11 w-full font-semibold"
            disabled={loading}
          >
            {loading ? t.auth.forgotPasswordPage.sending : t.auth.forgotPasswordPage.button}
          </Button>
        </form>
      )}

      <Button variant="outline" className="h-11 w-full" asChild>
        <Link href="/sign-in">{t.auth.signInButton}</Link>
      </Button>
    </div>
  );
}
