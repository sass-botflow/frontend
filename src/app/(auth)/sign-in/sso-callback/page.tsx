import { redirect } from "next/navigation";

export default function LegacySignInSsoCallbackPage() {
  redirect("/sso-callback");
}
