"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, ShoppingCart, LayoutDashboard, ArrowRight, PhoneCall } from "lucide-react";
import { mainNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
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
  const [activeCat, setActiveCat] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = mainNav.find((i) => i.title === openMenu && (i.columns || i.services));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75"
          : "border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "container relative flex items-center justify-between gap-4 transition-all",
          scrolled ? "h-14" : "h-16",
        )}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="flex items-center gap-1">
          <Logo height={scrolled ? 26 : 30} priority invertOnDark />
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex lg:items-center lg:gap-0.5">
          {mainNav.map((item) =>
            item.columns || item.services ? (
              <button
                key={item.title}
                onMouseEnter={() => {
                  setOpenMenu(item.title);
                  setActiveCat(0);
                }}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
                  openMenu === item.title && "bg-muted text-foreground",
                )}
              >
                {item.title}
                <ChevronDown
                  className={cn("h-4 w-4 opacity-60 transition-transform", openMenu === item.title && "rotate-180")}
                />
              </button>
            ) : (
              <Link
                key={item.title}
                href={item.href!}
                onMouseEnter={() => setOpenMenu(null)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />

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
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Client Portal
              </Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Client Portal</Link>
            </Button>
          )}

          <Button asChild variant="gradient" className="hidden sm:inline-flex">
            <Link href="/book-a-call">
              <PhoneCall className="h-4 w-4" />
              Book a Call
            </Link>
          </Button>

          {/* Mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[90vw] overflow-y-auto p-0 sm:max-w-md">
              <SheetHeader className="border-b">
                <SheetTitle className="flex items-center justify-between">
                  <Logo height={26} invertOnDark />
                  <ThemeToggle />
                </SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <MobileNav />
                <div className="mt-4 grid gap-2">
                  <Button asChild variant="gradient"><Link href="/book-a-call">Book a Call</Link></Button>
                  {user ? (
                    <Button asChild variant="outline"><Link href="/dashboard">Client Portal</Link></Button>
                  ) : (
                    <>
                      <Button asChild variant="outline"><Link href="/login">Client Portal</Link></Button>
                      <Button asChild variant="ghost"><Link href="/contact">Contact us</Link></Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Two-pane Services mega panel */}
        {active?.services && (
          <div className="absolute inset-x-0 top-full hidden pt-2 lg:block">
            <div className="grid grid-cols-12 overflow-hidden rounded-2xl border bg-popover shadow-xl animate-fade-up">
              {/* Left: category cards */}
              <div className="col-span-4 border-r bg-muted/30 p-3">
                <div className="flex items-center justify-between px-3 pb-2 pt-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Our services</p>
                  <Link href="/services" className="text-xs font-medium text-primary hover:underline">All</Link>
                </div>
                {active.services.map((c, i) => {
                  const Icon = c.icon;
                  const isActive = activeCat === i;
                  return (
                    <Link
                      key={c.title}
                      href={c.href}
                      onMouseEnter={() => setActiveCat(i)}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                        isActive ? "bg-card shadow-sm" : "hover:bg-card/60",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                          isActive ? "border-primary/40 bg-primary/10 text-primary" : "bg-card text-muted-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-foreground">{c.title}</span>
                        <span className="block truncate text-xs text-muted-foreground">{c.tagline}</span>
                      </span>
                      <ChevronRight className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-opacity", isActive ? "opacity-100 text-primary" : "opacity-0")} />
                    </Link>
                  );
                })}
              </div>

              {/* Right: selected category's services */}
              <div className="col-span-8 flex flex-col p-5">
                {(() => {
                  const cat = active.services![activeCat] ?? active.services![0];
                  return (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-display text-base font-semibold">{cat.title}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">{cat.tagline}</p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href={cat.href}>View {cat.title} <ArrowRight className="h-3.5 w-3.5" /></Link>
                        </Button>
                      </div>
                      <div className="mt-4 grid flex-1 grid-cols-2 gap-x-6 gap-y-1">
                        {cat.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="group rounded-lg px-3 py-2 transition-colors hover:bg-muted"
                          >
                            <span className="block text-sm font-medium text-foreground">{link.title}</span>
                            {link.description && (
                              <span className="block text-xs text-muted-foreground">{link.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                      {active.cta && (
                        <div className="mt-4 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/[0.04] px-4 py-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold">{active.cta.title}</p>
                            <p className="truncate text-xs text-muted-foreground">{active.cta.description}</p>
                          </div>
                          <Button asChild variant="gradient" size="sm" className="ml-4 shrink-0">
                            <Link href={active.cta.href}>{active.cta.label} <ArrowRight className="h-4 w-4" /></Link>
                          </Button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Generic column mega panel (fallback for any column-based item) */}
        {active?.columns && !active.services && (
          <div className="absolute inset-x-0 top-full hidden pt-2 lg:block">
            <div className="grid grid-cols-12 gap-6 rounded-2xl border bg-popover p-5 shadow-xl animate-fade-up">
              <div className={cn("col-span-9 grid gap-x-8 gap-y-1", active.columns.length > 1 ? "grid-cols-3" : "grid-cols-2")}>
                {active.columns.map((col) => (
                  <div key={col.title} className="space-y-1">
                    <p className="px-3 pb-1 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-card text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
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
              {active.cta && (
                <div className="col-span-3 flex flex-col justify-between rounded-xl border border-primary/20 bg-primary/[0.04] p-5">
                  <div>
                    <p className="font-display text-base font-semibold">{active.cta.title}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{active.cta.description}</p>
                  </div>
                  <Button asChild variant="gradient" size="sm" className="mt-4 w-full">
                    <Link href={active.cta.href}>
                      {active.cta.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <div className="space-y-1">
      {mainNav.map((item) =>
        item.services ? (
          <details key={item.title} className="group rounded-xl border">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium">
              {item.title}
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-2 px-2 pb-3">
              {item.services.map((cat) => (
                <div key={cat.href} className="rounded-lg bg-muted/40 p-2">
                  <Link href={cat.href} className="block px-2 py-1 text-sm font-semibold text-foreground">
                    {cat.title}
                  </Link>
                  <div className="grid">
                    {cat.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link href="/services" className="flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-primary">
                View all services <ArrowRight className="h-3.5 w-3.5" />
              </Link>
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
