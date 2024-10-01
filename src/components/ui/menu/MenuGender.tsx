import { ChevronLeft } from "@/icons";
import { Brand, Category, Gender } from "@/interfaces";
import { Categories } from "./Categories";
import { Highlight } from "./Highlight";

interface Props {
    clothings: Category[];
    accesories: Category[];
    shoes: Category[];

    closeMenu: () => void;
    gender: Gender;
     
    imageNewArrivals?: string;
    imageDiscounts?: string;
}

export const MenuGender = ({clothings, accesories, shoes, closeMenu, gender, imageNewArrivals, imageDiscounts} : Props) => {
  return (
    <div className="h-[80vh] lg:h-auto overflow-auto max-w-screen-2xl mx-auto bg-white">
        <h2 className="text-xl mt-5 lg:mt-10 text-gray-700 font-medium px-2 capitalize">{gender}</h2>
        <button 
            type="button"
            onClick={closeMenu}
            className="lg:hidden flex gap-1 items-center mt-3 w-full py-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl text-gray-500 px-2 hover:text-black"
        >   
            <ChevronLeft />
            Back 
        </button>
        <div className="grid min-[480px]:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-10 lg:gap-8 max-w-screen-2xl lg:mx-auto w-full py-4 lg:py-10 px-2">
            {clothings?.length > 0 ? (
                <Categories 
                    title="Clothing"
                    types={clothings}
                />
            ) : ( <></> )}

            {accesories?.length > 0 ? (
                <Categories 
                    title="Accesories"
                    types={accesories}
                />
            ) : ( <></> )}

            {shoes?.length > 0 ? (
                <Categories 
                    title="Shoes"
                    types={shoes}
                />
            ) : ( <></> )}

            <div className="flex flex-row-reverse lg:flex-row row-start-1 lg:row-start-auto col-span-2 gap-4 lg:gap-8">
                <Highlight 
                    image={imageNewArrivals ?? ""}
                    url={`/collections/${gender}/new-arrivals`}
                    title="New Arrivals"
                    description="Show now"
                />
                <Highlight 
                    image={imageDiscounts ?? ""}
                    url={`/collections/${gender}/exclusive-discounts`}
                    title="Exclusive Discounts"
                    description="Show now"
                />
            </div>
        </div>
    </div>
  )
}
