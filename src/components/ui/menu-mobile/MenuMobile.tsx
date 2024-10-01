"use client";
import Link from "next/link"
import clsx from "clsx";
import { useUiStore } from "@/store/client/ui-store";
import { ChevronRight, XMark } from "@/icons";
import { AuthButtonsMobile } from "./AuthButtonsMobile";
import { Session } from "next-auth";
import { MenuCategories } from "../menu/MenuCategories";
import { useMenuStore } from "@/store";
import { useEffect } from "react";

interface Props {
    session: Session | null
}

export const MenuMobile = ({session}: Props) => {

  const { isActive: isActiveUi, closeMenu: closeMenuUi } = useUiStore();
//   const { isActive: isActiveMenuNavigation, closeMenu: closeMenuNavigation, showMenu } = useMenuStore
  const { closeMenuMen, closeMenuWomen, menuMenState, menuWomenState, showMenuMen, showMenuWomen} = useMenuStore();

  const closeMenu = () => {
      if(isActiveUi && (menuMenState || menuWomenState)) {
        closeMenuCategories();
        setTimeout(() => {
          closeMenuUi();
        }, 200);
        return;
      }
      closeMenuCategories();
      closeMenuUi();
  }

  const closeMenuCategories = () => {
    closeMenuWomen();
    closeMenuMen();
  }

  return (
    <>  
        {isActiveUi && (
            <div 
                onClick={closeMenu}
                className="bg-black fixed bg-opacity-50 inset-0 z-30 backdrop-blur-sm lg:hidden fade-in"
            />
        )}
        <aside className={clsx(" overflow-x-hidden  flex flex-col right-0 bg-white fixed min-h-screen top-0 z-40 w-full sidebar-width max-w-[500px] lg:hidden transition-all duration-300 h-full overflow-y-auto", {
            "translate-x-0": isActiveUi,
            "translate-x-full": !isActiveUi
        })}>
            <div className="h-full flex flex-col overflow-y-auto">
                <div className="fixed top-0 bg-white flex justify-between items-center w-full px-4 h-20">
                    <p className="text-xl text-gray-900 font-medium">Menu</p>
                    <button
                        type="button"
                        onClick={closeMenu}
                        aria-label="Close Menu Mobile"
                        className="size-10 text-gray-900"
                    ><XMark /></button>
                </div>

                <div className="h-[1px] w-full bg-gray-200 mt-20" />

                <nav className="mt-3 px-1 flex flex-col gap-3 flex-1 pb-3">
                    <button 
                        type="button"
                        onClick={showMenuWomen}
                        className="flex gap-1 items-center justify-between py-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl px-3 text-gray-500 hover:text-black"
                    >
                        Women 
                        <ChevronRight />
                    </button>
                    <button 
                        type="button"
                        onClick={showMenuMen}
                        className="flex gap-1 items-center justify-between py-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl px-3 text-gray-500 hover:text-black"
                    >
                        Men 
                        <ChevronRight />
                    </button>
                    <Link
                        href={"/about-us"}
                        onClick={closeMenu}
                        className="py-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl px-3 text-gray-500 hover:text-black"
                    >About Us</Link>
                    <Link
                        href={"/contact"}
                        onClick={closeMenu}
                        className="py-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl px-3 text-gray-500 hover:text-black"
                    >Contact</Link>
                </nav>
                <AuthButtonsMobile closeMenu={closeMenu} session={session} />
            </div>
        </aside>
    </>
  )
}
