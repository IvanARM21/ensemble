import { Category } from "@/interfaces"
import { useMenuStore } from "@/store";
import Link from "next/link"

interface Props {
    type: Category
}

export const CategoryItem = ({type} : Props) => {

  const { closeMenuMen, closeMenuWomen } = useMenuStore();

  const handleClick = () => {
    closeMenuMen();
    closeMenuWomen();
  }

  const url = type.gender === "unisex" || !type.gender ? `/collections/${type.slug}` : `/collections/${type.gender}/${type.slug}`;

  return (
    <Link 
        key={type.slug}
        href={url}
        onClick={handleClick}
        className="text-gray-500 text-sm cursor-pointer hover:text-black transition-colors duration-300"
    >{type.label}</Link>
  )
}
