"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store";
import { CartItem } from "./CartItem";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const SidebarCart = () => {

  const { cart, isVisible, hiddenCart, getTotalPrice } = useCartStore();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  if(!loaded) return <></>

  return (
    <>
        {isVisible && (
            <div 
                onClick={hiddenCart}
                className="bg-black fixed bg-opacity-50 inset-0 z-30 backdrop-blur-sm fade-in"
            />
        )}
        <aside className={clsx("fixed bg-white h-screen z-30 right-0  min-h-screen top-0 sidebar-width w-full max-w-[500px] overflow-y-auto flex flex-col transition-all duration-300", {
            "translate-x-0": isVisible,
            "translate-x-full": !isVisible,
        })}>
            <div className="h-full flex flex-col overflow-y-auto">
                <div className="fixed top-0 bg-white flex justify-between items-center w-full p-4 sm:p-6 border-b">
                    <p className="text-xl text-gray-900 font-medium">Cart</p>
                    <button
                        type="button"
                        className="size-10 text-gray-900"
                        aria-label="Close Cart"
                        onClick={hiddenCart}
                    ><XMarkIcon /></button>
                </div>
                {cart.length ? (
                    <>
                        <div className="p-4 sm:p-6 flex flex-col gap-8 w-full mt-20 sm:mt-28 flex-1">
                            {cart.map(item => (
                                <CartItem 
                                    key={`${item.productId}-${item.variantId}-${item.size}`}
                                    item={item}
                                    hiddenCart={hiddenCart}
                                />
                            ))}
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col gap-5 border-t">
                            <div className="flex justify-between text-xl text-gray-700 font-medium">
                                Total
                                <span>{currencyFormat(getTotalPrice())}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <Link
                                    href={"/cart"}
                                    onClick={hiddenCart}
                                    className="btn-secondary"
                                >View cart</Link>
                                <Link
                                    href={"/checkout"}
                                    onClick={hiddenCart}
                                    className="btn-primary"
                                >Checkout</Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex-1 flex justify-center items-center flex-col gap-3">
                            <p className="text-gray-500">Your cart is empty</p>
                            <Link
                                href={"/collections"}
                                onClick={hiddenCart}
                                className="text-gray-700"
                            >Start shopping</Link>
                        </div>
                    </>
                )}
            </div>
           
        </aside>
    </>
  )
}
