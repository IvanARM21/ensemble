
export const CartSkeletonActions = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-5 items-end sm:items-center mb-1">
        <div className="flex gap-1 items-center">
            <div className="size-4 sm:size-6 bg-gray-200 skeleton-animation rounded-md "></div>
            <div className="size-5 sm:size-8 rounded-md bg-gray-200 skeleton-animation"></div>
            <div className="size-4 sm:size-6 bg-gray-200 skeleton-animation rounded-md "></div>
        </div>
        <div className="size-5 sm:size-6 rounded-md bg-gray-200 skeleton-animation"></div>
    </div>
  )
}
