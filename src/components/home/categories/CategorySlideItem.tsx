import Link from "next/link"
import { ImageSource } from "@/components"
import { Category } from "@/interfaces"
import { ArrowRightIcon } from '@heroicons/react/20/solid';

interface Props {
    category: Category
}

export const CategorySlideItem = ({ category } : Props) => {

  const url = category.gender === "unisex" || !category.gender ? `/collections/${category.slug}` : `/collections/${category.gender}/${category.slug}`;

  return (
    <Link 
      href={url}
      className="group relative block overflow-hidden rounded-lg w-full h-[400px] lg:h-[500px] cursor-pointer hover:opacity-80 transition-opacity shadow-md"
    >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
        <ImageSource 
          src={category.image ?? ""} 
          alt={`Image of category ${category.label}`}
          className="w-full h-full object-cover"
          sizes="(min-width: 1024px) 600px, 350px"
          quality={90}
          width={400}
          height={600}
        />
        <p className="absolute top-2 right-5 text-lg capitalize text-white px-1">{category.gender}</p>
        <div className="absolute bottom-2 left-5 text-white z-20">
          <p className="flex gap-2 items-center text-gray-100">Shop the collection <ArrowRightIcon className="size-5 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:translate-x-3" /></p>
          <h3 className="font-medium">{category.label}</h3>
        </div>
    </Link>
  )
}
