"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isPlaceholderMode } from "@/lib/stripe/client";
import { sendEmail } from "@/lib/email";
import { formatMoney } from "@/lib/pricing";

export type PayResult = { ok: boolean; error?: string; redirectUrl?: string };

/**
 * Pay an open invoice. In placeholder/local mode this marks it paid and records
 * a payment. With real Stripe, return the hosted invoice URL if available.
 */
export async function payInvoiceAction(invoiceId: string): Promise<PayResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Not authenticated" };

  const invoice = await prisma.invoice.findFirst({ where: { id: invoiceId, userId: user.id } });
  if (!invoice) return { ok: false, error: "Invoice not found" };
  if (invoice.status === "PAID") return { ok: true };

  if (!isPlaceholderMode() && invoice.hostedInvoiceUrl) {
    return { ok: true, redirectUrl: invoice.hostedInvoiceUrl };
  }

  await prisma.$transaction([
    prisma.invoice.update({ where: { id: invoice.id }, data: { status: "PAID", amountPaid: invoice.total, paidAt: new Date() } }),
    prisma.payment.create({ data: { userId: user.id, invoiceId: invoice.id, status: "SUCCEEDED", currency: invoice.currency, amount: invoice.total, method: "card" } }),
  ]);

  await sendEmail({ to: user.email, template: { type: "invoice_paid", name: user.name ?? "there", invoiceNumber: invoice.number, amount: formatMoney(invoice.total, invoice.currency) } });

  revalidatePath("/dashboard/invoices");
  return { ok: true };
}
