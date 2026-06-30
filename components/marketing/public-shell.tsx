"use client";

import { usePathname } from "next/navigation";

/**
 * Shared chrome wrapper for the public site. Mounts the Argana nav + footer on
 * every public route. The Nav is `fixed`, so non-homepage routes need 80px of
 * top padding to clear it. The homepage opts out: its Hero is full-bleed and
 * the transparent nav is meant to overlay its dark background.
 */
export function PublicShell({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      {navbar}
      <main className={`flex-1 ${isHome ? "" : "pt-20"}`}>{children}</main>
      {footer}
    </div>
  );
}
