
interface Props {
    className?: string
    children: React.ReactNode
}

export const SummarySkeletonDisplay = ({className = "flex justify-between items-center h-7 w-full", children} : Props) => {
  return (
    <div className={className}>
        {children}
    </div>
  )
}
