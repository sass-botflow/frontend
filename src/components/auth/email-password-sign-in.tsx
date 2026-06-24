"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { useLocale } from "@/components/providers/locale-provider";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { clerkErrorMessage, navigateAfterAuth } from "@/lib/auth-navigate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmailPasswordSignIn() {
  const router = useRouter();
  const { t } = useLocale();
  const { signIn, fetchStatus } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loading = fetchStatus === "fetching";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const { error: passwordError } = await signIn.password({
      emailAddress: email.trim(),
      password,
    });

    if (passwordError) {
      const code =
        "code" in passwordError
          ? String((passwordError as { code?: string }).code)
          : "";
      const isGoogleOnly =
        code === "strategy_for_user_invalid" ||
        passwordError.message?.toLowerCase().includes("google");

      setError(
        isGoogleOnly
          ? t.auth.googleOnlyAccount
          : clerkErrorMessage(passwordError, t.auth.signInError),
      );
      return;
    }

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          navigateAfterAuth(router, decorateUrl, "/dashboard");
        },
      });

      if (finalizeError) {
        setError(clerkErrorMessage(finalizeError, t.auth.signInError));
      }
      return;
    }

    if (signIn.status === "needs_second_factor") {
      router.push("/sign-in/factor-one");
      return;
    }

    if (signIn.status === "needs_new_password") {
      router.push("/sign-in/reset-password");
      return;
    }

    if (signIn.status === "needs_client_trust") {
      router.push("/sign-in/factor-two");
      return;
    }

    setError(t.auth.signInError);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.auth.signInTitle}
        </h1>
        <p className="text-sm text-muted-foreground">{t.auth.signInSubtitle}</p>
      </div>

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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t.auth.password}</Label>
            <Link
              href="/sign-in/forgot-password"
              className="text-sm font-medium text-primary hover:text-primary/90"
            >
              {t.auth.forgotPassword}
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.auth.passwordPlaceholder}
            required
            autoComplete="current-password"
            className="h-11"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          className="auth-clerk-primary h-11 w-full font-semibold"
          disabled={loading}
        >
          {loading ? t.auth.signingIn : t.auth.signInButton}
        </Button>
      </form>

      <div className="relative flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t.auth.or}</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <GoogleAuthButton mode="sign-in" />

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        {t.auth.termsPrefix}{" "}
        <Link href="/en" className="font-medium text-primary hover:text-primary/90">
          {t.auth.terms}
        </Link>{" "}
        {t.auth.termsAnd}{" "}
        <Link href="/en" className="font-medium text-primary hover:text-primary/90">
          {t.auth.privacy}
        </Link>
      </p>
    </div>
  );
}
