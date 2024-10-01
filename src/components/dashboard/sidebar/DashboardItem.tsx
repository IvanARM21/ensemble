import Link from "next/link"

interface Props {
    label: string;
    link: string;
    icon: React.ElementType;
}

export const DashboardItem = ({icon: Icon, label, link} : Props) => {

  return (
    <Link
        href={link}
        className="flex gap-2 items-center font-medium text-gray-500 hover:text-gray-900 py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
    >
        <Icon className="h-6 w-6"/>
        {label}
    </Link>
  )
}
