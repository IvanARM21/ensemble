
import Link from "next/link";
import Image from "next/image"
import { calculateDiscount, currencyFormat } from "@/utils";
import { ProductCart } from "@/interfaces";
import { ImageSource } from "../ui/image/ImageSource";

interface Props {
    item: ProductCart;
}

export const CartInfo = ({item} : Props) => {

  return (
    <>
        <Link
            href={item.slug}
            className="size-24 sm:size-48 overflow-hidden rounded-md"
        >
            <ImageSource 
                src={item.image}
                alt={`Imagen Producto ${item.name}`}
                width={200}
                height={200}
                className="col-span-1 object-cover w-full h-full transition-all duration-300 hover:opacity-80"
            />
        </Link>
        <div className="flex flex-col">
            <div className="flex-1">
                <Link 
                    href={item.slug}
                    className="sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                >{item.name}</Link>
                <p className="text-sm capitalize text-gray-500">{item.color} - {item.size.label}</p>
            </div>
            <p className="sm:text-xl text-gray-700">{currencyFormat(item.price-calculateDiscount(item.price, 0))} × {item.quantity}</p>
        </div>
    </>
  )
}
