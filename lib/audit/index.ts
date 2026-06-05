import "server-only";
import { prisma } from "@/lib/db";

type AuditInput = {
  actorId?: string | null;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ip?: string;
};

/** Record a privileged action to the admin audit log. Never throws. */
export async function audit(input: AuditInput): Promise<void> {
  try {
    await prisma.adminLog.create({
      data: {
        actorId: input.actorId ?? null,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId,
        metadata: input.metadata as object | undefined,
        ip: input.ip,
      },
    });
  } catch (err) {
    console.error("[audit] failed to record action", input.action, err);
  }
}
