
import { SignInWithGoogle, Title } from "@/components";
import { ForgotPasswordForm } from "./ui/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <section className="mt-6">
        <Title>
            Forgot Password
        </Title>
        <div className="flex flex-col gap-3 rounded-xl shadow px-5 py-7 sm:p-10 max-w-screen-md mx-auto">
          <ForgotPasswordForm />
          <SignInWithGoogle />
        </div>
    </section>
  );
}