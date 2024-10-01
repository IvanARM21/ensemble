"use client";

import { MinusIcon, PlusIcon } from "@/icons";
import { ProductCart } from "@/interfaces";

interface Props {
    productCart: ProductCart;
    setProductCart: React.Dispatch<React.SetStateAction<ProductCart>>;
    sizesQuantity: number;
}

export const QuantityInput = ({productCart, setProductCart, sizesQuantity} : Props) => {
  return (
    <div>
        <label className="text-gray-700 mb-2 block" htmlFor="quantity">Quantity</label>
        <div className="flex gap-3 items-center text-zinc-800">
            <button
                type="button"
                className="size-7 p-1 rounded-full hover:bg-gray-50 transition-colors duration-300"
                aria-label="Decrease Quantity"
                onClick={() => {
                    if(productCart.quantity <= 1) return
                    setProductCart({...productCart, quantity: --productCart.quantity})
                }}
            ><MinusIcon/></button>
            <input 
                type="text"
                className="w-8 text-center text-lg border rounded-lg"
                value={productCart.quantity}
                id="quantity"
                onInput={(e) => {
                    let value = +e.currentTarget.value;
                    if(value > 15 || value >= sizesQuantity) return;
                    setProductCart({...productCart, quantity: value});
                }}
            />
            <button
                type="button"
                className="size-7 p-1 rounded-full hover:bg-gray-50 transition-colors duration-300"
                aria-label="Increase Quantity"
                onClick={() => {
                    if(productCart.quantity > 15 || productCart.quantity >= sizesQuantity) return
                    setProductCart({...productCart, quantity: ++productCart.quantity})
                }}
            ><PlusIcon/></button>
        </div>
    </div>
  )
}
