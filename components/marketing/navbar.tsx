"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, ShoppingCart, LayoutDashboard } from "lucide-react";
import { mainNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type NavUser = { name?: string | null; role: string } | null;

export function Navbar({ user, cartCount = 0 }: { user?: NavUser; cartCount?: number }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all",
        scrolled
          ? "border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <Logo />
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1" onMouseLeave={() => setOpenMenu(null)}>
          {mainNav.map((item) =>
            item.columns ? (
              <div key={item.title} className="relative" onMouseEnter={() => setOpenMenu(item.title)}>
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
                    openMenu === item.title && "bg-muted text-foreground",
                  )}
                >
                  {item.title}
                  <ChevronDown className="h-4 w-4 opacity-60" />
                </button>
                {openMenu === item.title && (
                  <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3">
                    <div className="grid gap-2 rounded-2xl border bg-popover p-4 shadow-xl animate-fade-up md:grid-cols-2">
                      {item.columns.map((col) => (
                        <div key={col.title} className="space-y-1">
                          <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            {col.title}
                          </p>
                          {col.links.map((link) => {
                            const Icon = link.icon;
                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="group flex items-start gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-muted"
                              >
                                {Icon && (
                                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="h-4 w-4" />
                                  </span>
                                )}
                                <span>
                                  <span className="block text-sm font-medium text-foreground">{link.title}</span>
                                  {link.description && (
                                    <span className="block text-xs text-muted-foreground">{link.description}</span>
                                  )}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.title}
                href={item.href!}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative hidden sm:inline-flex">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <Button asChild variant="gradient" className="hidden sm:inline-flex">
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild variant="gradient" className="hidden sm:inline-flex">
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}

          {/* Mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] overflow-y-auto p-0">
              <SheetHeader className="border-b">
                <SheetTitle><Logo /></SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <MobileNav />
                <div className="mt-4 grid gap-2">
                  {user ? (
                    <Button asChild variant="gradient"><Link href="/dashboard">Dashboard</Link></Button>
                  ) : (
                    <>
                      <Button asChild variant="outline"><Link href="/login">Log in</Link></Button>
                      <Button asChild variant="gradient"><Link href="/register">Get started</Link></Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <div className="space-y-1">
      {mainNav.map((item) =>
        item.columns ? (
          <details key={item.title} className="group rounded-xl border">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium">
              {item.title}
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-1 px-2 pb-2">
              {item.columns.flatMap((c) => c.links).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </details>
        ) : (
          <Link
            key={item.title}
            href={item.href!}
            className="block rounded-xl border px-4 py-3 text-sm font-medium hover:bg-muted"
          >
            {item.title}
          </Link>
        ),
      )}
    </div>
  );
}
