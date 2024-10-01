"use client";

import { AddIcon, PencilIcon } from '@/icons';
import { ActionHover } from './ActionHover';
import { Field } from '@/store';

interface Props {
    field: Field;
    label: string
    value: string | null;
    className?: string;
    isEditable?: boolean;
}

export const AccountItem = ({field, label, value, className, isEditable = true} : Props) => {

  const iconName = value === null && isEditable ? "add" : isEditable ? "edit" : "none"

  return (
    <div className="odd:bg-gray-50 text-gray-600 items-center justify-between py-3 px-4 rounded-xl grid grid-cols-5 relative">
        <p className="col-span-2">{label}</p>
        <p className={`col-span-3 bg-transparent ${className}`}>{value}</p>

        {iconName === "add" && (
          <ActionHover 
            icon={AddIcon}
            label="add"
            field={field}
            className="text-teal-400 hover:text-teal-500"
          />
        )}
        {iconName === "edit" && (
          <ActionHover 
            icon={PencilIcon}
            label="edit"
            field={field}
            className="text-blue-500 hover:text-blue-600"
          />
        )}  
    </div>
  )
}
