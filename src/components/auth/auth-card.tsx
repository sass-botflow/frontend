"use client";

import { AuthTabs } from "@/components/auth/auth-tabs";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-card w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl">
      <AuthTabs />
      <div className="auth-card-body px-5 pb-5 pt-1">{children}</div>
    </div>
  );
}
