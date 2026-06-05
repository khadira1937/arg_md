import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/ui";
import { TicketThread } from "@/components/dashboard/ticket-thread";
import { ReplyForm } from "@/components/dashboard/ticket-forms";

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const ticket = await prisma.supportTicket.findFirst({
    where: { id, userId: user.id },
    include: { messages: { include: { author: { select: { name: true, email: true } } }, orderBy: { createdAt: "asc" } }, serviceInstance: true },
  });
  if (!ticket) notFound();

  return (
    <div>
      <Link href="/dashboard/support" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to support
      </Link>
      <PageHeader title={ticket.subject} description={`${ticket.number} · ${ticket.category} · ${ticket.priority.toLowerCase()} priority`} action={<StatusBadge status={ticket.status} />} />

      <Card className="p-6">
        <TicketThread messages={ticket.messages} />
        {ticket.status !== "CLOSED" && (
          <div className="mt-6 border-t pt-6">
            <ReplyForm ticketId={ticket.id} />
          </div>
        )}
      </Card>
    </div>
  );
}
