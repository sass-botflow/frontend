import { redirect } from "next/navigation";

export default async function SettingsChannelsOAuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const success = params.success;
  const error = params.error;

  if (error) {
    const message = Array.isArray(error) ? error[0] : error;
    redirect(`/dashboard/channels?error=${encodeURIComponent(message ?? "WhatsApp connection failed.")}`);
  }

  if (success === "true" || success === "1") {
    redirect("/dashboard/channels?connected=whatsapp");
  }

  redirect("/dashboard/channels");
}
