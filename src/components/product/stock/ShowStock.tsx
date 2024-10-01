import { CheckCircle, ExclamationTriangle, ExclamationCircle, InformationCircle } from "@/icons";
import { ProductCart } from "@/interfaces";
import { useMemo } from "react";
import { ShowStockItem } from "./ShowStockItem";


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
            icon={<InformationCircle />}
            text={"You must select a size"}
            color="text-blue-600"
          />
          
          <ShowStockItem 
            condition={hasSelectedSize && sizesQuantity === 0}
            icon={<ExclamationCircle />}
            text={"Out of stock"}
            color="text-red-600"
          />
          <ShowStockItem 
            condition={hasSelectedSize && sizesQuantity > 0 && sizesQuantity <= 8}
            icon={<ExclamationTriangle />}
            text={`Only ${sizesQuantity} units left`}
            color="text-amber-500"
          />
          <ShowStockItem 
            condition={hasSelectedSize && sizesQuantity > 8}
            icon={<CheckCircle/>}
            text={"In stock"}
            color="text-emerald-600"
          />
        </div>
    </>
  )
}

