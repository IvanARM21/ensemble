import { ColorsProcess, DashboardPageHeader } from "@/components";
import Link from "next/link";

export default function NewColorPage() {
  return (
    <>
      <DashboardPageHeader 
        title="New color" 
        url="/dashboard/colors"
      />
      <ColorsProcess type="new" color={null} />
    </>
  );
}