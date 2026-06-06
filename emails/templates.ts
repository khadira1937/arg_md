import { brand } from "@/config/brand";
import { absoluteUrl } from "@/lib/utils";

/** Discriminated union of every transactional email this app can send. */
export type EmailTemplate =
  | { type: "verify_email"; name: string; url: string }
  | { type: "reset_password"; name: string; url: string }
  | { type: "order_confirmation"; name: string; orderNumber: string; total: string }
  | { type: "payment_confirmation"; name: string; amount: string; invoiceNumber: string }
  | { type: "invoice_paid"; name: string; invoiceNumber: string; amount: string }
  | { type: "service_provisioning"; name: string; serviceLabel: string }
  | { type: "service_activated"; name: string; serviceLabel: string; url: string }
  | { type: "service_delivered"; name: string; serviceLabel: string; manageUrl: string; providerName?: string; instructions?: string }
  | { type: "service_suspended"; name: string; serviceLabel: string; reason?: string }
  | { type: "renewal_reminder"; name: string; serviceLabel: string; renewsAt: string }
  | { type: "ticket_created"; name: string; ticketNumber: string; subject: string }
  | { type: "ticket_replied"; name: string; ticketNumber: string; url: string }
  | { type: "admin_new_order"; orderNumber: string; customer: string; total: string };

type Rendered = { subject: string; html: string; text: string };

function layout(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f4f5fb;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px">
    <div style="font-size:20px;font-weight:700;background:linear-gradient(135deg,#4f46e5,#7c3aed,#06b6d4);-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:24px">${brand.name}</div>
    <div style="background:#fff;border-radius:16px;padding:32px;box-shadow:0 1px 3px rgba(15,23,42,.08)">
      <h1 style="font-size:20px;margin:0 0 16px">${title}</h1>
      ${bodyHtml}
    </div>
    <p style="color:#64748b;font-size:12px;text-align:center;margin-top:24px">
      ${brand.legalName} · ${brand.tagline}<br/>
      Need help? <a href="${absoluteUrl("/support")}" style="color:#4f46e5">Contact support</a>
    </p>
  </div></body></html>`;
}

function button(label: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:600;margin:8px 0">${label}</a>`;
}

function p(text: string): string {
  return `<p style="font-size:14px;line-height:1.6;color:#334155;margin:0 0 12px">${text}</p>`;
}

export function renderEmail(t: EmailTemplate): Rendered {
  switch (t.type) {
    case "verify_email":
      return {
        subject: `Verify your ${brand.name} email`,
        html: layout(
          "Confirm your email",
          p(`Hi ${t.name}, welcome to ${brand.name}. Confirm your email to activate your account.`) +
            button("Verify email", t.url) +
            p(`Or paste this link: ${t.url}`),
        ),
        text: `Verify your email: ${t.url}`,
      };
    case "reset_password":
      return {
        subject: `Reset your ${brand.name} password`,
        html: layout(
          "Reset your password",
          p(`Hi ${t.name}, we received a request to reset your password. This link expires in 1 hour.`) +
            button("Reset password", t.url),
        ),
        text: `Reset your password: ${t.url}`,
      };
    case "order_confirmation":
      return {
        subject: `Order ${t.orderNumber} received`,
        html: layout(
          "Thanks for your order",
          p(`Hi ${t.name}, we've received order <b>${t.orderNumber}</b> totaling <b>${t.total}</b>.`) +
            p("We'll email you again once payment is confirmed and your service is provisioning.") +
            button("View dashboard", absoluteUrl("/dashboard/orders")),
        ),
        text: `Order ${t.orderNumber} received — total ${t.total}`,
      };
    case "payment_confirmation":
      return {
        subject: `Payment received — ${t.amount}`,
        html: layout(
          "Payment confirmed",
          p(`Hi ${t.name}, we've received your payment of <b>${t.amount}</b> for invoice <b>${t.invoiceNumber}</b>.`) +
            button("View invoices", absoluteUrl("/dashboard/invoices")),
        ),
        text: `Payment received: ${t.amount} (${t.invoiceNumber})`,
      };
    case "invoice_paid":
      return {
        subject: `Invoice ${t.invoiceNumber} paid`,
        html: layout(
          "Invoice paid",
          p(`Hi ${t.name}, invoice <b>${t.invoiceNumber}</b> for <b>${t.amount}</b> is now marked paid. Thank you!`),
        ),
        text: `Invoice ${t.invoiceNumber} paid — ${t.amount}`,
      };
    case "service_provisioning":
      return {
        subject: `Provisioning started — ${t.serviceLabel}`,
        html: layout(
          "We're setting things up",
          p(`Hi ${t.name}, provisioning has started for <b>${t.serviceLabel}</b>. You'll get another email when it's live.`),
        ),
        text: `Provisioning started for ${t.serviceLabel}`,
      };
    case "service_activated":
      return {
        subject: `${t.serviceLabel} is live 🎉`,
        html: layout(
          "Your service is active",
          p(`Hi ${t.name}, <b>${t.serviceLabel}</b> is now active. Access credentials are available in your dashboard.`) +
            button("Open service", t.url),
        ),
        text: `${t.serviceLabel} is active: ${t.url}`,
      };
    case "service_delivered":
      return {
        subject: `${t.serviceLabel} is ready 🎉`,
        html: layout(
          "Your service is ready",
          p(`Hi ${t.name}, your service <b>${t.serviceLabel}</b> has been set up${t.providerName ? ` on <b>${t.providerName}</b>` : ""} and is ready to use.`) +
            button("Manage your service", t.manageUrl) +
            (t.instructions ? p(`<b>Getting started:</b><br/>${t.instructions.replace(/\n/g, "<br/>")}`) : "") +
            p(`For your security we never send passwords by email. Use the button above to access your management portal, where you can sign in or set your credentials.`) +
            p(`You can always find this link in your <a href="${absoluteUrl("/dashboard/services")}">dashboard</a>.`),
        ),
        text: `${t.serviceLabel} is ready. Manage it here: ${t.manageUrl}`,
      };
    case "service_suspended":
      return {
        subject: `${t.serviceLabel} suspended`,
        html: layout(
          "Service suspended",
          p(`Hi ${t.name}, <b>${t.serviceLabel}</b> has been suspended.${t.reason ? ` Reason: ${t.reason}.` : ""}`) +
            button("Resolve now", absoluteUrl("/dashboard/services")),
        ),
        text: `${t.serviceLabel} suspended`,
      };
    case "renewal_reminder":
      return {
        subject: `Renewal reminder — ${t.serviceLabel}`,
        html: layout(
          "Upcoming renewal",
          p(`Hi ${t.name}, <b>${t.serviceLabel}</b> renews on <b>${t.renewsAt}</b>. No action needed if your card is up to date.`),
        ),
        text: `${t.serviceLabel} renews on ${t.renewsAt}`,
      };
    case "ticket_created":
      return {
        subject: `[${t.ticketNumber}] ${t.subject}`,
        html: layout(
          "We got your ticket",
          p(`Hi ${t.name}, your ticket <b>${t.ticketNumber}</b> has been created. Our team will reply shortly.`),
        ),
        text: `Ticket ${t.ticketNumber} created`,
      };
    case "ticket_replied":
      return {
        subject: `New reply on ${t.ticketNumber}`,
        html: layout(
          "New reply",
          p(`Hi ${t.name}, there's a new reply on ticket <b>${t.ticketNumber}</b>.`) +
            button("View ticket", t.url),
        ),
        text: `New reply on ${t.ticketNumber}: ${t.url}`,
      };
    case "admin_new_order":
      return {
        subject: `New order ${t.orderNumber} — ${t.total}`,
        html: layout(
          "New order received",
          p(`Order <b>${t.orderNumber}</b> from <b>${t.customer}</b> totaling <b>${t.total}</b>.`) +
            button("Open admin", absoluteUrl("/admin/orders")),
        ),
        text: `New order ${t.orderNumber} from ${t.customer} — ${t.total}`,
      };
  }
}
