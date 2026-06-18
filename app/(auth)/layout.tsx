import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck, Headphones } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { brand } from "@/config/brand";

const TRUST = [
  { icon: CreditCard, label: "Secure Stripe checkout" },
  { icon: ShieldCheck, label: "Transparent pricing" },
  { icon: Headphones, label: "Support via tickets" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-mesh" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 animate-aurora rounded-full bg-primary/15 blur-3xl" />

      <Link
        href="/"
        className="absolute left-5 top-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {brand.domain}
      </Link>

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo invertOnDark />
          <p className="mt-3 text-sm text-muted-foreground">{brand.tagline}</p>
        </div>
        <div className="rounded-2xl border bg-card p-8 shadow-premium">{children}</div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {TRUST.map((t) => (
            <span key={t.label} className="flex items-center gap-1.5">
              <t.icon className="h-3.5 w-3.5 text-primary" /> {t.label}
            </span>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          By continuing you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">Terms</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
