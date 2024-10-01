"use client";

import Image from "next/image"
import { useCartStore } from "@/store";
import { ProductCart } from "@/interfaces"
import { MinusIcon, PlusIcon, Trash } from "@/icons"
import { calculateDiscount, currencyFormat, handleClickDecrease, handleChangeQuantity, handleClickIncrease } from "@/utils"
import Link from "next/link";
import { ImageSource } from "../image/ImageSource";

interface Props {
    item: ProductCart
    hiddenCart: () => void
}

export const CartItem = ({item, hiddenCart} : Props) => {

  const { removeProduct, changeQuantity, increaseQuantity, decreaseQuantity } = useCartStore();

  return (
    <div className="flex gap-2 border-b pb-7 last-of-type:border-none last-of-type:pb-0">
        <Link
            href={item.slug ?? "/"}
            onClick={hiddenCart}
            className="max-w-32 max-h-32 overflow-hidden rounded-md "
        >
            <ImageSource 
                src={item.image}
                alt={`Producto carrito ${item.name}`}
                width={100}
                height={100}
                className="object-cover hover:scale-125 transition-all duration-300 hover:rotate-3 h-full"
            />
        </Link>
        <div className="flex flex-col min-[480px]:flex-row gap-1 justify-between w-full">
            <div className="flex flex-col justify-between">
                <Link
                    href={item.slug ?? "/"}  
                    onClick={hiddenCart}
                    className="min-[400px]:text-xl text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >{item.name}</Link>
                <p className="text-sm min-[400px]:text-base text-gray-500"><span className="capitalize">{item.color}</span> - {item.size.label}</p>
                <p className=" text-gray-500">{currencyFormat(item.price)}</p>
            </div>
            <div className="flex flex-row-reverse min-[480px]:flex-col justify-between min-[480px]:items-end">
                <button
                    type="button"
                    className="h-7 w-7 text-gray-500 hover:text-red-600 transition-colors duration-300"
                    aria-label={`Delete Product ${item.name}`}
                    onClick={() => removeProduct(item.productId, item.variantId, item.size)}
                >
                    <Trash />
                </button>
                <div className="flex items-center gap-3 text-gray-500">
                    <button
                        type="button"
                        className="w-6 h-6 sm:h-7 sm:w-7  hover:bg-gray-50 rounded-full p-[2px] sm:p-1 transition-colors duration-300"
                        onClick={() => handleClickDecrease(item, decreaseQuantity)}
                        aria-label={`Decrease Quantity of ${item.name}`}
                    >
                        <MinusIcon />
                    </button>
                    <input 
                        className="w-5 sm:w-8 text-center text-sm sm:text-lg border border-gray-100 rounded-lg"
                        value={item.quantity}
                        name="quantity"
                        onInput={(e) => handleChangeQuantity(e, item, changeQuantity)}
                    />
                    <button
                        type="button"
                        className="w-6 h-6 sm:h-7 sm:w-7  hover:bg-gray-50 rounded-full p-[2px] sm:p-1 transition-colors duration-300"
                        onClick={() => handleClickIncrease(item, increaseQuantity)}
                        aria-label={`Increase Quantity of ${item.name}`}
                    >
                        <PlusIcon />
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
