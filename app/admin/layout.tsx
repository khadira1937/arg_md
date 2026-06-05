import { requireStaff } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireStaff();
  return (
    <DashboardShell variant="admin" user={{ name: user.name, email: user.email, role: user.role }}>
      {children}
    </DashboardShell>
  );
}
