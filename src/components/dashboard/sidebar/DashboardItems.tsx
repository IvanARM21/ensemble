
import { DashboardItem } from "./DashboardItem"
import { NavDashbaordLinks } from "@/constants/NavDashboard"

export const DashboardItems = () => {
  return (
    <div className="flex flex-col gap-2 border-t pt-5 px-2">
        {NavDashbaordLinks.map(item => (
            <DashboardItem key={item.link} {...item} />
        ))}
    </div>
  )
}
