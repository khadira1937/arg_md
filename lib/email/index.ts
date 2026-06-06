import "server-only";
import nodemailer from "nodemailer";
import { env } from "@/config/env";
import { brand } from "@/config/brand";
import { renderEmail, type EmailTemplate } from "@/emails/templates";

let transporter: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
  });
  return transporter;
}

export type TransportKind = "resend" | "smtp" | "mailpit" | "none";

/** Which transport will actually be used, based on env. Resend wins if its key is set. */
export function activeTransport(): TransportKind {
  if (env.RESEND_API_KEY) return "resend";
  if (env.SMTP_HOST) {
    return env.SMTP_HOST === "localhost" && env.SMTP_PORT === 1025 ? "mailpit" : "smtp";
  }
  return "none";
}

/** Human-readable description of the active transport (for admin diagnostics). */
export function transportLabel(): string {
  switch (activeTransport()) {
    case "resend":
      return "Resend API";
    case "mailpit":
      return "Local SMTP (Mailpit @ localhost:1025)";
    case "smtp":
      return `SMTP (${env.SMTP_HOST}:${env.SMTP_PORT})`;
    default:
      return "Not configured";
  }
}

export type SendResult = { ok: boolean; transport: TransportKind; error?: string };

async function deliver(to: string, subject: string, html: string, text: string): Promise<SendResult> {
  const transport = activeTransport();
  if (transport === "none") {
    const error = "No email transport configured (set RESEND_API_KEY or SMTP_HOST).";
    console.warn(`[email] ${error} — skipped "${subject}" to ${to}`);
    return { ok: false, transport, error };
  }
  try {
    if (transport === "resend") {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: env.EMAIL_FROM, to, subject, html, text }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    } else {
      await getTransport().sendMail({ from: env.EMAIL_FROM, to, subject, html, text });
    }
    console.log(`[email] sent "${subject}" to ${to} via ${transport}`);
    return { ok: true, transport };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error(`[email] failed to send "${subject}" to ${to} via ${transport}:`, error);
    return { ok: false, transport, error };
  }
}

type SendArgs = { to: string; template: EmailTemplate };

/**
 * Send a transactional email via the active transport (Resend or SMTP/Mailpit).
 * Never throws — failures are logged and returned so a flaky mail server can't
 * break checkout, fulfillment or delivery.
 */
export async function sendEmail({ to, template }: SendArgs): Promise<SendResult> {
  const { subject, html, text } = renderEmail(template);
  return deliver(to, subject, html, text);
}

/** Send a simple diagnostic email (admin "send test email" / CLI). */
export async function sendTestEmail(to: string): Promise<SendResult> {
  const subject = `✅ Test email from ${brand.name}`;
  const html = `<!doctype html><html><body style="font-family:Segoe UI,Arial,sans-serif;padding:24px;color:#0f172a">
    <h1 style="font-size:20px">Your email is working 🎉</h1>
    <p>This is a test message from <b>${brand.name}</b> sent via <b>${transportLabel()}</b>.</p>
    <p style="color:#64748b;font-size:13px">If you received this, transactional emails are configured correctly.</p>
  </body></html>`;
  return deliver(to, subject, html, `Test email from ${brand.name} via ${transportLabel()}. Email is working.`);
}
