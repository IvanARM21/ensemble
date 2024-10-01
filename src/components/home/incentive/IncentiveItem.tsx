
interface Props {
    icon: React.ReactNode
    label: string;
    description: string;
}

export const IncentiveItem = ({icon, label, description} : Props) => {
  return (
    <div className="flex gap-5 max-lg:border-b max-lg:pb-5 lg:border-r lg:pr-5 mr-5 last-of-type:border-none last-of-type:pr-0">
        <div className="size-9">
          {icon}
        </div>
        <div>
            <p className=" text-gray-500 text-sm">{description}</p>
            <h3 className="text-gray-900 mt-1 font-medium">{label}</h3>
        </div>
    </div>
  )
}
