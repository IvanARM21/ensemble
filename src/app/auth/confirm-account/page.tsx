
import Link from "next/link";
import { Alert, Title } from "@/components";
import { confirmAccount } from "@/actions";

interface Props {
  searchParams: {
    token: string;
  }
}

export default async function ConfirmAccountPage({searchParams} : Props) {
  
  const token = searchParams.token;
  const res = await confirmAccount(token);

  return (
    <section className="mt-6">
        <Title>
            Confirm Account
        </Title>

        <div className="flex justify-center items-center gap-3 flex-col">
          <Alert 
            message={res.message}
            error={!res.ok}
          />
          {res.ok && (
            <Link
              href="/auth/login"
              className="btn-secondary"
            >Sign In</Link>
          )}
        </div>
    </section>
  );
}