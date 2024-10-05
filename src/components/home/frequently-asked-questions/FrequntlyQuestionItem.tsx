"use client";

import { useState } from "react"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { FrequentlyQuestions } from "@/interfaces";

interface Props {
    item: FrequentlyQuestions;
}

export const FrequntlyQuestionItem = ({item} : Props) => {

  const [isActive, setIsActive] = useState(false);

  return (
    <div 
        className="py-8 first-of-type:border-t border-b cursor-pointer flex flex-col gap-5"
        onClick={() => setIsActive(!isActive)}
    >
        <div className="flex justify-between items-center">
            <h3 className="text-gray-700 text-xl">
                {item.question}
            </h3>
            {isActive ? (
                <button 
                    type="button"
                    className="text-gray-700"
                    aria-label="Hidden answer"
                ><MinusIcon className="size-6" /></button>
            ) : (
                <button 
                    type="button"
                    className="text-gray-700"
                    aria-label="See answer"
                ><PlusIcon className="size-6" /></button>
            )}
        </div>

        {isActive && (
            <p className="text-gray-500 text-lg">{item.response}</p>
        )}
    </div>
  )
}
