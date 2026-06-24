"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { useLocale } from "@/components/providers/locale-provider";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { clerkErrorMessage } from "@/lib/auth-navigate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmailPasswordSignUp() {
  const router = useRouter();
  const { t } = useLocale();
  const { signUp, fetchStatus } = useSignUp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loading = fetchStatus === "fetching";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const [firstName, ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ") || undefined;

    const { error: passwordError } = await signUp.password({
      emailAddress: email.trim(),
      password,
      firstName,
      lastName,
    });

    if (passwordError) {
      setError(clerkErrorMessage(passwordError, t.auth.signUpError));
      return;
    }

    if (signUp.status === "complete") {
      const { error: finalizeError } = await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const destination = decorateUrl("/onboarding");
          if (destination.startsWith("http")) {
            window.location.assign(destination);
            return;
          }
          router.replace(destination);
        },
      });

      if (finalizeError) {
        setError(clerkErrorMessage(finalizeError, t.auth.signUpError));
      }
      return;
    }

    const { error: sendCodeError } = await signUp.verifications.sendEmailCode();

    if (sendCodeError) {
      setError(clerkErrorMessage(sendCodeError, t.auth.signUpError));
      return;
    }

    router.push("/sign-up/verify-email-address");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.auth.signUpTitle}
        </h1>
        <p className="text-sm text-muted-foreground">{t.auth.signUpSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t.auth.fullName}</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.auth.fullNamePlaceholder}
            required
            autoComplete="name"
            className="h-11"
          />
        </div>

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
          <Label htmlFor="password">{t.auth.password}</Label>
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
          disabled={loading}
        >
          {loading ? t.auth.creatingAccount : t.auth.signUpButton}
        </Button>
      </form>

      <div className="relative flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t.auth.or}</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <GoogleAuthButton mode="sign-up" />

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
