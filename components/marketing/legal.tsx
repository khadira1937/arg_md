import { brand } from "@/config/brand";

export function LegalShell({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
      <div className="legal mt-8 space-y-6 text-[15px] leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
        {children}
      </div>
      <p className="mt-12 border-t pt-6 text-xs text-muted-foreground">
        Questions? Contact us at {brand.email.support}. This document is provided as a starting template and is not legal advice.
      </p>
    </div>
  );
}
