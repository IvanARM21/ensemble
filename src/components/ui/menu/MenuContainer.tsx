"use client";

import { useMenuStore } from "@/store"
import { formattCategories } from '@/utils';
import { Brand, Category } from "@/interfaces";
import { MenuCategories } from "./MenuCategories"
import { MenuGender } from "./MenuGender";

interface Props {
  categories: Category[];
}

export const MenuContainer = ({categories} : Props) => {

  const { closeMenuMen, menuMenState, showMenuMen, closeMenuWomen, menuWomenState, showMenuWomen } = useMenuStore();

  const { clothing, accesories, shoes } = formattCategories(categories);

  return (

    <>
        <MenuCategories isActive={menuWomenState} showMenu={showMenuWomen} closeMenu={closeMenuWomen}>
          <MenuGender 
              clothings={clothing.women}
              accesories={accesories.women}
              shoes={shoes.women}
              closeMenu={closeMenuWomen}
              gender="women"
              imageNewArrivals="/new-arrivals-women.jpg"
              imageDiscounts="/discounts-women.jpg"
            />
        </MenuCategories>
        <MenuCategories isActive={menuMenState} showMenu={showMenuMen} closeMenu={closeMenuMen}>
            <MenuGender 
              clothings={clothing.men}
              accesories={accesories.men}
              shoes={shoes.men}
              closeMenu={closeMenuMen}
              gender="men"
              imageNewArrivals="/new-arrivals-men.jpg"
              imageDiscounts="/discounts-men.jpg"
            />
        </MenuCategories>
    </>
  )
}
