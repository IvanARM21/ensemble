
interface Props {
    label: string;
    value: string;
    classNameDiv?: string;
    className?: string;
}

export const SummaryDisplay = ({label, value, classNameDiv = "", className = "text-gray-500 text-lg"} : Props) => {
  return (
    <div className={`flex justify-between fade-in ${classNameDiv}`}>
        <p className={className}>{label}</p>
        <p className={className}>{value}</p>
    </div>
  )
}
