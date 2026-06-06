"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send, MailCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deliverServiceAction, resendDeliveryEmailAction } from "@/app/actions/admin";

type Defaults = {
  externalManagementUrl?: string | null;
  externalProviderName?: string | null;
  externalServiceId?: string | null;
  externalUsername?: string | null;
  customerInstructions?: string | null;
  internalAdminNotes?: string | null;
};

export function DeliveryForm({ serviceId, delivered, defaults }: { serviceId: string; delivered: boolean; defaults: Defaults }) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [resending, setResending] = React.useState(false);
  const [msg, setMsg] = React.useState<{ ok: boolean; text: string } | null>(null);

  async function submit(formData: FormData) {
    setPending(true);
    setMsg(null);
    const res = await deliverServiceAction(formData);
    setPending(false);
    setMsg({ ok: res.ok, text: res.ok ? res.message ?? "Delivered." : res.error ?? "Failed." });
    if (res.ok) router.refresh();
  }

  async function resend() {
    setResending(true);
    setMsg(null);
    const res = await resendDeliveryEmailAction(serviceId);
    setResending(false);
    setMsg({ ok: res.ok, text: res.ok ? res.message ?? "Sent." : res.error ?? "Failed." });
  }

  return (
    <form action={submit} className="space-y-4">
      <input type="hidden" name="serviceId" value={serviceId} />

      {msg && (
        <p className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${msg.ok ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
          {msg.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />} {msg.text}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="externalManagementUrl" label="Management URL *" placeholder="https://panel.provider.com/abc" defaultValue={defaults.externalManagementUrl} required className="sm:col-span-2" />
        <Field name="externalProviderName" label="Provider name" placeholder="Hetzner, DigitalOcean…" defaultValue={defaults.externalProviderName} />
        <Field name="externalServiceId" label="External service ID" placeholder="srv-123456" defaultValue={defaults.externalServiceId} />
        <Field name="externalUsername" label="Username (optional, no passwords)" placeholder="admin" defaultValue={defaults.externalUsername} className="sm:col-span-2" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="customerInstructions">Customer instructions (emailed to the customer)</Label>
        <textarea id="customerInstructions" name="customerInstructions" rows={3} defaultValue={defaults.customerInstructions ?? ""} className="w-full rounded-lg border bg-background p-3 text-sm" placeholder="How to access and get started…" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="internalAdminNotes">Internal admin notes (private — never shown to the customer)</Label>
        <textarea id="internalAdminNotes" name="internalAdminNotes" rows={2} defaultValue={defaults.internalAdminNotes ?? ""} className="w-full rounded-lg border bg-muted/40 p-3 text-sm" placeholder="Root creds stored in vault, etc." />
      </div>

      <p className="text-xs text-muted-foreground">🔒 Passwords are never emailed. The customer receives only the management link and your instructions.</p>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="gradient" disabled={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {delivered ? "Update & re-notify" : "Mark as delivered"}
        </Button>
        {delivered && (
          <Button type="button" variant="outline" onClick={resend} disabled={resending}>
            {resending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MailCheck className="h-4 w-4" />}
            Resend delivery email
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({ name, label, placeholder, defaultValue, required, className }: { name: string; label: string; placeholder?: string; defaultValue?: string | null; required?: boolean; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} placeholder={placeholder} defaultValue={defaultValue ?? ""} required={required} />
    </div>
  );
}
