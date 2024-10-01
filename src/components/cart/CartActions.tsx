import { useCartStore } from "@/store";
import {  handleChangeQuantity, handleClickDecrease, handleClickIncrease } from '@/utils'
import { MinusIcon, PlusIcon, Trash } from '@/icons'
import { ProductCart } from "@/interfaces";

interface Props {
    item: ProductCart
}

export const CartActions = ({item} : Props) => {

  const { decreaseQuantity, changeQuantity, increaseQuantity, removeProduct } = useCartStore();

  return (
    <>
        <div className="flex gap-1 text-gray-500 items-center">
            <button
                type="button"
                className="size-4 sm:size-7 flex justify-center items-center hover:bg-gray-50 rounded-full p-[2px] sm:p-1 transition-colors duration-300"
                onClick={() => handleClickDecrease(item, decreaseQuantity)}
            >
                <MinusIcon />
            </button>
            <input 
                type="text" 
                id="quantity"
                className="w-5 sm:w-8 text-center text-sm sm:text-lg border rounded-lg"
                value={item.quantity}
                onInput={e => handleChangeQuantity(e, item, changeQuantity)}
            />
            <button
                type="button"
                className="size-4 sm:size-7 flex justify-center items-center hover:bg-gray-50 rounded-full p-[2px] sm:p-1 transition-colors duration-300"
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
    </>
  )
}
