import { getColorById } from "@/actions";
import { ColorsProcess, DashboardPageHeader } from "@/components";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    }
}

export default async function EditColorByIdPage({ params } : Props) {

  const { color } = await getColorById(params.id);

  if(!color) redirect("/dashboard/colors")

  return (
    <>
        <DashboardPageHeader 
        title="Edit color" 
        url="/dashboard/colors"
      />

        <ColorsProcess type="edit" color={color}/>
    </>
  );
}