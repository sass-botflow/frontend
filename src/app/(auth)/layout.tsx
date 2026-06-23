import Link from "next/link";
import { BotFlowLogo } from "@/components/brand/botflow-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute left-1/2 top-1/4 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />

      <Link
        href="/en"
        className="relative mb-8 transition-transform hover:scale-[1.02]"
      >
        <BotFlowLogo size="2xl" />
      </Link>

      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
