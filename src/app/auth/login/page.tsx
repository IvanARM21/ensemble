import { SignInWithGoogle, Title } from "@/components";
import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
  return (
    <section className="mt-6">
      <Title>
        Login
      </Title>
      <div className="flex flex-col gap-3 rounded-xl shadow px-5 py-7 sm:p-10 max-w-screen-md mx-auto">
        <LoginForm />
        <SignInWithGoogle />
      </div>
    </section>
  );
}