"use client";

import { useMenuStore } from '@/store'

export const GenderLinks = () => {
  
  const { closeMenuMen, closeMenuWomen, showMenuMen, showMenuWomen, menuMenState, menuWomenState } = useMenuStore();

  return (
    <>
        <div
            className="link"
            onMouseEnter={showMenuWomen}
            onMouseLeave={closeMenuWomen}
            onClick={() => menuWomenState ? closeMenuWomen() : showMenuWomen()}
        >
          Women
          <div className="w-16 h-8 absolute" />
        </div>
        <div
            className="link"
            onMouseEnter={showMenuMen}
            onMouseLeave={closeMenuMen}
            onClick={() => menuMenState ? closeMenuMen() : showMenuMen()}
        >
          Men
          <div className="w-16 h-8 absolute" />
        </div>
    </>
  )
}
