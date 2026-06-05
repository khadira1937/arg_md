import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/ui";
import { TicketThread } from "@/components/dashboard/ticket-thread";
import { ReplyForm } from "@/components/dashboard/ticket-forms";
import { CloseTicketButton } from "@/components/admin/controls";

export default async function AdminTicketDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;
  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: { user: true, messages: { include: { author: { select: { name: true, email: true } } }, orderBy: { createdAt: "asc" } } },
  });
  if (!ticket) notFound();

  return (
    <div>
      <Link href="/admin/tickets" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <PageHeader
        title={ticket.subject}
        description={`${ticket.number} · ${ticket.user.email} · ${ticket.priority.toLowerCase()} priority`}
        action={<div className="flex items-center gap-3"><StatusBadge status={ticket.status} />{ticket.status !== "CLOSED" && <CloseTicketButton ticketId={ticket.id} />}</div>}
      />
      <Card className="p-6">
        <TicketThread messages={ticket.messages} />
        {ticket.status !== "CLOSED" && (
          <div className="mt-6 border-t pt-6"><ReplyForm ticketId={ticket.id} /></div>
        )}
      </Card>
    </div>
  );
}
