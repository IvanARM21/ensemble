import { SignInWithGoogle, Title } from "@/components";
import { RegisterForm } from "./ui/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="mt-6">
      <Title>
        Register
      </Title>
      <div className="flex flex-col gap-3 rounded-xl shadow  px-5 py-7 sm:p-10 max-w-screen-md mx-auto">
        <RegisterForm />
        <SignInWithGoogle />
      </div>
    </section>
  );
}