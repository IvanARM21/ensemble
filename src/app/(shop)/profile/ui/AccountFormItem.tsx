"use client";

import { User } from "@/interfaces";

interface Props {
    value: string;
    label: string;
    callback: () => void;
    id: string;
    type?: string;
    isEditable?: boolean;
    user: Omit<User, "password">
}

export const AccountFormItem = ({value, label, id, type = "text" } : Props) => {


  return (
    <form className="odd:bg-slate-200 items-center justify-between px-4 rounded-xl grid grid-cols-2">
        <label htmlFor={id}>{label}</label>
        <input 
            id={id}
            type={type}
            className="bg-transparent py-3 px-4"
            value={value}
        />
    </form>
  )
}
