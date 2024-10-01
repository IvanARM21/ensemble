"use client";
import { Fragment } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Product, Variant } from '@/interfaces';
import { ProductVariantsColor } from '../products/ProductVariantsColor';

interface Props {
    product: Product;
    firstVariant: Variant | null;
    variant: Variant;
}

export const ColorSelect = ({product, firstVariant, variant} : Props) => {

  const router = useRouter();
  const pathname = usePathname();

  const changeVariant = (variant : Variant) => {
    router.replace(`${variant.slug}`, {
      scroll: false,
    });
  }

  return (
    <div>
        <p className="mb-2 text-gray-700">Color</p>
        <div className="flex flex-wrap items-center gap-2">
                {firstVariant && (
                  <>
                      <ProductVariantsColor 
                        variant={firstVariant} 
                        variantUi={variant} 
                        changeVariant={changeVariant}
                      />
                      {product.variants.map(variantProduct => (
                        <Fragment
                            key={`${variant.id}-${variantProduct.color.id}`} 
                        >
                            {variantProduct.id !== firstVariant.id && (
                                <ProductVariantsColor 
                                    variant={variantProduct} 
                                    variantUi={variant} 
                                    changeVariant={changeVariant}
                                />
                            )}
                        </Fragment>
                    ))}
                  </>
                )}
        </div>
    </div>
  )
}
