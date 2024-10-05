"use client";

import { useUiStore } from '@/store';
import { Bars3BottomRightIcon } from '@heroicons/react/24/outline';
import { ShoppingButton } from '../header/ShoppingButton';

export const MenuButton = () => {

  const showMenu = useUiStore(state => state.showMenu);

  return (
    <div className="flex gap-4 items-center lg:hidden">
      <ShoppingButton />
      <button 
        type="button"
        aria-label="Menu Button"
        onClick={showMenu}
      >
        <Bars3BottomRightIcon className="size-8 text-gray-700" />
      </button>
    </div>
  )
}
