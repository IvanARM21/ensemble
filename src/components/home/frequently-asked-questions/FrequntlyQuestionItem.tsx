"use client";

import { MinusIcon, PlusIcon } from "@/icons"
import { FrequentlyQuestions } from "@/interfaces";
import { useState } from "react"

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
                ><MinusIcon /></button>
            ) : (
                <button 
                    type="button"
                    className="text-gray-700"
                    aria-label="See answer"
                ><PlusIcon /></button>
            )}
        </div>

        {isActive && (
            <p className="text-gray-500 text-lg">{item.response}</p>
        )}
    </div>
  )
}
