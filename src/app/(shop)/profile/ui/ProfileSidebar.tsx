import Image from 'next/image';
import { ArchiveBox, BookMark, LockClosed, UserIcon } from '@/icons';
import { User } from '@/interfaces';
import Link from 'next/link';

interface Props {
    user: Omit<User, 'password'>
    show: string;
}

export const ProfileSidebar = ({user, show} : Props) => {

  return (
    <aside className="w-full md:max-w-80 border rounded-xl flex flex-col gap-3">
          <div className="flex flex-col gap-1 items-center p-4">
            <Image 
              src={user?.image ?? "/default.png"}
              alt="Image Profile"
              width={120}
              height={120}
              className="rounded-full"
            />
            <p className="text-xl text-gray-700">{user.name}</p>
            <p className="text-gray-500 capitalize">{user?.role ?? ""}</p>
          </div>
          <div className="bg-gray-200 w-full h-[1px]"/>
          <nav className="px-2 flex justify-center flex-wrap flex-row md:flex-col gap-3 py-2">
            <Link 
                href={"/profile?show=account"}
                className={`flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-xl transition-colors duration-300 cursor-pointer ${show === "account" && "bg-gray-50"}`}
            >
              <UserIcon />
              Account
            </Link>
            <Link 
                href={"/profile?show=security"}
                className={`flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-xl transition-colors duration-300 cursor-pointer ${show === "security" && "bg-gray-50"}`}
            >
              <LockClosed />
              Security
            </Link>
            <Link 
                href={"/profile?show=favorites"}
                className={`flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-xl transition-colors duration-300 cursor-pointer ${show === "favorites" && "bg-gray-50"}`}
            >
              <BookMark />
              Favorites
            </Link>
            <Link 
                href={"/profile?show=orders"}
                className={`flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-xl transition-colors duration-300 cursor-pointer ${show === "orders" && "bg-gray-50"}`}
            >
              <ArchiveBox />
              Orders
            </Link>
          </nav>
        </aside>
  )
}
