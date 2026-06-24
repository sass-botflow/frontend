import { SignIn } from "@clerk/nextjs";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="flex w-full justify-center">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/register"
        forceRedirectUrl="/dashboard/channels"
      />
    </div>
  );
}
