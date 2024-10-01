import { DashboardSidebar, DashboardHeader} from "@/components";
import { ModalDashboardDelete } from "@/components";

export default function DashboardLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
      <>
        <DashboardSidebar />

        <DashboardHeader/>

        <main className="xl:ml-72 py-5 px-4 sm:px-12 2xl:px-20">
          <div className="mt-[68px]">
            {children}
          </div>
        </main>

        <ModalDashboardDelete />
      </>
  );
}