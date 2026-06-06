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
    <Link href={`/${slug}`} className="group">
      <Card className="hover-lift relative h-full overflow-hidden p-6 hover:border-primary/40">
        <div className="absolute inset-x-0 -top-px h-0.5 bg-brand-gradient opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
        {badge && (
          <Badge variant="gradient" className="mb-3">
            {badge}
          </Badge>
        )}
        <h3 className="text-lg font-semibold">{name}</h3>
        {shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{shortDescription}</p>
        )}
        <div className="mt-5 flex items-end justify-between">
          <div>
            {inquiryOnly ? (
              <span className="text-sm font-semibold text-primary">Custom pricing</span>
            ) : fromPrice != null ? (
              <>
                <span className="text-xs text-muted-foreground">from</span>
                <p className="text-xl font-bold">
                  {formatMoney(fromPrice)}
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
              </>
            ) : null}
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
