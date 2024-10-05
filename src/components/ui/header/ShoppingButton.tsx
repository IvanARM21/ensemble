"use client";

import { useCartStore } from '@/store';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from "react";

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
        className="flex text-gray-500"
        onClick={showCart}
    >   
        <ShoppingBagIcon className="size-7 " />
        <p className="text-sm">{quantityProducts}</p>
    </button>
  )
}
