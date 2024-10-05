
import Image from "next/image"
import Link from "next/link"
import { MenuButton } from "../menu-mobile/MenuButton";
import { ShoppingButton } from "./ShoppingButton";
import { AuthButtons } from "./AuthButtons";
import { Session } from "next-auth";
import { GenderLinks } from "./GenderLinks";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Props {
    session: Session | null
}

export const Header = ({session} : Props) => {
  return (
    <header className="fixed top-0 w-full  border-b bg-white z-20">
       <div className="max-w-screen-2xl mx-auto h-20 w-full flex justify-between items-center px-2">
            <nav className="flex items-center gap-10">
                <Link
                    href={"/"}
                >
                    <Image 
                        src={"/ensemble.png"}
                        width={140}
                        height={30}
                        alt="Ensemble Logo"
                        className=" drop-shadow-lg hover:scale-110 transition-transform duration-300"
                    />
                </Link>
                <div className="hidden lg:flex gap-8 items-center">
                    <GenderLinks />
                    <Link
                        href={"/about-us"}
                        className="link"
                    >About us</Link>
                    <Link
                        href={"/contact"}
                        className="link"
                    >Contact</Link>
                </div>
            </nav>
           
            <nav className="hidden lg:flex gap-5 items-center justify-end text-gray-500 text-lg">
                <AuthButtons session={session}/>
                <button
                    type="button"
                    aria-label="Search"
                    className="h-7 w-7 text-gray-400"
                >
                    <MagnifyingGlassIcon />
                </button>
                <ShoppingButton />
            </nav>

            <MenuButton />
       </div>
    </header>
  )
}
