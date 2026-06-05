import Link from "next/link";
import { footerNav } from "@/config/nav";
import { brand } from "@/config/brand";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{brand.tagline}</p>
            <div className="mt-4 flex gap-3 text-sm text-muted-foreground">
              <a href={brand.social.twitter} className="hover:text-foreground">Twitter</a>
              <a href={brand.social.github} className="hover:text-foreground">GitHub</a>
              <a href={brand.social.linkedin} className="hover:text-foreground">LinkedIn</a>
            </div>
          </div>
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold">{heading}</h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/acceptable-use-policy" className="hover:text-foreground">AUP</Link>
            <Link href="/sla" className="hover:text-foreground">SLA</Link>
            <Link href="/refund-policy" className="hover:text-foreground">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
