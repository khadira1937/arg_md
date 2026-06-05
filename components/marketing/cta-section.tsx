import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection({
  title = "Ready to deploy in minutes?",
  description = "Spin up your first service today. No long-term contracts, 30-day money-back guarantee.",
  primaryHref = "/pricing",
  primaryLabel = "View pricing",
  secondaryHref = "/contact",
  secondaryLabel = "Talk to sales",
}: {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="container py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center text-white shadow-xl sm:px-16">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(60%_60%_at_50%_0%,white,transparent)]" />
        <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/85">{description}</p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
