"use client";

import Image from "next/image"
import clsx from "clsx";
import { DashboardItems } from "./DashboardItems"
import { useDashboardStore } from "@/store"

export const DashboardSidebar = () => {

  const { isActive  } = useDashboardStore();
  return (
    <aside className={clsx("border-r h-screen w-72 fixed", {
      " translate-x-0 xl:translate-x-0": isActive,
      " -translate-x-full xl:translate-x-0": !isActive
    })}>
        <div className="h-[88px] flex justify-center items-center">
            <Image 
                src={"/ensemble.png"}
                alt=""
                width={280}
                height={31}
                className="w-full h-auto px-12"
            />
        </div>

        <DashboardItems />
    </aside>  
  )
}
