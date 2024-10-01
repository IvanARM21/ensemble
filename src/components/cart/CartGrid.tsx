"use client";


import { useCartStore } from "@/store";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";
import { CartSkeletonGrid } from "./skeleton/CartSkeletonGrid";

export const CartGrid = () => {
  
  const cart = useCartStore(state => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []); 

  if(!loaded) return <CartSkeletonGrid/>


  return (
    <div className="flex flex-col lg:col-span-3">
        {cart.map(item => (
          <CartItem 
              key={`${item.productId}-${item.variantId}-${item.size}`}
              item={item}
          />
        ))}
    </div>
  )
}
