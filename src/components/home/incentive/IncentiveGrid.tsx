import { IncentiveItem } from "./IncentiveItem"
import { ArrowsUpDownIcon, CalendarIcon, TruckIcon } from "@heroicons/react/24/outline"


const incentives = [
    {
        icon: <TruckIcon className="size-11 text-white rounded-full bg-blue-600 p-2" />,
        label: "Free shipping",
        description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us."
    },
    {
        icon: <CalendarIcon className="size-11 text-white rounded-full bg-blue-600 p-2" />,
        label: "10-year warranty",
        description: "If it breaks in the first 10 years we'll replace it. After that you're on your own though."
    },
    {
        icon: <ArrowsUpDownIcon className="size-11 text-white rounded-full bg-blue-600 p-2" />,
        label: "Exchanges",
        description: "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though."
    }
]

export const IncentiveGrid = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-5 lg:gap-0 mt-10">
        {incentives.map(incentive => (
            <IncentiveItem 
                key={incentive.label}
                {...incentive}
            />
        ))}
    </div>
  )
}
