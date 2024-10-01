import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid';

interface Props {
    url: string;
    image: string;
    label: string;
}

export const GenderItem = ({url, image, label} : Props) => {
  return (
    <Link 
        href={url}
        className="relative shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:opacity-80 group"
        scroll={true}
    >
        <Image 
            src={image}
            alt="" 
            width={400} 
            height={600}
            className="object-cover h-[370px] md:h-[400px] w-full z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
        <div className="absolute bottom-2 left-5 text-white z-10">
            <p className="flex gap-1 items-center">Shop the collection <ArrowRightIcon className="size-5 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-3" /></p>
            <h3 className="font-semibold text-lg">{label}</h3>
        </div>
    </Link>
  )
}
