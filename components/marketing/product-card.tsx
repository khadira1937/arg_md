import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib/pricing";

type Props = {
  name: string;
  slug: string;
  shortDescription?: string | null;
  fromPrice?: number | null;
  inquiryOnly?: boolean;
  badge?: string;
};

export function ProductCard({ name, slug, shortDescription, fromPrice, inquiryOnly, badge }: Props) {
  return (
    <Link href={`/${slug}`} className="group block h-full">
      <Card className="hover-lift relative flex h-full flex-col overflow-hidden p-6 hover:border-primary/40">
        <div className="absolute inset-x-0 -top-px h-0.5 bg-brand-gradient opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
        {badge && (
          <Badge variant="gradient" className="mb-3 w-fit">
            {badge}
          </Badge>
        )}
        <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
        {shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{shortDescription}</p>
        )}
        <div className="mt-5 flex flex-1 items-end justify-between pt-1">
          <div>
            {inquiryOnly ? (
              <span className="text-sm font-semibold text-primary">Custom pricing</span>
            ) : fromPrice != null ? (
              <>
                <span className="text-xs text-muted-foreground">from</span>
                <p className="text-2xl font-bold tracking-tight">
                  {formatMoney(fromPrice)}
                  <span className="text-sm font-normal text-muted-foreground"> USD/mo</span>
                </p>
              </>
            ) : null}
          </div>
          <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <span className="hidden sm:inline">View plans</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        </div>
      </Card>
    </Link>
  );
}
