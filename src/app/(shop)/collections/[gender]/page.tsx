
import React from "react";
import { getProductsByGender } from "@/actions";
import { ProductGrid} from "@/components";
import { notFound } from "next/navigation";

interface Props {
  params: {
    gender: 'men' | 'women' | 'unisex';
  }
}

export default async function CollectionsPage({ params } : Props) {

  const gender = params.gender;
  if(gender !== "men" && gender !== "women" &&  gender !== "unisex") notFound();

  const { categoriesAndVariants } = await getProductsByGender(params.gender);

  return (
      <>
        {categoriesAndVariants?.map(categoryAndVariants => (
          <section className="mt-16 first-of-type:mt-0" key={categoryAndVariants.id}>
            <h2 className="text-gray-700 text-2xl sm:text-3xl font-medium border-b pb-8 mb-8">{categoryAndVariants.label}</h2>
            <ProductGrid products={categoryAndVariants.products}/>
          </section>          
        ))}
      </>
  );
}