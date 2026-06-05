import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Maya R.", role: "Founder, Studio Forge", quote: "We moved our whole agency stack over in a weekend. The dashboard alone saved us hours every week." },
  { name: "Daniel K.", role: "CTO, Loopwork", quote: "The VPS performance is genuinely excellent and provisioning is instant. Support actually knows their stuff." },
  { name: "Priya S.", role: "Indie developer", quote: "Cleanest hosting experience I've used. Pricing is transparent and the migration was free and painless." },
  { name: "Tom B.", role: "Ops lead, Northwind", quote: "DDoS protection kept us online through a nasty attack. Worth every cent for the peace of mind." },
  { name: "Elena V.", role: "Store owner", quote: "My WooCommerce store loads in under a second now. Conversions are up and I barely touched anything." },
  { name: "Marcus L.", role: "ML engineer", quote: "GPU servers spun up fast and the price-to-performance for training jobs beats the big clouds." },
];

export function Testimonials() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <Card key={t.name} className="p-6">
          <div className="flex gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground/90">“{t.quote}”</p>
          <div className="mt-5">
            <p className="text-sm font-semibold">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.role}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
