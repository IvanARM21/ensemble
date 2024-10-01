import { CartSkeleton } from "./CartSkeleton"

export const CartSkeletonGrid = () => {
  return (
    <div className="flex flex-col lg:col-span-3">
        <CartSkeleton />
        <CartSkeleton />
    </div>
  )
}
