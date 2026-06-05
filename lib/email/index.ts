import "server-only";
import nodemailer from "nodemailer";
import { env } from "@/config/env";
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

type SendArgs = { to: string; template: EmailTemplate };

/**
 * Send a transactional email. Uses Resend if RESEND_API_KEY is set, otherwise
 * SMTP (Mailpit in local dev). Failures are logged, never thrown to the caller,
 * so a flaky mail server can't break checkout/provisioning.
 */
export async function sendEmail({ to, template }: SendArgs): Promise<void> {
  const { subject, html, text } = renderEmail(template);
  try {
    if (env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: env.EMAIL_FROM, to, subject, html, text }),
      });
      if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
      return;
    }
    await getTransport().sendMail({ from: env.EMAIL_FROM, to, subject, html, text });
  } catch (err) {
    console.error(`[email] failed to send "${subject}" to ${to}:`, err);
  }
}
