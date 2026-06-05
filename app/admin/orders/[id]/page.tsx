import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/ui";
import { OrderStatusSelect } from "@/components/admin/controls";

export default async function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { user: true, items: true, invoices: true, services: { include: { product: true } } } });
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/orders" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <PageHeader title={`Order ${order.number}`} description={`${order.user.email} · ${order.createdAt.toLocaleString()}`} action={<OrderStatusSelect orderId={order.id} status={order.status} />} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h2 className="mb-4 font-semibold">Items</h2>
          {order.items.map((it) => (
            <div key={it.id} className="flex items-center justify-between border-b py-2 text-sm last:border-0">
              <span>{it.description}</span><span className="font-medium">{formatMoney(it.lineTotal)}</span>
            </div>
          ))}
          {order.services.length > 0 && (
            <>
              <Separator className="my-4" />
              <h3 className="mb-2 text-sm font-semibold">Provisioned services</h3>
              {order.services.map((s) => (
                <Link key={s.id} href={`/admin/services`} className="block text-sm text-primary hover:underline">{s.label} ({s.status})</Link>
              ))}
            </>
          )}
        </Card>
        <Card className="p-6">
          <h2 className="mb-4 font-semibold">Totals</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatMoney(order.subtotal)}</span></div>
            {order.discountTotal > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>−{formatMoney(order.discountTotal)}</span></div>}
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold"><span>Total</span><span>{formatMoney(order.total)}</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
