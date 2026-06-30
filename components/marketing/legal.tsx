import { brand } from "@/config/brand";

/**
 * LegalShell — Argana-themed wrapper used by /privacy, /terms, /cookie-policy,
 * /refund-policy and /acceptable-use-policy. Single-column long-form layout on
 * the warm-off-white surface with ink type and a hairline rule beneath the
 * support contact line.
 */
export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="am-band-light am-section">
      <div className="am-container">
        <div className="mx-auto max-w-3xl">
          <h1 className="am-headline-md text-[color:var(--argana-on-surface)]">{title}</h1>
          <p className="mt-3 text-sm text-[color:var(--argana-on-surface-variant)]">
            Last updated: {updated}
          </p>
          <div className="legal mt-8 space-y-6 text-[15px] leading-relaxed text-[color:var(--argana-on-surface-variant)] [&_a]:text-[color:var(--argana-on-surface)] [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-[color:var(--argana-on-surface)] [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
            {children}
          </div>
          <p className="mt-12 border-t border-[color:var(--argana-outline-variant)] pt-6 text-xs text-[color:var(--argana-on-surface-variant)]">
            Questions? Contact us at {brand.email.support}. This document is provided as a
            starting template and is not legal advice.
          </p>
        </div>
      </div>
    </section>
  );
}
