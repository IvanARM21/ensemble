"use client";

import Image from 'next/image'
import Link from 'next/link';
import { Fragment, useMemo, useState } from 'react'

import { Product, Variant } from '@/interfaces'
import { calculateDiscount, currencyFormat } from '@/utils';
import { FavoriteBtn, ImageChange, ImageSource } from '@/components';
import { ProductVariantsColor } from './ProductVariantsColor';

import 'animate.css/animate.min.css';

interface Props {
    product: Product
    variant: Variant
}

export const ProductItem = ({product, variant} : Props) => {

  const [variantUi, setVariantUi] = useState(variant);
  const [image, setImage] = useState(variantUi.images[0].url);

  console.log(variantUi);

  const changeVariant = (variant : Variant) => {
    setVariantUi(variant);
    setImage(variant.images[0].url);
  }

  const price = useMemo(() => variantUi.price ?? product.price, [variantUi, product]);
//   const discount = useMemo(() => variantUi.discount ?? product.discount, [variantUi, product]);

  return (
    <article className="flex flex-col gap-3">
        <div className="relative">
            <Link
                href={`/products/${variant.slug}`}
            >
                <ImageChange 
                    src={image}
                    alt={variant.name}
                    width={800}
                    height={800}
                    quality={100}
                    className="w-full rounded-xl object-cover cursor-pointer shadow aspect-square mb-2 object-top"
                    onMouseEnter={() => setImage(variantUi.images[1].url)}
                    onMouseLeave={() => setImage(variantUi.images[0].url)}
                />
            </Link>
            
            <FavoriteBtn 
                className="text-red-600 absolute -bottom-2 -right-2 sm:-bottom-1 sm:-right-1 p-3 sm:p-5"
            />
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium hover:text-blue-600 transition-colors duration-300 cursor-pointer leading-4 text-gray-700">{product.name}</h2>
                {/* {discount > 0 ? (
                    <div className="flex flex-wrap-reverse items-center gap-x-2">
                        {/* <p className="text-lg  text-gray-500">{currencyFormat(price-calculateDiscount(price, discount))}</p> */}
                        {/* <p className="text-lg   text-gray-500 line-through decoration-2">{currencyFormat(price)}</p>
                    </div> */}
                {/* ) : ( */} 
                    <p className="text-lg text-gray-500">{currencyFormat(price)}</p>
                {/* )} */}

            <div className="flex flex-wrap items-center gap-2 ml-1">
                <ProductVariantsColor 
                    variant={variant} 
                    variantUi={variantUi} 
                    changeVariant={changeVariant}
                />
                {product.variants.map(variantProduct => (
                   <Fragment
                        key={`${variantUi.id}-${variantProduct.color.label}`} 
                   >
                        {variantProduct.id !== variant.id && (
                            <ProductVariantsColor 
                                variant={variantProduct} 
                                variantUi={variantUi} 
                                changeVariant={changeVariant}
                            />
                        )}
                   </Fragment>
                ))}
            </div>
        </div>
    </article>
  )
}
