"use client";

import clsx from "clsx";

interface Props {
    isActive: boolean;
    children: React.ReactNode;
    
    showMenu: () => void;
    closeMenu: () => void;
}

export const MenuCategories = ({ isActive, children, showMenu, closeMenu} : Props) => {

  return (
    <>
        {isActive && (
            <div 
                className="bg-black fixed bg-opacity-30 inset-0 z-10 backdrop-blur-sm fade-in cursor-pointer hidden lg:block"
                onMouseEnter={closeMenu}
            />
        )}

        <nav 
            className={clsx(`bg-white fixed top-20 right-0 z-40 lg:z-[15] sidebar-width lg:w-full h-full lg:h-auto max-w-[500px] lg:max-w-full mt-1 lg:mt-0 px-2 lg:px-0 transition-all duration-500`, {
                "translate-x-0 lg:translate-x-0 lg:translate-y-0": isActive,
                "translate-x-full lg:translate-x-0 lg:-translate-y-full lg:-top-20": !isActive,
            })}
            onMouseEnter={showMenu}
            onMouseLeave={closeMenu}
        >
            {children}
        </nav>
    </>
  )
}
