import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection({
  title = "Ready to launch on HostynCloud?",
  description = "Choose a plan, check out securely with Stripe, and we'll set up your service fast — details delivered straight to your dashboard.",
  primaryHref = "/pricing",
  primaryLabel = "View pricing",
  secondaryHref = "/contact",
  secondaryLabel = "Talk to us",
}: {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="container py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-band-border bg-band px-6 py-16 text-center text-band-foreground sm:px-16">
        <div className="pointer-events-none absolute inset-0 bg-grid-band opacity-70" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-band-muted">{description}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gradient">
              <Link href={primaryHref}>{primaryLabel} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-band-border bg-band-card text-band-foreground hover:bg-band-card/70 hover:text-band-foreground"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
