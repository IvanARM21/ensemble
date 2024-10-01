import { getCategoryWithProducts } from "@/actions";
import { ProductGrid } from "@/components";
import { Gender } from "@/interfaces";
import { notFound } from "next/navigation";

interface Props {
  params: {
    gender: Gender;
    slug: string;
  }
}

export default async function CollectionBySlug({params} : Props) {

  const { error, categoryWithProducts } = await getCategoryWithProducts(params.gender, params.slug); 

  if (error || !categoryWithProducts || Object.keys(categoryWithProducts).length === 0) {
    notFound();
  }

  return (
    <section>
      <h2 className="text-gray-700 text-2xl sm:text-3xl font-medium border-b pb-8 mb-8">
        {categoryWithProducts.label}
      </h2>
      <ProductGrid 
        products={categoryWithProducts.products}
      />
    </section>
  );
}