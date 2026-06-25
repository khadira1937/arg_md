import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection({
  title = "Ready to grow your online presence?",
  description = "Book a free, no-pressure discovery call and we'll map out the right plan for your business — websites, marketing, design, content or support.",
  primaryHref = "/book-a-call",
  primaryLabel = "Book a Call",
  secondaryHref = "/contact",
  secondaryLabel = "Request a Quote",
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
      {/* Dark premium panel with teal + gold glows, gold primary CTA and a glass
          secondary — mirrors the landing page's final call-to-action. */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-premium sm:px-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,hsl(183_74%_56%/0.16),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,hsl(39_82%_74%/0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{description}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gradient">
              <Link href={primaryHref}>{primaryLabel} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
