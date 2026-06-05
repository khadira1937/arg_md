"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileAction, type ProfileState } from "@/app/actions/profile";

type Values = Record<string, string | null | undefined>;

function Save() {
  const { pending } = useFormStatus();
  return <Button type="submit" variant="gradient" disabled={pending}>{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save changes"}</Button>;
}

export function ProfileForm({ values }: { values: Values }) {
  const [state, action] = useActionState<ProfileState, FormData>(updateProfileAction, null);
  return (
    <form action={action} className="space-y-5">
      {state?.error && <p className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"><AlertCircle className="h-4 w-4" /> {state.error}</p>}
      {state?.success && <p className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm text-success"><CheckCircle2 className="h-4 w-4" /> {state.success}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <F name="name" label="Full name" v={values.name} required />
        <F name="company" label="Company" v={values.company} />
        <F name="email" label="Email" v={values.email} disabled />
        <F name="phone" label="Phone" v={values.phone} />
        <F name="address" label="Address" v={values.address} className="sm:col-span-2" />
        <F name="city" label="City" v={values.city} />
        <F name="state" label="State / Region" v={values.state} />
        <F name="postalCode" label="Postal code" v={values.postalCode} />
        <F name="country" label="Country" v={values.country} />
        <F name="taxId" label="Tax ID" v={values.taxId} className="sm:col-span-2" />
      </div>
      <Save />
    </form>
  );
}

function F({ name, label, v, required, disabled, className }: { name: string; label: string; v?: string | null; required?: boolean; disabled?: boolean; className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="mb-1.5 block">{label}</Label>
      <Input id={name} name={name} defaultValue={v ?? ""} required={required} disabled={disabled} />
    </div>
  );
}
