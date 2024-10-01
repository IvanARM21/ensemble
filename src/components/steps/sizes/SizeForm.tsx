"use client";

import { useSizeStore } from "@/store";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent, Alert, ImageSource } from "@/components";
import { SizeType } from "@/interfaces";
import { StepHeader } from "../StepHeader";
import { types } from "@/constants";

const data = ["Clothing", "Pants", "Shoes"]


export const SizeForm = () => {

  const { setLabel, setType, size, alert } = useSizeStore();

  return (
    <>
        <StepHeader title="Form size" description="You can create a size by filling in the following fields."/>

        <form className="flex flex-col gap-5" >
            {alert.message && (
                <Alert {...alert} />
            )}
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-gray-800 font-medium leading-6">Label</label>

                <input 
                    type="text" 
                    id="name"
                    placeholder="Label size. Example: XL"
                    className="rounded-xl py-3 px-4 bg-gray-50 placeholder:text-gray-400 text-sm text-gray-900"
                    value={size.label}
                    onChange={event => setLabel(event.currentTarget.value)}
                />
            </div>
            <div className="flex flex-col gap-2">

                <label htmlFor="size" className="text-gray-800 font-medium leading-6">Size type</label>
                <Select onValueChange={(value) => setType(value as SizeType)} value={size.type}>
                    <SelectTrigger  id="category-gender" className=" bg-gray-50 py-2 px-2 rounded-xl border-none capitalize ">
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                        {types.map(type => (
                            <SelectItem key={type.value} value={type.value} className="capitalize">
                                    <div className="flex gap-2 items-center">
                                        <ImageSource 
                                            alt={`Image of gender :  ${type.label}`}
                                            src={type.image ?? ""}
                                            height={100}
                                            width={100}
                                            quality={80}
                                            className="rounded-lg size-10 sm:size-12 object-cover"
                                        />
                                        
                                        <p className="text-sm text-gray-900">
                                            {type.label}
                                        </p>
                                    </div>
                                </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
        </form>
    </>
  )
}
