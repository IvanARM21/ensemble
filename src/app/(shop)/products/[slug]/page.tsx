"use client";

import { getProductAndVariants } from "@/actions";
import { useEffect, useMemo, useState } from "react";
import { Variant, ProductCart } from "@/interfaces";
import { AddCartButton, ColorSelect, DescriptionProduct, DisplayProductInfo, ProductImages, QuantityInput, ShowStock, SizesSelect } from "@/components";
import { notFound } from "next/navigation";
import { useProductPageStore } from "@/store";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

const initialValues : ProductCart = { 
  productId: "", 
  variantId: "", 
  size: {
    id: "",
    label: "",
  }, 
  quantity: 1, 
  image: "", 
  name: "", 
  price: 0, 
  color: "", 
  stock: 0, 
  slug: "" 
};

export default function NamePage({ params }: Props) {

  const { variant, product, setProduct, setVariant, reset } = useProductPageStore();
  const [loading, setLoading] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);

  const [productCart, setProductCart] = useState(initialValues);

  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (variant && product) return;
    load();
  }, [variant, product]); // Agregado

  useEffect(() => {
    setCurrentVariant(variant);
  }, [variant]);
  
  useEffect(() => {
    if(product && variant) {
      const updateVariant = product?.variants?.find(variant => variant.slug === params.slug);
      if(updateVariant) {
        setCurrentVariant(updateVariant);
        return
      } else {
        load();
      }
    }
  }, [params.slug]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getProductAndVariants(params.slug);
      
      if (res && res.product) {
        const { product, ...rest } = res;
        setVariant(rest);
        setProduct(product);
      } else {
        setIsNotFound(true);
      }
    } catch (error) {
      setIsNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const sizesQuantity = useMemo(() => {
    if(currentVariant?.sizes) {
      const res = currentVariant?.sizes.find(sizesVariant => sizesVariant.size.id === productCart.size.id)?.stock ?? 0
      return res;
    }
    return 0;
  }, [currentVariant, productCart.size]);

    useMemo(() => {
      productCart.quantity > sizesQuantity 
      ? setProductCart({...productCart, quantity: sizesQuantity}) 
      : productCart.quantity <= sizesQuantity && sizesQuantity > 0
      ? setProductCart({...productCart, quantity: 1})
      : setProductCart({...productCart, quantity: 0})
  }, [sizesQuantity]);

  if (isNotFound) notFound();

  if (loading) return <></>;

  if(!product || !variant) return <></>

  return (
    <>
        <div className="flex flex-wrap gap-2 sm:gap-5 items-center my-6">
          <Link 
            href={"/"}
          >
            <HomeIcon className="size-4 sm:size-5 text-gray-700"/>
          </Link>

          <ChevronRightIcon className="size-4 sm:size-5 text-gray-500" />

            <Link 
              href={`/collections/${product.gender}`}
              className="text-gray-700 capitalize text-sm sm:text-base"
            >{product.gender}</Link>
          <ChevronRightIcon className="size-4 sm:size-5 text-gray-500" />

            <Link 
              href={`/collections/${product.gender}/${product.category?.slug}`}
              className="text-gray-700 text-sm sm:text-base"
            >{product.category?.label}</Link>
          <ChevronRightIcon className="size-4 sm:size-5 text-gray-500" />

          <Link 
            href={`/products/${currentVariant?.slug}`}
            className="text-gray-700 text-sm sm:text-base"
          >{currentVariant?.name}</Link>
        </div> 
        <div className="grid lg:grid-cols-12 lg:gap-10">
          <ProductImages 
            variantUi={currentVariant ?? variant}
          />

          <div className="lg:col-span-5 px-2 py-4 lg:px-4 lg:py-8 flex flex-col gap-8 lg:sticky lg:top-16 lg:h-[800px]">
            
            {/* Displays of product */}
            <DisplayProductInfo 
              product={product}
              variant={variant}
            />

            {/* Allows users to select colors */}
            <ColorSelect 
              product={product}
              firstVariant={variant}
              variant={currentVariant ?? variant}
            />

            {/* Text updating the UI to let you know stock of the product */}
            <SizesSelect 
              variant={variant}
              productCart={productCart}
              setProductCart={setProductCart}
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
              description={product?.description}
            />

        </div>
      </div>
    </>
  );
}
