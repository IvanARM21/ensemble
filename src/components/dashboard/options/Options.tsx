"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useModalDeleteStore } from "@/store";

interface Props {
  uriShow: string;
  uriEdit: string;
  id: string;
  callback: (id: string) => Promise<{
    error: boolean;
    message: string;
  }>
  title: string;
  message: string;
}

export const Options = ({uriShow, uriEdit, id, callback, title, message} : Props) => {

  const [show, setShow] = useState(false);
  const menuRef = useRef<HTMLTableCellElement>(null);

  const { showModal } = useModalDeleteStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div 
      className="relative"
      onClick={() => setShow(!show)}
      ref={menuRef} 
    >
      <button type="button">
        <EllipsisVerticalIcon className={clsx("h-8 w-8 p-1 rounded-full hover:bg-gray-200 transition-colors duration-300", {
          "bg-gray-200": show
        })} />
      </button>
      <div 
        className={clsx("bg-white shadow w-24 group-first:-bottom-6 lg:group-first:-bottom-16 flex flex-col justify-center z-10 absolute py-3 px-6 rounded-xl opacity-0 transition-all duration-300", {
          "opacity-100 scale-100 visible": show,
          "invisible scale-90": !show,
          "lg:-bottom-5 bottom-0 lg:left-8 -left-24": true,
        })}
      >
        <Link
          href={uriShow}
          className="text-gray-500 text-sm hover:text-blue-600 transition-colors py-1.5 duration-300"
        >
          Show
        </Link>
        <Link
          href={uriEdit}
          className="text-gray-500 text-sm hover:text-orange-500 transition-colors py-1.5 duration-300"
        >
          Edit
        </Link>
        <button
          onClick={() => showModal(id, title, message, callback)}
          className="text-gray-500 text-sm hover:text-red-600 transition-colors py-1.5 duration-300 text-left"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
