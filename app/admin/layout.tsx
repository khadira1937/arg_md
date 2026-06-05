import {
  LayoutDashboard, Package, Tags, ShoppingBag, FileText, RefreshCw, Server,
  Cpu, Users, LifeBuoy, Ticket, Newspaper, CreditCard, ScrollText,
} from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/shell";
import type { SidebarLink } from "@/components/dashboard/sidebar";

const links: SidebarLink[] = [
  { title: "Overview", href: "/admin", icon: LayoutDashboard },
  { title: "Products", href: "/admin/products", icon: Package },
  { title: "Pricing", href: "/admin/pricing", icon: Tags },
  { title: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { title: "Invoices", href: "/admin/invoices", icon: FileText },
  { title: "Subscriptions", href: "/admin/subscriptions", icon: RefreshCw },
  { title: "Services", href: "/admin/services", icon: Server },
  { title: "Provisioning", href: "/admin/provisioning", icon: Cpu },
  { title: "Coupons", href: "/admin/coupons", icon: Ticket },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Tickets", href: "/admin/tickets", icon: LifeBuoy },
  { title: "Content", href: "/admin/content", icon: Newspaper },
  { title: "Stripe", href: "/admin/stripe", icon: CreditCard },
  { title: "Audit log", href: "/admin/audit", icon: ScrollText },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireStaff();
  return (
    <DashboardShell links={links} sidebarTitle="Admin" user={{ name: user.name, email: user.email, role: user.role }}>
      {children}
    </DashboardShell>
  );
}
