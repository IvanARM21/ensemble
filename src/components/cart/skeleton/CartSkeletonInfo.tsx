
export const CartSkeletonInfo = () => {
  return (
    <div className="flex gap-4">
        {/* Imagen */}
        <div className="col-span-1 size-24 sm:size-48 skeleton-animation rounded-md bg-gray-200 "></div>
        {/* Data */}
        <div className="flex justify-between flex-col gap-2">
            <div>

                <div className="hidden min-[360px]:block h-6 sm:h-5 min-[600px]:w-52 skeleton-animation bg-gray-200 mb-1 rounded-md"></div>

                <div className="block min-[360px]:hidden h-5 w-20 skeleton-animation bg-gray-200 mb-1 rounded-md"></div>
                <div className="block min-[360px]:hidden h-5 w-16 skeleton-animation bg-gray-200 mb-1 rounded-md"></div>

                <div className="h-5 w-20 skeleton-animation bg-gray-200 rounded-md"></div>
            </div>
            <div className="h-5 w-20 sm:h-7 sm:w-24 skeleton-animation bg-gray-200 rounded-md"></div>
        </div>
    </div>
  )
}
