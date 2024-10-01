"use client";

import { useState } from "react"
import Link from "next/link"
import clsx from "clsx";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"
import { useModalDeleteStore } from "@/store";
import { deleteVariant } from "@/actions/variants/delete-variant-action";

interface Props {
    id: string
}

export const OptionsVariant = ({id} : Props) => {

  const [show, setShow] = useState(false);  
  const { showModal } = useModalDeleteStore();

  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <button type="button">
            <EllipsisVerticalIcon className="size-8 p-1" />
        </button>
        <div className={clsx("top-8 left-1/2 -translate-x-1/2 absolute bg-white shadow flex flex-col w-24 justify-center px-6 py-3 rounded-xl z-10 transition-all duration-300", {
            "opacity-0 invisible scale-75": !show,
            "opacity-100 visible scale-100": show
        })}>
            <Link
                href={""}
                className="py-1.5 text-gray-500 text-sm hover:text-blue-600 transition-colors duration-300"
            >Show</Link>
            <Link
                href={""}
                className="py-1.5 text-gray-500 text-sm hover:text-orange-500 transition-colors duration-300"
            >Edit</Link>
            <button
                type="button"
                onClick={() => showModal(id, "Delete variant", "Are you sure want to delete this variant? This action isn't reversible", deleteVariant)}
                className="py-1.5 text-gray-500 text-sm hover:text-red-600 transition-colors duration-300 text-left"
            >Delete</button>
        </div>
    </div>
    )
}
