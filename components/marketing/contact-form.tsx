"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactAction, type ContactState } from "@/app/actions/contact";

function Submit() {
  const { pending } = useFormStatus();
  return <Button type="submit" variant="gradient" className="w-full" disabled={pending}>{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send message"}</Button>;
}

export function ContactForm() {
  const [state, action] = useActionState<ContactState, FormData>(contactAction, null);
  if (state?.success) {
    return (
      <div className="flex flex-col items-center rounded-2xl border bg-success/5 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <p className="mt-3 font-medium">{state.success}</p>
      </div>
    );
  }
  return (
    <form action={action} className="space-y-4">
      {state?.error && <p className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"><AlertCircle className="h-4 w-4" /> {state.error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
      </div>
      <div className="space-y-2"><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" required /></div>
      <div className="space-y-2"><Label htmlFor="message">Message</Label><textarea id="message" name="message" required rows={5} className="w-full rounded-lg border bg-background p-3 text-sm" /></div>
      <Submit />
    </form>
  );
}
