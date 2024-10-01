import Link from "next/link";

interface Props {
    title: string;
    url: string;
    btnName?: string
    type?: "primary" | "secondary" | "third";
}

export const DashboardPageHeader = ({title, url, btnName = "Back", type = "third"} : Props) => {
  return (
    <div className="flex justify-between items-center pt-6">
        <h1 className="text-2xl font-medium text-gray-800">
            {title} 
        </h1>
        {type === "primary" && (
          <Link
              href={url}
              className="btn-primary shadow-sm shadow-blue-600"
          >{btnName}</Link>
        )}
        {type === "secondary" && (
          <Link
            href={url}
            className="border py-2 px-4 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors duration-300"
          >{btnName}</Link>
        )}
        {type === "third" && (
          <Link
            href={url}
            scroll={false}
            className=" text-gray-600 py-2 px-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
          >{btnName}</Link>
        )}
    </div>
  )
}
