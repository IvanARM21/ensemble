"use client";

import { ShoppingBag } from "@/icons"
import { useCartStore } from '@/store';
import { useEffect, useState } from "react";

export const ShoppingButton = () => {

  const [loaded, setLoaded] = useState(false);

  const quantityProducts = useCartStore(state => state.getQuantityProducts());
  const showCart = useCartStore(state => state.showCart);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  if(!loaded) return <></>


  return (
    <button
        type="button"
        aria-label="Cart Shop"
        className=" text-gray-500 flex gap-1"
        onClick={showCart}
    >   
        <div className="size-7">
            <ShoppingBag />
        </div>
        <p className="text-sm">{quantityProducts}</p>
    </button>
  )
}
