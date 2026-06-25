"use client";

import { usePathname } from "next/navigation";

/**
 * Shared chrome wrapper for the public site.
 *
 * The homepage ("/") renders the self-contained ARGANA MEDIA landing page,
 * which ships its own fixed navbar and footer. We drop the shared banner +
 * navbar + footer there so the page does not render duplicate navbars/footers.
 * Every other public route keeps the standard chrome exactly as before.
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

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
    </div>
  );
}
