"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Copy, Check, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cancelServiceAction } from "@/app/actions/services";

export function CredentialsCard({ credentials }: { credentials: Record<string, unknown> }) {
  const [show, setShow] = React.useState(false);
  const [copied, setCopied] = React.useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const entries = Object.entries(credentials).filter(([, v]) => v != null && v !== "");

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Access credentials</h2>
        <Button variant="outline" size="sm" onClick={() => setShow((s) => !s)}>
          {show ? <><EyeOff className="h-4 w-4" /> Hide</> : <><Eye className="h-4 w-4" /> Reveal</>}
        </Button>
      </div>
      <dl className="space-y-2.5">
        {entries.map(([key, value]) => {
          const isSecret = /password|secret|key/i.test(key);
          const str = String(value);
          return (
            <div key={key} className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2">
              <dt className="text-xs font-medium capitalize text-muted-foreground">{key}</dt>
              <dd className="flex items-center gap-2 font-mono text-sm">
                <span>{isSecret && !show ? "•".repeat(10) : str}</span>
                <button onClick={() => copy(key, str)} className="text-muted-foreground hover:text-foreground" aria-label="Copy">
                  {copied === key ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-3 text-xs text-muted-foreground">Credentials are stored encrypted (AES-256-GCM) and only decrypted for you.</p>
    </Card>
  );
}

export function CancelServiceButton({ serviceId, disabled }: { serviceId: string; disabled?: boolean }) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  async function cancel() {
    setPending(true);
    const res = await cancelServiceAction(serviceId);
    setPending(false);
    if (res.ok) router.refresh();
    else alert(res.error);
  }

  if (disabled) return null;

  return confirming ? (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 text-sm text-muted-foreground"><AlertTriangle className="h-4 w-4 text-amber-500" /> Are you sure?</span>
      <Button variant="destructive" size="sm" onClick={cancel} disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm cancel"}
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>Keep</Button>
    </div>
  ) : (
    <Button variant="outline" size="sm" onClick={() => setConfirming(true)}>Cancel service</Button>
  );
}
