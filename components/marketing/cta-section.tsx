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
      {/* Light: vibrant brand-gradient panel. Dark: a dark card with a subtle
          brand glow + gradient CTA, so it sits naturally on the dark page. */}
      <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-16 text-center text-white shadow-premium sm:px-16 dark:border dark:border-border dark:bg-card dark:bg-none dark:text-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.18),transparent)] dark:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(60%_60%_at_50%_0%,hsl(201_96%_50%/0.18),transparent)] dark:block" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85 dark:text-muted-foreground">{description}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#0f172a] shadow-sm hover:bg-white/90 dark:bg-brand-gradient dark:text-white dark:hover:brightness-105"
            >
              <Link href={primaryHref}>{primaryLabel} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white dark:border-border dark:bg-transparent dark:text-foreground dark:hover:bg-muted dark:hover:text-foreground"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
