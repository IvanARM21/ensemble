

interface Props {
    label: string
    value: string;
    className?: string;
}

export const DetailItem = ({label, value, className} : Props) => {
  return (
    <div className="grid grid-cols-2 py-4 bg-slate-200 even:bg-transparent text-gray-700 px-3 sm:px-6 rounded-lg">
        <p>{label}</p>
        <p className={className}>
            {value}
        </p>
    </div>
  )
}
