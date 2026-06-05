"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, AlertCircle, Tag, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { startCheckoutAction, applyCouponAction, type CheckoutState } from "@/app/actions/checkout";

type Defaults = {
  name?: string | null; company?: string | null; phone?: string | null; address?: string | null;
  city?: string | null; state?: string | null; country?: string | null; postalCode?: string | null;
};

function Pay() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Lock className="h-4 w-4" /> Complete order</>}
    </Button>
  );
}

export function CheckoutForm({ defaults }: { defaults: Defaults }) {
  const [state, action] = useActionState<CheckoutState, FormData>(startCheckoutAction, null);
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; message: string } | null>(null);

  async function checkCoupon() {
    if (!coupon.trim()) return;
    setCouponMsg(await applyCouponAction(coupon.trim()));
  }

  return (
    <form action={action} className="space-y-5">
      {state?.error && (
        <p className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" /> {state.error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" defaultValue={defaults.name} required />
        <Field name="company" label="Company (optional)" defaultValue={defaults.company} />
        <Field name="address" label="Address" defaultValue={defaults.address} className="sm:col-span-2" />
        <Field name="city" label="City" defaultValue={defaults.city} />
        <Field name="state" label="State / Region" defaultValue={defaults.state} />
        <Field name="postalCode" label="Postal code" defaultValue={defaults.postalCode} />
        <Field name="country" label="Country" defaultValue={defaults.country} />
        <Field name="phone" label="Phone (optional)" defaultValue={defaults.phone} />
        <Field name="taxId" label="Tax ID (optional)" className="sm:col-span-2" />
      </div>

      <div>
        <Label className="mb-2 block">Coupon code</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input name="couponCode" value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="WELCOME20" className="pl-9" />
          </div>
          <Button type="button" variant="outline" onClick={checkCoupon}>Apply</Button>
        </div>
        {couponMsg && (
          <p className={`mt-1.5 text-xs ${couponMsg.ok ? "text-success" : "text-destructive"}`}>{couponMsg.message}</p>
        )}
      </div>

      <Pay />
      <p className="text-center text-xs text-muted-foreground">
        Your payment is processed securely. You can cancel any time from your dashboard.
      </p>
    </form>
  );
}

function Field({ name, label, defaultValue, required, className }: { name: string; label: string; defaultValue?: string | null; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="mb-1.5 block">{label}</Label>
      <Input id={name} name={name} defaultValue={defaultValue ?? ""} required={required} />
    </div>
  );
}
