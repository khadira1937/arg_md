import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/ui";
import { ProductFlag } from "@/components/admin/controls";

export default async function AdminProductsPage() {
  await requireStaff();
  const products = await prisma.product.findMany({
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    include: { category: true, _count: { select: { plans: true } } },
  });

  return (
    <div>
      <PageHeader title="Products" description="Toggle availability, featured placement and inquiry-only mode. Edit pricing under Pricing." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Plans</th>
              <th className="p-4 font-medium">Stripe</th>
              <th className="p-4 font-medium">Flags</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="p-4 font-medium"><Link href={`/${p.slug}`} className="hover:text-primary">{p.name}</Link></td>
                <td className="p-4 text-muted-foreground">{p.category.name}</td>
                <td className="p-4 text-muted-foreground">{p._count.plans}</td>
                <td className="p-4 text-xs text-muted-foreground">{p.stripeProductId ? "✓ synced" : "—"}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1.5">
                    <ProductFlag productId={p.id} field="isActive" on={p.isActive} label="Active" />
                    <ProductFlag productId={p.id} field="featured" on={p.featured} label="Featured" />
                    <ProductFlag productId={p.id} field="inquiryOnly" on={p.inquiryOnly} label="Inquiry" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
