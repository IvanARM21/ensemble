"use client";
import {  useEffect, useMemo, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { products } from "@/seed";
import { ProductCart, Variant } from "@/interfaces";
import { ColorSelect, ProductImages,  DisplayProductInfo, QuantityInput, ShowStock, SizesSelect, AddCartButton, DescriptionProduct } from "@/components";

interface Props {
  params: { slug: string }
}
const initialValues : ProductCart = { productId: "", variantId: "", size: "", quantity: 1, image: "", name: "", price: 0, discount: 0, color: "", stock: 0, slug: "" };

export default function ProductBySlugPage({params} : Props) {
  
  // Search Product
  const searchParams = useSearchParams();
  const product = products.find(product => product.slug === params.slug);
  if(!product) notFound();

  // Search for variant
  const variant = searchParams.has("color") ? product.variants.find(variant => variant.label === searchParams.get("color")) : product.variants[0];
  if(variant === undefined) notFound();
  
  // Variant selected
  const [firstVariant, setFirstVariant] = useState<Variant|null>(null);
  const [productCart, setProductCart] = useState(initialValues);

  // Detect the stock of each size
  const sizesQuantity = useMemo(() => variant.sizes.find(sizesVariant => sizesVariant.size === productCart.size)?.stock ?? 0, [variant, productCart.size]);

  useMemo(() => {
      productCart.quantity > sizesQuantity 
      ? setProductCart({...productCart, quantity: sizesQuantity}) 
      : productCart.quantity <= sizesQuantity && sizesQuantity > 0
      ? setProductCart({...productCart, quantity: 1})
      : setProductCart({...productCart, quantity: 0})
  }, [sizesQuantity]);

  useEffect(() => {
    setFirstVariant(variant);
  }, []);

  return (
    <div className="grid lg:grid-cols-3 mt-6 lg:gap-10">
      <ProductImages 
        variantUi={variant}
        product={product}
      />
      <div className="px-2 py-4 lg:px-4 lg:py-8 flex flex-col gap-8 lg:sticky lg:top-16 lg:h-[800px]">

        {/* Displays of product */}
        <DisplayProductInfo 
          product={product}
          variant={variant}
        />
        
        {/* Allows users to select colors */}
        <ColorSelect 
          product={product}
          firstVariant={firstVariant}
          variant={variant}
        />
        
        {/* Allows users to select sizes */}
        <SizesSelect 
          variant={variant}
          setProductCart={setProductCart}
          productCart={productCart}
        />
        
        {/* Text updating the UI to let you know stock of the product */}
        <ShowStock 
          productCart={productCart}
          sizesQuantity={sizesQuantity}
        />
        
        {/* Input that modify Quantity  */}
        <QuantityInput 
          productCart={productCart}
          setProductCart={setProductCart}
          sizesQuantity={sizesQuantity}
        />

        {/* Button for Add to Cart */}
        <AddCartButton 
          setProductCart={setProductCart}
          productCart={productCart}
          variant={variant}
          product={product}
          sizesQuantity={sizesQuantity}
        />
        
        <DescriptionProduct 
          description={product.description}
        />
      </div>
    </div>
  );
}