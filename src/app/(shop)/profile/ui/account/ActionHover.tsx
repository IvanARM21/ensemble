"use client";

import { Field, useModalStore } from "@/store";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
    label: "edit" | "add" | "default";
    field: Field
    className: string;
}

export const ActionHover = ({ label, field, className} : Props) => {

  const [isHovered, setIsHovered] = useState(false);
  const showModalProfile = useModalStore(state => state.showModalProfile);

  return (
    
    <div className="absolute right-2 top-3">
        <div className="relative">
            {isHovered && (
                <div className="capitalize absolute bg-gray-700 px-2 py-1 rounded-full text-sm -top-8 left-1/2 -translate-x-1/2 text-white">
                    {label}
                </div>
            )}
            <button
                type="button"
                className={`transition-colors duration-300 ${className}`}
                aria-label={label}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => showModalProfile(label, field)}
            >
                {label === "add" && (
                    <PlusIcon />
                )}
                {label === "edit" && (
                    <PencilIcon />
                )}
            </button>
        </div>
    </div>
  )
}
