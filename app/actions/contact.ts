"use server";

import { contactSchema, inquirySchema } from "@/lib/validators";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { brand } from "@/config/brand";

export type ContactState = { error?: string; success?: string } | null;

async function ip() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

export async function contactAction(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (!rateLimit(`contact:${await ip()}`, 5, 60_000).success) return { error: "Too many messages. Please try again shortly." };

  const parsed = contactSchema.safeParse({
    name: formData.get("name"), email: formData.get("email"),
    subject: formData.get("subject"), message: formData.get("message"),
  });
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Please check the form." };

  // Route to support inbox + acknowledge the sender.
  await sendEmail({ to: brand.email.support, template: { type: "ticket_created", name: parsed.data.name, ticketNumber: "CONTACT", subject: `${parsed.data.subject} — ${parsed.data.email}` } });
  return { success: "Thanks! We've received your message and will reply by email soon." };
}

export async function inquiryAction(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (!rateLimit(`inquiry:${await ip()}`, 5, 60_000).success) return { error: "Too many requests. Please try again shortly." };

  const parsed = inquirySchema.safeParse({
    name: formData.get("name"), email: formData.get("email"),
    company: formData.get("company") ?? "", productSlug: formData.get("productSlug"), message: formData.get("message"),
  });
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Please check the form." };

  await sendEmail({ to: brand.email.sales, template: { type: "ticket_created", name: parsed.data.name, ticketNumber: "SALES", subject: `Inquiry: ${parsed.data.productSlug} — ${parsed.data.email}` } });
  return { success: "Thanks! Our sales team will be in touch shortly." };
}
