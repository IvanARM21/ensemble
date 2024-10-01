import Link from 'next/link';
import { verifyToken } from '@/actions';
import { Alert, Title } from '@/components';
import { NewPasswordForm } from './ui/NewPasswordForm';

interface Props {
  searchParams: {
    token: string;
  }
}

export default async function NewPasswordPage({searchParams} : Props) {

  const token = searchParams.token;
  const res = await verifyToken(token);

  
  return (
    <section className="mt-6">
        <Title>
            New Password
        </Title>

        {!res.ok ? (
          <div className="flex justify-center items-center flex-col gap-3">
              <Alert 
                  message={res.message}
                  error={true}
              />
              <Link
                href="/"
                className="btn-secondary"
              >Go to home</Link>
          </div>
        ) : (
          <NewPasswordForm 
            token={token}
            alertBd={{message: res.message, error: false}}
          />
        )}
    </section>
  );
}