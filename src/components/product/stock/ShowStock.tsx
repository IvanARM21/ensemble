import React, { useMemo } from "react";
import { ProductCart } from "@/interfaces";
import { ShowStockItem } from "./ShowStockItem";
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";


interface Props {
    productCart: ProductCart;
    sizesQuantity: number
}

export const ShowStock = ({productCart, sizesQuantity} : Props) => {

  const hasSelectedSize = useMemo(() =>  productCart.size.id !== "", [productCart.size]);

  return (
    <>
        <div>
          <p className="mb-2 text-gray-700">Stock</p>
          <ShowStockItem 
            condition={!hasSelectedSize}
            icon={<InformationCircleIcon />}
            text={"You must select a size"}
            color="text-blue-600"
          />
          
          <ShowStockItem 
            condition={hasSelectedSize && sizesQuantity === 0}
            icon={<ExclamationCircleIcon />}
            text={"Out of stock"}
            color="text-red-600"
          />
          <ShowStockItem 
            condition={hasSelectedSize && sizesQuantity > 0 && sizesQuantity <= 8}
            icon={<ExclamationTriangleIcon />}
            text={`Only ${sizesQuantity} units left`}
            color="text-amber-500"
          />
          <ShowStockItem 
            condition={hasSelectedSize && sizesQuantity > 8}
            icon={<CheckCircleIcon/>}
            text={"In stock"}
            color="text-emerald-600"
          />
        </div>
    </>
  )
}

