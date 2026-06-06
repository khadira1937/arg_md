"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Server, ShoppingBag, FileText, RefreshCw, LifeBuoy, User,
  Package, Tags, Cpu, Users, Ticket, Newspaper, CreditCard, ScrollText,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarVariant = "dashboard" | "admin";

type Item = { title: string; href: string; icon: LucideIcon };

// Icons live inside this client component so we never pass function references
// across the server -> client boundary (which React cannot serialize).
const DASHBOARD_LINKS: Item[] = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Services", href: "/dashboard/services", icon: Server },
  { title: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { title: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { title: "Subscriptions", href: "/dashboard/subscriptions", icon: RefreshCw },
  { title: "Support", href: "/dashboard/support", icon: LifeBuoy },
  { title: "Profile", href: "/dashboard/profile", icon: User },
];

const ADMIN_LINKS: Item[] = [
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

function linksFor(variant: SidebarVariant) {
  return variant === "admin" ? ADMIN_LINKS : DASHBOARD_LINKS;
}

const ROOTS = ["/dashboard", "/admin"];

/** Horizontal, scrollable nav shown on mobile where the sidebar is hidden. */
export function MobileNav({ variant }: { variant: SidebarVariant }) {
  const pathname = usePathname();
  const links = linksFor(variant);
  return (
    <div className="-mx-4 overflow-x-auto border-b bg-background/95 px-4 lg:hidden">
      <div className="flex gap-1 py-2">
        {links.map((link) => {
          const active = pathname === link.href || (!ROOTS.includes(link.href) && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Sidebar({ variant }: { variant: SidebarVariant }) {
  const pathname = usePathname();
  const links = linksFor(variant);
  const title = variant === "admin" ? "Admin" : "Customer";
  const roots = ROOTS;

  return (
    <nav className="space-y-1">
      <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      {links.map((link) => {
        const active = pathname === link.href || (!roots.includes(link.href) && pathname.startsWith(link.href));
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
              active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
