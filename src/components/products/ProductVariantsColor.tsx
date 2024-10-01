"use client";

import { Variant } from "@/interfaces";
import clsx from "clsx";
import { useMemo, useState } from "react";

interface Props {
    variant: Variant;
    variantUi: Variant;
    changeVariant: (variant: Variant) => void
}

export const ProductVariantsColor = ({ variantUi, variant, changeVariant }: Props) => {

    const [isHovered, setIsHovered] = useState(false);

    const isSelected = useMemo(() => variantUi.color === variant.color, [variantUi, variant]);

    return (
        <button 
            type="button"
            className="relative"
            aria-label={`Color of Product ${variant.name}`}
        >
            <div 
                className={clsx(
                    `w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer transition-all duration-300 ring-offset-2 border`, 
                    {
                        " scale-105 ring-1 ring-black": (isSelected || isHovered),
                    }
                )}
                style={{ 
                    backgroundColor: variant.color.code,
                 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => changeVariant(variant)}
            /> 
            {isHovered && (
                <p className="absolute text-nowrap bg-gray-700 px-2 py-1 -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2 rounded-full text-sm text-white capitalize">
                    {variant.color.label}
                </p>
            )}
        </button>
    );
};
