import Image from 'next/image'
import { currencyFormat, handleChangeQuantity, handleClickDecrease, handleClickIncrease } from '@/utils'
import { MinusIcon, PlusIcon, Trash } from '@/icons'
import { ProductCart } from '@/interfaces'
import { useCartStore } from '@/store';

interface Props {
    item: ProductCart;
}

export const CartItemPage = ({item} : Props) => {

  const { decreaseQuantity, changeQuantity, increaseQuantity, removeProduct } = useCartStore();

  return (
    <div className="flex gap-2 justify-between border-b pb-5 last-of-type:border-none">
        <div className="flex gap-2">
            <Image 
                src={`/${item.image}.webp`}
                alt={`Imagen Producto ${item.name}`}
                width={150}
                height={150}
                className="col-span-1 rounded-md object-cover w-20 h-20 sm:w-36 sm:h-36"
            />
            <div className="flex flex-col">
            <div className="flex-1">
                <p className="sm:text-xl font-semibold text-zinc-800 hover:text-blue-600 transition-colors duration-300 cursor-pointer">{item.name}</p>
                <p className="text-sm sm:text-base capitalize text-gray-500">{item.color} - {item.size.label}</p>
            </div>
                <p className="text-sm sm:text-xl text-zinc-800 font-bold">{currencyFormat(item.price)} × {item.quantity}</p>
            </div>
        </div>
            <div className="flex flex-col justify-between items-end">
                <div className="flex flex-col-reverse sm:flex-row gap-5 items-end sm:items-start">
                    <div className="flex gap-1 text-gray-500 items-center">
                        <button
                            type="button"
                            className="size-4 sm:size-7 flex justify-center items-center hover:bg-gray-200 rounded-full p-[2px] sm:p-1 transition-colors duration-300"
                            onClick={() => handleClickDecrease(item, decreaseQuantity)}
                        >
                            <MinusIcon />
                        </button>
                        <input 
                            type="text" 
                            className="w-5 sm:w-8 text-center text-sm sm:text-lg border rounded-lg"
                            value={item.quantity}
                            onInput={e => handleChangeQuantity(e, item, changeQuantity)}
                        />
                        <button
                            type="button"
                            className="size-4 sm:size-7 flex justify-center items-center hover:bg-gray-200 rounded-full p-[2px] sm:p-1 transition-colors duration-300"
                            onClick={() => handleClickIncrease(item, increaseQuantity)}
                        >
                            <PlusIcon />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="size-4 sm:size-7 text-gray-500 hover:text-red-600 transition-colors duration-300"
                        onClick={() => removeProduct(item.productId, item.variantId, item.size)}
                    >
                        <Trash />
                    </button>
                </div>
                <p className="text-lg sm:text-2xl text-zinc-800 font-black"><span>{currencyFormat(item.price*item.quantity) }</span></p>
            </div>
    </div>
  )
}
