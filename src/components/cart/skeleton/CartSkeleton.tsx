import { CartSkeletonActions } from "./CartSkeletonActions"
import { CartSkeletonInfo } from "./CartSkeletonInfo"

export const CartSkeleton = () => {
  return (
      <div className="col-span-3 flex gap-2 justify-between border-b py-10 first-of-type:border-t">
          {/* Info */}
          <CartSkeletonInfo />
          <div className="flex flex-col justify-between items-end">
              {/* Actions */}
              <CartSkeletonActions />
              {/* Total Price */}
              <div className="w-20 sm:w-24 h-5 sm:h-6 skeleton-animation bg-gray-200 rounded-md"></div>
          </div>
      </div>
  )
}
