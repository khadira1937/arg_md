import {
  LayoutDashboard, Server, ShoppingBag, FileText, RefreshCw, LifeBuoy, User,
} from "lucide-react";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/shell";
import type { SidebarLink } from "@/components/dashboard/sidebar";

const links: SidebarLink[] = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Services", href: "/dashboard/services", icon: Server },
  { title: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { title: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { title: "Subscriptions", href: "/dashboard/subscriptions", icon: RefreshCw },
  { title: "Support", href: "/dashboard/support", icon: LifeBuoy },
  { title: "Profile", href: "/dashboard/profile", icon: User },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <DashboardShell links={links} sidebarTitle="Customer" user={{ name: user.name, email: user.email, role: user.role }}>
      {children}
    </DashboardShell>
  );
}
