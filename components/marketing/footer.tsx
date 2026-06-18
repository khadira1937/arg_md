import Link from "next/link";
import { CreditCard, ShieldCheck, Lock, Activity } from "lucide-react";
import { footerNav } from "@/config/nav";
import { brand } from "@/config/brand";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-band-border bg-band text-band-foreground">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-band opacity-60" />
        <div className="container relative py-16">
          <div className="grid gap-12 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <Logo height={28} onDark />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-band-muted">{brand.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-band-border bg-band-card px-3 py-1 text-xs font-medium text-band-muted">
                  <CreditCard className="h-3.5 w-3.5 text-primary" /> Payments by Stripe
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-band-border bg-band-card px-3 py-1 text-xs font-medium text-band-muted">
                  <Lock className="h-3.5 w-3.5 text-primary" /> Free SSL
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-band-border bg-band-card px-3 py-1 text-xs font-medium text-band-muted">
                  <Activity className="h-3.5 w-3.5 text-success" />{" "}
                  <Link href="/status" className="hover:text-band-foreground">System status</Link>
                </span>
              </div>

              {(() => {
                const socials = [
                  { label: "X", href: brand.social.x },
                  { label: "GitHub", href: brand.social.github },
                  { label: "LinkedIn", href: brand.social.linkedin },
                ].filter((s) => s.href);
                if (socials.length === 0) return null;
                return (
                  <div className="mt-5 flex gap-4 text-sm text-band-muted">
                    {socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-band-foreground">
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
                      <Link href={l.href} className="text-sm text-band-muted transition-colors hover:text-band-foreground">
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Region + abuse note */}
          <div className="mt-12 flex flex-col gap-2 rounded-xl border border-band-border bg-band-card/60 p-4 text-xs text-band-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Live regions: United States &amp; Europe. Additional regions are rolling out — availability depends on the selected product.
            </p>
            <a href={`mailto:${brand.email.abuse}`} className="font-mono transition-colors hover:text-band-foreground">
              Report abuse: {brand.email.abuse}
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-band-border pt-6 text-sm text-band-muted sm:flex-row">
            <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/terms" className="transition-colors hover:text-band-foreground">Terms</Link>
              <Link href="/privacy" className="transition-colors hover:text-band-foreground">Privacy</Link>
              <Link href="/acceptable-use-policy" className="transition-colors hover:text-band-foreground">AUP</Link>
              <Link href="/sla" className="transition-colors hover:text-band-foreground">SLA</Link>
              <Link href="/refund-policy" className="transition-colors hover:text-band-foreground">Refunds</Link>
              <Link href="/abuse" className="transition-colors hover:text-band-foreground">Report Abuse</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
