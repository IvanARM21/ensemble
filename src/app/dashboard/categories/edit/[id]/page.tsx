import { redirect } from "next/navigation";
import { CategoriesProcess, DashboardPageHeader } from "@/components";
import { getCategoryById } from "@/actions";

interface Props {
  params: {
    id: string;
  }
}

export default async function NamePage({ params }: Props) {

  const { category } = await getCategoryById(params.id)

  if(!category) redirect("/dashboard/categories");

  return (
    <>
        <DashboardPageHeader 
          title="Edit category" 
          url="/dashboard/categories" 
        />

        <CategoriesProcess type="edit" categoryEdit={category} />
    </>
  );
}