import { MasterLayout } from "@/components";


export default async function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <> 
      <MasterLayout>
        {children}
      </MasterLayout>
    </>
  )
}