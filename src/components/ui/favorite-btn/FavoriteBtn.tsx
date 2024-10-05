"use client";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
    className?: string;
}

export const FavoriteBtn = ({className} : Props) => {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  return (
    <button
        type="button"
        className={className}
        onMouseEnter={() => setIsHeartHovered(true)}
        onMouseLeave={() => setIsHeartHovered(false)}
    >
        {isHeartHovered ? (
            <HeartIconSolid />
        ) : (
            <HeartIconOutline />
        )}
    </button>
  )
}
