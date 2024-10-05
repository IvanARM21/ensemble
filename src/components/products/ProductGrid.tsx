"use client"
import React from "react";
import { Fragment } from "react";
import Link from "next/link";
import { ProductItem } from "./ProductItem";
import { Product } from "@/interfaces";

interface Props {
    isIndex?: boolean
    products?: Product[]
}

export const ProductGrid = ({isIndex = false, products = []} : Props) => {

    return (
    <>
        {products.length ? (
            <div
                className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 md:gap-10`}
            >
                {products.map(product => (
                    <Fragment key={product.id}>
                        {product.variants.map(variant => (
                            <ProductItem 
                                key={variant.id}
                                product={product}
                                variant={variant}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        ) : (
            <p className="text-xl text-gray-500">
                We haven&apos;t products at the moment

            </p>
        )}
        
        {isIndex && (
            <Link
                href={"/shop"}
                className="btn-primary block text-center sm:w-fit mt-8 mx-auto"
            >View More</Link>
        )}
    </>
  )
}
