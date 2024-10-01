import { MasterLayout } from "@/components";

export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <MasterLayout>
      {children}
    </MasterLayout>
  );
}