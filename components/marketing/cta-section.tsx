import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection({
  title = "Ready to launch on CloudynHost?",
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
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-gradient px-6 py-16 text-center text-white shadow-glow sm:px-16">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(60%_70%_at_50%_0%,white,transparent)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">{description}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-primary shadow-lg hover:bg-white/90">
              <Link href={primaryHref}>{primaryLabel} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
