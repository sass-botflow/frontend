import { SignUp } from "@clerk/nextjs";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="flex w-full justify-center">
      <SignUp
        routing="path"
        path="/register"
        signInUrl="/login"
        forceRedirectUrl="/dashboard/channels"
      />
    </div>
  );
}
