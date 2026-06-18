import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, ArrowRight, Server, Clock } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Order complete", path: "/checkout/success", noIndex: true });
export const dynamic = "force-dynamic";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderNumber } = await searchParams;
  const user = await getCurrentUser();

  const order = orderNumber && user
    ? await prisma.order.findFirst({
        where: { number: orderNumber, userId: user.id },
        include: { items: true, services: { include: { product: true, plan: true } } },
      })
    : null;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-brand-glow" />
      <div className="container relative max-w-2xl py-16">
      <Card className="relative overflow-hidden p-8 text-center shadow-premium">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary" />
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-success/15 text-success ring-8 ring-success/5">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold">Thank you for your order!</h1>
        <p className="mt-2 text-muted-foreground">
          {order ? <>Order <span className="font-medium text-foreground">{order.number}</span> is confirmed</> : "Your order is confirmed"}
          {order ? ` · ${formatMoney(order.total)}` : ""}. Our team is preparing your service — you&apos;ll get an email with your management link as soon as it&apos;s ready.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-700">
          <Clock className="h-3.5 w-3.5" /> Typical setup time: a few minutes to a few hours
        </p>

        {order && order.services.length > 0 && (
          <div className="mt-6 space-y-3 text-left">
            {order.services.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.product.name} · {s.plan.name}</p>
                  </div>
                </div>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="gradient"><Link href="/dashboard/services">View my services <ArrowRight className="h-4 w-4" /></Link></Button>
          <Button asChild variant="outline"><Link href="/dashboard">Go to dashboard</Link></Button>
        </div>
      </Card>
      </div>
    </div>
  );
}
