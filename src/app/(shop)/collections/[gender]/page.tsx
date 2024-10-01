import { ProductGrid} from "@/components";
import { products } from "@/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    gender: 'men' | 'women' | 'unisex';
  }
}

export default async function CollectionsPage({ params } : Props) {

  const gender = params.gender;
  if(gender !== "men" && gender !== "women" &&  gender !== "unisex") notFound();

  const productsByGender = products.filter(product => product.gender.includes(gender));

  return (
   
      <ProductGrid 
        products={productsByGender}
      />
  );
}