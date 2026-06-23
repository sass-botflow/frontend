import { getApiUrl } from "@/lib/api";

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://botflow.ink";
  const apiUrl = getApiUrl();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent-muted">
          Botflow
        </p>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">
          Frontend is live
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          Deployed on EasyPanel. The app is configured to talk to your backend
          API.
        </p>

        <dl className="space-y-4 text-sm">
          <div className="flex flex-col gap-1 rounded-lg border border-border bg-background/60 p-4">
            <dt className="text-zinc-500">Frontend</dt>
            <dd className="font-mono text-accent-muted">{appUrl}</dd>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-border bg-background/60 p-4">
            <dt className="text-zinc-500">Backend API</dt>
            <dd className="font-mono text-accent-muted">{apiUrl}</dd>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-border bg-background/60 p-4">
            <dt className="text-zinc-500">Port</dt>
            <dd className="font-mono text-accent-muted">3000</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
