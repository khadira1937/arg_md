import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, TableEmpty } from "@/components/dashboard/ui";
import { NewCouponForm, CouponToggle } from "@/components/admin/controls";

export default async function AdminCouponsPage() {
  await requireStaff();
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageHeader title="Coupons" description="Create and manage discount codes." />
      <Card className="mb-6 p-6"><NewCouponForm /></Card>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-4 font-medium">Code</th><th className="p-4 font-medium">Discount</th>
              <th className="p-4 font-medium">Redeemed</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-b last:border-0">
                <td className="p-4 font-mono font-medium">{c.code}</td>
                <td className="p-4">{c.type === "PERCENT" ? `${c.value}%` : formatMoney(c.value)}</td>
                <td className="p-4 text-muted-foreground">{c.timesRedeemed}{c.maxRedemptions ? `/${c.maxRedemptions}` : ""}</td>
                <td className="p-4">{c.isActive ? <Badge variant="success">Active</Badge> : <Badge variant="muted">Disabled</Badge>}</td>
                <td className="p-4"><CouponToggle couponId={c.id} active={c.isActive} /></td>
              </tr>
            ))}
            {coupons.length === 0 && <TableEmpty colSpan={5} label="No coupons yet — create one above." />}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
