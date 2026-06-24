import { redirect } from "next/navigation";

export default function SettingsChannelsRedirectPage() {
  redirect("/dashboard/channels");
}
