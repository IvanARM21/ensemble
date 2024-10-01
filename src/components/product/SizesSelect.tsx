import clsx from "clsx"
import { ProductCart, Variant } from "@/interfaces"

interface Props {
    variant: Variant;
    setProductCart: React.Dispatch<React.SetStateAction<ProductCart>>;
    productCart: ProductCart
}

export const SizesSelect = ({variant, setProductCart, productCart} : Props) => {
  return (
    <div>
        <p className="mb-2 text-gray-700">Size</p>
        <div className="flex flex-wrap items-center gap-1">
        {variant.sizes?.map(size => (
                <div 
                onClick={() => setProductCart({...productCart, size: {
                    id: size.size.id,
                    label: size.size.label,
                },
                stock: size.stock    
            })}
                className={clsx("relative overflow-hidden w-16 border h-12 flex justify-center items-center rounded-full text-lg text-gray-700 cursor-pointer transition-colors duration-300", {
                    "border-gray-200 hover:border-gray-400": size.stock > 0,
                    "border-gray-50": size.stock <= 0,
                    "border-gray-700": productCart.size.id === size.size.id
                })} 
                key={`${variant.id}-${size.sizeId}`}
                >
                {size.stock <= 0 && (
                    <div
                    className={clsx("w-40 h-[2px] bg-gray-400 bg-opacity-50 -rotate-45 absolute", {
                        "bg-gray-950": productCart.size.id === size.sizeId
                    })}
                    ></div>
                )}
                {size.size.label}
                </div>
            ))}
        </div>
    </div>
  )
}