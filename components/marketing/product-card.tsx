import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/pricing";

type Props = {
  name: string;
  slug: string;
  shortDescription?: string | null;
  fromPrice?: number | null;
  inquiryOnly?: boolean;
  badge?: string;
  bestFor?: string;
  specs?: string[];
};

export function ProductCard({ name, slug, shortDescription, fromPrice, inquiryOnly, badge, bestFor, specs }: Props) {
  return (
    <Card className="hover-lift group relative flex h-full flex-col overflow-hidden p-6 hover:border-primary/40">
      <div className="absolute inset-x-0 -top-px h-0.5 bg-brand-gradient opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
          {bestFor && <p className="mt-0.5 text-xs font-medium text-primary">{bestFor}</p>}
        </div>
        {badge && <Badge variant="gradient" className="shrink-0">{badge}</Badge>}
      </div>

      {/* Price */}
      <div className="mt-4">
        {inquiryOnly ? (
          <span className="text-sm font-semibold text-primary">Custom pricing</span>
        ) : fromPrice != null ? (
          <p className="flex items-baseline gap-1">
            <span className="text-xs text-muted-foreground">from</span>
            <span className="text-2xl font-bold tracking-tight">{formatMoney(fromPrice)}</span>
            <span className="text-sm font-normal text-muted-foreground">USD/mo</span>
          </p>
        ) : null}
      </div>

      {shortDescription && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{shortDescription}</p>
      )}

      {/* Specs */}
      {specs && specs.length > 0 && (
        <ul className="mt-4 space-y-2 border-t pt-4 text-sm">
          {specs.slice(0, 6).map((s) => (
            <li key={s} className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-success" />
              <span className="text-muted-foreground">{s}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <div className="mt-5 flex flex-1 items-end pt-1">
        <Button asChild variant="outline" className="w-full group-hover:border-primary/40">
          <Link href={`/${slug}`}>
            {inquiryOnly ? "Get a quote" : "View plans"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
