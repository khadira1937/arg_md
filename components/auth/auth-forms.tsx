"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle2, Mail, Lock } from "lucide-react";
import {
  loginAction,
  registerAction,
  forgotPasswordAction,
  resetPasswordAction,
  type AuthState,
} from "@/app/actions/auth";

/* ─────────────────────────── shared primitives ─────────────────────────── */

function Submit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="am-cta" style={{ width: "100%", justifyContent: "center" }} disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  );
}

function Alert({ state }: { state: AuthState }) {
  if (!state) return null;
  if (state.error) {
    return (
      <p
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 6,
          fontSize: 14,
          color: "var(--argana-burnt)",
          border: "1px solid var(--argana-burnt)",
          background: "rgba(174,50,0,0.04)",
        }}
      >
        <AlertCircle style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }} /> {state.error}
      </p>
    );
  }
  if (state.success) {
    return (
      <p
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 6,
          fontSize: 14,
          color: "var(--argana-on-surface)",
          border: "1px solid var(--argana-outline-variant)",
          background: "transparent",
        }}
      >
        <CheckCircle2 style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2, color: "var(--argana-burnt)" }} /> {state.success}
      </p>
    );
  }
  return null;
}

const headingStyle = {
  fontFamily: "var(--font-hanken), ui-sans-serif, system-ui, sans-serif",
  fontWeight: 600,
  fontSize: 24,
  letterSpacing: "-0.01em",
  margin: 0,
  color: "var(--argana-on-surface)",
} as const;

const subStyle = {
  margin: "8px 0 0",
  fontSize: 14.5,
  lineHeight: 1.5,
  color: "var(--argana-on-surface-muted)",
} as const;

const formStyle = { display: "flex", flexDirection: "column", gap: 18 } as const;

const linkStyle = {
  fontWeight: 600,
  color: "var(--argana-burnt)",
  textDecoration: "none",
} as const;

const footerLinkStyle = {
  textAlign: "center" as const,
  fontSize: 14,
  color: "var(--argana-on-surface-muted)",
};

const helpStyle = {
  margin: "6px 0 0",
  fontSize: 12.5,
  color: "var(--argana-on-surface-muted)",
} as const;

function Field({
  id,
  label,
  trailing,
  icon,
  ...inputProps
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  trailing?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <label htmlFor={id} className="am-label" style={{ margin: 0 }}>{label}</label>
        {trailing}
      </div>
      <div style={{ position: "relative" }}>
        {icon && (
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--argana-outline)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 16,
              height: 16,
            }}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          className="am-input"
          style={icon ? { paddingLeft: 40 } : undefined}
          {...inputProps}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────── forms ─────────────────────────────── */

export function LoginForm() {
  const [state, action] = useActionState<AuthState, FormData>(loginAction, null);
  return (
    <form action={action} style={formStyle}>
      <div>
        <h1 style={headingStyle}>Welcome back</h1>
        <p style={subStyle}>Log in to manage your services.</p>
      </div>
      <Alert state={state} />
      <Field
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        label="Email"
        placeholder="you@example.com"
        icon={<Mail style={{ width: 16, height: 16 }} />}
      />
      <Field
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        label="Password"
        icon={<Lock style={{ width: 16, height: 16 }} />}
        trailing={<Link href="/forgot-password" style={{ ...linkStyle, fontSize: 12.5 }}>Forgot?</Link>}
      />
      <Submit>Log in</Submit>
      <p style={footerLinkStyle}>
        New here? <Link href="/register" style={linkStyle}>Create an account</Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [state, action] = useActionState<AuthState, FormData>(registerAction, null);
  return (
    <form action={action} style={formStyle}>
      <div>
        <h1 style={headingStyle}>Create your account</h1>
        <p style={subStyle}>It only takes a minute to get started.</p>
      </div>
      <Alert state={state} />
      <Field id="name" name="name" required label="Full name" placeholder="Jane Doe" />
      <Field
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        label="Email"
        placeholder="you@example.com"
        icon={<Mail style={{ width: 16, height: 16 }} />}
      />
      <div>
        <Field
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          label="Password"
          icon={<Lock style={{ width: 16, height: 16 }} />}
        />
        <p style={helpStyle}>At least 8 characters with upper, lower and a number.</p>
      </div>
      <Field
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        label="Confirm password"
        icon={<Lock style={{ width: 16, height: 16 }} />}
      />
      <Submit>Create account</Submit>
      <p style={footerLinkStyle}>
        Already have an account? <Link href="/login" style={linkStyle}>Log in</Link>
      </p>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action] = useActionState<AuthState, FormData>(forgotPasswordAction, null);
  return (
    <form action={action} style={formStyle}>
      <div>
        <h1 style={headingStyle}>Reset your password</h1>
        <p style={subStyle}>We&apos;ll email you a reset link.</p>
      </div>
      <Alert state={state} />
      <Field
        id="email"
        name="email"
        type="email"
        required
        label="Email"
        placeholder="you@example.com"
        icon={<Mail style={{ width: 16, height: 16 }} />}
      />
      <Submit>Send reset link</Submit>
      <p style={footerLinkStyle}>
        <Link href="/login" style={linkStyle}>Back to login</Link>
      </p>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action] = useActionState<AuthState, FormData>(resetPasswordAction, null);
  return (
    <form action={action} style={formStyle}>
      <input type="hidden" name="token" value={token} />
      <div>
        <h1 style={headingStyle}>Choose a new password</h1>
      </div>
      <Alert state={state} />
      <Field
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        label="New password"
        icon={<Lock style={{ width: 16, height: 16 }} />}
      />
      <Field
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        label="Confirm password"
        icon={<Lock style={{ width: 16, height: 16 }} />}
      />
      <Submit>Update password</Submit>
      {state?.success && (
        <p style={footerLinkStyle}>
          <Link href="/login" style={linkStyle}>Go to login</Link>
        </p>
      )}
    </form>
  );
}
