"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store";
import { currencyFormat } from '@/utils';
import { SummaryDisplay } from "./SummaryDisplay";
import { SummarySkeleton } from "./skeleton/SummarySkeleton";

export const SummaryOrder = () => {

  const router = useRouter();
  const { getQuantityProducts, getSubtotalPrice, getCalculateTax, getTotalPrice } = useCartStore();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      setLoaded(true);

    if(getQuantityProducts() <= 0) {
        router.replace("/empty")
    }
  }, [loaded, getQuantityProducts(), router]);

  if(!loaded) return <SummarySkeleton />

  return (
    <>
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-2xl text-gray-800 font-medium">Summary Order</h2>
          <SummaryDisplay 
              label="Num. Products:"
              value={getQuantityProducts().toString() ?? ""}
          />
          <SummaryDisplay 
              label="Subtotal:"
              value={currencyFormat(getSubtotalPrice()) ?? ""}
          />
          <SummaryDisplay 
              label="Taxes(15%):"
              value={currencyFormat(getCalculateTax()) ?? ""}
          />
        </div>
        <SummaryDisplay 
            label="Total:"
            value={currencyFormat(getTotalPrice()) ?? ""}
            className="text-xl text-gray-700 font-medium"
            classNameDiv="border-t pt-5"
        />
        <button 
          type="button"
          className="btn-primary w-full"
        >Checkout</button>
    </>
  )
}
