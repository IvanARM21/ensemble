
import Link from "next/link";
import { DashboardPageHeader } from "@/components";
import { SizeProcess } from "@/components";
import { INITIAL_SIZE } from "@/constants";

export default function NewSizePage() {

  return (
    <>
        <DashboardPageHeader 
          title="New size" 
          url="/dashboard/sizes"
        />

        <SizeProcess 
          type="new"
          size={INITIAL_SIZE}
        />
    </>
  );
}