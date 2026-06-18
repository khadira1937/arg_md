import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sidebar, MobileNav, type SidebarVariant } from "./sidebar";
import { logoutAction } from "@/app/actions/auth";

export function DashboardShell({
  variant,
  user,
  children,
}: {
  variant: SidebarVariant;
  user: { name?: string | null; email: string; role: string };
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-muted/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/[0.06] to-transparent" />
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo invertOnDark />
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-tight">{user.name ?? user.email}</p>
              <p className="text-xs capitalize text-muted-foreground">{user.role.toLowerCase()}</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
              {(user.name ?? user.email).charAt(0).toUpperCase()}
            </span>
            <ThemeToggle />
            <form action={logoutAction}>
              <Button type="submit" variant="ghost" size="icon" aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <MobileNav variant={variant} />
      </header>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6 sm:px-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24 space-y-6">
            <Sidebar variant={variant} />
            <Link href="/" className="block px-3 text-xs text-muted-foreground hover:text-foreground">← Back to website</Link>
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
