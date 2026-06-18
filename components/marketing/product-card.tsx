import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/pricing";

type Props = {
  name: string;
  slug: string;
  shortDescription?: string | null;
  fromPrice?: number | null;
  inquiryOnly?: boolean;
  /** Best-for label, e.g. "For first websites" (replaces marketing badges). */
  bestFor?: string;
  specs?: string[];
  /** Optional honest trust note under the CTA. */
  trustNote?: string;
};

export function ProductCard({ name, slug, shortDescription, fromPrice, inquiryOnly, bestFor, specs, trustNote }: Props) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 hover-lift hover:border-primary/40">
      <div className="absolute inset-x-0 -top-px h-0.5 bg-brand-gradient opacity-0 transition-opacity group-hover:opacity-100" />

      <div>
        <h3 className="font-display text-lg font-semibold tracking-tight">{name}</h3>
        {bestFor && (
          <p className="mt-1 inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {bestFor}
          </p>
        )}
      </div>

      {/* Price (mono) */}
      <div className="mt-4">
        {inquiryOnly ? (
          <span className="font-mono text-sm font-semibold text-primary">Custom pricing</span>
        ) : fromPrice != null ? (
          <p className="font-mono tnum">
            <span className="text-xs text-muted-foreground">from </span>
            <span className="text-2xl font-bold tracking-tight">{formatMoney(fromPrice)}</span>
            <span className="text-sm font-normal text-muted-foreground">/mo</span>
          </p>
        ) : null}
      </div>

      {shortDescription && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{shortDescription}</p>
      )}

      {/* Specs (max 6) */}
      {specs && specs.length > 0 && (
        <ul className="mt-4 space-y-2 border-t pt-4 text-sm">
          {specs.slice(0, 6).map((s) => (
            <li key={s} className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-success" />
              <span className="font-mono text-[13px] text-muted-foreground">{s}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <div className="mt-5 flex flex-1 flex-col justify-end pt-1">
        <Button asChild variant="outline" className="w-full group-hover:border-primary/40">
          <Link href={`/${slug}`}>
            {inquiryOnly ? "Get a quote" : "View plans"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
        {trustNote && (
          <p className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" /> {trustNote}
          </p>
        )}
      </div>
    </Card>
  );
}
