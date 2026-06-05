import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/ui";

export default async function AdminTicketsPage() {
  await requireStaff();
  const tickets = await prisma.supportTicket.findMany({ orderBy: { lastReplyAt: "desc" }, take: 100, include: { user: true, _count: { select: { messages: true } } } });

  return (
    <div>
      <PageHeader title="Support tickets" description="All customer tickets." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-4 font-medium">Ticket</th><th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Priority</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="p-4"><Link href={`/admin/tickets/${t.id}`} className="font-medium hover:text-primary">{t.subject}</Link><p className="text-xs text-muted-foreground">{t.number}</p></td>
                <td className="p-4 text-muted-foreground">{t.user.email}</td>
                <td className="p-4 text-muted-foreground capitalize">{t.priority.toLowerCase()}</td>
                <td className="p-4"><StatusBadge status={t.status} /></td>
                <td className="p-4 text-muted-foreground">{t.lastReplyAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
