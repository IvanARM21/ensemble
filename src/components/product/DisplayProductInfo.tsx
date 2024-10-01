import { Product, Variant } from "@/interfaces"
import { calculateDiscount, currencyFormat } from "@/utils"
import { FavoriteBtn } from "../ui/favorite-btn/FavoriteBtn"

interface Props {
    product: Product
    variant: Variant
}
export const DisplayProductInfo = ({product, variant} : Props) => {

  const price = variant.price ?? product.price;

  return (
    <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium mb-2 text-gray-700">{product.name}</h1>
          {/* {discount > 0 ? (
              <div className="flex gap-2 items-center">
                  <p className="text-xl text-gray-500">{currencyFormat(price-calculateDiscount(price, discount))}</p>
                  <p className=" text-gray-500 line-through decoration-2">{currencyFormat(price)}</p>
              </div>
          ) : ( */}
              <p className="text-xl text-gray-500 sm:text-2xl">{currencyFormat(price)}</p>
          {/* )} */}
        </div>
        <FavoriteBtn className="text-red-600" />
    </div>
  )
}
