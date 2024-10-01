"use client";

import { Bars } from '@/icons';
import { useUiStore } from '@/store/client/ui-store';
import { ShoppingButton } from '../header/ShoppingButton';

export const MenuButton = () => {

  const showMenu = useUiStore(state => state.showMenu);

  return (
    <div className="flex gap-4 items-center lg:hidden">
      <ShoppingButton />
      <button 
        type="button"
        aria-label="Menu Button"
        className=" h-10 w-10 text-gray-500"
        onClick={showMenu}
      >
        <Bars  />
      </button>
    </div>
  )
}
