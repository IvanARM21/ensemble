"use client";

import { useState } from "react";
import { HeartIconOutline, HeartIconSolid } from "@/icons";

interface Props {
    className?: string;
}

export const FavoriteBtn = ({className} : Props) => {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
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
