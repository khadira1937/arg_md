"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { contactAction, type ContactState } from "@/app/actions/contact";
import { CALENDLY_URL } from "@/config/cta";

type FormAction = (prev: ContactState, formData: FormData) => Promise<ContactState>;

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="am-cta" style={{ width: "100%", justifyContent: "center" }} disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : label}
    </button>
  );
}

export function ContactForm({
  action: serverAction = contactAction,
  submitLabel = "Send message",
  subjectLabel = "Subject",
  messageLabel = "Message",
}: {
  action?: FormAction;
  submitLabel?: string;
  subjectLabel?: string;
  messageLabel?: string;
}) {
  const [state, action] = useActionState<ContactState, FormData>(serverAction, null);
  if (state?.success) {
    return (
      <div
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
          padding: 32, borderRadius: 16,
          border: "1px solid var(--argana-outline-variant)",
          background: "transparent",
          color: "var(--argana-on-surface)",
        }}
      >
        <CheckCircle2 style={{ width: 40, height: 40, color: "var(--argana-burnt)" }} />
        <p style={{ marginTop: 12, fontWeight: 600 }}>{state.success}</p>
        <p style={{ marginTop: 6, maxWidth: 320, fontSize: 14, color: "var(--argana-on-surface-muted)" }}>
          We usually reply within one business day. Prefer to talk it through now?
        </p>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="am-cta" style={{ marginTop: 20 }}>
          Book a call instead
        </a>
      </div>
    );
  }
  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {state?.error && (
        <p style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 6, fontSize: 14, color: "var(--argana-burnt)", border: "1px solid var(--argana-burnt)", background: "rgba(174,50,0,0.04)" }}>
          <AlertCircle style={{ width: 16, height: 16 }} /> {state.error}
        </p>
      )}
      <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))" }}>
        <div>
          <label htmlFor="name" className="am-label">Name</label>
          <input id="name" name="name" required className="am-input" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="email" className="am-label">Email</label>
          <input id="email" name="email" type="email" required className="am-input" placeholder="you@company.com" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="am-label">{subjectLabel}</label>
        <input id="subject" name="subject" required className="am-input" placeholder="Brief summary" />
      </div>
      <div>
        <label htmlFor="message" className="am-label">{messageLabel}</label>
        <textarea id="message" name="message" required rows={5} className="am-textarea" placeholder="Tell us a little about your project, goals or question." />
      </div>
      <Submit label={submitLabel} />
    </form>
  );
}
