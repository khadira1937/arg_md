import Link from "next/link";
import { LifeBuoy, Plus } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, StatusBadge, EmptyState } from "@/components/dashboard/ui";

export default async function SupportPage() {
  const user = await requireUser();
  const tickets = await prisma.supportTicket.findMany({ where: { userId: user.id }, orderBy: { lastReplyAt: "desc" }, include: { messages: true } });

  return (
    <div>
      <PageHeader
        title="Support tickets"
        description="Open a ticket and our team will help."
        action={<Button asChild variant="gradient"><Link href="/dashboard/support/new"><Plus className="h-4 w-4" /> New ticket</Link></Button>}
      />
      {tickets.length === 0 ? (
        <EmptyState icon={LifeBuoy} title="No tickets yet" description="Need help? Open your first ticket." actionLabel="New ticket" actionHref="/dashboard/support/new" />
      ) : (
        <div className="space-y-3">
          {tickets.map((t) => (
            <Link key={t.id} href={`/dashboard/support/${t.id}`}>
              <Card className="flex flex-wrap items-center justify-between gap-4 p-5 transition-colors hover:border-primary/40">
                <div>
                  <p className="font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">{t.number} · {t.messages.length} message{t.messages.length !== 1 ? "s" : ""} · {t.lastReplyAt.toLocaleDateString()}</p>
                </div>
                <StatusBadge status={t.status} />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
