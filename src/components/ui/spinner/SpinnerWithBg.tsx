import { Spinner } from "./Spinner"

interface Props {
  className?: string;
}

export const SpinnerWithBg = ({className = ""} : Props) => {
  return (
    <div className={`fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center ${className}`}>
      <Spinner />
    </div>
  )
}
