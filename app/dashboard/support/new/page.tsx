import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/ui";
import { NewTicketForm } from "@/components/dashboard/ticket-forms";

export default async function NewTicketPage() {
  const user = await requireUser();
  const services = await prisma.serviceInstance.findMany({ where: { userId: user.id }, select: { id: true, label: true } });

  return (
    <div>
      <Link href="/dashboard/support" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to support
      </Link>
      <PageHeader title="New support ticket" />
      <Card className="max-w-2xl p-6">
        <NewTicketForm services={services} />
      </Card>
    </div>
  );
}
