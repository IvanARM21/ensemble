"use client";

import Image from "next/image"

interface Props {
  width: number;
  height: number;
  quality?: number;
  sizes?: string;
  alt: string;
  src: string | null;
  className?: string;
}

export const ImageSource = ({width, height, quality = 70, sizes, alt, src, className = ""} : Props) => {

  if(!src) return <></>

  const dynamicUrl = src.includes("res.cloudinary.com") 
  ? src.startsWith("http://") 
    ? src.replace("http://", "https://") 
    : src
  : src.startsWith("data:image/") 
    ? src 
    : `/${src}`;

  return (
    <Image 
      src={dynamicUrl ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      quality={quality}
      alt={alt}
      className={className}
    />
  )
}
