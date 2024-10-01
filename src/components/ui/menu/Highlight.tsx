import { useMenuStore } from '@/store';
import Image from 'next/image'
import Link from 'next/link';

interface Props {
    image: string;
    title: string;
    url: string;
    description: string;
}

export const Highlight = ({image, title, description, url} : Props) => {

  const { closeMenuMen, closeMenuWomen } = useMenuStore();

  const handleClick = () => {
    closeMenuMen();
    closeMenuWomen();
  }
  return (
    <Link 
      href={url}
      onClick={handleClick}
      className="flex flex-col gap-3 w-full hover:opacity-80 transition-opacity h-auto cursor-pointer"
    >
        <Image 
            src={image}
            alt={title}
            width={400}
            height={400}
            sizes="(min-width: 500px) 210px (min-width: 1024px) 15vw, 50vw"
            className="w-full rounded-lg"
        />
        <div>
            <h2 className="text-zinc-800 font-medium">{title}</h2>
            <p className="text-gray-500 text-sm cursor-pointer hover:text-black transition-colors duration-300">{description}</p>
        </div>
    </Link>
  )
}
