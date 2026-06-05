"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTicketAction, replyTicketAction, type TicketState } from "@/app/actions/tickets";

function SubmitBtn({ label, icon }: { label: string; icon?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="gradient" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{icon}{label}</>}
    </Button>
  );
}

function Err({ state }: { state: TicketState }) {
  if (!state?.error) return null;
  return <p className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"><AlertCircle className="h-4 w-4" /> {state.error}</p>;
}

type ServiceOption = { id: string; label: string };

export function NewTicketForm({ services }: { services: ServiceOption[] }) {
  const [state, action] = useActionState<TicketState, FormData>(createTicketAction, null);
  return (
    <form action={action} className="space-y-4">
      <Err state={state} />
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" required placeholder="Briefly describe your issue" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select id="category" name="category" className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
            <option value="general">General</option>
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
            <option value="abuse">Abuse</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <select id="priority" name="priority" className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
            <option value="LOW">Low</option>
            <option value="NORMAL">Normal</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="serviceInstanceId">Related service</Label>
          <select id="serviceInstanceId" name="serviceInstanceId" className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
            <option value="">None</option>
            {services.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea id="message" name="message" required rows={5} className="w-full rounded-lg border bg-background p-3 text-sm" placeholder="Tell us what's happening…" />
      </div>
      <SubmitBtn label="Open ticket" />
    </form>
  );
}

export function ReplyForm({ ticketId }: { ticketId: string }) {
  const [state, action] = useActionState<TicketState, FormData>(replyTicketAction, null);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="ticketId" value={ticketId} />
      <Err state={state} />
      <textarea name="body" required rows={4} className="w-full rounded-lg border bg-background p-3 text-sm" placeholder="Write a reply…" />
      <SubmitBtn label="Send reply" icon={<Send className="h-4 w-4" />} />
    </form>
  );
}
