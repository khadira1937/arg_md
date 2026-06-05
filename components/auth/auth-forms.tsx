"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loginAction,
  registerAction,
  forgotPasswordAction,
  resetPasswordAction,
  type AuthState,
} from "@/app/actions/auth";

function Submit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="gradient" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  );
}

function Alert({ state }: { state: AuthState }) {
  if (!state) return null;
  if (state.error)
    return (
      <p className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
        <AlertCircle className="h-4 w-4 shrink-0" /> {state.error}
      </p>
    );
  if (state.success)
    return (
      <p className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
        <CheckCircle2 className="h-4 w-4 shrink-0" /> {state.success}
      </p>
    );
  return null;
}

export function LoginForm() {
  const [state, action] = useActionState<AuthState, FormData>(loginAction, null);
  return (
    <form action={action} className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Log in to manage your services.</p>
      </div>
      <Alert state={state} />
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
        </div>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <Submit>Log in</Submit>
      <p className="text-center text-sm text-muted-foreground">
        New here? <Link href="/register" className="font-medium text-primary hover:underline">Create an account</Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [state, action] = useActionState<AuthState, FormData>(registerAction, null);
  return (
    <form action={action} className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Start deploying in minutes.</p>
      </div>
      <Alert state={state} />
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" required placeholder="Jane Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" autoComplete="new-password" required />
        <p className="text-xs text-muted-foreground">At least 8 characters with upper, lower and a number.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required />
      </div>
      <Submit>Create account</Submit>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account? <Link href="/login" className="font-medium text-primary hover:underline">Log in</Link>
      </p>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action] = useActionState<AuthState, FormData>(forgotPasswordAction, null);
  return (
    <form action={action} className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Reset your password</h1>
        <p className="mt-1 text-sm text-muted-foreground">We'll email you a reset link.</p>
      </div>
      <Alert state={state} />
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <Submit>Send reset link</Submit>
      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">Back to login</Link>
      </p>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action] = useActionState<AuthState, FormData>(resetPasswordAction, null);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div>
        <h1 className="text-xl font-bold">Choose a new password</h1>
      </div>
      <Alert state={state} />
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <Input id="password" name="password" type="password" autoComplete="new-password" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required />
      </div>
      <Submit>Update password</Submit>
      {state?.success && (
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/login" className="font-medium text-primary hover:underline">Go to login</Link>
        </p>
      )}
    </form>
  );
}
