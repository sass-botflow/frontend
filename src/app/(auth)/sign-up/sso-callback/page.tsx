import { redirect } from "next/navigation";

export default function LegacySignUpSsoCallbackPage() {
  redirect("/sso-callback");
}
