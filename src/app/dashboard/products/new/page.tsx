import { getCategories, getColors } from "@/actions";
import { DashboardPageHeader, ProductsProcess } from "@/components";

export default async function CategoriesPage() {

  const [categories, colors] = await Promise.all([getCategories(), getColors()]);

  return (
    <>
        <DashboardPageHeader 
          title="New product" 
          url="/dashboard/products" 
        />

        <ProductsProcess colorsDB={colors ?? []} categoriesDB={categories} />
    </>
  );
}