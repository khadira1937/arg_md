"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isStaff } from "@/lib/permissions";
import { ticketSchema, ticketReplySchema } from "@/lib/validators";
import { sendEmail } from "@/lib/email";
import { absoluteUrl, shortId } from "@/lib/utils";
import { brand } from "@/config/brand";

export type TicketState = { error?: string } | null;

export async function createTicketAction(_prev: TicketState, formData: FormData): Promise<TicketState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = ticketSchema.safeParse({
    subject: formData.get("subject"),
    category: formData.get("category") ?? "general",
    priority: formData.get("priority") ?? "NORMAL",
    message: formData.get("message"),
    serviceInstanceId: formData.get("serviceInstanceId") || null,
  });
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Invalid input" };

  const ticket = await prisma.supportTicket.create({
    data: {
      number: `TKT-${shortId(6)}`,
      userId: user.id,
      subject: parsed.data.subject,
      category: parsed.data.category,
      priority: parsed.data.priority,
      serviceInstanceId: parsed.data.serviceInstanceId ?? null,
      status: "OPEN",
      messages: { create: { authorId: user.id, body: parsed.data.message, isStaff: false } },
    },
  });

  await sendEmail({ to: user.email, template: { type: "ticket_created", name: user.name ?? "there", ticketNumber: ticket.number, subject: ticket.subject } });
  await sendEmail({ to: brand.email.support, template: { type: "ticket_created", name: "team", ticketNumber: ticket.number, subject: ticket.subject } });

  redirect(`/dashboard/support/${ticket.id}`);
}

export async function replyTicketAction(_prev: TicketState, formData: FormData): Promise<TicketState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = ticketReplySchema.safeParse({ ticketId: formData.get("ticketId"), body: formData.get("body") });
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Invalid input" };

  const staff = isStaff(user.role);
  const ticket = await prisma.supportTicket.findFirst({
    where: { id: parsed.data.ticketId, ...(staff ? {} : { userId: user.id }) },
    include: { user: true },
  });
  if (!ticket) return { error: "Ticket not found" };

  await prisma.ticketMessage.create({ data: { ticketId: ticket.id, authorId: user.id, body: parsed.data.body, isStaff: staff } });
  await prisma.supportTicket.update({
    where: { id: ticket.id },
    data: { lastReplyAt: new Date(), status: staff ? "ANSWERED" : "PENDING", ...(staff ? { assignedToId: user.id } : {}) },
  });

  // Notify the other party.
  const base = staff ? "/dashboard/support" : "/admin/tickets";
  const recipient = staff ? ticket.user.email : brand.email.support;
  await sendEmail({ to: recipient, template: { type: "ticket_replied", name: staff ? (ticket.user.name ?? "there") : "team", ticketNumber: ticket.number, url: absoluteUrl(`${base}/${ticket.id}`) } });

  revalidatePath(`/dashboard/support/${ticket.id}`);
  revalidatePath(`/admin/tickets/${ticket.id}`);
  return null;
}
