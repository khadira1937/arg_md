import Link from "next/link";
import { Server, ArrowRight, Plus } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, StatusBadge, EmptyState } from "@/components/dashboard/ui";

export default async function ServicesPage() {
  const user = await requireUser();
  const services = await prisma.serviceInstance.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { product: true, plan: true, location: true },
  });

  return (
    <div>
      <PageHeader
        title="Projects"
        description="All your projects and services with their current status."
        action={<Button asChild variant="gradient"><Link href="/services"><Plus className="h-4 w-4" /> Request service</Link></Button>}
      />
      {services.length === 0 ? (
        <EmptyState icon={Server} title="No projects yet" description="Request a service to start your first project." actionLabel="View services" actionHref="/services" />
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <Link key={s.id} href={`/dashboard/services/${s.id}`}>
              <Card className="flex flex-wrap items-center justify-between gap-4 p-5 transition-colors hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Server className="h-5 w-5" /></span>
                  <div>
                    <p className="font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.product.name} · {s.plan.name}{s.location ? ` · ${s.location.flagEmoji} ${s.location.city}` : ""}
                      {s.primaryIp ? ` · ${s.primaryIp}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={s.status} />
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
