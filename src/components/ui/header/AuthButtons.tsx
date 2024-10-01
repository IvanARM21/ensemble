"use server";
import Link from 'next/link'
import { auth, signOut } from '@/auth';
import { Session } from 'next-auth';

interface Props {
  session: Session | null
}

export const AuthButtons = async ({session} : Props) => {

  return (
    <>
        {session?.user?.name ? (
          <>
            {session.user.role === "admin" && (
              <>
                <Link
                  href={"/dashboard"}
                  className="link"
                >Dashboard</Link>

                <div className="w-[1px] h-5 bg-gray-200"/>
              </>
            )}
            <Link
              href={"/profile"}
              className="link"
            >Hi {session?.user?.name.split(" ")[0]}</Link>

            <div className="w-[1px] h-5 bg-gray-200"/>

            <form action={async () => {
              "use server";
              await signOut()
            }}>
              <button
                type='submit'
                className="link"
              >Sign Out</button>
            </form>
          </>
        ) : (
          <>
            <Link
              href={"/auth/login"}
              className="link"
            >Sign In</Link>

            <div className="w-[1px] h-5 bg-gray-200"/>

            <Link
              href={"/auth/register"}
              className="link"
            >Register</Link>
          </>
        )}
        
    </>
  )
}
