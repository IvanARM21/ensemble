
interface Props {
    icon: React.ElementType;
    quantity: string;
    title: string;
    discount: number;
    textColor: string;
    bgColor: string;
}


export const OverviewCard = ({icon : Icon, title, quantity, textColor, bgColor, discount} : Props) => {
  return (
    <div className="rounded-xl shadow p-5 flex justify-between items-center">
        <div className="space-y-2">
          <div className="mb-3 space-y-1">
            <h3 className="font-bold text-xl text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">Apr 04 - May 04, 2024</p>
          </div>
          <p className="font-bold text-2xl text-gray-700">{quantity}</p>
          <p className={`${discount < 0 ? "text-red-600" : "text-teal-500"} text-sm font-medium`}>{discount > 0 && "+"}{discount}% from yesterday</p>
        </div>
        <div className={`size-14 ${bgColor} ${textColor} p-2 rounded-2xl`}>
          <Icon className={`  ${textColor}`}/>
        </div>
    </div>
  )
}
