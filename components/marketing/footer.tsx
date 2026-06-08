import Link from "next/link";
import { CreditCard, ShieldCheck } from "lucide-react";
import { footerNav } from "@/config/nav";
import { brand } from "@/config/brand";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {brand.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <CreditCard className="h-3.5 w-3.5 text-primary" /> Payments by Stripe
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> {brand.stats.uptime} uptime SLA
              </span>
            </div>
            {(() => {
              // Only render links that have a configured URL — no dead links.
              const socials = [
                { label: "X", href: brand.social.x },
                { label: "GitHub", href: brand.social.github },
                { label: "LinkedIn", href: brand.social.linkedin },
              ].filter((s) => s.href);
              if (socials.length === 0) return null;
              return (
                <div className="mt-5 flex gap-4 text-sm text-muted-foreground">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                      {s.label}
                    </a>
                  ))}
                </div>
              );
            })()}
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
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/acceptable-use-policy" className="transition-colors hover:text-foreground">AUP</Link>
            <Link href="/sla" className="transition-colors hover:text-foreground">SLA</Link>
            <Link href="/refund-policy" className="transition-colors hover:text-foreground">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
