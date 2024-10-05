import { DashboardPageHeader, SizeProcess } from "@/components";
import { getSizeById } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    }
}

export default async function EditSizeByIdPage({ params } : Props) {

  const { size } = await getSizeById(params.id);

  if(!size?.id) redirect("/dashboard/sizes");

  return (
    <>
        <DashboardPageHeader 
          title="Edit size" 
          url="/dashboard/sizes"
        />

        <SizeProcess type="edit" size={size} />
    </>
);
}