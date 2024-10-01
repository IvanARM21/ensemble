import Image from 'next/image'
import Link from 'next/link'
import { GenderItem } from './GenderItem'

export const GendersGrid = () => {
  return (
    <>
        <div className="grid sm:grid-cols-3 gap-2 mt-10">
          <GenderItem 
            url="/collections/women"
            image="/women-beautiful.jpg"
            label="Women's"
          />
          <GenderItem 
            url="/collections/men"
            image="/men-beautiful.jpg"
            label="Men's"
          />
          <GenderItem 
            url="/collections/accessories"
            image="/accesories-section.jpg"
            label="Accessories"
          />
        </div>
    </>
  )
}
