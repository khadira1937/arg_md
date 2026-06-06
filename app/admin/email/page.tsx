import { Mail, CheckCircle2, AlertTriangle } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { env } from "@/config/env";
import { activeTransport, transportLabel } from "@/lib/email";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/ui";
import { TestEmailForm } from "@/components/admin/controls";

const EVENTS = [
  "Email verification", "Password reset", "Order confirmation", "Payment confirmation",
  "Invoice paid", "Service awaiting setup (order email)", "Service delivered (management link)",
  "Support ticket created", "Support ticket replied", "Admin new paid order",
];

export default async function AdminEmailPage() {
  const user = await requireStaff();
  const transport = activeTransport();
  const configured = transport !== "none";

  const checklist = [
    { label: "Transport configured", ok: configured, detail: transportLabel() },
    { label: "From address set", ok: Boolean(env.EMAIL_FROM), detail: env.EMAIL_FROM },
    { label: "Resend API key", ok: Boolean(env.RESEND_API_KEY), detail: env.RESEND_API_KEY ? "set" : "not set" },
    { label: "SMTP host", ok: Boolean(env.SMTP_HOST), detail: env.SMTP_HOST ? `${env.SMTP_HOST}:${env.SMTP_PORT}` : "not set" },
  ];

  return (
    <div>
      <PageHeader title="Email diagnostics" description="Verify transactional email delivery and configuration." />

      <Card className={`mb-6 flex items-center gap-3 p-4 ${configured ? "border-success/40 bg-success/5" : "border-amber-300 bg-amber-50/50"}`}>
        {configured ? <CheckCircle2 className="h-5 w-5 text-success" /> : <AlertTriangle className="h-5 w-5 text-amber-600" />}
        <div>
          <p className="text-sm font-medium">Active transport: {transportLabel()} <Badge variant={configured ? "success" : "warning"} className="ml-1">{transport}</Badge></p>
          <p className="text-xs text-muted-foreground">
            {transport === "resend" && "Emails are sent through the Resend API."}
            {transport === "mailpit" && "Local dev: emails are captured by Mailpit at http://localhost:8025 (nothing leaves your machine)."}
            {transport === "smtp" && "Emails are sent through your configured SMTP server."}
            {transport === "none" && "Set RESEND_API_KEY or SMTP_HOST in your environment to enable email."}
          </p>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 flex items-center gap-2 font-semibold"><Mail className="h-4 w-4" /> Send a test email</h2>
          <TestEmailForm defaultTo={user.email} />
          <p className="mt-3 text-xs text-muted-foreground">Sends a diagnostic message via the active transport so you can confirm delivery end-to-end.</p>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 font-semibold">Configuration checklist</h2>
          <ul className="space-y-2.5 text-sm">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  {c.ok ? <CheckCircle2 className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-amber-500" />}
                  {c.label}
                </span>
                <span className="truncate text-xs text-muted-foreground">{c.detail}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h2 className="mb-1 font-semibold">Transactional events</h2>
        <p className="mb-4 text-xs text-muted-foreground">These emails fire automatically across the app. None of them include passwords or internal admin notes.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {EVENTS.map((e) => (
            <div key={e} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success" /> {e}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
