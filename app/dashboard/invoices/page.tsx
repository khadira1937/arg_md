import { FileText } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge, EmptyState } from "@/components/dashboard/ui";
import { PayInvoiceButton } from "@/components/dashboard/pay-invoice-button";

export default async function InvoicesPage() {
  const user = await requireUser();
  const invoices = await prisma.invoice.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, include: { order: true } });

  return (
    <div>
      <PageHeader title="Invoices" description="Your billing history and any amounts due." />
      {invoices.length === 0 ? (
        <EmptyState icon={FileText} title="No invoices yet" />
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left text-muted-foreground">
                <th className="p-4 font-medium">Invoice</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b last:border-0">
                  <td className="p-4 font-medium">{inv.number}</td>
                  <td className="p-4">{formatMoney(inv.total)}</td>
                  <td className="p-4"><StatusBadge status={inv.status} /></td>
                  <td className="p-4 text-muted-foreground">{(inv.paidAt ?? inv.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">{inv.status === "OPEN" ? <PayInvoiceButton invoiceId={inv.id} /> : <span className="text-xs text-muted-foreground">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
