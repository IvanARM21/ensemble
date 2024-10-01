
import { getCategoriesWithImage } from "@/actions";
import { ReviewGrid, GendersGrid, CategoriesSlide, IncentiveGrid, PromotionSection } from "@/components";
import { formattCategoriesByGender } from "@/utils";

export default async function PageHome() {

  const categories = await getCategoriesWithImage();

  const formattCategories = formattCategoriesByGender(categories);

  const clothing = formattCategories.filter(cat => cat.type !== "shoes" && cat.type !== "accessories");
  const women = clothing.filter(cat => cat.gender === "women" || cat.gender === "unisex");
  const men = clothing.filter(cat => cat.gender === "men" || cat.gender === "unisex");
  const accessories = formattCategories.filter(cat => cat.type !== "clothing" && cat.type !== "shoes");
  const shoes = formattCategories.filter(cat => cat.type !== "clothing" && cat.type !== "accessories");

  return (
    <>
      <section className="mb-20">
        <h2 className="text-gray-700 text-2xl sm:text-3xl font-medium border-b pb-8">
          Shop by collection
        </h2>
        
        <GendersGrid />          
      </section>
      
      <section className="mb-20">
        <PromotionSection />
      </section>

      {clothing.length && (
        <section className="mb-20">
          <h2 className="text-gray-700 text-2xl sm:text-3xl font-medium border-b pb-8">Discover our collection for Women's</h2>

          <CategoriesSlide categories={women} />
        </section>
      )}

       {clothing.length && (
        <section className="mb-20">
          <h2 className="text-gray-700 text-2xl sm:text-3xl font-medium border-b pb-8">Discover our collection for Men's</h2>

          <CategoriesSlide categories={men} />
        </section>
      )}

      {accessories.length && (
        <section className="mb-20">
          <h2 className="text-gray-700 text-2xl sm:text-3xl font-medium border-b pb-8">Discover our collection of accessories</h2>

          <CategoriesSlide categories={accessories} />
        </section>
      )}
      
      {shoes.length && (
        <section className="mb-20">
          <h2 className="text-gray-700 text-2xl sm:text-3xl font-medium border-b pb-8">Discover our collection of shoes</h2>

          <CategoriesSlide categories={shoes} />
        </section>
      )}

      <section className="mb-20">
        <h2 className="text-gray-700 text-2xl sm:text-3xl font-medium border-b pb-8">
          What are people saying?
        </h2>
        
        <ReviewGrid />
      </section>

      <section>
        <h2 className="text-gray-700 text-2xl sm:text-3xl font-medium border-b pb-8">
          We built our business on customer service
        </h2>

        <IncentiveGrid />
      </section>
    </>
  );
}
