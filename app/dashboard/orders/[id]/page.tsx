import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney, CYCLE_LABEL } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHeader, StatusBadge } from "@/components/dashboard/ui";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const order = await prisma.order.findFirst({
    where: { id, userId: user.id },
    include: { items: true, invoices: true, services: true },
  });
  if (!order) notFound();

  return (
    <div>
      <Link href="/dashboard/orders" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to orders
      </Link>
      <PageHeader title={`Order ${order.number}`} description={order.createdAt.toLocaleString()} action={<StatusBadge status={order.status} />} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h2 className="mb-4 font-semibold">Items</h2>
          <div className="space-y-3">
            {order.items.map((it) => (
              <div key={it.id} className="flex items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{it.description}</p>
                  <p className="text-xs text-muted-foreground">{it.billingCycle ? CYCLE_LABEL[it.billingCycle] : ""}{it.quantity > 1 ? ` · ×${it.quantity}` : ""}</p>
                </div>
                <span className="text-sm font-medium">{formatMoney(it.lineTotal)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 font-semibold">Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatMoney(order.subtotal)}</span></div>
            {order.discountTotal > 0 && <div className="flex justify-between text-success"><span>Discount{order.couponCode ? ` (${order.couponCode})` : ""}</span><span>−{formatMoney(order.discountTotal)}</span></div>}
            {order.setupTotal > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Setup</span><span>{formatMoney(order.setupTotal)}</span></div>}
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold"><span>Total</span><span>{formatMoney(order.total)}</span></div>
          </div>
          {order.invoices[0] && (
            <Link href="/dashboard/invoices" className="mt-4 block text-sm text-primary hover:underline">View invoice →</Link>
          )}
        </Card>
      </div>
    </div>
  );
}
