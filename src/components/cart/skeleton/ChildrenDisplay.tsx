
interface Props {
    className: string;
}

export const ChildrenDisplay = ({className} : Props) => {
  return (
    <div className={`skeleton-animation bg-gray-200 rounded-md ${className}`} />
  )
}
