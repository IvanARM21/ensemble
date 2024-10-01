import { ChildrenDisplay } from "./ChildrenDisplay"
import { SummarySkeletonDisplay } from "./SummarySkeletonDisplay"

export const SummarySkeleton = () => {
  return (
    <>
        <div className="flex-1 flex flex-col gap-5 w-full">
            <div className="w-full w-44 h-8 skeleton-animation bg-gray-200 rounded-md" />

            <SummarySkeletonDisplay>
                <ChildrenDisplay className="h-7 w-32" />
                <ChildrenDisplay className="h-7 w-6" />
            </SummarySkeletonDisplay>

            <SummarySkeletonDisplay>
                <ChildrenDisplay className="h-7 w-20" />
                <ChildrenDisplay className="h-7 w-24" />
            </SummarySkeletonDisplay>

            <SummarySkeletonDisplay>
                <ChildrenDisplay className="h-7 w-24" />
                <ChildrenDisplay className="h-7 w-20" />
            </SummarySkeletonDisplay>
        </div>

        <SummarySkeletonDisplay className="flex justify-between items-center h-8 w-full border-t pt-5">
            <ChildrenDisplay className="h-7 w-14" />
            <ChildrenDisplay className="h-7 w-24" />
        </SummarySkeletonDisplay>
        
        <SummarySkeletonDisplay className="grid grid-cols-3 gap-3">
            <ChildrenDisplay className="h-11 w-full" />
            <ChildrenDisplay className="h-11 w-full" />
            <ChildrenDisplay className="h-11 w-full" />
        </SummarySkeletonDisplay>
    </>

  )
}
