import Link from "next/link";
import { CreditCard, ShieldCheck, MapPin, Mail, Phone, Building2 } from "lucide-react";
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

              {/* Contact */}
              <div className="mt-5 space-y-2 text-sm text-band-muted">
                <a href={`mailto:${brand.email.hello}`} className="flex items-center gap-2 transition-colors hover:text-band-foreground">
                  <Mail className="h-4 w-4 text-primary" /> {brand.email.hello}
                </a>
                <a href={`tel:${brand.phoneHref}`} className="flex items-center gap-2 transition-colors hover:text-band-foreground">
                  <Phone className="h-4 w-4 text-primary" /> {brand.phone}
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-band-border bg-band-card px-3 py-1 text-xs font-medium text-band-muted">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> UK-registered company
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-band-border bg-band-card px-3 py-1 text-xs font-medium text-band-muted">
                  <CreditCard className="h-3.5 w-3.5 text-primary" /> Secure payments via Stripe
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

          {/* Registered company details */}
          <div className="mt-12 grid gap-3 rounded-xl border border-band-border bg-band-card/60 p-5 text-xs text-band-muted sm:grid-cols-2">
            <p className="flex items-start gap-2">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                <span className="font-semibold text-band-foreground">{brand.company.legalName}</span> — registered in {brand.company.jurisdiction}.
                Company number {brand.company.number}.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>Registered office: {brand.company.registeredOffice}</span>
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-band-border pt-6 text-sm text-band-muted sm:flex-row">
            <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/terms" className="transition-colors hover:text-band-foreground">Terms</Link>
              <Link href="/privacy" className="transition-colors hover:text-band-foreground">Privacy</Link>
              <Link href="/cookie-policy" className="transition-colors hover:text-band-foreground">Cookies</Link>
              <Link href="/refund-policy" className="transition-colors hover:text-band-foreground">Refunds</Link>
              <Link href="/acceptable-use-policy" className="transition-colors hover:text-band-foreground">Acceptable Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
