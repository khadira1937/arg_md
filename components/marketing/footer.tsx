import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { footerNav } from "@/config/nav";
import { brand } from "@/config/brand";

/**
 * Shared site footer — Argana monochrome theme. Solid black band with white
 * type, four-column grid (brand + Services / Company / Legal), hairline
 * dividers and the registered-company line. Used on every public route.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="am-band-dark border-t border-white/10">
      <div className="am-container py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="mb-5 inline-flex items-center gap-3 text-white">
              <span className="text-base font-bold tracking-[0.18em]">ARGANA MEDIA</span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-white/65">
              Digital media, marketing and IT for growing businesses — content, websites,
              design, hosting support and everyday tech, from one trusted team across the
              UK and Europe.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${brand.email.hello}`}
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden /> {brand.email.hello}
              </a>
              <a
                href={`tel:${brand.phoneHref}`}
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" aria-hidden /> {brand.phone}
              </a>
            </div>
          </div>

          {(["Services", "Company", "Legal"] as const).map((heading) => (
            <div key={heading}>
              <h4 className="am-label-caps mb-4 text-white/55">{heading}</h4>
              <ul className="flex flex-col gap-3">
                {footerNav[heading].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="mb-1 text-xs text-white/65">
            <strong className="font-semibold text-white/85">{brand.company.legalName}</strong>{" "}
            · Company number {brand.company.number}
          </p>
          <p className="mb-5 text-xs text-white/55">
            Registered office: {brand.company.registeredOffice}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/55">
            <span>
              © {year} {brand.company.legalName}. All rights reserved.
            </span>
            <span>Made with care in the UK.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
