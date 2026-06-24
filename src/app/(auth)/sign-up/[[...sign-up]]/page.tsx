import { SignUp } from "@clerk/nextjs";

export const metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <SignUp
      routing="path"
      path="/sign-up"
      signInUrl="/sign-in"
      forceRedirectUrl="/onboarding"
    />
  );
}
