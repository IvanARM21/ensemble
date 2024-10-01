import Image from "next/image"

export const DashboardHeader = () => {
  return (
    <div className="grid grid-cols-3 gap-4 fixed z-20 xl:ml-72 w-full xl:w-[calc(100%-288px)] py-5 px-4 sm:px-12 2xl:px-20 bg-white border-b">
        <div className="col-span-2">
            <input 
                type="text"
                placeholder="Search here..." 
                className="bg-gray-50 py-3 px-4 w-full rounded-xl"
            />
        </div>
        <div className="flex justify-end items-center gap-2">
            <p className="text-gray-600 font-medium">Iván Rodríguez</p>
            <Image 
              src={"https://avatars.githubusercontent.com/u/146393672?s=400&u=8b6406cb22562e0da86a4d2d5740242cc989e1c8&v=4"}
              alt=""
              width={120}
              height={120}
              className="size-11 rounded-full object-cover"
            />
        </div>
    </div>
  )
}
