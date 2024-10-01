import { CategoriesProcess, DashboardPageHeader } from "@/components";

export default function CategoriesPage() {
  return (
    <>
        <DashboardPageHeader 
          title="New category" 
          url="/dashboard/categories" 
        />

        <CategoriesProcess type="new" />
    </>
  );
}