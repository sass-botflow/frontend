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

export function ResetPasswordForm() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const errorParam = searchParams.get("error");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    errorParam ? t.auth.resetPasswordPage.invalidToken : null,
  );
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError(t.auth.resetPasswordPage.invalidToken);
      return;
    }

    setLoading(true);

    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    setLoading(false);

    if (resetError) {
      setError(getAuthErrorMessage(resetError, t.auth.resetPasswordPage.error));
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex flex-col gap-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t.auth.resetPasswordPage.successTitle}</h1>
        <p className="text-sm text-muted-foreground">{t.auth.resetPasswordPage.successSubtitle}</p>
        <Button className="auth-clerk-primary h-11 w-full font-semibold" asChild>
          <Link href="/sign-in">{t.auth.signInButton}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t.auth.resetPasswordPage.title}</h1>
        <p className="text-sm text-muted-foreground">{t.auth.resetPasswordPage.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">{t.auth.resetPasswordPage.newPassword}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.auth.passwordPlaceholder}
            required
            minLength={8}
            autoComplete="new-password"
            className="h-11"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          className="auth-clerk-primary h-11 w-full font-semibold"
          disabled={loading || !token}
        >
          {loading ? t.auth.resetPasswordPage.saving : t.auth.resetPasswordPage.button}
        </Button>
      </form>

      <Button variant="outline" className="h-11 w-full" asChild>
        <Link href="/sign-in">{t.auth.signInButton}</Link>
      </Button>
    </div>
  );
}
