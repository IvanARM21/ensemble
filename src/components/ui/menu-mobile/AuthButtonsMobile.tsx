import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
    closeMenu: () => void;
    session: Session | null;
}

export const AuthButtonsMobile = ({closeMenu, session} : Props) => {
  return (
    <nav className="px-2 sm:px-6 flex flex-col gap-3 border-t py-3">
        {session?.user?.name ? (
            <>
                <Link
                    href={"/profile"}
                    className="py-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl px-4 text-gray-500 hover:text-gray-700"
                    onClick={closeMenu}
                >Hi {session?.user?.name.split(" ")[0]}</Link>
                
                <button
                    type='button'
                    onClick={() => {
                        closeMenu();
                        signOut();
                    }}
                    className="py-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl px-4 text-gray-500 hover:text-gray-700 text-left"
                >Sign Out</button>
            </>
        ) : (
            <>
                <Link
                    href={"/auth/login"}
                    onClick={closeMenu}
                    className="py-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl px-4 text-gray-500 hover:text-gray-700"
                >Sign In</Link>

                <Link
                    href={"/auth/register"}
                    onClick={closeMenu}
                    className="py-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl px-4 text-gray-500 hover:text-gray-700"
                >Register</Link>
            </>
        )}
    </nav>
  )
}
