"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import {  SizeWithStock } from "@/interfaces"
import clsx from "clsx";

interface Props {
    sizes: SizeWithStock[];
}

export const ExpandablesSizes = ({sizes} : Props) => {

  const [enableScroll, setEnableScroll] = useState(false); 
  const [isSizesExpanded, setIsZiesExpanded] = useState(false);  

  useEffect(() => {
    setTimeout(() => {
        setEnableScroll(isSizesExpanded);
    }, 300);
  }, [isSizesExpanded]);


  const color = useMemo(() => {
    if(sizes.some(size => size.stock <= 3)) {
        return 1;
    } else if(sizes.some(size => size.stock > 3 && size.stock < 8)) {
        return 2;
    } else {
        return 3;
    }

  },[]);

  return (
    <div 
        className={clsx("flex flex-col gap-1 transition-all duration-300", {
            "h-16 sm:h-20": isSizesExpanded,
            "h-6": !isSizesExpanded,
            "overflow-auto": enableScroll,
            "overflow-hidden": !enableScroll
        })}
        onClick={() => setIsZiesExpanded(!isSizesExpanded)}
    >
        <div className={clsx("flex items-center cursor-pointer select-none", {
            "text-red-500": color === 1,
            "text-amber-500": color === 2,
            "text-emerald-500": color === 3
        })}>
            <p>Sizes</p>
            <ChevronDownIcon className={clsx("size-5 transition-transform duration-300", {
                "-rotate-180": isSizesExpanded
            })} />
        </div>
        {isSizesExpanded && (
            <ul className="flex flex-wrap gap-2">
                {sizes?.map(size => (
                    <li 
                        key={size.size.id}
                        className={clsx(" relative cursor-pointer text-sm sm:text-base h-8 sm:h-10 w-12 sm:w-14 flex justify-center items-center border-2 rounded-full tetransition-colors duration-300 last-of-type:mr-5", {
                            "bg-red-50/60 border-red-200 text-red-600": size.stock <= 3,
                            "bg-amber-50/60 border-amber-200 text-amber-700": size.stock > 3 &&  size.stock < 8,
                            "bg-emerald-50/60 border-emerald-200 text-emerald-600": size.stock >= 8
                        })}
                    >
                        <p className="absolute -top-3 -right-2 text-xs sm:text-sm">{size.stock}</p>
                        <p>{size.size.label}</p>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}
