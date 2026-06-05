import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/ui";

export default async function AdminInvoicesPage() {
  await requireStaff();
  const invoices = await prisma.invoice.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { user: true } });

  return (
    <div>
      <PageHeader title="Invoices" description="All issued invoices." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-4 font-medium">Invoice</th><th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Total</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b last:border-0">
                <td className="p-4 font-medium">{inv.number}</td>
                <td className="p-4 text-muted-foreground">{inv.user.email}</td>
                <td className="p-4">{formatMoney(inv.total)}</td>
                <td className="p-4"><StatusBadge status={inv.status} /></td>
                <td className="p-4 text-muted-foreground">{(inv.paidAt ?? inv.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
