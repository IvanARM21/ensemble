import { GenderItem } from './GenderItem'

export const GendersGrid = () => {
  return (
    <>
        <div className="grid sm:grid-cols-3 gap-2 mt-10">
          <GenderItem 
            url="/collections/women"
            image="/women-collection.jpg"
            label="Women's"
          />
          <GenderItem 
            url="/collections/men"
            image="/men-collection.jpg"
            label="Men's"
          />
          <GenderItem 
            url="/collections/accessories"
            image="/accessories-collection.jpg"
            label="Accessories"
          />
        </div>
    </>
  )
}
